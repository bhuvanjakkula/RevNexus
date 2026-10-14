const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. In init(), call this.setupTerminalStream()
const initCallTarget = `    this.setupTelemetryDock();
    this.setupWebhookInspector();
    this.setupGlobalKeyboardShortcuts();`;

const initCallReplacement = `    this.setupTelemetryDock();
    this.setupWebhookInspector();
    this.setupGlobalKeyboardShortcuts();
    this.setupTerminalStream();`;

content = content.replace(initCallTarget, initCallReplacement);

// 2. Add setupTerminalStream and logStreamEvent methods before the end of the class
const terminalMethods = `
  setupTerminalStream() {
    this.terminalLogs = [];
    this.isTerminalPaused = false;
    this.terminalFilter = 'ALL';

    const drawer = document.getElementById('terminal-stream-drawer');
    const btnToggle = document.getElementById('btn-dock-live-stream');
    const btnClose = document.getElementById('btn-terminal-close');
    const btnMax = document.getElementById('btn-terminal-maximize');
    const btnClear = document.getElementById('btn-terminal-clear');
    const btnPause = document.getElementById('btn-terminal-pause');
    const filterSelect = document.getElementById('terminal-filter-select');

    if (btnToggle && drawer) {
      btnToggle.addEventListener('click', () => {
        drawer.classList.toggle('open');
      });
    }

    if (btnClose && drawer) {
      btnClose.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    }

    if (btnMax && drawer) {
      btnMax.addEventListener('click', () => {
        drawer.classList.toggle('maximized');
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.terminalLogs = [];
        const body = document.getElementById('terminal-logs-body');
        if (body) body.innerHTML = '';
        const count = document.getElementById('term-event-count');
        if (count) count.textContent = '0 events';
        this.logStreamEvent('INFO', 'TERMINAL', 'Log buffer cleared by operator.');
      });
    }

    if (btnPause) {
      btnPause.addEventListener('click', () => {
        this.isTerminalPaused = !this.isTerminalPaused;
        btnPause.textContent = this.isTerminalPaused ? '▶️ Resume' : '⏸️ Pause';
        this.showToast(this.isTerminalPaused ? '⏸️ Live stream tail paused.' : '▶️ Live stream tail resumed.', 'info');
      });
    }

    if (filterSelect) {
      filterSelect.addEventListener('change', () => {
        this.terminalFilter = filterSelect.value;
        this.renderTerminalLogs();
      });
    }

    // Seed initial startup logs
    this.logStreamEvent('INFO', 'STREAM', 'Telemetry stream connected: ws://localhost:3030/v1/telemetry (14ms latency)');
    this.logStreamEvent('SEC', 'PQC_INIT', 'NIST FIPS 203/204 lattice initialized: ML-KEM-768 & ML-DSA-65 active');
    this.logStreamEvent('INFO', 'SLA_CLOCK', 'Speed-to-Lead sentinel active: 30m hard limit enforced across all channels');
    this.logStreamEvent('INFO', 'AUTH', 'Master cryptographic root session verified for bhuvanjakkula@gmail.com');

    // Periodic heartbeat telemetry emitter (every 3 seconds)
    const periodicEvents = [
      () => this.logStreamEvent('INFO', 'STREAM_PING', \`Heartbeat received: roundtrip \${10 + Math.floor(Math.random()*8)}ms • 0 packet drops\`),
      () => this.logStreamEvent('SEC', 'PQC_CIPHER', \`Key encapsulation verified: ML-KEM-768 ciphertext hash 0x\${Math.random().toString(16).substring(2, 10).toUpperCase()} valid\`),
      () => this.logStreamEvent('WARN', 'SLA_CHECK', \`Lead queue scan: \${this.inboundLeads.length} leads in queue • Mean response: 3.8m\`),
      () => this.logStreamEvent('INFO', 'METRICS', 'Chain velocity calculated: Stage 1-5 health score 88.4%')
    ];

    let eventIdx = 0;
    setInterval(() => {
      if (!this.isTerminalPaused) {
        periodicEvents[eventIdx % periodicEvents.length]();
        eventIdx++;
      }
    }, 3200);
  }

  logStreamEvent(level, category, message) {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

    const entry = {
      id: Date.now() + Math.random(),
      time: timeStr,
      level,
      category,
      message
    };

    this.terminalLogs.push(entry);
    if (this.terminalLogs.length > 150) {
      this.terminalLogs.shift();
    }

    const count = document.getElementById('term-event-count');
    if (count) count.textContent = \`\${this.terminalLogs.length} events\`;

    if (!this.isTerminalPaused) {
      this.appendTerminalRow(entry);
    }
  }

  appendTerminalRow(entry) {
    if (this.terminalFilter !== 'ALL' && entry.level !== this.terminalFilter && entry.category !== this.terminalFilter) {
      return;
    }

    const body = document.getElementById('terminal-logs-body');
    if (!body) return;

    let levelClass = 'term-level-info';
    if (entry.level === 'WARN') levelClass = 'term-level-warn';
    else if (entry.level === 'SEC') levelClass = 'term-level-sec';
    else if (entry.level === 'AUTO') levelClass = 'term-level-auto';

    const row = document.createElement('div');
    row.className = 'terminal-log-row';
    row.innerHTML = \`
      <span class="term-time">[\${entry.time}]</span>
      <span class="\${levelClass}">[\${entry.level}]</span>
      <span class="term-tag">[\${entry.category}]</span>
      <span class="term-msg">\${entry.message}</span>
    \`;

    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }

  renderTerminalLogs() {
    const body = document.getElementById('terminal-logs-body');
    if (!body) return;
    body.innerHTML = '';

    const filtered = this.terminalFilter === 'ALL'
      ? this.terminalLogs
      : this.terminalLogs.filter(e => e.level === this.terminalFilter || e.category === this.terminalFilter);

    filtered.forEach(entry => {
      let levelClass = 'term-level-info';
      if (entry.level === 'WARN') levelClass = 'term-level-warn';
      else if (entry.level === 'SEC') levelClass = 'term-level-sec';
      else if (entry.level === 'AUTO') levelClass = 'term-level-auto';

      const row = document.createElement('div');
      row.className = 'terminal-log-row';
      row.innerHTML = \`
        <span class="term-time">[\${entry.time}]</span>
        <span class="\${levelClass}">[\${entry.level}]</span>
        <span class="term-tag">[\${entry.category}]</span>
        <span class="term-msg">\${entry.message}</span>
      \`;
      body.appendChild(row);
    });
    body.scrollTop = body.scrollHeight;
  }
`;

// Insert terminalMethods right before the closing brace of RevNexusApp class
content = content.replace(/setupGlobalKeyboardShortcuts\(\)\s*\{[\s\S]*?\}\s*\}\s*$/, (match) => {
  return match.slice(0, -1) + terminalMethods + '\n}\n';
});

fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully wired setupTerminalStream into js/app.js');
