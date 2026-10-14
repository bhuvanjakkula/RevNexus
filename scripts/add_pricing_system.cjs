const fs = require('fs');
const path = require('path');

// 1. Add Pricing CSS to css/components.css
const cssPath = path.join(__dirname, '../css/components.css');
const pricingCss = `
/* ==========================================================================
   Enterprise Pricing & Stripe Checkout Cards
   ========================================================================== */
.pricing-hero {
  text-align: center;
  margin-bottom: 32px;
}

.pricing-trial-banner {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(6, 182, 212, 0.18));
  border: 1px solid var(--accent-emerald);
  padding: 10px 22px;
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  box-shadow: 0 0 25px rgba(16, 185, 129, 0.3);
  animation: pulse-ring 3s infinite ease-out;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}

.pricing-card {
  background: rgba(10, 15, 26, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  padding: 30px 26px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all var(--transition-normal);
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
}

.pricing-card.featured {
  border: 2px solid var(--accent-emerald);
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%, rgba(10, 15, 26, 0.95) 50%);
  box-shadow: 0 0 35px rgba(16, 185, 129, 0.25);
}

.pricing-card.pqc-tier {
  border: 1px solid rgba(129, 140, 248, 0.4);
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.08) 0%, rgba(10, 15, 26, 0.95) 60%);
}

.pricing-badge-popular {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan));
  color: #040710;
  font-weight: 800;
  font-size: 0.7rem;
  padding: 4px 14px;
  border-radius: 9999px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
}

.pricing-badge-pqc {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-weight: 800;
  font-size: 0.7rem;
  padding: 4px 14px;
  border-radius: 9999px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pricing-tier-name {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;
}

.pricing-tier-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  min-height: 40px;
  line-height: 1.45;
}

.pricing-amount-block {
  margin: 20px 0 16px;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.pricing-currency {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-main);
}

.pricing-number {
  font-family: var(--font-heading);
  font-size: 2.75rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}

.pricing-period {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.pricing-trial-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: var(--accent-emerald);
  padding: 4px 10px;
  border-radius: var(--radius-xs);
  font-size: 0.74rem;
  font-weight: 700;
  margin-bottom: 22px;
}

.pricing-features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 26px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pricing-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.8rem;
  color: #cbd5e1;
  line-height: 1.4;
}

.pricing-feature-item svg {
  width: 16px;
  height: 16px;
  stroke: var(--accent-emerald);
  flex-shrink: 0;
  margin-top: 2px;
}

.pricing-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 800;
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.pricing-trust-bar {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.78rem;
  color: var(--text-muted);
}
`;

fs.appendFileSync(cssPath, pricingCss, 'utf8');
console.log('Appended pricing CSS to components.css');

// 2. Add Navigation Link and Header Button in index.html
const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Sidebar link: add after Lost Deal Root Cause Analyzer
const sidebarTarget = `        <a class="nav-link" data-view="view-feedback">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Lost Deal Root Cause Analyzer
        </a>`;

const sidebarPricing = `        <a class="nav-link" data-view="view-feedback">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Lost Deal Root Cause Analyzer
        </a>

        <span class="nav-section-title">Commercial & Billing</span>
        <a class="nav-link" data-view="view-pricing" id="nav-link-pricing">
          <svg viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          Plans & Pricing (USD)
          <span class="nav-pill-badge" style="background: rgba(16,185,129,0.25); color: var(--accent-emerald); font-weight: 800;">3 Mo Free</span>
        </a>`;

html = html.replace(sidebarTarget, sidebarPricing);

// Top header: Add "💳 Pricing & Plans" button next to "Customer Evidence Lab"
const headerBtnTarget = `<button type="button" id="btn-header-launch-evidence-lab" class="btn btn-sm btn-primary" style="display: flex; align-items: center; gap: 6px; font-weight: 700; padding: 6px 14px; box-shadow: 0 0 15px rgba(16,185,129,0.35);">
            🧪 Customer Evidence Lab
          </button>`;

