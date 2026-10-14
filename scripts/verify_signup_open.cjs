const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const proc = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9238',
  '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_signup_verify2',
  'http://localhost:3030/#signup'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9238/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('3030'));
    const ws = new WebSocket(appTab.webSocketDebuggerUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `(() => {
            const layer = document.getElementById('portal-gateway-layer');
            const tabSignUp = document.getElementById('tab-gateway-signup');
            const groupName = document.getElementById('gateway-group-name');
            const support = document.getElementById('portal-support-mailto-link');
            const submitBtn = document.getElementById('btn-gateway-submit');

            return {
              layerVisible: layer ? !layer.classList.contains('hidden') : false,
              signUpTabActive: tabSignUp ? tabSignUp.classList.contains('active') : false,
              nameFieldVisible: groupName ? groupName.style.display === 'block' : false,
              submitButtonText: submitBtn ? submitBtn.textContent.trim() : null,
              supportEmail: support ? support.textContent.trim() : null
            };
          })()`,
          returnByValue: true
        }
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === 1) {
        console.log('Sign Up Layer Verification:', data.result.result.value);
        proc.kill();
        process.exit(0);
      }
    };
  } catch(e) {
    console.error(e);
    proc.kill();
    process.exit(1);
  }
}, 2500);
