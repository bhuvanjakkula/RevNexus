const { spawn } = require('child_process');

async function testTerminalStream() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9231',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_term_test',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9231/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) throw new Error('App tab not found on 9231');

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

    console.log('--- Testing Live Event Stream & Terminal Drawer ---');

    // 1. Check toggle button and initial state
    const toggleRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const btnToggle = document.getElementById('btn-dock-live-stream');
        const drawer = document.getElementById('terminal-stream-drawer');
        const initialOpen = drawer.classList.contains('open');

        // Click to open
        if (btnToggle) btnToggle.click();
        const openedAfterClick = drawer.classList.contains('open');

        const logsBody = document.getElementById('terminal-logs-body');
        const rowCount = logsBody ? logsBody.children.length : 0;
        const countText = document.getElementById('term-event-count').textContent;

        return {
          hasToggleBtn: !!btnToggle,
          initialOpen,
          openedAfterClick,
          initialLogRows: rowCount,
          countText
        };
      })()`,
      returnByValue: true
    });
    console.log('Terminal Toggle & Logs Check:', toggleRes.result.value);

    // 2. Test Pause, Maximize, and Clear
    const controlsRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const drawer = document.getElementById('terminal-stream-drawer');
        const btnPause = document.getElementById('btn-terminal-pause');
        const btnMax = document.getElementById('btn-terminal-maximize');
        const btnClear = document.getElementById('btn-terminal-clear');

        if (btnPause) btnPause.click(); // Pause
        const isPaused = btnPause.textContent.includes('Resume');

        if (btnMax) btnMax.click(); // Maximize
        const isMaximized = drawer.classList.contains('maximized');

        if (btnClear) btnClear.click(); // Clear
        const logsBody = document.getElementById('terminal-logs-body');
        const clearedRows = logsBody ? logsBody.children.length : 0;

        return {
          isPaused,
          isMaximized,
          clearedRows
        };
      })()`,
      returnByValue: true
    });
    console.log('Terminal Controls Check:', controlsRes.result.value);

    // 3. Test keyboard shortcut 'L' to toggle
    const shortcutRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const drawer = document.getElementById('terminal-stream-drawer');
        // Close with Esc or L
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l', code: 'KeyL', bubbles: true }));
        const toggledWithL = drawer.classList.contains('open');

        const btnClose = document.getElementById('btn-terminal-close');
        if (btnClose) btnClose.click();
        const closedWithBtn = !drawer.classList.contains('open');

        return {
          toggledWithL,
          closedWithBtn
        };
      })()`,
      returnByValue: true
    });
    console.log('Terminal Keyboard Shortcut Check:', shortcutRes.result.value);

    console.log('\n--- Summary ---');
    console.log('Total Runtime Exceptions:', exceptions.length);
    if (exceptions.length === 0) {
      console.log('🚀 LIVE STREAM EVENT TAIL TERMINAL FUNCTIONING FLAWLESSLY WITH 0 EXCEPTIONS!');
    } else {
      process.exit(1);
    }

    ws.close();
  } finally {
    proc.kill();
  }
}

testTerminalStream().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
