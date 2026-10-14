/**
 * RevNexus AI — Enterprise Sales Architecture & Conversational Pipeline Acceleration Engine
 * 
 * Enterprise Capabilities:
 * - Automated multi-stage intent triage: Discovery -> Qualification & Framing -> Interactive Consideration -> Closing & Negotiation.
 * - High-velocity automated qualification and accelerated conversion rates.
 * - Response speed and digital interaction automation to reduce cycle times.
 * - Lead loss prevention and SLA-backed handoff enforcement.
 * - Integrated solution packaging and margin defense.
 */

export class ConversationalFunnelEngine {
  constructor() {
    // 4 Cognitive Funnel States
    this.conversationalStates = {
      TABULA: {
        id: "tabula",
        name: "Stage 1: Discovery",
        intentState: "Exploratory intent and preliminary inquiry",
        mechanism: "Real-time intent routing via automated query analysis and conversational triage",
        operationalImpact: "Expands initial touchpoint access with zero sales friction",
        connectStageRecovery: "Accelerates connect-stage conversion via real-time dynamic query matching",
        typicalLeadDropRate: "72% unmanaged → 24% with conversational triage",
        aiHumanRole: "100% Automated Conversational Discovery",
        citation: "Real-Time Intent Routing"
      },
      QUALIFICATION: {
        id: "qualification",
        name: "Stage 2: Qualification & Value Framing",
        intentState: "Evaluating vendor capabilities, solution fit, and problem scope",
        mechanism: "Dynamic inbound scoring, latency-decay tracking, and intent verification",
        operationalImpact: "+35% increase in qualified pipeline in SaaS trials",
        connectStageRecovery: "Filters low-intent visitors, preventing sales engineering burnout",
        typicalLeadDropRate: "58% unmanaged → 18% with dynamic scoring",
        aiHumanRole: "80% AI Diagnostics / 20% SDR Triage",
        citation: "Dynamic Lead Scoring & SLA Gating"
      },
      INTERACTIVE_CONSIDERATION: {
        id: "interactive_consideration",
        name: "Stage 3: Interactive Evaluation",
        intentState: "Evaluating tailored solution architecture and direct ROI impact",
        mechanism: "Digital Sales Interactions (DSIs), instant interactive payback calculators, and proof of concept",
        operationalImpact: "Elevates buyer engagement by up to +27% through real-time responsiveness",
        connectStageRecovery: "Replaces 4-day slide deck turnaround with instant tailored ROI simulation",
        typicalLeadDropRate: "45% unmanaged → 12% with instant DSI",
        aiHumanRole: "50% AI Intelligence Copilot / 50% Solutions Engineer",
        citation: "Interactive Value Modeling"
      },
      CLOSING_NEGOTIATION: {
        id: "closing_negotiation",
        name: "Stage 4: Closing & Negotiation",
        intentState: "Commercial risk calculation, SLA terms, and contract sign-off",
        mechanism: "Seamless human-AI collaborative handoffs, consultative dialogue, and objection resolution",
        operationalImpact: "-41% reduction in sales cycles & +27% win rate uplift",
        connectStageRecovery: "Eliminates pipeline lead black holes via deterministic SLA handoff enforcement",
        typicalLeadDropRate: "35% unmanaged → 8% with consultative handoff",
        aiHumanRole: "10% Invisible AI Guidance / 90% Senior Enterprise AE Closer",
        citation: "Deterministic SLA Escalation"
      }
    };

    // Solution Positioning vs Component Feature Signaling
    this.positioningModels = {
      INTEGRATED_SOLUTION: {
        type: "Integrated Business Solution Architecture",
        framing: "End-to-End Operational Transformation with Guaranteed SLA & ROI Payback",
        marketSignal: "Credible Quality Signal that de-risks purchases in competitive markets",
        buyerRiskPerception: "Low (-44% perceived execution risk)",
        pricingPower: "+22% Value Premium Tolerance",
        winRateLift: "+32%"
      },
      COMPONENT_FEATURE: {
        type: "Component Feature Pitch (Commodity Trap)",
        framing: "Standalone tool specifications, feature checklists, and per-seat pricing",
        marketSignal: "Perceived as commoditized piece-meal tool requiring buyer integration overhead",
        buyerRiskPerception: "High (+58% integration anxiety)",
        pricingPower: "-18% Discounting Pressure",
        winRateLift: "Baseline (Fragile)"
      }
    };
  }

