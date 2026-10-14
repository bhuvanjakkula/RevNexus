const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Insert Telemetry Dock before </main>
const dockHtml = `      <!-- Enterprise Real-Time Telemetry & Operations Dock -->
      <footer class="telemetry-operations-dock">
        <div class="dock-left">
          <div class="telemetry-node" title="Real-time Stream Engine Pulse">
            <span class="pulse-dot-emerald"></span>
            <span class="telemetry-label">STREAM:</span>
            <span class="telemetry-val" id="dock-stream-status">ACTIVE (14ms)</span>
          </div>
          <div class="telemetry-divider"></div>
          <div class="telemetry-node" title="Speed-to-Lead Response Latency SLA">
            <span class="telemetry-label">SLA LATENCY:</span>
            <span class="telemetry-val text-emerald" id="dock-sla-status">3m 42s [COMPLIANT]</span>
          </div>
          <div class="telemetry-divider"></div>
          <div class="telemetry-node" title="NIST Post-Quantum Cryptographic Channel">
            <span class="telemetry-label">CIPHER:</span>
            <span class="telemetry-val text-cyan">ML-KEM-768 FIPS-203</span>
          </div>
          <div class="telemetry-divider"></div>
          <div class="telemetry-node" title="Operational Execution Status">
            <span class="telemetry-label">ENGINE:</span>
            <span class="telemetry-val">v4.2.0 • 0 Latency Faults</span>
          </div>
        </div>
        <div class="dock-right">
          <button type="button" id="btn-dock-quick-remediate" class="btn btn-xs btn-outline-cyan" title="Auto-remediate nearest SLA alert and reassign rep">
            ⚡ Remediate SLA Alert
          </button>
          <button type="button" id="btn-dock-test-webhook" class="btn btn-xs btn-secondary" title="Dispatch & Inspect Webhooks (Slack / HubSpot / PagerDuty)">
            📡 Webhook Inspector
          </button>
          <button type="button" id="btn-dock-export-json" class="btn btn-xs btn-secondary" title="Export Live Diagnostic JSON Snapshot">
            📥 Export JSON
          </button>
          <button type="button" id="btn-dock-shortcuts" class="btn btn-xs btn-secondary" title="View Keyboard Shortcuts (?)">
            ⌨️ Shortcuts <kbd>?</kbd>
          </button>
        </div>
      </footer>
    </main>`;

html = html.replace('    </main>', dockHtml);

