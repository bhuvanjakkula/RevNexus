const fs = require('fs');
const path = require('path');

// 1. Add Portal Layer CSS to css/components.css
const cssPath = path.join(__dirname, '../css/components.css');
const portalCss = `
/* ==========================================================================
   First Web Page Layer: Enterprise Gateway & Authentication Portal
   ========================================================================== */
#portal-gateway-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #030712;
  background-image: 
    radial-gradient(circle at 15% 20%, rgba(6, 182, 212, 0.18) 0%, transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%);
  z-index: 999;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transition: opacity 0.35s ease, visibility 0.35s ease, transform 0.35s ease;
}

#portal-gateway-layer.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: scale(0.98);
}

.portal-nav {
  height: 72px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(4, 8, 16, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 10;
}

@media (max-width: 768px) {
  .portal-nav {
    padding: 0 16px;
  }
}

.portal-brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.portal-main-container {
  flex: 1;
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 24px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
}

@media (max-width: 1024px) {
  .portal-main-container {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 24px 16px;
  }
}

/* Left Column: Innovations Showcase */
.portal-innovations-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.portal-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(6, 182, 212, 0.12);
  border: 1px solid var(--accent-cyan);
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-cyan);
  width: fit-content;
}

.portal-hero-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.18;
  letter-spacing: -0.02em;
}

@media (max-width: 768px) {
  .portal-hero-title {
    font-size: 1.85rem;
  }
}

.portal-hero-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.55;
  max-width: 620px;
}

.portal-innovation-card {
  background: rgba(10, 15, 26, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: 14px 18px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  transition: all var(--transition-fast);
}

.portal-innovation-card:hover {
  border-color: rgba(6, 182, 212, 0.4);
  background: rgba(14, 22, 38, 0.85);
  transform: translateX(4px);
}

.portal-card-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.05);
}

.portal-card-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 3px;
}

.portal-card-desc {
  font-size: 0.78rem;
  color: #94a3b8;
  line-height: 1.45;
}

/* Customer Support & Enquiries Card */
.portal-support-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.08));
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  box-shadow: 0 0 25px rgba(16, 185, 129, 0.15);
}

.portal-support-email {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent-emerald);
  text-decoration: none;
}

.portal-support-email:hover {
  text-decoration: underline;
}

/* Right Column: Beautiful Sign In / Sign Up Form */
.portal-form-card {
  background: rgba(8, 12, 22, 0.9);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: var(--radius-md);
  padding: 34px 32px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.15);
}

.portal-form-tabs {
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xs);
  padding: 4px;
  margin-bottom: 22px;
}

.portal-tab-btn {
  flex: 1;
  padding: 9px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.portal-tab-btn.active {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2));
  color: #fff;
  border: 1px solid rgba(6, 182, 212, 0.4);
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.2);
}

.portal-phone-wrap {
  display: flex;
  gap: 8px;
}

.portal-phone-wrap select {
  width: 95px;
  flex-shrink: 0;
  font-size: 0.82rem;
  padding: 8px;
}

.portal-phone-wrap input {
  flex: 1;
}

.portal-footer-hint {
  text-align: center;
  font-size: 0.74rem;
  color: var(--text-subtle);
  margin-top: 14px;
  line-height: 1.45;
}
`;

fs.appendFileSync(cssPath, portalCss, 'utf8');
console.log('Appended portal gateway CSS to components.css');

