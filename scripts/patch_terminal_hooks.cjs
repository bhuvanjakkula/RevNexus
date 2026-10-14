const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Hook in remediateNearestSlaAlert
content = content.replace(
  `this.showToast(\`⚡ SLA Breach Averted: \${worstLead.id} (\${worstLead.company}) prioritized & reassigned. Clock reset to 01:00!\`, 'success');`,
  `this.showToast(\`⚡ SLA Breach Averted: \${worstLead.id} (\${worstLead.company}) prioritized & reassigned. Clock reset to 01:00!\`, 'success');\n      if (this.logStreamEvent) this.logStreamEvent('AUTO', 'SLA_REMEDIATE', \`Lead \${worstLead.id} (\${worstLead.company}) prioritized & reassigned to Rep #1. Clock reset to 01:00\`);`
);

// 2. Hook in Webhook send ping
content = content.replace(
  `this.showToast(\`🚀 Webhook dispatched to \${destName} with HTTP 200 OK (\${latency}ms roundtrip)!\`, 'success');`,
  `this.showToast(\`🚀 Webhook dispatched to \${destName} with HTTP 200 OK (\${latency}ms roundtrip)!\`, 'success');\n        if (this.logStreamEvent) this.logStreamEvent('INFO', 'WEBHOOK', \`Payload delivered to \${destName}: HTTP 200 OK (\${latency}ms roundtrip)\`);`
);

// 3. Add shortcut 'l' or 'L' in setupGlobalKeyboardShortcuts
const shortcutTarget = `      // 'e' or 'E' exports JSON telemetry
      if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        this.exportEnterpriseTelemetryJson();
        return;
      }`;

const shortcutReplacement = `      // 'e' or 'E' exports JSON telemetry
      if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        this.exportEnterpriseTelemetryJson();
        return;
      }

      // 'l' or 'L' toggles live stream terminal drawer
      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        const drawer = document.getElementById('terminal-stream-drawer');
        if (drawer) drawer.classList.toggle('open');
        return;
      }`;

content = content.replace(shortcutTarget, shortcutReplacement);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully patched terminal hooks and L keyboard shortcut into js/app.js');
