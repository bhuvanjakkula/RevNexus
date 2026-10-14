/**
 * RevNexus AI - Live Autonomous Event Simulator
 * Demonstrates real-time mitigation of leaks, instant lead scoring, and automated copilot interventions.
 */

export class LiveSimulatorEngine {
  constructor(onEventCallback) {
    this.isRunning = false;
    this.timerId = null;
    this.onEventCallback = onEventCallback;
    this.eventIndex = 0;

    this.simulatedEvents = [
      {
        type: "lead_inbound",
        severity: "info",
        title: "⚡ Hot Lead Inbound: MedTech Innovations",
        text: "Inquiry received: Latency 1m 40s. Composite Score: 94/100 (Platinum Alpha). Prescribed: Immediate 5-min call.",
        recoveredValue: 45000
      },
      {
        type: "leak_alert",
        severity: "warning",
        title: "⚠️ Latency Decay Breach Alert",
        text: "Inbound from Nova Logistics is 24 mins uncontacted. Conversion probability decayed from 82% to 49%. Auto-escalating to Tier-1 rep queue.",
        recoveredValue: 20000
      },
      {
        type: "copilot_intervention",
        severity: "info",
        title: "💡 Objection Buster Triggered",
        text: "Prospect at TechCore raised 'Price too high'. Copilot pushed Cost-of-Inaction (COI) rebuttal + 60-day payback model to sales rep.",
        recoveredValue: 60000
      },
      {
        type: "funnel_recovered",
        severity: "info",
        title: "🛒 Checkout Abandonment Intercepted",
        text: "E-Commerce visitor abandoned ₹8,400 cart. Exit-intent 1-click risk-reversal SMS dispatched. Checkout completed in 3m 12s.",
        recoveredValue: 8400
      },
      {
        type: "committee_conflict",
        severity: "warning",
        title: "👥 Committee Conflict Flagged",
        text: "Gartner 74% conflict metric triggered for CloudNet deal (5 stakeholders). Auto-generating Executive Alignment Briefing for CFO.",
        recoveredValue: 120000
      },
      {
        type: "cadence_dispatched",
        severity: "info",
        title: "📬 Smart Follow-Up Cadence Dispatched",
        text: "Auto-dispatched Day-5 Multi-Stakeholder follow-up to 14 stalled B2B opportunities. 3 replies received within 12 minutes.",
        recoveredValue: 35000
      }
    ];
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  loop() {
    if (!this.isRunning) return;

    const event = this.simulatedEvents[this.eventIndex % this.simulatedEvents.length];
    this.eventIndex++;

    if (this.onEventCallback) {
      this.onEventCallback({
        ...event,
        timestamp: new Date().toLocaleTimeString()
      });
    }

    // Schedule next event in 4.5 to 7 seconds
    const interval = 4500 + Math.random() * 2500;
    this.timerId = setTimeout(() => this.loop(), interval);
  }
}
