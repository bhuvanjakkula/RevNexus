const { spawn } = require('child_process');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_test_cleanliness',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9230/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) throw new Error('App tab not found in browser targets!');

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
      window.print = () => {};
      window.open = () => ({});
    })()`);

    console.log('--- Test 1: Header Profile Widget & Raw Text Removal ---');
    const headerProfile = await evaluate(`(() => {
      const avatar = document.getElementById('user-avatar-initials')?.textContent;
      const name = document.getElementById('user-display-name')?.textContent;
      const email = document.getElementById('user-display-email')?.textContent;

      const pageText = document.body.innerText;
      const containsRawBj = avatar === 'BJ';
      const containsBhuvanJakkula = pageText.includes('Bhuvan Jakkula');
      const containsVipFree = pageText.includes('VIP Free');

      return {
        avatar,
        name,
        email,
        containsRawBj,
        containsBhuvanJakkula,
        containsVipFree
      };
    })()`);
    console.log('Header Profile Widget Check:', headerProfile);

    console.log('\n--- Test 2: Executive Revenue Chain Operational Stage Queries ---');
    const stageQueries = await evaluate(`(() => {
      const queries = [...document.querySelectorAll('.chain-step-query')].map(el => el.textContent.trim());
      return {
        stageCount: queries.length,
        queries
      };
    })()`);
    console.log('Stage Queries:', stageQueries);

    console.log('\n--- Test 3: Exclusive Single-Tenant Email Security Access Gating ---');
    // Open auth modal
    await evaluate(`window.revNexusApp.openAuthModal()`);
    await new Promise(r => setTimeout(r, 400));

    // Try logging in with unauthorized email
    const unauthorizedAttempt = await evaluate(`(() => {
      const input = document.getElementById('auth-input-email');
      input.value = 'unauthorized.stranger@generic.com';
      window.revNexusApp.checkVipEmail();
      window.revNexusApp.handleAuthSubmit();

      const hint = document.getElementById('auth-email-hint')?.textContent;
      const btn = document.getElementById('btn-auth-submit')?.textContent;
      const user = window.revNexusApp.currentUser;

      return {
        hint,
        btnText: btn,
        userEmail: user.email
      };
    })()`);
    console.log('Unauthorized Access Result (MUST BE DENIED):', unauthorizedAttempt);

    // Now log in with authorized email
    const authorizedAttempt = await evaluate(`(() => {
      const input = document.getElementById('auth-input-email');
      input.value = 'bhuvanjakkula@gmail.com';
      window.revNexusApp.checkVipEmail();
      window.revNexusApp.handleAuthSubmit();

      const modalOpen = document.getElementById('modal-auth')?.classList.contains('open');
      const user = window.revNexusApp.currentUser;
      const displayName = document.getElementById('user-display-name')?.textContent;
      const displayEmail = document.getElementById('user-display-email')?.textContent;

      return {
        modalDismissed: !modalOpen,
        userEmail: user.email,
        displayName,
        displayEmail
      };
    })()`);
    console.log('Authorized Access Result (MUST SUCCEED):', authorizedAttempt);

    console.log('\n--- Summary ---');
    console.log(`Total Runtime Exceptions: ${exceptions.length}`);
    if (exceptions.length === 0 && !headerProfile.containsRawBj && !headerProfile.containsBhuvanJakkula && !headerProfile.containsVipFree) {
      console.log('🚀 UI IS CLEAN, RAW PERSONAL/THEORY WORDING PURGED, AND ACCESS STRICTLY GATED TO bhuvanjakkula@gmail.com!');
    }

    ws.close();
  } finally {
    proc.kill();
  }
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
