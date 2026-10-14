const { spawn } = require('child_process');
const http = require('http');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_test_user_data',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9223/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) {
      console.error('App tab not found!');
      return;
    }
    console.log('Found app tab ws URL:', appTab.webSocketDebuggerUrl);

    // Let's connect with native WebSocket (available in Node 22+)
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

    // Enable console and runtime
    await sendCommand('Runtime.enable');
    await sendCommand('Console.enable');

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', data.params.type, data.params.args.map(a => a.value || a.description));
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER EXCEPTION]', data.params.exceptionDetails.text, data.params.exceptionDetails.exception);
      }
    });

    // Check if app is initialized
    const checkInit = await sendCommand('Runtime.evaluate', {
      expression: 'Boolean(window.revApp && window.revApp.revenueChain)'
    });
    console.log('revApp initialized:', checkInit);

    // Get button text and state before click
    const btnBefore = await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("btn-chain-optimize-all")?.outerHTML'
    });
    console.log('Button before:', btnBefore.result?.value);

    // Click the button
    console.log('Clicking ⚡ Auto-Optimize All 5 Stages...');
    const clickResult = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.getElementById("btn-chain-optimize-all");
          if (!btn) return "Button not found!";
          btn.click();
          return "Clicked!";
        })()
      `
    });
    console.log('Click result:', clickResult.result?.value);

    // Wait 4 seconds for all 5 stages to finish
    await new Promise(r => setTimeout(r, 4500));

    // Inspect the DOM state after click
    const domAfter = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const tags = [1,2,3,4,5].map(i => ({
            stage: i,
            pill: document.getElementById("pill-step-" + i)?.textContent,
            tag: document.getElementById("tag-step-" + i)?.textContent,
            tagStyle: document.getElementById("tag-step-" + i)?.getAttribute("style")
          }));
          const health = document.getElementById("chain-overview-health")?.textContent.trim();
          const drag = document.getElementById("chain-overview-drag")?.textContent.trim();
          const bottleneck = document.getElementById("chain-overview-bottleneck")?.textContent.trim();
          const btnText = document.getElementById("btn-chain-optimize-all")?.textContent.trim();
          const resetBtnDisplay = document.getElementById("btn-chain-reset")?.style.display;
          const kpiLeakage = document.getElementById("exec-leakage-cost")?.textContent.trim();
          const kpiUpside = document.getElementById("exec-recoverable-upside")?.textContent.trim();

          return { tags, health, drag, bottleneck, btnText, resetBtnDisplay, kpiLeakage, kpiUpside };
        })()
      `,
      returnByValue: true
    });
    console.log('DOM State After Auto-Optimize:\n', JSON.stringify(domAfter.result?.value, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    proc.kill();
  }
}

main();
