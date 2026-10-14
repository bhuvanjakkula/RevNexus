const { spawn } = require('child_process');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_industry_test_data',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9226/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) {
      console.error('App tab not found in browser targets!');
      return;
    }
    console.log('Connected to app via CDP ws:', appTab.webSocketDebuggerUrl);

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

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER EXCEPTION]', data.params.exceptionDetails.text, data.params.exceptionDetails.exception);
      }
    });

    // 1. Check window.revApp and industryEngine
    const evalInit = await sendCommand('Runtime.evaluate', {
      expression: '!!window.revApp && !!window.revApp.industryEngine',
      returnByValue: true
    });
    console.log('1. App and IndustryMatrixEngine initialized:', evalInit.result.value);

    // 2. Navigate to 32 Industries View
    const navClick = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const navBtn = document.querySelector('.nav-link[data-view="view-industries"]');
        if (navBtn) {
          navBtn.click();
          const view = document.getElementById('view-industries');
          const cards = document.querySelectorAll('.industry-card');
          const counter = document.getElementById('industry-result-counter')?.innerText;
          return { clicked: true, viewActive: view.classList.contains('active'), cardCount: cards.length, counter };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('2. Navigated to 32 Industry Battlecards view:', navClick.result.value);

    // 3. Test Filter Chips
    const filterTests = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const results = {};
        const filters = ['B2B', 'B2C', 'High-Ticket', 'Wholesale', 'all'];

        filters.forEach(f => {
          const btn = document.querySelector(\`.industry-filter-chips .filter-chip[data-filter="\${f}"]\`);
          if (btn) {
            btn.click();
            const count = document.querySelectorAll('.industry-card').length;
            const counter = document.getElementById('industry-result-counter')?.innerText;
            results[f] = { count, counter };
          }
        });

        return results;
      })()`,
      returnByValue: true
    });
    console.log('3. Filter Chips Multi-Segment Tests:', filterTests.result.value);

    // 4. Test Search Functionality
    const searchTests = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const input = document.getElementById('industry-search-input');
        const runSearch = (term) => {
          input.value = term;
          input.dispatchEvent(new Event('input'));
          const cards = document.querySelectorAll('.industry-card');
          const firstTitle = cards[0]?.querySelector('.industry-title')?.innerText?.trim();
          return { count: cards.length, firstTitle };
        };

        const re = runSearch('Real Estate');
        const saas = runSearch('SaaS');
        const fmcg = runSearch('FMCG');
        const reset = runSearch('');

        return { 'Real Estate': re, 'SaaS': saas, 'FMCG': fmcg, 'Reset': reset };
      })()`,
      returnByValue: true
    });
    console.log('4. Real-Time Search Results:', searchTests.result.value);

    // 5. Test Launching Sector Playbook Modal for SaaS
    const modalTest = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        // Open modal for saas_software
        const saasBtn = document.querySelector('.industry-card[data-id="saas_software"] .btn-open-ind-modal');
        if (saasBtn) saasBtn.click();

        const modal = document.getElementById('modal-industry-playbook');
        const isOpen = modal.classList.contains('active') || modal.classList.contains('open');
        const title = document.getElementById('ind-modal-title')?.innerText;
        const conv = document.getElementById('ind-modal-conv')?.innerText;
        const acv = document.getElementById('ind-modal-acv')?.innerText;
        const leakage = document.getElementById('ind-modal-leakage')?.innerText;
        const upside = document.getElementById('ind-modal-upside')?.innerText;

        // Test Tab 2: WhatsApp Pitch
        document.getElementById('tab-ind-pitch')?.click();
        const pitchText = document.getElementById('ind-modal-pitch-text')?.value;

        // Test Tab 3: Objection
        document.getElementById('tab-ind-objection')?.click();
        const objTitle = document.getElementById('ind-modal-objection-title')?.innerText;
        const objProof = document.getElementById('ind-modal-obj-proof')?.innerText;

        // Test Tab 4: SOP
        document.getElementById('tab-ind-sop')?.click();
        const sopStepsCount = document.querySelectorAll('#ind-modal-sop-container > div').length;

        // Test Tab 1: Calculator slider
        document.getElementById('tab-ind-calculator')?.click();
        const slider = document.getElementById('ind-slider-inquiries');
        slider.value = 500;
        slider.dispatchEvent(new Event('input'));
        const newLeakage = document.getElementById('ind-modal-leakage')?.innerText;

        // Close modal
        document.getElementById('btn-close-industry-modal')?.click();
        const isClosed = !modal.classList.contains('active') && !modal.classList.contains('open');

        return {
          isOpen,
          isClosed,
          title,
          conv,
          acv,
          leakage,
          upside,
          newLeakageWith500Inquiries: newLeakage,
          pitchSample: pitchText?.substring(0, 70) + '...',
          objTitle,
          objProofSample: objProof?.substring(0, 70) + '...',
          sopStepsCount
        };
      })()`,
      returnByValue: true
    });
    console.log('5. Sector Playbook & Interactive Diagnostic Modal Test:', modalTest.result.value);

    // 6. Test Quick Action: Apply to Simulator
    const simApplyTest = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const quickSimBtn = document.querySelector('.industry-card[data-id="manufacturing"] .btn-card-quick-sim');
        if (quickSimBtn) quickSimBtn.click();

        const activeView = document.querySelector('.view-panel.active')?.id;
        const acvVal = document.getElementById('input-ev-acv')?.value;
        return { activeView, acvVal };
      })()`,
      returnByValue: true
    });
    console.log('6. Applied Sector Metrics to System Simulator:', simApplyTest.result.value);

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    proc.kill();
  }
}

main();
