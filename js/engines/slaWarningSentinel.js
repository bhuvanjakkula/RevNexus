/**
 * RevNexus AI — 30-Minute SLA Warning Sentinel & Latency Bottleneck Mitigator
 * 
 * Enterprise Capabilities:
 * - Automated latency bottleneck prevention across inbound touchpoints.
 * - Multi-tier escalation with automated warnings and rep reassignments.
 * - Quantifiable revenue rescue modeling through response time reduction.
 */

export class SLAWarningSentinel {
  constructor() {
    this.slaTiers = [
      {
        tier: "golden",
        maxMinutes: 5,
        label: "Golden Window (< 5m)",
        statusColor: "var(--accent-emerald)",
        expectedProgression: "84%",
        intervention: "Immediate direct call or 1-click WhatsApp callback to capitalize on maximum buyer attention."
      },
      {
        tier: "warning_yellow",
        maxMinutes: 15,
        label: "Tier 1 Warning (5–15m)",
        statusColor: "var(--accent-amber)",
        expectedProgression: "62%",
        intervention: "Automated instant WhatsApp pre-engagement dispatched with personalized case study to preserve buyer intent."
      },
      {
        tier: "critical_orange",
        maxMinutes: 30,
        label: "Tier 2 Critical (15–30m)",
        statusColor: "var(--accent-rose)",
        expectedProgression: "41%",
        intervention: "Auto-reassignment protocol triggered: Lead re-routed from busy rep to available on-duty Sales Engineer."
      },
      {
        tier: "breached_red",
        maxMinutes: Infinity,
        label: "SLA Breached (> 30m)",
        statusColor: "#ef4444",
        expectedProgression: "19%",
        intervention: "Stage progression collapsed by ~65%. Escalated to Sales Director dashboard; automated apology & audit log generated."
      }
    ];

    this.activeSlaQueue = [
      {
        id: "LEAD-SLA-501",
        account: "Tata AutoComp Systems",
        contact: "Naveen Singhal",
        elapsedMinutes: 3,
        tier: "golden",
        assignedRep: "Priya Menon",
        channel: "Direct WhatsApp Inbound",
        urgency: "Immediate High"
      },
      {
        id: "LEAD-SLA-502",
        account: "Godrej Agrovet Region 4",
        contact: "Suresh Patil",
        elapsedMinutes: 12,
        tier: "warning_yellow",
        assignedRep: "Amit Kulkarni",
        channel: "Web Demo Request",
        urgency: "Moderate"
      },
      {
        id: "LEAD-SLA-503",
        account: "Bharat Heavy Forge",
        contact: "Rajesh Varma",
        elapsedMinutes: 26,
        tier: "critical_orange",
        assignedRep: "Sanjay Joshi (Busy in Meeting)",
        channel: "Industrial Expo QR Scan",
        urgency: "Critical Re-route Needed"
      }
    ];
  }

  evaluateLeadSla(elapsedMinutes) {
    for (const tier of this.slaTiers) {
      if (elapsedMinutes <= tier.maxMinutes) {
        return tier;
      }
    }
    return this.slaTiers[this.slaTiers.length - 1];
  }

  /**
   * Computes the mathematical funnel impact of enforcing the 30-minute SLA
   */
  calculateSlaEconomicImpact(totalMonthlyInbounds = 500, avgDealValue = 1500000) {
    // Unmanaged funnel: average latency ~4.5 hours -> 22% early qualification progression
    const unmanagedProgressionRate = 0.22;
    const unmanagedProgressed = Math.round(totalMonthlyInbounds * unmanagedProgressionRate);
    
    // SLA-managed funnel (sub-30m with automated escalation warnings): 68% progression
    const slaManagedProgressionRate = 0.68;
    const slaManagedProgressed = Math.round(totalMonthlyInbounds * slaManagedProgressionRate);

    const netRescuedLeads = slaManagedProgressed - unmanagedProgressed;
    // Assuming downstream 25% close rate on qualified leads:
    const downstreamCloseRate = 0.25;
    const additionalClosedDeals = Math.round(netRescuedLeads * downstreamCloseRate);
    const rescuedMonthlyRevenue = additionalClosedDeals * avgDealValue;
    const rescuedAnnualRevenue = rescuedMonthlyRevenue * 12;

    return {
      totalMonthlyInbounds,
      unmanagedProgressionRate: "22%",
      slaManagedProgressionRate: "68%",
      netRescuedLeads,
      additionalClosedDeals,
      rescuedMonthlyRevenue,
      rescuedAnnualRevenue,
      citation: "Automated Response SLA Performance Model"
    };
  }

  getActiveQueue() {
    return this.activeSlaQueue;
  }

  triggerAutoReassign(leadId, newRep = "Rohit Verma (Available)") {
    const lead = this.activeSlaQueue.find(l => l.id === leadId);
    if (lead) {
      lead.assignedRep = `${newRep} [Auto-Reassigned via 30m Sentinel]`;
      lead.elapsedMinutes = 1; // Reset timer for new rep
      lead.tier = "golden";
      return { success: true, lead };
    }
    return { success: false, error: "Lead not found" };
  }
}
