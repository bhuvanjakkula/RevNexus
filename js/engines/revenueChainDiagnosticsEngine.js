/**
 * RevNexus AI — The Unified Revenue Chain Diagnostics Engine (2026 Edition)
 * 
 * Core Thesis:
 * "A failure at any one stage impairs profitability across the entire enterprise."
 * 
 * Interconnected 5-Stage Diagnostics:
 * Stage 1: Fit (Product–Market Fit) -> Critical Leakage: Churn & Disconnect
 * Stage 2: Reach (Marketing & Awareness) -> Critical Leakage: Expensive CAC
 * Stage 3: Intent (Lead Qualification) -> Critical Leakage: 30m SLA Bottleneck
 * Stage 4: Closing (Sales & Conversion) -> Critical Leakage: Ghosting & Objections
 * Stage 5: LTV (Delivery & Retention) -> Critical Leakage: Handoff Friction
 */

export class RevenueChainDiagnosticsEngine {
  constructor() {
    this.currentActiveStage = 3; // Default to Stage 3 (Intent - active in dashboard)
    this.stages = {
      1: {
        id: 1,
        code: "FIT",
        name: "Stage 1: Fit",
        title: "Product–Market Fit",
        subtitle: "Usability, Genuine Demand & Value Promise Verification",
        query: "Account ICP Precision & Automated Churn Filter",
        leakageTag: "Churn & Disconnect",
        leakageDesc: "Premature scaling on non-ICP customers leads to day 0-60 churn, heavy support overhead, and brand fatigue.",
        healthScore: 84, // 0-100
        baseDragMonthly: 142000,
        metrics: [
          { label: "Sean Ellis Must-Have Index", value: "58%", target: "> 40%", status: "optimal", hint: "Customers who would be 'very disappointed' without product" },
          { label: "Day 0-60 Disconnect Churn", value: "14.2%", target: "< 8.0%", status: "warning", hint: "Early cancellation due to misaligned expectations" },
          { label: "ICP Value Realization Depth", value: "78%", target: "> 70%", status: "optimal", hint: "Core telemetry milestones achieved in first 14 days" },
          { label: "Annualized Churn Drag", value: "$142,000", target: "$0", status: "warning", hint: "Revenue lost from early-stage mismatched ICP" }
        ],
        auditChecklist: [
          { id: "fit_1", label: "Pain point quantified with explicit CFO economic impact before demo", checked: true, weight: 25 },
          { id: "fit_2", label: "Strict ICP negative filters enforced in inbound qualification forms", checked: true, weight: 25 },
          { id: "fit_3", label: "Product telemetry tracking 14-day milestone completion rate", checked: false, weight: 25 },
          { id: "fit_4", label: "Negative feedback directly routes to engineering defect triage", checked: true, weight: 25 }
        ],
        rippleEffect: {
          upstream: "Feeds directly into brand reputation and customer word-of-mouth.",
          downstream: "Low PMF forces Stage 4 reps to discount by 22% and causes a 3.4x spike in Stage 5 renewal cancellations.",
          interconnectedImpact: "When Fit fails, every subsequent dollar invested into Reach (Stage 2) and Sales (Stage 4) yields declining margins."
        },
        remediation: {
          title: "Run ICP Pruning & Re-qualify Inactive Pipeline",
          actionText: "Purge Unqualified Pipeline & Lock ICP Rules",
          remedyImpact: "+16% Fit Health, reclaims $54,000/mo ARR"
        }
      },
      2: {
        id: 2,
        code: "REACH",
        name: "Stage 2: Reach",
        title: "Marketing & Awareness",
        subtitle: "Affordable ICP Acquisition, Multi-Touch Attribution & Channel Efficiency",
        query: "Acquisition CAC Efficiency & Channel Attribution",
        leakageTag: "Expensive CAC",
        leakageDesc: "Chasing raw click volume over ICP fit causes ad budget inflation, low conversion rates, and unsustainable CAC payback cycles.",
        healthScore: 76,
        baseDragMonthly: 64500,
        metrics: [
          { label: "Blended CAC Payback Period", value: "5.2 mo", target: "< 12 mo", status: "optimal", hint: "Time to recover customer acquisition cost" },
          { label: "Non-ICP Traffic Dilution", value: "38%", target: "< 25%", status: "warning", hint: "Visitors outside firmographic sweet spot" },
          { label: "Omni-Attribution Accuracy", value: "94.2%", target: "> 90%", status: "optimal", hint: "Multi-touch weight across digital + offline touchpoints" },
          { label: "Monthly Ad Budget Wastage", value: "$64,500", target: "< $15k", status: "warning", hint: "Spend directed toward negative ROI channels" }
        ],
        auditChecklist: [
          { id: "reach_1", label: "Negative keyword lists & strict B2B revenue thresholds active on ads", checked: true, weight: 25 },
          { id: "reach_2", label: "Multi-touch attribution models credit offline and partner touchpoints", checked: true, weight: 25 },
          { id: "reach_3", label: "Dynamic ICP landing page personalization by industry sector", checked: false, weight: 25 },
          { id: "reach_4", label: "Automated ad spend throttle when CAC payback exceeds 6 months", checked: true, weight: 25 }
        ],
        rippleEffect: {
          upstream: "Directly guided by Stage 1 (Fit). If Fit definition is vague, marketing targets the wrong buyers.",
          downstream: "Diluted traffic floods Stage 3 qualification with tire-kickers, ballooning rep triage burden by 45 hours/mo.",
          interconnectedImpact: "Inflated CAC in Reach leaves no margin room for Stage 4 discounting or Stage 5 customer onboarding investments."
        },
        remediation: {
          title: "Calibrate Ad Budgets & Suppress Diluted Channels",
          actionText: "Throttle Negative Channels & Shift to Bottom-Funnel",
          remedyImpact: "Lowers CAC by 24%, saves $38,000/mo ad spend"
        }
      },
      3: {
        id: 3,
        code: "INTENT",
        name: "Stage 3: Intent",
        title: "Lead Qualification",
        subtitle: "Speed-to-Lead SLA Enforcement, Readiness Scoring & Buyer Committee Mapping",
        query: "Speed-to-Lead Gating & 30m SLA Clock",
        leakageTag: "30m SLA Bottleneck",
        leakageDesc: "Inbound leads decay exponentially after 30 minutes of silence. Delayed qualification destroys buyer momentum and drops conversion by 70%.",
        healthScore: 68,
        baseDragMonthly: 89000,
        metrics: [
          { label: "Speed-to-Lead Response Time", value: "4.2 min", target: "< 15 min", status: "optimal", hint: "Average time from form submit to first rep touch" },
          { label: "Stalled Leads (> 30m SLA)", value: "3 Leads", target: "0 Leads", status: "alert", hint: "Urgent inbound leads awaiting rep assignment" },
          { label: "BANT/CHAMP Qualification Rate", value: "73.5%", target: "> 70%", status: "optimal", hint: "Leads with verified budget, authority, need, timeline" },
          { label: "SLA Latency Drop-off Drag", value: "$89,000", target: "$0", status: "warning", hint: "Estimated pipeline lost due to tardy first contact" }
        ],
        auditChecklist: [
          { id: "intent_1", label: "Sub-5 minute instant WhatsApp & SMS webhook notifications to reps", checked: true, weight: 25 },
          { id: "intent_2", label: "Autonomous AI qualification bot pre-scores budget and timeline", checked: true, weight: 25 },
          { id: "intent_3", label: "Automated rep reassignment triggered at 25-minute SLA warning", checked: false, weight: 25 },
          { id: "intent_4", label: "Instant self-serve calendar booking injected upon submission", checked: true, weight: 25 }
        ],
        rippleEffect: {
          upstream: "Depends on Stage 2 traffic quality. High reach volume without qualification is useless noise.",
          downstream: "Leads contacted past 30 mins show 2.4x higher demo no-show rates and 40% more stall cycles in Stage 4.",
          interconnectedImpact: "The 30m SLA is the vital bridge between marketing spend (Reach) and revenue realized (Closing)."
        },
        remediation: {
          title: "Execute 30m SLA Auto-Reassign & Rep Emergency Ping",
          actionText: "Auto-Reassign Stalled Inbounds & Ping Available Reps",
          remedyImpact: "Clears SLA alert, recaptures $62,000/mo pipeline"
        }
      },
      4: {
        id: 4,
        code: "CLOSING",
        name: "Stage 4: Closing",
        title: "Sales & Conversion",
        subtitle: "Triadic Objection Busting, 60-Day ROI Proposals & Margin Protection",
        query: "Margin Defense & Payback Proposal Engine",
        leakageTag: "Ghosting & Objections",
        leakageDesc: "Prospects ghost after pricing proposals when value is not mathematically proven, forcing reps into desperation discounting.",
        healthScore: 82,
        baseDragMonthly: 115000,
        metrics: [
          { label: "Pipeline Win Rate", value: "28.4%", target: "> 25%", status: "optimal", hint: "Percentage of demoed opportunities converted to closed-won" },
          { label: "Average Discount Concession", value: "6.2%", target: "< 10%", status: "optimal", hint: "Average discount percentage given off list price" },
          { label: "Objection Neutralization Rate", value: "88%", target: "> 80%", status: "optimal", hint: "Objections successfully countered using Triadic Copilot" },
          { label: "Pipeline Stall Drag", value: "$115,000", target: "< $50k", status: "warning", hint: "Stuck deals in Stage 4 negotiation purgatory" }
        ],
        auditChecklist: [
          { id: "close_1", label: "Real-time AI Objection Copilot active on live demos & calls", checked: true, weight: 25 },
          { id: "close_2", label: "Auditable 60-day Payback ROI business case presented before pricing", checked: true, weight: 25 },
          { id: "close_3", label: "Multi-threaded champion & economic buyer consensus locked", checked: false, weight: 25 },
          { id: "close_4", label: "Hard margin lock in CRM requiring executive approval for >10% discount", checked: true, weight: 25 }
        ],
        rippleEffect: {
          upstream: "Directly crippled when Stage 3 fails to qualify authority or budget.",
          downstream: "Deals closed with heavy discounting churn 40% faster in Stage 5 and demand 2.5x more CS hand-holding.",
          interconnectedImpact: "Closing without verified value transfers toxic debt into Delivery & Retention."
        },
        remediation: {
          title: "Deploy ROI Proposal & Objection Neutralizer",
          actionText: "Generate Audit-Ready ROI Case & Enforce Margin Lock",
          remedyImpact: "+12% Win rate, stops margin bleed across 8 active deals"
        }
      },
      5: {
        id: 5,
        code: "LTV",
        name: "Stage 5: LTV",
        title: "Delivery & Retention",
        subtitle: "Sales-to-CS Coordination, Verified Value Delivery & Account Expansion",
        query: "CS Handoff Protocol & Net Retention Expansion",
        leakageTag: "Handoff Friction",
        leakageDesc: "Miscommunication between Sales promises and CS delivery creates buyer remorse, sluggish onboarding, and renewal cancellations.",
        healthScore: 91,
        baseDragMonthly: 0,
        metrics: [
          { label: "Net Revenue Retention (NRR)", value: "124%", target: "> 115%", status: "optimal", hint: "Expansion revenue minus churned ARR" },
          { label: "Time-to-First-Value (TTFV)", value: "5.8 days", target: "< 7 days", status: "optimal", hint: "Days until customer logs first verified ROI milestone" },
          { label: "Handoff Friction Score", value: "12 / 100", target: "< 20", status: "optimal", hint: "Information gap between Sales notes and CS onboarding" },
          { label: "Expansion ARR Potential", value: "$340,000", target: "> $250k", status: "optimal", hint: "Accounts primed for seat or tier upsell this quarter" }
        ],
        auditChecklist: [
          { id: "ltv_1", label: "Automated Sales-to-CS dossier generated with buyer goals and commitments", checked: true, weight: 25 },
          { id: "ltv_2", label: "Day 7 First-Milestone review automatically scheduled upon contract sign", checked: true, weight: 25 },
          { id: "ltv_3", label: "Quarterly Executive Value Review (QBR) cadence pre-booked", checked: false, weight: 25 },
          { id: "ltv_4", label: "Expansion trigger alerts when customer feature utilization exceeds 85%", checked: true, weight: 25 }
        ],
        rippleEffect: {
          upstream: "Inherits all misaligned promises and low-fit customers from Stages 1-4.",
          downstream: "High LTV acts as an enterprise superpower: every 5% lift in NRR lowers CAC burden in Stage 2 by 30%.",
          interconnectedImpact: "Delivery & Retention is the ultimate profit engine that validates the entire chain."
        },
        remediation: {
          title: "Sync Sales-to-CS Handoff & Launch VIP Health Audit",
          actionText: "Trigger CS Pre-Brief & Launch Automated Onboarding Flow",
          remedyImpact: "Protects $340k expansion pipeline, zero handoff gap"
        }
      }
    };
  }

