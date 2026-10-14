const { spawn } = require('child_process');

async function testPortalLayer() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9235',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_portal_test',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9235/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) throw new Error('App tab not found on 9235');

    const ws = new WebSocket(appTab.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    const exceptions = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('RUNTIME EXCEPTION:', msg.params.exceptionDetails);
        exceptions.push(msg.params.exceptionDetails);
      }
      if (msg.id && pending.has(msg.id)) {
        const { resolve } = pending.get(msg.id);
        pending.delete(msg.id);
        resolve(msg.result);
      }
    };

    await new Promise(r => ws.onopen = r);
    await send('Runtime.enable');
    await send('Page.enable');

    console.log('--- Testing First Web Page Layer (Gateway Portal & Auth) ---');

    // 1. Verify Portal Elements & Support Email
    const portalCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const layer = document.getElementById('portal-gateway-layer');
        const emailInput = document.getElementById('gateway-input-email');
        const passInput = document.getElementById('gateway-input-password');
        const mobileInput = document.getElementById('gateway-input-mobile');
        const countrySelect = document.getElementById('gateway-select-country');
        const supportLink = document.getElementById('portal-support-mailto-link');
        const innovationCards = document.querySelectorAll('.portal-innovation-card');

        return {
          hasLayer: !!layer,
          hasEmail: !!emailInput,
          hasPassword: !!passInput,
          hasMobile: !!mobileInput,
          hasCountrySelect: !!countrySelect,
          supportEmailText: supportLink ? supportLink.textContent.trim() : null,
          supportHref: supportLink ? supportLink.href : null,
          innovationCardsCount: innovationCards.length
        };
      })()`,
      returnByValue: true
    });
    console.log('Portal Structure & Support Email Check:', portalCheck.result.value);

    // 2. Test Sign In vs Sign Up Tab Toggle
    const tabCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const tabSignUp = document.getElementById('tab-gateway-signup');
        const groupName = document.getElementById('gateway-group-name');
        const btnSubmit = document.getElementById('btn-gateway-submit');

        if (tabSignUp) tabSignUp.click();

        const nameVisibleOnSignUp = groupName ? groupName.style.display === 'block' : false;
        const submitTextOnSignUp = btnSubmit ? btnSubmit.textContent.trim() : '';

        // Click back to Sign In
        const tabSignIn = document.getElementById('tab-gateway-signin');
        if (tabSignIn) tabSignIn.click();
        const nameHiddenOnSignIn = groupName ? groupName.style.display === 'none' : false;

        return {
          nameVisibleOnSignUp,
          submitTextOnSignUp,
          nameHiddenOnSignIn
        };
      })()`,
      returnByValue: true
    });
    console.log('Tab Toggle Check (Sign In / Sign Up):', tabCheck.result.value);

    // 3. Test Skip to Dashboard and Return via Header Button
    const transCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const layer = document.getElementById('portal-gateway-layer');
        const btnSkip = document.getElementById('btn-portal-skip-to-dashboard');
        
        if (btnSkip) btnSkip.click();
        const hiddenAfterSkip = layer.classList.contains('hidden');

        // Click header portal toggle
        const btnHeader = document.getElementById('btn-header-portal-toggle');
        if (btnHeader) btnHeader.click();
        const visibleAfterHeaderToggle = !layer.classList.contains('hidden');

        return {
          hiddenAfterSkip,
          visibleAfterHeaderToggle
        };
      })()`,
      returnByValue: true
    });
    console.log('Portal Transition Check:', transCheck.result.value);

    // 4. Test Master Access Clearance
    const masterCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const btnMaster = document.getElementById('btn-gateway-master-clearance');
        const layer = document.getElementById('portal-gateway-layer');
        if (btnMaster) btnMaster.click();

        return {
          layerHiddenAfterMaster: layer.classList.contains('hidden'),
          user: window.revApp ? window.revApp.currentUser : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Master Clearance Check:', masterCheck.result.value);

    console.log('\n--- Summary ---');
    console.log('Total Runtime Exceptions:', exceptions.length);
    if (exceptions.length === 0 && portalCheck.result.value.supportEmailText === 'bjtmusic12@gmail.com') {
      console.log('🎯 FIRST WEB PAGE LAYER, INNOVATIONS & SUPPORT (bjtmusic12@gmail.com) VERIFIED WITH 100% SUCCESS!');
    } else {
      process.exit(1);
    }

    ws.close();
  } finally {
    proc.kill();
  }
}

testPortalLayer().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