// 2. Insert Webhook Inspector and Keyboard Shortcuts Modal before <div id="toast-container">
const modalsHtml = `  <!-- Enterprise Webhook Dispatch & Telemetry Station Modal -->
  <div id="modal-webhook-inspector" class="modal-backdrop">
    <div class="modal-window" style="max-width: 780px;">
      <div class="modal-header" style="border-bottom: 2px solid var(--accent-cyan); padding-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.3rem;">📡</span>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; color: #fff; margin: 0;">Enterprise Webhook Dispatch & Telemetry Inspector</h3>
            <span style="font-size: 0.76rem; color: var(--text-muted);">Real-time event streaming, HMAC-SHA256 signatures & automated incident dispatch</span>
          </div>
        </div>
        <button type="button" class="modal-close-btn" id="btn-close-webhook-modal">&times;</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
        <div class="grid-2col" style="margin-bottom: 0;">
          <div class="form-group">
            <label class="form-label">Destination Bridge</label>
            <select id="webhook-destination-select" class="form-select">
              <option value="slack">Slack (#ops-revenue-incidents)</option>
              <option value="hubspot">HubSpot CRM (Deals & Pipeline Sync)</option>
              <option value="salesforce">Salesforce REST Enterprise API</option>
              <option value="pagerduty">PagerDuty (Critical SLA Escalate)</option>
              <option value="custom">Custom Webhook Endpoint URL</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Event Trigger</label>
            <select id="webhook-event-select" class="form-select">
              <option value="sla_breach_remediated">lead.sla_breach_remediated</option>
              <option value="margin_guardrail_locked">deal.margin_guardrail_locked</option>
              <option value="chain_auto_optimized">revenue_chain.auto_optimized</option>
              <option value="pqc_key_rotated">security.pqc_lattice_key_rotated</option>
            </select>
          </div>
        </div>

        <div class="form-group" id="webhook-custom-url-group" style="display: none;">
          <label class="form-label">Custom Webhook Endpoint URL</label>
          <input type="url" id="webhook-custom-url-input" class="form-input" placeholder="https://api.yourcompany.com/webhooks/revnexus">
        </div>

        <!-- Security / HMAC Header Info -->
        <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem;">
          <div>
            <span style="color: var(--text-subtle);">Header: </span>
            <code style="color: var(--accent-cyan); font-family: var(--font-mono);">X-RevNexus-Signature-256</code>
          </div>
          <div id="webhook-hmac-display" style="font-family: var(--font-mono); color: var(--accent-emerald);">
            sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          </div>
        </div>

        <!-- Payload JSON Inspector -->
        <div class="form-group" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label class="form-label" style="margin: 0;">JSON Event Payload Telemetry</label>
            <span class="badge badge-alpha font-mono" id="webhook-payload-size">428 bytes</span>
          </div>
          <textarea id="webhook-payload-preview" class="form-textarea" rows="7" style="font-family: var(--font-mono); font-size: 0.78rem; background: rgba(2,4,8,0.85); color: #38bdf8;"></textarea>
        </div>

        <!-- Dispatch Status Stream Display -->
        <div id="webhook-dispatch-response" style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: var(--radius-xs); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.76rem;">
          <div>
            <span style="color: var(--text-subtle);">Response: </span>
            <strong class="text-emerald" id="webhook-status-code">HTTP 200 OK</strong>
            <span style="color: var(--text-muted); margin-left: 8px;" id="webhook-latency-time">• Latency: 78ms</span>
          </div>
          <span class="badge badge-emerald" id="webhook-delivery-badge">Delivered & Acknowledged</span>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 4px;">
          <button type="button" id="btn-webhook-copy-payload" class="btn btn-secondary" style="font-size: 0.78rem;">
            📋 Copy JSON
          </button>
          <button type="button" id="btn-webhook-copy-curl" class="btn btn-secondary" style="font-size: 0.78rem;">
            🔗 Copy cURL
          </button>
          <button type="button" id="btn-webhook-send-ping" class="btn btn-primary" style="font-size: 0.78rem; font-weight: 700;">
            🚀 Dispatch Real-Time Webhook
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Google / Linear Style Keyboard Shortcuts Modal -->
  <div id="modal-shortcuts-sheet" class="modal-backdrop">
    <div class="modal-window" style="max-width: 620px;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.2rem;">⌨️</span>
          <h3 style="font-family: var(--font-heading); font-size: 1.15rem; color: #fff; margin: 0;">Keyboard Shortcuts & Quick Actions</h3>
        </div>
        <button type="button" class="modal-close-btn" id="btn-close-shortcuts-modal">&times;</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
        <span class="nav-section-title" style="padding: 0;">Navigation & Command</span>
        <div class="shortcut-grid">
          <div class="shortcut-item"><span>Omni-Command Palette</span><kbd>Ctrl + K</kbd></div>
          <div class="shortcut-item"><span>Executive Console</span><kbd>1</kbd></div>
          <div class="shortcut-item"><span>Customer Evidence Lab</span><kbd>2</kbd></div>
          <div class="shortcut-item"><span>Executive Copilot</span><kbd>3</kbd></div>
          <div class="shortcut-item"><span>Diagnostic Simulator</span><kbd>4</kbd></div>
          <div class="shortcut-item"><span>Global Omnichannel</span><kbd>5</kbd></div>
          <div class="shortcut-item"><span>Attribution & SLA Clock</span><kbd>6</kbd></div>
          <div class="shortcut-item"><span>Lost Deal Root Cause</span><kbd>7</kbd></div>
          <div class="shortcut-item"><span>32 Industry Battlecards</span><kbd>8</kbd></div>
          <div class="shortcut-item"><span>PQC Quantum Fortress</span><kbd>9</kbd></div>
        </div>

        <span class="nav-section-title" style="padding: 0; margin-top: 6px;">Operational Actions</span>
        <div class="shortcut-grid">
          <div class="shortcut-item"><span>Run Live Simulation Toggle</span><kbd>S</kbd></div>
          <div class="shortcut-item"><span>Auto-Remediate Next SLA</span><kbd>R</kbd></div>
          <div class="shortcut-item"><span>Open Webhook Inspector</span><kbd>W</kbd></div>
          <div class="shortcut-item"><span>Export JSON Telemetry</span><kbd>E</kbd></div>
          <div class="shortcut-item"><span>Toggle Shortcuts Cheat Sheet</span><kbd>?</kbd></div>
          <div class="shortcut-item"><span>Dismiss Any Active Modal</span><kbd>Esc</kbd></div>
        </div>
      </div>
    </div>
  </div>

  <div id="toast-container">`;

html = html.replace('  <div id="toast-container">', modalsHtml);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully injected Telemetry Dock, Webhook Inspector, and Shortcuts Modal into index.html');