const headerBtnPricing = `<button type="button" id="btn-header-launch-evidence-lab" class="btn btn-sm btn-primary" style="display: flex; align-items: center; gap: 6px; font-weight: 700; padding: 6px 14px; box-shadow: 0 0 15px rgba(16,185,129,0.35);">
            🧪 Customer Evidence Lab
          </button>
          <button type="button" id="btn-header-pricing" class="btn btn-sm btn-secondary" style="display: flex; align-items: center; gap: 6px; font-weight: 700; padding: 6px 14px; border: 1px solid var(--accent-emerald); color: var(--accent-emerald); background: rgba(16,185,129,0.08);" title="View Enterprise Plans with 3 Months Free Trial">
            💳 Plans (3 Mo Free)
          </button>`;

html = html.replace(headerBtnTarget, headerBtnPricing);

// 3. Add VIEW 16: VIEW-PRICING right before </main>
const viewPricingSection = `
        <!-- ===================================================================
             VIEW 16: ENTERPRISE PRICING & STRIPE CHECKOUT
             =================================================================== -->
        <section id="view-pricing" class="view-panel">
          <div class="pricing-hero">
            <div class="pricing-trial-banner">
              <span>🎉 Limited Enterprise Offer:</span>
              <span>All Plans Include 3 Months 100% Free Trial • Zero Commitment</span>
            </div>
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
              Enterprise Revenue Operating System Plans
            </h2>
            <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 650px; margin: 0 auto;">
              Predictable, value-backed pricing billed monthly in USD. Reclaim lost pipeline and defend operating margins with verified 60-day payback.
            </p>
          </div>

          <!-- 3-Tier Stripe Checkout Grid -->
          <div class="pricing-grid">

            <!-- TIER 1: Growth & Scale -->
            <div class="pricing-card">
              <h3 class="pricing-tier-name">Growth & Scale</h3>
              <p class="pricing-tier-desc">For fast-growing B2B teams and high-velocity sales pods (up to 10 reps) eliminating lead decay.</p>
              
              <div class="pricing-amount-block">
                <span class="pricing-currency">$</span>
                <span class="pricing-number">499</span>
                <span class="pricing-period">/ month (USD)</span>
              </div>

              <div class="pricing-trial-pill">
                <span>🎁 3 Months Free Trial Included ($0 today)</span>
              </div>

              <ul class="pricing-features-list">
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Up to 1,500 Inbound Leads / mo</strong> with instant qualification</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>5-Stage Revenue Chain Diagnostics</strong> & real-time optimization</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Speed-to-Lead SLA Sentinel</strong> with sub-5m alerts</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Customer Evidence Lab:</strong> CRM CSV Ingestion (1,000 rows)</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>32-Industry Battlecards</strong> & WhatsApp outbox generator</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Omni-Command K Console</strong> & keyboard power actions</span>
                </li>
              </ul>

              <a href="https://buy.stripe.com/test_28E00b3aHcGNbZDe0DcjS0m" target="_blank" rel="noopener noreferrer" class="pricing-cta-btn btn btn-primary" style="background: rgba(6,182,212,0.15); border: 1px solid var(--accent-cyan); color: #fff;">
                <span>🚀 Start 3-Month Free Trial</span>
                <span style="font-size: 0.75rem; opacity: 0.85;">($499/mo)</span>
              </a>
            </div>

            <!-- TIER 2: Enterprise Autonomous (FEATURED) -->
            <div class="pricing-card featured">
              <span class="pricing-badge-popular">MOST POPULAR • BEST ROI</span>
              <h3 class="pricing-tier-name" style="color: var(--accent-emerald);">Enterprise Autonomous</h3>
              <p class="pricing-tier-desc">For mid-market and enterprise revenue operations (up to 35 reps) needing autonomous SLA remediation.</p>
              
              <div class="pricing-amount-block">
                <span class="pricing-currency">$</span>
                <span class="pricing-number text-emerald">1,499</span>
                <span class="pricing-period">/ month (USD)</span>
              </div>

              <div class="pricing-trial-pill" style="background: rgba(16,185,129,0.18); border-color: var(--accent-emerald);">
                <span>🎁 3 Months Free Trial Included ($0 today)</span>
              </div>

              <ul class="pricing-features-list">
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Everything in Growth & Scale, plus:</strong></span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Up to 15,000 Inbound Leads / mo</strong> with auto-dispatch</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Autonomous Auto-Pilot Triage:</strong> zero human delay reassignment</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Live Telemetry Stream Tail:</strong> Datadog-grade microsecond logs</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Enterprise Webhook Dispatcher:</strong> Slack, HubSpot, Salesforce, PagerDuty</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Margin Defense Engine</strong> & AI Voice objection synthesizer</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Guaranteed 60-Day Payback SLA:</strong> 100% platform credit back</span>
                </li>
              </ul>

              <a href="https://buy.stripe.com/test_9B628jcLh0Y58NrbSvcjS0n" target="_blank" rel="noopener noreferrer" class="pricing-cta-btn btn btn-primary" style="background: linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan)); color: #040710; font-weight: 800; box-shadow: 0 0 25px rgba(16,185,129,0.4);">
                <span>⚡ Start 3-Month Free Trial</span>
                <span style="font-size: 0.75rem;">($1,499/mo)</span>
              </a>
            </div>

            <!-- TIER 3: Mission-Critical PQC Fortress -->
            <div class="pricing-card pqc-tier">
              <span class="pricing-badge-pqc">NIST QUANTUM-IMMUNE</span>
              <h3 class="pricing-tier-name" style="color: #a5b4fc;">Mission-Critical PQC Fortress</h3>
              <p class="pricing-tier-desc">For Fortune 500, defense, healthcare, and regulated fintech with sovereign compliance standards.</p>
              
              <div class="pricing-amount-block">
                <span class="pricing-currency">$</span>
                <span class="pricing-number" style="color: #c7d2fe;">3,999</span>
                <span class="pricing-period">/ month (USD)</span>
              </div>

              <div class="pricing-trial-pill" style="background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #a5b4fc;">
                <span>🎁 3 Months Free Trial Included ($0 today)</span>
              </div>

              <ul class="pricing-features-list">
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke="#818cf8"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Everything in Enterprise Autonomous, plus:</strong></span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke="#818cf8"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Unlimited Inbound Leads</strong> & multi-entity pipeline scale</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke="#818cf8"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>NIST FIPS 203 & 204 Lattice Encryption:</strong> ML-KEM-768 & ML-DSA-65</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke="#818cf8"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Dedicated WebSocket Cluster</strong> with &lt; 15ms global latency</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke="#818cf8"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Custom ERP Bridges:</strong> SAP, Oracle NetSuite, and internal data lakes</span>
                </li>
                <li class="pricing-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke="#818cf8"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>24/7 Dedicated Revenue Reliability Engineer (RRE)</strong></span>
                </li>
              </ul>

              <a href="https://buy.stripe.com/test_dRm5kvdPl4ah1kZ6ybcjS0o" target="_blank" rel="noopener noreferrer" class="pricing-cta-btn btn btn-secondary" style="background: rgba(99,102,241,0.14); border: 1px solid rgba(99,102,241,0.5); color: #c7d2fe; font-weight: 800;">
                <span>🛡️ Start 3-Month Free Trial</span>
                <span style="font-size: 0.75rem; opacity: 0.85;">($3,999/mo)</span>
              </a>
            </div>

          </div>

          <!-- Trust & Compliance Security Footer Strip -->
          <div class="pricing-trust-bar">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.3rem;">🔒</span>
              <div>
                <strong style="color: #fff;">Verified Stripe Secure Billing</strong>
                <div style="font-size: 0.72rem; color: var(--text-subtle);">256-Bit TLS Encryption • SOC2 Type II Certified • PCI DSS Level 1 Compliant</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 14px; font-weight: 600; color: #cbd5e1;">
              <span>✓ 3 Months 100% Free Trial</span>
              <span>✓ No Long-Term Contract</span>
              <span>✓ Instant 1-Click Online Cancellation</span>
            </div>
          </div>
        </section>
`;

// Insert viewPricingSection right before </main>
html = html.replace('    </main>', viewPricingSection + '\n    </main>');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully injected pricing navigation, header button, and View 16 into index.html');