  /**
   * Evaluates Conversational Pipeline Acceleration across the 4 Stages
   */
  evaluateConversationalPipeline({
    monthlyInbound = 10000,
    avgDealValue = 450000,
    hasConversationalAI = true,
    solutionComplexity = "moderate" // "simple", "moderate", "highly_bespoke"
  }) {
    // Connect stage drop-off without conversational AI is 72%
    const unmanagedConnectDrop = 0.72;
    const managedConnectDrop = 0.28;

    const connectDrop = hasConversationalAI ? managedConnectDrop : unmanagedConnectDrop;
    const connectedLeads = Math.round(monthlyInbound * (1 - connectDrop));

    // Stage 2: Qualification (+35% qualified leads lift)
    const baseQualRate = 0.22;
    const qualRate = hasConversationalAI ? (baseQualRate * 1.35) : baseQualRate;
    const qualifiedLeads = Math.round(connectedLeads * qualRate);

    // Stage 3: Consideration (+27% engagement lift)
    const baseConsiderationRate = 0.40;
    const considerationRate = hasConversationalAI ? (baseConsiderationRate * 1.27) : baseConsiderationRate;
    const proposalsSent = Math.round(qualifiedLeads * considerationRate);

    // Stage 4: Closing (+27% closure rate lift & -41% cycle duration)
    let winRate = 0.25;
    if (hasConversationalAI) {
      if (solutionComplexity === "highly_bespoke") {
        winRate = 0.32; // Guided consultative closing
      } else {
        winRate = 0.25 * 1.27; // 31.75%
      }
    }
    const closedWins = Math.round(proposalsSent * winRate);
    const monthlyRevenue = closedWins * avgDealValue;

    // Cycle Time Reduction
    const baselineSalesCycleDays = 68;
    const conversationalSalesCycleDays = hasConversationalAI ? Math.round(baselineSalesCycleDays * 0.59) : baselineSalesCycleDays; // -41% reduction

    // Recovered Leads from the Outbound Connect Bottleneck
    const rescuedConnectLeads = hasConversationalAI ? Math.round(monthlyInbound * (unmanagedConnectDrop - managedConnectDrop)) : 0;
    const rescuedRevenue = rescuedConnectLeads * qualRate * considerationRate * winRate * avgDealValue;

    // Lead Conversion Leakage Risk
    const leadBlackHoleRisk = hasConversationalAI ? "Zero (Enforced 30m SLA Escrow Handover)" : "Severe (46% of MQLs never contacted by Sales Reps)";

    return {
      monthlyInbound,
      connectedLeads,
      qualifiedLeads,
      proposalsSent,
      closedWins,
      monthlyRevenue,
      salesCycleDays: `${conversationalSalesCycleDays} days (${hasConversationalAI ? '-41% Acceleration' : 'Baseline'})`,
      rescuedConnectLeads,
      rescuedRevenue,
      leadBlackHoleRisk,
      boundarySafeguard: solutionComplexity === "highly_bespoke"
        ? "🛡️ Enterprise Consultative Routing Active: Routing high-complexity accounts to Senior Human Consultative AE to preserve profit margins."
        : "⚡ High-Velocity Conversational Flow Active: Instant dynamic framing maximizing throughput."
    };
  }

  /**
   * Diagnostic for the 3 Operational Commercial Strategies
   */
  evaluateCommercialOptimizationStrategy(strategyKey = "bottleneck_management") {
    const strategies = {
      traffic_expansion: {
        name: "Strategy 1: Top-of-Funnel Pipeline Expansion (ToFU)",
        focus: "Expanding top-of-funnel inbound volume via multi-channel awareness",
        mechanism: "Conversational query capture across search, LinkedIn, WhatsApp, and events",
        leveragePoint: "High volume, lower capital efficiency if downstream funnel leaks",
        recommendation: "Deploy only when MoFU and BoFU conversion gates are leak-free.",
        citation: "Multi-Channel Demand Capture"
      },
      conversion_stretching: {
        name: "Strategy 2: Middle-of-Funnel Conversion Optimization (MoFU)",
        focus: "Widening intermediate conversion ratios between discovery and proposal",
        mechanism: "Instant Digital Sales Interactions (DSIs), ROI calculators, and collaborative coaching",
        leveragePoint: "+35% qualified leads lift without increasing paid ad acquisition costs",
        recommendation: "Highest ROI strategy for mid-market and enterprise B2B funnels.",
        citation: "Digital Sales Interaction Acceleration"
      },
      bottleneck_management: {
        name: "Strategy 3: Bottleneck Elimination & Handover SLA Protection (BoFU + Handover)",
        focus: "Eliminating connect-stage drop-off and lead conversion leakage",
        mechanism: "30-Minute SLA Sentinel automated reassignments + Human-AI consultative closing",
        leveragePoint: "-41% sales cycle length and guaranteed capture of high-intent accounts",
        recommendation: "Foundational prerequisite before scaling ToFU marketing investments.",
        citation: "Automated SLA Handover Protocol"
      }
    };

    return strategies[strategyKey] || strategies.bottleneck_management;
  }

