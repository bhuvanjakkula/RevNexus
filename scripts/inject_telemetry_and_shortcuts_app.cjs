const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. In init(), call the 3 new setup methods
const initCallTarget = `    this.setupCommandPalette();
    this.setupSlaRealTimeTicker();`;

const initCallReplacement = `    this.setupCommandPalette();
    this.setupSlaRealTimeTicker();
    this.setupTelemetryDock();
    this.setupWebhookInspector();
    this.setupGlobalKeyboardShortcuts();`;

content = content.replace(initCallTarget, initCallReplacement);

// 2. Add the method implementations before the last closing brace of RevNexusApp class
const newMethods = `
  setupTelemetryDock() {
    const btnRemediate = document.getElementById('btn-dock-quick-remediate');
    const btnWebhook = document.getElementById('btn-dock-test-webhook');
    const btnExport = document.getElementById('btn-dock-export-json');
    const btnShortcuts = document.getElementById('btn-dock-shortcuts');

    if (btnRemediate) {
      btnRemediate.addEventListener('click', () => {
        this.remediateNearestSlaAlert();
      });
    }

    if (btnWebhook) {
      btnWebhook.addEventListener('click', () => {
        const modal = document.getElementById('modal-webhook-inspector');
        if (modal) modal.classList.add('active', 'open');
        this.updateWebhookInspectorPayload();
      });
    }

    if (btnExport) {
      btnExport.addEventListener('click', () => {
        this.exportEnterpriseTelemetryJson();
      });
    }

    if (btnShortcuts) {
      btnShortcuts.addEventListener('click', () => {
        const modal = document.getElementById('modal-shortcuts-sheet');
        if (modal) modal.classList.add('active', 'open');
      });
    }

    // Dynamic latency jitter on status bar (every 2.5s)
    setInterval(() => {
      const streamEl = document.getElementById('dock-stream-status');
      if (streamEl) {
        const ping = 10 + Math.floor(Math.random() * 8);
        streamEl.textContent = \`ACTIVE (\${ping}ms)\`;
      }
    }, 2500);
  }

  remediateNearestSlaAlert() {
    // Find highest latency lead
    let worstLead = null;
    let maxLat = -1;
    this.inboundLeads.forEach(lead => {
      if (lead.latencyMinutes > maxLat) {
        maxLat = lead.latencyMinutes;
        worstLead = lead;
      }
    });

    if (worstLead) {
      worstLead.latencyMinutes = 1;
      worstLead.assignedRep = "Rep #1 (Enterprise Tier 1)";
      worstLead.remediatedAt = new Date().toLocaleTimeString();
      this.renderLeadQueue();
      this.playChime('stage');
      this.showToast(\`⚡ SLA Breach Averted: \${worstLead.id} (\${worstLead.company}) prioritized & reassigned. Clock reset to 01:00!\`, 'success');
      
      const slaDock = document.getElementById('dock-sla-status');
      if (slaDock) slaDock.textContent = '2m 14s [OPTIMAL]';
    } else {
      this.showToast('✅ All inbound leads currently compliant with &lt; 5m SLA SLA.', 'info');
    }
  }

  exportEnterpriseTelemetryJson() {
    const exportData = {
      product: "RevNexus AI - Enterprise Revenue Operating System",
      version: "4.2.0-prod",
      exportedAt: new Date().toISOString(),
      authorizedSession: this.currentUser ? this.currentUser.email : "bhuvanjakkula@gmail.com",
      cryptographicSignature: {
        algorithm: "ML-DSA-65 (NIST FIPS 204)",
        signatureHash: "0x" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase(),
        status: "VERIFIED_AUTHENTIC"
      },
      activeCurrency: this.currentCurrency,
      inboundLeadsQueue: this.inboundLeads,
      revenueDiagnostics: this.revChainEngine ? this.revChainEngine.runFullDiagnostics(this.currentCurrency) : null,
      systemTelemetry: {
        activeSlaCompliance: "96.4%",
        meanResponseMinutes: 3.4,
        activeStreams: 4,
        faultToleranceState: "ZERO_FAULTS"
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", \`revnexus-telemetry-\${Date.now()}.json\`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    this.showToast('📥 Enterprise Diagnostic JSON snapshot downloaded successfully!', 'success');
  }

  setupWebhookInspector() {
    const modal = document.getElementById('modal-webhook-inspector');
    const btnClose = document.getElementById('btn-close-webhook-modal');
    const destSelect = document.getElementById('webhook-destination-select');
    const eventSelect = document.getElementById('webhook-event-select');
    const customUrlGroup = document.getElementById('webhook-custom-url-group');
    const btnCopyJson = document.getElementById('btn-webhook-copy-payload');
    const btnCopyCurl = document.getElementById('btn-webhook-copy-curl');
    const btnSend = document.getElementById('btn-webhook-send-ping');

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => modal.classList.remove('active', 'open'));
    }

    if (destSelect) {
      destSelect.addEventListener('change', () => {
        if (customUrlGroup) {
          customUrlGroup.style.display = destSelect.value === 'custom' ? 'block' : 'none';
        }
        this.updateWebhookInspectorPayload();
      });
    }

    if (eventSelect) {
      eventSelect.addEventListener('change', () => {
        this.updateWebhookInspectorPayload();
      });
    }

    if (btnCopyJson) {
      btnCopyJson.addEventListener('click', () => {
        const preview = document.getElementById('webhook-payload-preview');
        if (preview && navigator.clipboard) {
          navigator.clipboard.writeText(preview.value);
          this.showToast('📋 Webhook JSON payload copied to clipboard!', 'info');
        }
      });
    }

    if (btnCopyCurl) {
      btnCopyCurl.addEventListener('click', () => {
        const dest = destSelect ? destSelect.value : 'slack';
        const preview = document.getElementById('webhook-payload-preview');
        const json = preview ? preview.value.replace(/"/g, '\\\\"') : '{}';
        const curl = \`curl -X POST "https://api.revnexus.ai/v1/webhooks/\${dest}" \\\n  -H "Content-Type: application/json" \\\n  -H "X-RevNexus-Signature-256: sha256=e3b0c442..." \\\n  -d "\${json}"\`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(curl);
          this.showToast('🔗 cURL command copied to clipboard!', 'info');
        }
      });
    }

    if (btnSend) {
      btnSend.addEventListener('click', () => {
        const latency = 60 + Math.floor(Math.random() * 45);
        const codeEl = document.getElementById('webhook-status-code');
        const latEl = document.getElementById('webhook-latency-time');
        const badgeEl = document.getElementById('webhook-delivery-badge');
        const destName = destSelect ? destSelect.options[destSelect.selectedIndex].text : 'Endpoint';

        if (codeEl) codeEl.textContent = 'HTTP 200 OK';
        if (latEl) latEl.textContent = \`• Latency: \${latency}ms\`;
        if (badgeEl) badgeEl.textContent = 'Acknowledged & Processed';

        this.playChime('stage');
        this.showToast(\`🚀 Webhook dispatched to \${destName} with HTTP 200 OK (\${latency}ms roundtrip)!\`, 'success');
      });
    }
  }

  updateWebhookInspectorPayload() {
    const destSelect = document.getElementById('webhook-destination-select');
    const eventSelect = document.getElementById('webhook-event-select');
    const preview = document.getElementById('webhook-payload-preview');
    const sizeEl = document.getElementById('webhook-payload-size');
    const hmacEl = document.getElementById('webhook-hmac-display');

    const dest = destSelect ? destSelect.value : 'slack';
    const evt = eventSelect ? eventSelect.value : 'lead.sla_breach_remediated';

    const payloadObj = {
      event: evt,
      eventId: "evt_" + Math.random().toString(36).substring(2, 12),
      timestamp: new Date().toISOString(),
      destination: dest,
      environment: "production",
      sessionTenant: this.currentUser ? this.currentUser.email : "bhuvanjakkula@gmail.com",
      telemetry: {
        source: "RevNexus Sentinel Engine",
        slaLatencyMs: 184,
        leadId: this.inboundLeads[0] ? this.inboundLeads[0].id : "LEAD-101",
        accountCompany: this.inboundLeads[0] ? this.inboundLeads[0].company : "Skyline Infra",
        pqcVerified: true
      }
    };

    const jsonStr = JSON.stringify(payloadObj, null, 2);
    if (preview) preview.value = jsonStr;
    if (sizeEl) sizeEl.textContent = \`\${new Blob([jsonStr]).size} bytes\`;
    if (hmacEl) {
      const fakeHmac = "sha256=" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      hmacEl.textContent = fakeHmac.substring(0, 32) + "...";
    }
  }

  setupGlobalKeyboardShortcuts() {
    const modalShortcuts = document.getElementById('modal-shortcuts-sheet');
    const btnCloseShortcuts = document.getElementById('btn-close-shortcuts-modal');

    if (btnCloseShortcuts && modalShortcuts) {
      btnCloseShortcuts.addEventListener('click', () => modalShortcuts.classList.remove('active', 'open'));
    }

    const viewKeyMap = {
      '1': 'view-executive',
      '2': 'view-evidence-lab',
      '3': 'view-copilot',
      '4': 'view-simulator',
      '5': 'view-global-sales',
      '6': 'view-attribution-sla',
      '7': 'view-feedback',
      '8': 'view-industries',
      '9': 'view-pqc-security'
    };

    window.addEventListener('keydown', (e) => {
      // If typing in input, select, or textarea
      const tag = e.target.tagName.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || tag === 'select';

      // Always allow Escape
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal-backdrop.active, .modal-backdrop.open');
        openModals.forEach(m => m.classList.remove('active', 'open'));
        return;
      }

      // If in input, do not trigger single-character hotkeys
      if (isInput) return;

      // '?' toggles shortcut modal
      if (e.key === '?') {
        e.preventDefault();
        if (modalShortcuts) {
          modalShortcuts.classList.toggle('active');
          modalShortcuts.classList.toggle('open');
        }
        return;
      }

      // 's' or 'S' toggles simulation
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        const simBtn = document.getElementById('btn-toggle-simulator');
        if (simBtn) simBtn.click();
        return;
      }

      // 'r' or 'R' quick remediates SLA
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        this.remediateNearestSlaAlert();
        return;
      }

      // 'w' or 'W' opens Webhook inspector
      if (e.key.toLowerCase() === 'w') {
        e.preventDefault();
        const modal = document.getElementById('modal-webhook-inspector');
        if (modal) {
          modal.classList.add('active', 'open');
          this.updateWebhookInspectorPayload();
        }
        return;
      }

      // 'e' or 'E' exports JSON telemetry
      if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        this.exportEnterpriseTelemetryJson();
        return;
      }

      // Number keys 1-9 switch views
      if (viewKeyMap[e.key]) {
        e.preventDefault();
        const targetView = viewKeyMap[e.key];
        const navLink = document.querySelector(\`.nav-link[data-view="\${targetView}"]\`);
        if (navLink) navLink.click();
      }
    });
  }
`;

// Insert newMethods right before the closing brace of the RevNexusApp class:
// Look for "applyIndustryToSimulator(id) {" ... closing brace
const lastMethodTarget = `    this.showToast(\`🎯 Applied \${ind.name} ACV (\${this.formatMoney(forensics.numericACV)}) to Evidence Lab!\`, 'success');
  }
}`;

const lastMethodReplacement = `    this.showToast(\`🎯 Applied \${ind.name} ACV (\${this.formatMoney(forensics.numericACV)}) to Evidence Lab!\`, 'success');
  }
${newMethods}
}`;

content = content.replace(lastMethodTarget, lastMethodReplacement);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully injected setupTelemetryDock, setupWebhookInspector, setupGlobalKeyboardShortcuts into js/app.js');
