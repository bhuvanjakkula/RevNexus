const { spawn } = require('child_process');
const http = require('http');

async function testFullDiagnostics() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_test_user_data_2',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9224/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) {
      console.error('App tab not found!');
      return;
    }

    const ws = new WebSocket(appTab.webSocketDebuggerUrl);
    let id = 1;
    function send(method, params = {}) {
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
    await send('Runtime.enable');
    await send('Console.enable');

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.consoleAPICalled') {
        console.log('[CONSOLE]', data.params.type, data.params.args.map(a => a.value || a.description));
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('[EXCEPTION]', data.params.exceptionDetails.text, data.params.exceptionDetails.exception);
      }
    });

    console.log('--- 1. Testing Initial State ---');
    const initCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const health = document.getElementById("chain-overview-health")?.textContent.trim();
          const drag = document.getElementById("chain-overview-drag")?.textContent.trim();
          const bottleneck = document.getElementById("chain-overview-bottleneck")?.textContent.trim();
          const buttonsCount = document.querySelectorAll(".btn-step-action").length;
          const workbenchExists = Boolean(document.querySelector(".chain-interactive-workbench"));
          return { health, drag, bottleneck, buttonsCount, workbenchExists };
        })()
      `,
      returnByValue: true
    });
    console.log('Initial state:', initCheck.result?.value);

    console.log('--- 2. Testing Stage 1 Workbench Button Click ---');
    const s1Click = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector(".btn-step-action[data-step-btn='1']");
          if (!btn) return "Stage 1 button not found";
          btn.click();
          const activeTitle = document.querySelector(".chain-console-title-area h4")?.textContent;
          const s1Wb = Boolean(document.querySelector(".stage-workbench-1"));
          return { activeTitle, s1Wb };
        })()
      `,
      returnByValue: true
    });
    console.log('Stage 1 Click Result:', s1Click.result?.value);

    console.log('--- 3. Testing Stage 1 Purge Pipeline Action ---');
    const s1Purge = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const purgeBtn = document.getElementById("btn-stage1-purge-pipeline");
          if (!purgeBtn) return "Purge button not found";
          purgeBtn.click();
          const pill1 = document.getElementById("pill-step-1")?.textContent;
          const tag1 = document.getElementById("tag-step-1")?.textContent;
          return { pill1, tag1 };
        })()
      `,
      returnByValue: true
    });
    console.log('Stage 1 Purge Result:', s1Purge.result?.value);

    console.log('--- 4. Testing Auto-Optimize All 5 Stages Button ---');
    const autoOptClick = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.getElementById("btn-chain-optimize-all");
          if (!btn) return "Auto-Optimize button not found";
          btn.click();
          return "Clicked!";
        })()
      `,
      returnByValue: true
    });
    console.log('Auto-Optimize Clicked:', autoOptClick.result?.value);

    // Wait 4.5 seconds for all 5 stages to finish
    await new Promise(r => setTimeout(r, 4500));

    console.log('--- 5. Verifying Optimized State ---');
    const optState = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const tags = [1,2,3,4,5].map(i => ({
            stage: i,
            pill: document.getElementById("pill-step-" + i)?.textContent,
            tag: document.getElementById("tag-step-" + i)?.textContent
          }));
          const health = document.getElementById("chain-overview-health")?.textContent.trim();
          const drag = document.getElementById("chain-overview-drag")?.textContent.trim();
          const bottleneck = document.getElementById("chain-overview-bottleneck")?.textContent.trim();
          const kpiProfit = document.getElementById("exec-monthly-profit")?.textContent.trim();
          const kpiLeak = document.getElementById("exec-leakage-cost")?.textContent.trim();
          const kpiUpside = document.getElementById("exec-recoverable-upside")?.textContent.trim();
          const kpiBandwidth = document.getElementById("exec-rep-hours")?.textContent.trim();
          const resetBtnVisible = document.getElementById("btn-chain-reset")?.style.display !== "none";

          return { tags, health, drag, bottleneck, kpiProfit, kpiLeak, kpiUpside, kpiBandwidth, resetBtnVisible };
        })()
      `,
      returnByValue: true
    });
    console.log('Final State:\n', JSON.stringify(optState.result?.value, null, 2));

    console.log('--- 6. Testing ↺ Reset Baseline Button ---');
    const resetClick = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const resetBtn = document.getElementById("btn-chain-reset");
          if (!resetBtn) return "Reset button not found";
          resetBtn.click();
          const tag1 = document.getElementById("tag-step-1")?.textContent;
          const tag3 = document.getElementById("tag-step-3")?.textContent;
          const bottleneck = document.getElementById("chain-overview-bottleneck")?.textContent.trim();
          const optBtnText = document.getElementById("btn-chain-optimize-all")?.textContent.trim();
          return { tag1, tag3, bottleneck, optBtnText };
        })()
      `,
      returnByValue: true
    });
    console.log('Reset State:', resetClick.result?.value);

    ws.close();
  } catch (e) {
    console.error('Test error:', e);
  } finally {
    proc.kill();
  }
}

testFullDiagnostics();