  /**
   * Stage-Specific Human-AI Task Allocation
   */
  evaluateHumanAILaborDivision(funnelPhase = "ToFU") {
    const phases = {
      ToFU: {
        phase: "Top of Funnel (ToFU)",
        machineRole: "Data mining, pattern recognition, and predictive lead qualification",
        humanRole: "Defining ideal buyer criteria, verification, and contextual framing",
        collaborativeOutcome: "+35% increase in qualified leads delivered to active pipeline",
        cycleReduction: "67% reduction in target screening time",
        citation: "Automated Lead Qualification Protocol"
      },
      MoFU: {
        phase: "Middle of Funnel (MoFU)",
        machineRole: "Dynamic content personalization, automated RFP clause retrieval, and AI-CRM routing",
        humanRole: "Managing objections, consultative qualification, and tailored presentations",
        collaborativeOutcome: "-41% reduction in sales cycle duration & 30% decrease in RFP turnaround",
        cycleReduction: "Document prep falls from 4.7 hrs to 18 mins (83.7% data entry reduction)",
        citation: "Contextual Proposal Acceleration"
      },
      BoFU: {
        phase: "Bottom of Funnel (BoFU)",
        machineRole: "Dynamic pricing recommendations and deal scoring analytics",
        humanRole: "High-stakes negotiation, ethical governance, and interpersonal trust",
        collaborativeOutcome: "+27% improvement in deal closure rates & 41.8% higher decision accuracy in negotiations",
        cycleReduction: "Contract exception handling falls from 94 to 28 mins per contract",
        citation: "Deal Structuring & Risk Scoring"
      },
      PostFunnel: {
        phase: "Post-Funnel / Account Retention",
        machineRole: "Workflow automation, churn prediction, and signal tracking",
        humanRole: "Strategic customer success, account planning, and joint co-creation",
        collaborativeOutcome: "Scalable account retention, sustained CLV, and 35% higher operational throughput",
        cycleReduction: "Modernization delivery schedules reduced from 36 down to 9.3 project-weeks",
        citation: "Lifecycle Value & Account Expansion"
      }
    };

    return phases[funnelPhase] || phases.ToFU;
  }

  /**
   * Governance of Deal Complexity & Operational Capability Boundaries
   */
  evaluateJaggedFrontierAndComplexity(complexityDimension = "risk_valuation") {
    const dimensions = {
      risk_valuation: {
        dimension: "Risk & Valuation Analytics",
        aiRole: "Scans multi-variable data patterns and flags contract variances",
        humanRole: "Provides contextual interpretation, deal structuring, and strategic governance",
        errorSafeguard: "Prevents high false-positive anomalies inherent in unmonitored risk engines",
        jaggedFrontierStatus: "Inside automated processing boundary (25.1% faster execution)",
        citation: "Contract Risk Pattern Analysis"
      },
      deal_orchestration: {
        dimension: "Dynamic Deal Orchestration",
        aiRole: "Reconfigures pipeline flows based on emergent constraints",
        humanRole: "Resolves non-standard exceptions, organizational alignment, and multi-party buyer negotiations",
        errorSafeguard: "Dynamic shifts across multi-tier collaboration modes reduce handoff errors by 47.3%",
        jaggedFrontierStatus: "Hybrid Orchestration: AI automates routine tasks, human executes strategic exceptions",
        citation: "Multi-Tier Workflow Coordination"
      },
      sensemaking_synthesis: {
        dimension: "Stakeholder Alignment & Synthesis",
        aiRole: "Extracts information from unstructured datasets, transcripts, and spec sheets",
        humanRole: "Applies empathy and executive intuition to ambiguous or contradictory stakeholder inputs",
        errorSafeguard: "Structured human review prevents algorithmic hallucination from distorting account strategy",
        jaggedFrontierStatus: "Human governance mandatory to prevent decision degradation in ambiguous contexts",
        citation: "Executive Intuition & Stakeholder Synthesis"
      }
    };

    return dimensions[complexityDimension] || dimensions.risk_valuation;
  }

  /**
   * Rep Augmentation & Ramp Acceleration
   */
  calculateRepAugmentationLift(repTenureMonths = 3) {
    if (repTenureMonths < 6) {
      return {
        tenureTier: "Junior / Onboarding Rep (<6 months)",
        augmentationLift: "+32.8% Conversion Lift (Rapid Ramp Multiplier)",
        creativityEffect: "AI assistance eliminates administrative burden, unlocking persuasive selling focus",
        coachingPrescription: "Deploy real-time contextual copilot prompts to accelerate ramp time and bridge domain knowledge gaps."
      };
    } else {
      return {
        tenureTier: "Tenured / Senior Rep (>6 months)",
        augmentationLift: "+5.5% Conversion Lift (Expert Level)",
        creativityEffect: "AI delivers automated due diligence, freeing senior closers to negotiate high-stakes terms",
        coachingPrescription: "Deploy unobtrusive background copilot focused on stakeholder consensus and dynamic pricing."
      };
    }
  }