// 2. Insert #portal-gateway-layer into index.html
const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const gatewayMarkup = `  <!-- ===================================================================
       FIRST WEB PAGE LAYER: ENTERPRISE GATEWAY & AUTHENTICATION PORTAL
       =================================================================== -->
  <div id="portal-gateway-layer">
    <!-- Portal Navigation Bar -->
    <header class="portal-nav">
      <div class="portal-brand-block">
        <div class="brand-logo-badge" style="width: 38px; height: 38px;">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div>
          <h1 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #fff; margin: 0;">RevNexus AI</h1>
          <span style="font-size: 0.68rem; color: var(--accent-cyan); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Enterprise Revenue Operating System</span>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 14px;">
        <a href="mailto:bjtmusic12@gmail.com" class="btn btn-sm btn-secondary" style="display: flex; align-items: center; gap: 6px; font-size: 0.76rem; border-color: rgba(16,185,129,0.3); color: var(--accent-emerald);">
          <span>💬 Support: bjtmusic12@gmail.com</span>
        </a>
        <button type="button" id="btn-portal-skip-to-dashboard" class="btn btn-sm btn-primary" style="display: flex; align-items: center; gap: 6px; font-weight: 700; padding: 7px 16px;">
          <span>Enter Live Console</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </header>

    <!-- Main Two-Column Gateway Content -->
    <main class="portal-main-container">
      
      <!-- Left Column: New Innovations & Support -->
      <section class="portal-innovations-col">
        <div class="portal-hero-badge">
          <span>⚡</span>
          <span>2026 Breakthrough Enterprise Architecture</span>
        </div>

        <h2 class="portal-hero-title">
          Autonomous Revenue Operations Powered by Real-Time Telemetry & Post-Quantum AI
        </h2>

        <p class="portal-hero-desc">
          Eliminate the 70% inbound lead drop-off, optimize the unified 5-stage revenue chain, defend operating margins with automated guardrails, and secure pipeline data with NIST Post-Quantum Cryptography.
        </p>

        <!-- 5 Innovation Feature Tiles -->
        <div style="display: flex; flex-direction: column; gap: 10px; margin: 8px 0;">
          <div class="portal-innovation-card">
            <div class="portal-card-icon" style="background: rgba(244,63,94,0.12); color: var(--accent-rose);">⚡</div>
            <div>
              <div class="portal-card-title">Sub-5m Speed-to-Lead SLA Sentinel</div>
              <div class="portal-card-desc">Real-time response clock with automated triage stops the 70% lead qualification decay before inquiries go cold.</div>
            </div>
          </div>

          <div class="portal-innovation-card">
            <div class="portal-card-icon" style="background: rgba(6,182,212,0.12); color: var(--accent-cyan);">🔗</div>
            <div>
              <div class="portal-card-title">Unified 5-Stage Closed-Loop Revenue Chain</div>
              <div class="portal-card-desc">Continuous mathematical optimization across Account ICP, Acquisition CAC, Speed-to-Lead, Margin Defense, and Net Retention.</div>
            </div>
          </div>

          <div class="portal-innovation-card">
            <div class="portal-card-icon" style="background: rgba(16,185,129,0.12); color: var(--accent-emerald);">🛡️</div>
            <div>
              <div class="portal-card-title">NIST FIPS 203 & 204 Post-Quantum Cryptography</div>
              <div class="portal-card-desc">Lattice-based ML-KEM-768 key encapsulation & ML-DSA-65 digital signatures guarantee enterprise immunity from quantum decryption.</div>
            </div>
          </div>

          <div class="portal-innovation-card">
            <div class="portal-card-icon" style="background: rgba(168,85,247,0.12); color: var(--accent-purple);">📡</div>
            <div>
              <div class="portal-card-title">Datadog-Grade Live Stream Telemetry & Webhooks</div>
              <div class="portal-card-desc">Real-time microsecond event tail with automated HMAC-SHA256 incident dispatch into Slack, HubSpot, Salesforce, and PagerDuty.</div>
            </div>
          </div>

          <div class="portal-innovation-card">
            <div class="portal-card-icon" style="background: rgba(234,179,8,0.12); color: var(--accent-amber);">🎁</div>
            <div>
              <div class="portal-card-title">3 Months 100% Free Trial on All Customer Plans</div>
              <div class="portal-card-desc">Zero upfront commitment on Growth ($499/mo), Enterprise ($1,499/mo), and Mission-Critical ($3,999/mo) with instant Stripe checkout.</div>
            </div>
          </div>
        </div>

        <!-- Dedicated Enquiries and Support Card -->
        <div class="portal-support-card">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(16,185,129,0.2); border: 1px solid var(--accent-emerald); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              💬
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Customer Enquiries & Enterprise Support</div>
              <a href="mailto:bjtmusic12@gmail.com" class="portal-support-email" id="portal-support-mailto-link">bjtmusic12@gmail.com</a>
            </div>
          </div>
          <a href="mailto:bjtmusic12@gmail.com?subject=RevNexus%20AI%20Customer%20Enquiry%20%26%20Support" class="btn btn-sm btn-primary" style="background: var(--accent-emerald); font-weight: 700; padding: 8px 16px;">
            ✉️ Contact Support
          </a>
        </div>
      </section>

      <!-- Right Column: Sign In & Sign Up Form Layer -->
      <section class="portal-form-wrapper">
        <div class="portal-form-card">
          
          <div style="margin-bottom: 20px; text-align: center;">
            <h3 style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; color: #fff; margin: 0 0 6px;" id="gateway-heading-title">
              Sign In to RevNexus AI
            </h3>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;" id="gateway-heading-subtitle">
              Enter your executive credentials to access your autonomous revenue workspace
            </p>
          </div>

          <!-- Sign In / Sign Up Mode Toggle -->
          <div class="portal-form-tabs">
            <button type="button" id="tab-gateway-signin" class="portal-tab-btn active">Sign In</button>
            <button type="button" id="tab-gateway-signup" class="portal-tab-btn">Sign Up (3 Mo Free)</button>
          </div>

          <!-- Gateway Form -->
          <form id="portal-auth-form" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 14px;">
            
            <!-- Full Name (Only visible on Sign Up) -->
            <div class="form-group" id="gateway-group-name" style="display: none;">
              <label class="form-label">Full Name / Organization</label>
              <input type="text" id="gateway-input-name" class="form-input" placeholder="Vikram Malhotra / Enterprise Corp">
            </div>

            <!-- Email ID (Required) -->
            <div class="form-group">
              <label class="form-label">Work / Personal Email ID</label>
              <input type="email" id="gateway-input-email" class="form-input" placeholder="bhuvanjakkula@gmail.com" value="bhuvanjakkula@gmail.com" required autocomplete="email">
              <span class="field-hint" id="gateway-email-hint" style="color: var(--accent-emerald); font-size: 0.72rem;">Authorized executive email pre-loaded.</span>
            </div>

            <!-- Password / Passkey (Required) -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label class="form-label" style="margin: 0;">Password / Passkey</label>
                <button type="button" id="btn-gateway-toggle-pass" style="background: none; border: none; font-size: 0.72rem; color: var(--accent-cyan); cursor: pointer;">Show</button>
              </div>
              <input type="password" id="gateway-input-password" class="form-input" placeholder="••••••••••••" value="QuantumSecure2026!" required autocomplete="current-password">
              <span class="field-hint" id="gateway-pass-hint" style="font-size: 0.72rem; color: var(--text-muted);">Passkey bypassed for authorized master executive.</span>
            </div>

            <!-- Mobile Phone Number with Country Code (Required) -->
            <div class="form-group">
              <label class="form-label">Mobile Phone Number</label>
              <div class="portal-phone-wrap">
                <select id="gateway-select-country" class="form-select">
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+91" selected>🇮🇳 +91</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+81">🇯🇵 +81</option>
                </select>
                <input type="tel" id="gateway-input-mobile" class="form-input" placeholder="98201 44521" value="98201 44521" required autocomplete="tel">
              </div>
              <span class="field-hint" style="font-size: 0.7rem; color: var(--text-subtle);">Used for instant 2FA and WhatsApp Speed-to-Lead alert routing.</span>
            </div>

            <!-- Submit Action Button -->
            <button type="submit" id="btn-gateway-submit" class="btn btn-primary" style="width: 100%; padding: 13px; font-weight: 800; font-size: 0.92rem; margin-top: 6px; box-shadow: 0 0 20px rgba(16,185,129,0.3);">
              🔒 Access Executive Console
            </button>

            <!-- Instant Master Clearance Button -->
            <button type="button" id="btn-gateway-master-clearance" class="btn btn-secondary" style="width: 100%; padding: 10px; font-size: 0.8rem; border: 1px solid var(--accent-emerald); color: var(--accent-emerald); background: rgba(16,185,129,0.06);">
              ⚡ Instant Master Clearance (bhuvanjakkula@gmail.com)
            </button>

            <div class="portal-footer-hint">
              Customer Support & SLA Assistance: <strong style="color: var(--accent-emerald);">bjtmusic12@gmail.com</strong><br>
              Protected by NIST FIPS 203 Post-Quantum Cryptographic Protocols
            </div>
          </form>

        </div>
      </section>

    </main>
  </div>
`;

// Insert gatewayMarkup right after <body>
html = html.replace('<body>\n  <div id="app-root">', '<body>\n' + gatewayMarkup + '\n  <div id="app-root">');

// Also add a "🌐 Landing Portal" button in the top header of index.html
const headerRightTarget = `<button type="button" id="btn-header-pricing" class="btn btn-sm btn-secondary"`;
const headerRightWithPortal = `<button type="button" id="btn-header-portal-toggle" class="btn btn-sm btn-secondary" style="display: flex; align-items: center; gap: 6px; font-weight: 700; padding: 6px 12px; border: 1px solid rgba(56,189,248,0.4); color: var(--accent-cyan); background: rgba(56,189,248,0.08);" title="View First Web Page Layer (Innovations & Support)">
            🌐 Portal Gateway
          </button>
          <button type="button" id="btn-header-pricing" class="btn btn-sm btn-secondary"`;

html = html.replace(headerRightTarget, headerRightWithPortal);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully injected First Web Page Layer (#portal-gateway-layer) into index.html');