  getStage(id) {
    return this.stages[id] || this.stages[1];
  }

  setActiveStage(id) {
    if (this.stages[id]) {
      this.currentActiveStage = id;
    }
    return this.getStage(this.currentActiveStage);
  }

  toggleAuditItem(stageId, itemId) {
    const stage = this.stages[stageId];
    if (!stage) return null;
    const item = stage.auditChecklist.find(i => i.id === itemId);
    if (item) {
      item.checked = !item.checked;
      this.recalculateStageHealth(stageId);
    }
    return stage;
  }

  setStageHealth(stageId, score) {
    const stage = this.stages[stageId];
    if (!stage) return;
    stage.healthScore = Math.max(10, Math.min(100, Math.round(score)));
    this.recalculateDrags();
  }

  recalculateStageHealth(stageId) {
    const stage = this.stages[stageId];
    if (!stage) return;
    const totalWeight = stage.auditChecklist.reduce((sum, item) => sum + item.weight, 0);
    const checkedWeight = stage.auditChecklist
      .filter(item => item.checked)
      .reduce((sum, item) => sum + item.weight, 0);
    
    // Scale between 40 and 100 based on checklist
    const baseScore = Math.round(40 + (checkedWeight / totalWeight) * 58);
    stage.healthScore = baseScore;
    this.recalculateDrags();
  }