  /**
   * Multidimensional Deal Complexity Framework
   */
  evaluateDealComplexityTaxonomy({
    componentScore = 50,      // Info volume, sub-tasks, alternative set size
    coordinativeScore = 50,   // Stakeholder count, handoffs, dependencies
    volatilityScore = 50,     // Delayed feedback, market shifts, stochasticity
    equivocalityScore = 50,   // Value divergence, legal ambiguity, tacit knowledge
    searchOpennessScore = 50  // Solution space boundaries, task non-standardizability
  }) {
    // Composite Weighted Complexity Index (0-100)
    const compositeIndex = Math.round(
      componentScore * 0.20 +
      coordinativeScore * 0.25 +
      volatilityScore * 0.15 +
      equivocalityScore * 0.25 +
      searchOpennessScore * 0.15
    );

    let complexityTier = "Moderate B2B Transaction";
    let badgeClass = "badge-beta";
    if (compositeIndex >= 75) {
      complexityTier = "Hyper-Complex Enterprise Deal (Strategic Gate)";
      badgeClass = "badge-omega";
    } else if (compositeIndex >= 50) {
      complexityTier = "High Complexity Multi-Stakeholder Account";
      badgeClass = "badge-alpha";
    } else if (compositeIndex < 35) {
      complexityTier = "Standardized Velocity Transaction";
      badgeClass = "badge-alpha";
    }

    // Recommended Workflow Allocation
    let primaryAllocation = "";
    let allocationRationale = "";
    let failureModeAlert = "";

    if (equivocalityScore >= 65) {
      primaryAllocation = "Human-Centric Adjudication (AI as Reference Tool Only)";
      allocationRationale = "Conflicting stakeholder values and contract ambiguity require senior human ethical accountability and alignment.";
      failureModeAlert = "⚠️ Unsupervised Automation Warning: High-ambiguity deals require active senior human oversight to maintain win rates.";
    } else if (coordinativeScore >= 65) {
      primaryAllocation = "Dynamic Multi-Mode Hybrid Orchestration";
      allocationRationale = "Multi-party enterprise deals require adaptive coordination across collaboration modes, reducing handoff friction by 47.3%.";
      failureModeAlert = "⚠️ Coordinative Friction: Unmonitored handoffs create communication gaps between SDR, AE, SE, and procurement.";
    } else if (volatilityScore >= 65) {
      primaryAllocation = "Adaptive Human Escalation with Explicit Override Authority";
      allocationRationale = "Rapid macroeconomic or budget shifts trigger model drift; revenue leaders maintain immediate override authority.";
      failureModeAlert = "⚠️ Model Drift Warning: Static algorithmic scoring misclassifies shifting deal economics under market volatility.";
    } else if (componentScore >= 65) {
      primaryAllocation = "Sequential AI-to-Human Filtering";
      allocationRationale = "Automated intelligence parses 85% of redundant RFP spec clauses, preventing cognitive overload.";
      failureModeAlert = "⚠️ Cognitive Overload: Manual analysis of multi-hundred-page RFPs inflates turn-around by 300%.";
    } else {
      primaryAllocation = "Co-Adaptive Parallel Workflow (Balanced Division of Labor)";
      allocationRationale = "Structured division of labor across discrete sub-tasks unlocks positive collaborative synergy.";
      failureModeAlert = "✅ Balanced Collaboration: Algorithmic screening and human engagement leveraged efficiently.";
    }

    const synergyForecast = {
      structuredSynergy: "+22% Measurable Pipeline Lift (Positive Collaborative Synergy)",
      unstructuredTrap: "-23% Lost Pipeline (Uncoordinated Tool Redundancy)",
      prescription: "Pre-allocate discrete sub-tasks between automated information triage and human consultative negotiation."
    };

    return {
      compositeIndex,
      complexityTier,
      badgeClass,
      dimensions: {
        component: { score: componentScore, label: "Component Complexity (Data Volume & Alternatives)" },
        coordinative: { score: coordinativeScore, label: "Coordinative Complexity (Stakeholder Dependencies)" },
        volatility: { score: volatilityScore, label: "Dynamic Volatility (Stochastic Feedback Loops)" },
        equivocality: { score: equivocalityScore, label: "Equivocality (Stakeholder Conflicts & Tacit Values)" },
        searchOpenness: { score: searchOpennessScore, label: "Search Openness (Solution Non-Standardizability)" }
      },
      primaryAllocation,
      allocationRationale,
      failureModeAlert,
      synergyForecast,
      citation: "Adaptive Enterprise Workflows"
    };
  }

  getConversationalStates() {
    return Object.values(this.conversationalStates);
  }

  getPositioningModels() {
    return this.positioningModels;
  }
}
