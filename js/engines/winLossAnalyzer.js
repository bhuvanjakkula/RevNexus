/**
 * RevNexus AI - Win/Loss Root Cause Intelligence & Product Gap Telemetry
 * Closes the feedback loop between Sales conversations, Product roadmaps, and Marketing messaging.
 */

export class WinLossAnalyzerEngine {
  constructor() {
    this.historyData = [
      {
        dealId: "DEAL-8401",
        account: "Apex Logistics Corp",
        vertical: "Logistics & Freight",
        amount: "₹18,50,000",
        stage: "Proposal Review",
        outcome: "Lost",
        primaryReason: "Price / Value Mismatch",
        rootCauseDepartment: "Marketing / Positioning",
        diagnostic: "Competitor quoted 20% lower; sales team lacked verified ROI payback model.",
        recommendedCorrection: "Provide dynamic Cost-of-Inaction (COI) calculator in proposal deck."
      },
      {
        dealId: "DEAL-8402",
        account: "MediCare Specialty Clinic",
        vertical: "Healthcare Clinics",
        amount: "₹6,20,000",
        stage: "Discovery",
        outcome: "Won",
        primaryReason: "Immediate SLA Response (<4 min)",
        rootCauseDepartment: "Sales Execution",
        diagnostic: "Contacted lead within 3 minutes; built immediate trust before competitor replied.",
        recommendedCorrection: "Reinforce sub-5-minute SLA across all clinic channels."
      },
      {
        dealId: "DEAL-8403",
        account: "Skyline Properties Ltd",
        vertical: "Real Estate",
        amount: "₹42,00,000",
        stage: "Demo / Site Visit",
        outcome: "Lost",
        primaryReason: "Buying Committee Conflict",
        rootCauseDepartment: "Sales Methodology",
        diagnostic: "Single champion could not convince CFO on upfront capital requirement.",
        recommendedCorrection: "Mandate multi-threading alignment deck whenever deal exceeds ₹20 Lakhs."
      },
      {
        dealId: "DEAL-8404",
        account: "Zenith Cloud SaaS",
        vertical: "B2B SaaS",
        amount: "₹14,00,000",
        stage: "Trial / Evaluation",
        outcome: "Lost",
        primaryReason: "Missing Integration Feature",
        rootCauseDepartment: "Product Engineering",
        diagnostic: "Customer required native ERP integration; manual CSV import caused deal cancellation.",
        recommendedCorrection: "Fast-track webhook connector in Sprint 44 to unlock enterprise deals."
      },
      {
        dealId: "DEAL-8405",
        account: "UrbanStyle Apparel D2C",
        vertical: "E-Commerce",
        amount: "₹8,40,000",
        stage: "Negotiation",
        outcome: "Won",
        primaryReason: "Clear 60-Day Payback Guarantee",
        rootCauseDepartment: "Sales Offer Engineering",
        diagnostic: "Used risk-reversal terms to remove founder's hesitation regarding checkout conversion.",
        recommendedCorrection: "Standardize pilot risk-reversal guarantee for D2C brands."
      }
    ];
  }

  getDealHistory() {
    return this.historyData;
  }

  getDepartmentalLossDistribution() {
    return [
      { department: "Product Engineering (Missing Features / Bugs)", percentage: 28, count: 14, color: "var(--accent-rose)" },
      { department: "Marketing (Poor Lead Fit & Unclear Differentiation)", percentage: 32, count: 16, color: "var(--accent-amber)" },
      { department: "Sales Execution (Slow Response & Forgotten Follow-ups)", percentage: 25, count: 13, color: "var(--accent-cyan)" },
      { department: "Pricing / Legal Friction (Contract & Payment Terms)", percentage: 15, count: 8, color: "var(--accent-indigo)" }
    ];
  }

  recordNewDeal(deal) {
    this.historyData.unshift(deal);
    if (this.historyData.length > 20) {
      this.historyData.pop();
    }
    return this.historyData;
  }
}