  recalculateDrags() {
    // Interconnected cascade:
    // If Fit (Stage 1) is low, it penalizes Reach and Closing
    // If Reach (Stage 2) is low, it penalizes Intent
    // If Intent (Stage 3) is low, it penalizes Closing
    // If Closing (Stage 4) is low, it penalizes LTV
    
    const multipliers = { 1: 2200, 2: 1800, 3: 2500, 4: 3200, 5: 1500 };
    for (let i = 1; i <= 5; i++) {
      const stage = this.stages[i];
      if (stage.isOptimized || stage.healthScore >= 98) {
        stage.baseDragMonthly = 0;
      } else {
        const mult = multipliers[i] || 2000;
        stage.baseDragMonthly = Math.round((100 - stage.healthScore) * mult);
      }
    }
  }

  getEnterpriseSummary() {
    this.recalculateDrags();
    const scores = Object.values(this.stages).map(s => s.healthScore);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const totalMonthlyDrag = Object.values(this.stages).reduce((sum, s) => sum + s.baseDragMonthly, 0);
    
    // Find the primary bottleneck (stage with lowest score that is not optimized)
    let bottleneck = null;
    let lowestScore = 999;
    Object.values(this.stages).forEach(s => {
      if (!s.isOptimized && s.healthScore < lowestScore) {
        lowestScore = s.healthScore;
        bottleneck = s;
      }
    });

    if (!bottleneck || totalMonthlyDrag === 0) {
      bottleneck = {
        name: "Enterprise Chain",
        title: "All 5 Stages Optimized",
        leakageTag: "Zero Bottlenecks Detected"
      };
    }

    let healthStatus = 'Optimal';
    let statusClass = 'text-emerald';
    if (avgScore < 75) {
      healthStatus = 'Degraded Bottleneck';
      statusClass = 'text-rose';
    } else if (avgScore < 85) {
      healthStatus = 'Moderate Risk';
      statusClass = 'text-amber';
    } else if (avgScore >= 95) {
      healthStatus = 'Peak Performance';
      statusClass = 'text-emerald';
    }

    return {
      averageHealthScore: avgScore,
      healthStatus,
      statusClass,
      totalMonthlyDrag,
      annualizedDrag: totalMonthlyDrag * 12,
      bottleneckStage: bottleneck
    };
  }

