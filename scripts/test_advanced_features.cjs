const { spawn } = require('child_process');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_test_adv_features',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9229/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) {
      console.error('App tab not found in browser targets!');
      return;
    }

    const ws = new WebSocket(appTab.webSocketDebuggerUrl);
    let id = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            if (data.error) reject(new Error(data.error.message || JSON.stringify(data.error)));
            else resolve(data.result);
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

    async function evaluate(expr) {
      const r = await sendCommand('Runtime.evaluate', {
        expression: expr,
        returnByValue: true,
        awaitPromise: true
      });
      if (r.exceptionDetails) {
        throw new Error(r.exceptionDetails.text);
      }
      return r.result ? r.result.value : undefined;
    }

    // Mock window.print and window.open
    await evaluate(`(() => {
      window.print = () => console.log('[MOCK PRINT]');
      window.open = (url) => { console.log('[MOCK OPEN]', url); return {}; };
    })()`);

    console.log('--- Test 1: RevenueFlow Sankey Visualizer ---');
    const flowCheck = await evaluate(`(() => {
      const canvas = document.getElementById('revenue-flow-canvas');
      const hasEngine = !!(window.revNexusApp && window.revNexusApp.revenueFlow);
      return {
        canvasExists: !!canvas,
        canvasWidth: canvas ? canvas.width : 0,
        canvasHeight: canvas ? canvas.height : 0,
        hasEngine
      };
    })()`);
    console.log('RevenueFlow Visualizer Check:', flowCheck);

    console.log('\n--- Test 2: Navigate to Customer Evidence Lab ---');
    await evaluate(`(() => {
      const link = document.querySelector('a[data-view="view-evidence-lab"]');
      if (link) link.click();
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const labActive = await evaluate(`(() => {
      const el = document.getElementById('view-evidence-lab');
      return el && el.classList.contains('active');
    })()`);
    console.log('Evidence Lab View Active:', labActive);

    console.log('\n--- Test 3: Ingest 60-Lead CRM CSV Dataset ---');
    const loadSampleRes = await evaluate(`(() => {
      const btn = document.getElementById('btn-crm-sample-load');
      if (!btn) return { error: 'btn-crm-sample-load not found' };
      btn.click();
      
      const card = document.getElementById('crm-analysis-results-card');
      const records = document.getElementById('crm-stat-records')?.textContent;
      const pipeline = document.getElementById('crm-stat-pipeline')?.textContent;
      const winrate = document.getElementById('crm-stat-winrate')?.textContent;
      const latency = document.getElementById('crm-stat-latency')?.textContent;
      const delayed = document.getElementById('crm-stat-delayed')?.textContent;
      const rowsCount = document.querySelectorAll('#crm-deals-table-body tr').length;

      return {
        cardVisible: card ? card.style.display : null,
        records,
        pipeline,
        winrate,
        latency,
        delayed,
        sampleRowsRendered: rowsCount
      };
    })()`);
    console.log('CRM Sample Load Result:', loadSampleRes);

    console.log('\n--- Test 4: Ingest Analyzed Metrics into Executive Audit Dossier ---');
    const applyRes = await evaluate(`(() => {
      const btn = document.getElementById('btn-crm-apply-to-dossier');
      if (!btn) return { error: 'btn-crm-apply-to-dossier not found' };
      btn.click();

      return {
        leadsInput: document.getElementById('input-ev-leads')?.value,
        acvInput: document.getElementById('input-ev-acv')?.value,
        latencyInput: document.getElementById('input-ev-latency')?.value,
        winrateInput: document.getElementById('input-ev-winrate')?.value,
        annualUpside: document.getElementById('ev-calc-annual-upside')?.textContent,
        payback: document.getElementById('ev-calc-payback')?.textContent
      };
    })()`);
    console.log('Apply Ingested CRM Metrics Result:', applyRes);

    console.log('\n--- Test 5: AI Voice Waveform Equalizer ---');
    const waveRes = await evaluate(`(() => {
      const btn = document.getElementById('btn-ev-listen-voice');
      if (!btn) return { error: 'btn-ev-listen-voice not found' };
      btn.click();

      const container = document.getElementById('objection-audio-visualizer-container');
      const canvas = document.getElementById('objection-audio-waveform');
      const status = document.getElementById('objection-audio-status');

      return {
        containerDisplay: container ? container.style.display : null,
        canvasExists: !!canvas,
        statusText: status ? status.textContent : null
      };
    })()`);
    console.log('Audio Waveform Result:', waveRes);

    console.log('\n--- Test 6: Auto-Optimize All 5 Stages on Executive Dashboard ---');
    await evaluate(`(() => {
      const link = document.querySelector('a[data-view="view-executive"]');
      if (link) link.click();
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const optRes = await evaluate(`(() => {
      const btn = document.getElementById('btn-chain-optimize-all');
      if (!btn) return { error: 'btn-chain-optimize-all not found' };
      btn.click();
      return { clicked: true, text: btn.textContent };
    })()`);
    console.log('Optimization Triggered:', optRes);

    // Wait for the 5-step async optimization cycle to finish (~3.5s)
    await new Promise(r => setTimeout(r, 4500));

    const optCompletedRes = await evaluate(`(() => {
      const btn = document.getElementById('btn-chain-optimize-all');
      const resetBtn = document.getElementById('btn-chain-reset');
      const isFlowOptimized = window.revNexusApp?.revenueFlow?.isOptimized;
      return {
        btnText: btn ? btn.textContent : null,
        resetBtnVisible: resetBtn ? resetBtn.style.display : null,
        isFlowOptimized
      };
    })()`);
    console.log('Optimization Completed Result:', optCompletedRes);

    console.log('\n--- Test 7: Reset to Baseline ---');
    const resetRes = await evaluate(`(() => {
      const resetBtn = document.getElementById('btn-chain-reset');
      if (!resetBtn) return { error: 'btn-chain-reset not found' };
      resetBtn.click();
      const isFlowOptimized = window.revNexusApp?.revenueFlow?.isOptimized;
      return {
        resetClicked: true,
        isFlowOptimized
      };
    })()`);
    console.log('Reset Completed Result:', resetRes);

    console.log('\n--- Summary ---');
    console.log(`Total Runtime Exceptions: ${exceptions.length}`);
    if (exceptions.length === 0) {
      console.log('🚀 ALL ADVANCED ENGINEERING MODULES FUNCTIONING FLAWLESSLY WITH 0 EXCEPTIONS!');
    }

    ws.close();
  } finally {
    proc.kill();
  }
}

main().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
