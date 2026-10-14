const fs = require('fs');
const path = require('path');

const extraCss = `
/* ==========================================================================
   Enterprise Real-Time Telemetry & Operations Dock
   ========================================================================== */
.telemetry-operations-dock {
  position: fixed;
  bottom: 0;
  left: 280px;
  right: 0;
  height: 42px;
  background: rgba(6, 10, 18, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(56, 189, 248, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 88;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.6);
  transition: left var(--transition-normal);
}

@media (max-width: 1024px) {
  .telemetry-operations-dock {
    left: 0;
    padding: 0 12px;
    height: 46px;
    flex-wrap: wrap;
  }
}

.dock-left, .dock-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.telemetry-node {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}

.telemetry-label {
  color: #64748b;
  font-weight: 700;
  font-size: 0.66rem;
  letter-spacing: 0.04em;
}

.telemetry-val {
  color: #f8fafc;
  font-weight: 600;
}

.telemetry-divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.12);
}

.pulse-dot-emerald {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 8px var(--accent-emerald);
  animation: pulse-ring 2s infinite ease-out;
}

.btn-xs {
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 600;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn-outline-cyan {
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.4);
  color: var(--accent-cyan);
}

.btn-outline-cyan:hover {
  background: rgba(6, 182, 212, 0.22);
  border-color: var(--accent-cyan);
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.3);
}

.content-body {
  padding-bottom: 70px !important;
}

/* Shortcut Modal Styles */
.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  padding: 8px 12px;
  border-radius: var(--radius-xs);
  font-size: 0.78rem;
}

.shortcut-item kbd {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 2px 7px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #38bdf8;
}
`;

const target = path.join(__dirname, '../css/components.css');
fs.appendFileSync(target, extraCss, 'utf8');
console.log('Appended dock and shortcut styles to css/components.css');