  optimizeStageStep(stepNum) {
    const stage = this.stages[stepNum];
    if (!stage) return null;
    stage.healthScore = 98;
    stage.isOptimized = true;
    stage.auditChecklist.forEach(i => i.checked = true);

    if (stepNum === 1) {
      stage.leakageTag = "✅ Verified ICP (Zero Churn)";
      stage.baseDragMonthly = 0;
      stage.metrics[0].value = "74%";
      stage.metrics[1].value = "2.1%";
      stage.metrics[1].status = "optimal";
      stage.metrics[2].value = "94%";
      stage.metrics[3].value = "$0";
      stage.metrics[3].status = "optimal";
    } else if (stepNum === 2) {
      stage.leakageTag = "✅ CAC Payback 2.8 mo (-34%)";
      stage.baseDragMonthly = 0;
      stage.metrics[0].value = "2.8 mo";
      stage.metrics[1].value = "8.4%";
      stage.metrics[1].status = "optimal";
      stage.metrics[2].value = "98.5%";
      stage.metrics[3].value = "$0";
      stage.metrics[3].status = "optimal";
    } else if (stepNum === 3) {
      stage.leakageTag = "✅ Zero SLA Breaches (1.4m avg)";
      stage.baseDragMonthly = 0;
      stage.metrics[0].value = "1.4 min";
      stage.metrics[1].value = "0 Leads";
      stage.metrics[1].status = "optimal";
      stage.metrics[2].value = "92.0%";
      stage.metrics[3].value = "$0";
      stage.metrics[3].status = "optimal";
    } else if (stepNum === 4) {
      stage.leakageTag = "✅ Margin Lock Active (36.8% Win)";
      stage.baseDragMonthly = 0;
      stage.metrics[0].value = "36.8%";
      stage.metrics[1].value = "2.2%";
      stage.metrics[2].value = "96%";
      stage.metrics[3].value = "$0";
      stage.metrics[3].status = "optimal";
    } else if (stepNum === 5) {
      stage.leakageTag = "✅ Zero Handoff Gap (134% NRR)";
      stage.baseDragMonthly = 0;
      stage.metrics[0].value = "134%";
      stage.metrics[1].value = "3.2 days";
      stage.metrics[2].value = "3 / 100";
      stage.metrics[3].value = "$520,000";
    }

    this.recalculateDrags();
    return stage;
  }

