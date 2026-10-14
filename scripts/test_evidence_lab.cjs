const { spawn } = require('child_process');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_evidence_test_data2',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9225/json');
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

    // 1. Check window.revApp
    const evalInit = await sendCommand('Runtime.evaluate', {
      expression: '!!window.revApp && !!window.revApp.evidenceEngine',
      returnByValue: true
    });
    console.log('1. RevNexusApp and CustomerEvidenceEngine loaded:', evalInit.result.value);

    // 2. Click Customer Evidence Lab in Nav
    const navClick = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const navBtn = document.getElementById('nav-link-evidence-lab');
        if (navBtn) {
          navBtn.click();
          const view = document.getElementById('view-evidence-lab');
          return { clicked: true, viewActive: view.classList.contains('active') };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('2. Navigated to Customer Evidence Lab:', navClick.result.value);

    // 3. Test calculation values
    const calcResult = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const upside = document.getElementById('ev-calc-annual-upside')?.innerText;
        const latencyDrag = document.getElementById('ev-calc-latency-drag')?.innerText;
        const discountBleed = document.getElementById('ev-calc-discount-bleed')?.innerText;
        const payback = document.getElementById('ev-calc-payback')?.innerText;
        const compRoi = document.getElementById('ev-comp-roi')?.innerText;
        return { upside, latencyDrag, discountBleed, payback, compRoi };
      })()`,
      returnByValue: true
    });
    console.log('3. Live Forensic Calculation Outputs:', calcResult.result.value);

    // 4. Test preset switch to Fintech
    const presetSwitch = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('#evidence-preset-selector .btn-chip[data-preset="fintech"]');
        if (btn) {
          btn.click();
          return {
            leads: document.getElementById('input-ev-leads').value,
            acv: document.getElementById('input-ev-acv').value,
            upside: document.getElementById('ev-calc-annual-upside').innerText,
            payback: document.getElementById('ev-calc-payback').innerText
          };
        }
        return null;
      })()`,
      returnByValue: true
    });
    console.log('4. Fintech Benchmark Preset Applied:', presetSwitch.result.value);

    // 5. Test Live Inbound Lead Triage Simulator
    const triageTest = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        document.getElementById('ev-lead-name').value = 'Vikram Malhotra';
        document.getElementById('ev-lead-company').value = 'Apex FinTech Global';
        document.getElementById('ev-lead-budget').value = '$120,000';
        document.getElementById('ev-lead-timeline').value = 'immediate';
        document.getElementById('ev-lead-need').value = 'Stop 45m speed-to-lead bleed on enterprise inquiries';
        const triageBtn = document.getElementById('btn-ev-run-triage');
        triageBtn.click();

        return {
          score: document.getElementById('ev-res-score').innerText,
          tierBadge: document.getElementById('ev-res-tier-badge').innerText,
          assignedRep: document.getElementById('ev-res-rep').innerText,
          whatsappMsg: document.getElementById('ev-res-whatsapp-msg').innerText.substring(0, 90) + '...'
        };
      })()`,
      returnByValue: true
    });
    console.log('5. Live Inbound Lead Triage Output:', triageTest.result.value);

    // 6. Test Live Objection Neutralizer
    const objectionTest = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        document.getElementById('ev-custom-objection-input').value = 'Our CFO froze all tech expenditures until next fiscal year.';
        const solveBtn = document.getElementById('btn-ev-solve-objection');
        solveBtn.click();

        return {
          category: document.getElementById('ev-obj-category-badge').innerText,
          hook: document.getElementById('ev-obj-hook').innerText.substring(0, 60) + '...',
          proof: document.getElementById('ev-obj-proof').innerText.substring(0, 70) + '...',
          cta: document.getElementById('ev-obj-cta').innerText.substring(0, 60) + '...'
        };
      })()`,
      returnByValue: true
    });
    console.log('6. Live Objection Neutralizer 3-Tier Output:', objectionTest.result.value);

    // 7. Test Export Board-Ready Dossier Modal
    const dossierModalTest = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const exportBtn = document.getElementById('btn-lab-export-dossier');
        exportBtn.click();
        const modal = document.getElementById('modal-evidence-dossier');
        const isOpen = modal.classList.contains('active') || modal.classList.contains('open');
        const auditId = document.getElementById('dos-header-audit-id')?.innerText;
        const pqcSig = document.getElementById('dos-pqc-signature')?.innerText;
        const monthlyDrag = document.getElementById('dos-monthly-drag')?.innerText;
        const annualUpside = document.getElementById('dos-annual-upside')?.innerText;
        const paybackDays = document.getElementById('dos-payback-days')?.innerText;

        // Close modal
        document.getElementById('btn-close-evidence-dossier-modal').click();
        const isClosed = !modal.classList.contains('active') && !modal.classList.contains('open');

        return { isOpen, isClosed, auditId, pqcSig, monthlyDrag, annualUpside, paybackDays };
      })()`,
      returnByValue: true
    });
    console.log('7. Board-Ready Audit Dossier Modal & PQC Signature:', dossierModalTest.result.value);

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    proc.kill();
  }
}

main();
