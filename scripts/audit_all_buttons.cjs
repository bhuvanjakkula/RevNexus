const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const html = fs.readFileSync('index.html', 'utf8');
  const buttonIds = [...html.matchAll(/<button[^>]*id="([^"]+)"/g)].map(m => m[1]);
  console.log(`Auditing ${buttonIds.length} button IDs across all views...`);

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_audit_all_data2',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9228/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) {
      console.error('App tab not found in browser targets!');
      return;
    }

    const ws = new WebSocket(appTab.webSocketDebuggerUrl);
    let id = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await new Promise(r => ws.addEventListener('open', r));
    await sendCommand('Runtime.enable');

    const exceptions = [];
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.exceptionThrown') {
        exceptions.push(data.params.exceptionDetails);
        console.error('[BROWSER EXCEPTION]', data.params.exceptionDetails.text, data.params.exceptionDetails.exception?.description || '');
      }
    });

    // Mock window.print and window.open to prevent blocking
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        window.print = () => console.log('[MOCK PRINT TRIGGERED]');
        window.open = (url) => { console.log('[MOCK WINDOW.OPEN]', url); return {}; };
      })()`
    });

    // 1. Audit View Navigation for all 15 views
    const views = [
      'view-executive',
      'view-evidence-lab',
      'view-copilot',
      'view-simulator',
      'view-global-sales',
      'view-attribution-sla',
      'view-triadic-burnout',
      'view-sustainability-regional',
      'view-peer-incentives',
      'view-conversational-funnel',
      'view-verification-queues',
      'view-scorer',
      'view-industries',
      'view-feedback',
      'view-pqc-security'
    ];

    console.log('\n--- TESTING ALL 15 VIEWS NAVIGATION ---');
    for (const v of views) {
      const navRes = await sendCommand('Runtime.evaluate', {
        expression: `(() => {
          const navBtn = document.querySelector(\`.nav-link[data-view="${v}"]\`);
          if (navBtn) {
            navBtn.click();
            const panel = document.getElementById("${v}");
            return { found: true, active: panel?.classList.contains('active') };
          }
          return { found: false };
        })()`,
        returnByValue: true
      });
      console.log(`View [${v}]:`, navRes.result.value);
    }

    // 2. Audit All Buttons by Clicking Them in their respective views
    console.log('\n--- TESTING ALL BUTTONS ---');
    const buttonResults = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const buttons = ${JSON.stringify(buttonIds)};
        const results = [];

        buttons.forEach(btnId => {
          const btn = document.getElementById(btnId);
          if (!btn) {
            results.push({ id: btnId, status: 'NOT_FOUND' });
            return;
          }

          if (btnId === 'btn-auth-submit') {
            results.push({ id: btnId, status: 'SKIPPED_SUBMIT' });
            return;
          }

          try {
            btn.click();
            results.push({ id: btnId, status: 'CLICKED_OK' });
          } catch (err) {
            results.push({ id: btnId, status: 'ERROR', error: err.message });
          }
        });

        return results;
      })()`,
      returnByValue: true
    });

    const notFound = buttonResults.result.value.filter(b => b.status === 'NOT_FOUND');
    const errors = buttonResults.result.value.filter(b => b.status === 'ERROR');
    console.log(`Total Buttons Tested: ${buttonResults.result.value.length}`);
    console.log(`Clicked OK: ${buttonResults.result.value.filter(b => b.status === 'CLICKED_OK').length}`);
    console.log(`Not Found: ${notFound.length}`, notFound.map(b => b.id));
    console.log(`Errors: ${errors.length}`, errors);
    console.log(`Runtime Exceptions: ${exceptions.length}`);

    ws.close();
  } catch (err) {
    console.error('Audit Error:', err);
  } finally {
    proc.kill();
  }
}

main();