  optimizeAllStages() {
    this.isChainOptimized = true;
    for (let i = 1; i <= 5; i++) {
      this.optimizeStageStep(i);
    }
    return this.getEnterpriseSummary();
  }

  resetToBaseline() {
    this.isChainOptimized = false;
    this.stages[1].healthScore = 84;
    this.stages[1].isOptimized = false;
    this.stages[1].leakageTag = "Churn & Disconnect";
    this.stages[1].baseDragMonthly = 142000;
    this.stages[1].metrics[0].value = "58%";
    this.stages[1].metrics[1].value = "14.2%";
    this.stages[1].metrics[1].status = "warning";
    this.stages[1].metrics[2].value = "78%";
    this.stages[1].metrics[3].value = "$142,000";
    this.stages[1].metrics[3].status = "warning";

    this.stages[2].healthScore = 76;
    this.stages[2].isOptimized = false;
    this.stages[2].leakageTag = "Expensive CAC";
    this.stages[2].baseDragMonthly = 64500;
    this.stages[2].metrics[0].value = "5.2 mo";
    this.stages[2].metrics[1].value = "38%";
    this.stages[2].metrics[1].status = "warning";
    this.stages[2].metrics[2].value = "94.2%";
    this.stages[2].metrics[3].value = "$64,500";
    this.stages[2].metrics[3].status = "warning";

    this.stages[3].healthScore = 68;
    this.stages[3].isOptimized = false;
    this.stages[3].leakageTag = "30m SLA Bottleneck";
    this.stages[3].baseDragMonthly = 89000;
    this.stages[3].metrics[0].value = "4.2 min";
    this.stages[3].metrics[1].value = "3 Leads";
    this.stages[3].metrics[1].status = "alert";
    this.stages[3].metrics[2].value = "73.5%";
    this.stages[3].metrics[3].value = "$89,000";
    this.stages[3].metrics[3].status = "warning";

    this.stages[4].healthScore = 82;
    this.stages[4].isOptimized = false;
    this.stages[4].leakageTag = "Ghosting & Objections";
    this.stages[4].baseDragMonthly = 115000;
    this.stages[4].metrics[0].value = "28.4%";
    this.stages[4].metrics[1].value = "6.2%";
    this.stages[4].metrics[2].value = "88%";
    this.stages[4].metrics[3].value = "$115,000";
    this.stages[4].metrics[3].status = "warning";

    this.stages[5].healthScore = 91;
    this.stages[5].isOptimized = false;
    this.stages[5].leakageTag = "Handoff Friction";
    this.stages[5].baseDragMonthly = 0;
    this.stages[5].metrics[0].value = "124%";
    this.stages[5].metrics[1].value = "5.8 days";
    this.stages[5].metrics[2].value = "12 / 100";
    this.stages[5].metrics[3].value = "$340,000";

    this.stages[1].auditChecklist[2].checked = false;
    this.stages[2].auditChecklist[2].checked = false;
    this.stages[3].auditChecklist[2].checked = false;
    this.stages[4].auditChecklist[2].checked = false;
    this.stages[5].auditChecklist[2].checked = false;

    this.recalculateDrags();
    return this.getEnterpriseSummary();
  }

  remedyStage(stageId) {
    return this.optimizeStageStep(stageId);
  }
}
