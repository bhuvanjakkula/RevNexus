const fs = require('fs');
const path = require('path');

// 1. Append CSS to css/components.css
const cssPath = path.join(__dirname, '../css/components.css');
const extraCss = `
/* ==========================================================================
   Datadog-Grade Real-Time Event Stream & Terminal Drawer
   ========================================================================== */
.terminal-stream-drawer {
  position: fixed;
  bottom: 42px;
  left: 280px;
  right: 0;
  height: 280px;
  background: rgba(3, 7, 14, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(16, 185, 129, 0.4);
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  z-index: 87;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s ease;
  transform: translateY(115%);
}

.terminal-stream-drawer.open {
  transform: translateY(0);
}

.terminal-stream-drawer.maximized {
  height: 55vh;
}

@media (max-width: 1024px) {
  .terminal-stream-drawer {
    left: 0;
  }
}

.terminal-header {
  height: 38px;
  background: rgba(8, 12, 22, 0.95);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.terminal-logs-body {
  flex: 1;
  padding: 10px 16px;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.5;
  color: #94a3b8;
  background: #020408;
}

.terminal-log-row {
  display: flex;
  gap: 10px;
  align-items: baseline;
  padding: 2px 4px;
  border-radius: 2px;
  transition: background 0.1s ease;
}

.terminal-log-row:hover {
  background: rgba(255, 255, 255, 0.04);
}

.term-time { color: #64748b; font-size: 0.67rem; flex-shrink: 0; }
.term-level-info { color: #38bdf8; font-weight: 700; flex-shrink: 0; }
.term-level-warn { color: #f59e0b; font-weight: 700; flex-shrink: 0; }
.term-level-sec { color: #10b981; font-weight: 700; flex-shrink: 0; }
.term-level-auto { color: #c084fc; font-weight: 700; flex-shrink: 0; }
.term-tag { color: #94a3b8; font-weight: 600; flex-shrink: 0; }
.term-msg { color: #f1f5f9; flex: 1; word-break: break-word; }

.btn-outline-emerald {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: var(--accent-emerald);
}

.btn-outline-emerald:hover {
  background: rgba(16, 185, 129, 0.22);
  border-color: var(--accent-emerald);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
}
`;

fs.appendFileSync(cssPath, extraCss, 'utf8');
console.log('Appended terminal CSS to components.css');

// 2. Add terminal drawer and dock live stream button to index.html
const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const terminalMarkup = `      <!-- Datadog-Grade Real-Time Event Stream Terminal Drawer -->
      <div id="terminal-stream-drawer" class="terminal-stream-drawer">
        <div class="terminal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="pulse-dot-emerald"></span>
            <span style="font-family: var(--font-heading); font-size: 0.84rem; font-weight: 700; color: #fff;">LIVE REVENUE TELEMETRY STREAM</span>
            <span class="badge badge-alpha font-mono" id="term-event-count" style="font-size: 0.65rem; padding: 1px 6px;">0 events</span>
            <span style="font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-mono);">ws://localhost:3030/v1/telemetry</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <select id="terminal-filter-select" class="form-select" style="padding: 2px 8px; font-size: 0.7rem; height: 26px; width: auto; background: rgba(0,0,0,0.5);">
              <option value="ALL" selected>All Telemetry</option>
              <option value="SLA">SLA & Latency</option>
              <option value="PQC">PQC Cryptography</option>
              <option value="AUTO">Autonomous Triage</option>
              <option value="WEBHOOK">Webhooks</option>
            </select>
            <button type="button" id="btn-terminal-pause" class="btn btn-xs btn-secondary" style="height: 26px;">
              ⏸️ Pause
            </button>
            <button type="button" id="btn-terminal-clear" class="btn btn-xs btn-secondary" style="height: 26px;">
              🧹 Clear
            </button>
            <button type="button" id="btn-terminal-maximize" class="btn btn-xs btn-secondary" style="height: 26px;" title="Maximize / Restore">
              ⛶
            </button>
            <button type="button" id="btn-terminal-close" class="btn btn-xs btn-secondary" style="height: 26px;" title="Close Terminal">
              ✕
            </button>
          </div>
        </div>
        <div id="terminal-logs-body" class="terminal-logs-body">
          <!-- Log rows rendered dynamically -->
        </div>
      </div>

      <!-- Enterprise Real-Time Telemetry & Operations Dock -->`;

html = html.replace('      <!-- Enterprise Real-Time Telemetry & Operations Dock -->', terminalMarkup);

// Add button to dock right
const oldDockRight = `<button type="button" id="btn-dock-quick-remediate"`;
const newDockRight = `<button type="button" id="btn-dock-live-stream" class="btn btn-xs btn-outline-emerald" title="Open Datadog-style Live Telemetry Stream (L)">
            <span class="pulse-dot-emerald"></span> Live Stream Tail
          </button>
          <button type="button" id="btn-dock-quick-remediate"`;

html = html.replace(oldDockRight, newDockRight);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Injected Terminal Drawer into index.html');
