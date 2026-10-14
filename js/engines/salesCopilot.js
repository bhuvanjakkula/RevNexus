/**
 * RevNexus AI - Contextual Sales Copilot Engine
 * Empowers Frontline Sales Teams by solving the 5 Core Practical Questions:
 * 1. Whom should I contact? (Job Function & Priority Routing)
 * 2. What should I say? (Role-Aware Objection Rebuttals & Value Scripts)
 * 3. Who is most likely to buy? (Predictive Win Propensity Matrix by Job Function)
 * 4. What's my next follow-up? (Role-Tailored Multi-Channel Anti-Ghosting Cadence)
 * 5. Why am I losing deals? (Root Cause Diagnostic & CRM Workflow Enforcement)
 */

export class SalesCopilotEngine {
  constructor() {
    // 5 Core Enterprise Buyer Job Functions
    this.jobFunctions = {
      executive_sponsor: {
        id: "executive_sponsor",
        title: "Executive Sponsor / C-Suite",
        personas: "CEO, Managing Director, Founder, President",
        decisionWeight: "Ultimate Economic Sign-off",
        corePriority: "Board ROI, Market Share, Strategic Risk Offloading",
        buyingTriggers: "Quantifiable payback under 60 days, competitive moat, zero administrative drag.",
        objectionTendency: "Delegates to subordinates; questions strategic differentiation.",
        baseWinPropensity: 86,
        avgCycleDays: 18,
        recommendedPlaybook: "Deliver 1-page Executive Briefing focused on Net Revenue Impact and Risk Transfer."
      },
      finance_buyer: {
        id: "finance_buyer",
        title: "CFO / Finance Director",
        personas: "CFO, VP Finance, Commercial Controller",
        decisionWeight: "Budget Authority & Capital Allocation",
        corePriority: "Capital Efficiency, TCO, Quantified Cost of Inaction (COI)",
        buyingTriggers: "Verifiable mathematical payback model, cash flow neutrality, predictable ROI.",
        objectionTendency: "Pushes for 20-40% discount, delays approval until next budget cycle.",
        baseWinPropensity: 74,
        avgCycleDays: 28,
        recommendedPlaybook: "Supply interactive TCO payback model proving that delay costs 3x the software price."
      },
      commercial_champion: {
        id: "commercial_champion",
        title: "VP Sales / RevOps Director",
        personas: "VP Sales, Chief Commercial Officer, Head of RevOps",
        decisionWeight: "Operational Buyer & Champion",
        corePriority: "Quota Attainment, Pipeline Velocity, Rep Burnout Prevention",
        buyingTriggers: "Sub-5m lead response automation, elimination of CRM admin friction, instant rep adoption.",
        objectionTendency: "Worries about change management friction and frontline team resistance.",
        baseWinPropensity: 82,
        avgCycleDays: 21,
        recommendedPlaybook: "Demonstrate frontline workflow simulation showing 2.8 hrs/day rep time savings."
      },
      technical_evaluator: {
        id: "technical_evaluator",
        title: "CTO / IT Director / Security Architect",
        personas: "CTO, VP Engineering, Chief Information Security Officer (CISO)",
        decisionWeight: "Technical & Security Gatekeeper",
        corePriority: "API Reliability, Post-Quantum Cryptography, SOC2/ISO Compliance",
        buyingTriggers: "Seamless CRM/ERP bi-directional sync, zero downtime, robust encryption architecture.",
        objectionTendency: "Requests protracted security questionnaires; prefers building in-house.",
        baseWinPropensity: 65,
        avgCycleDays: 35,
        recommendedPlaybook: "Provide self-service Architecture Whitepaper, SOC2 summary, and Sandbox API keys immediately."
      },
      procurement_gatekeeper: {
        id: "procurement_gatekeeper",
        title: "Head of Procurement / Sourcing",
        personas: "Director of Procurement, Vendor Manager, Sourcing Lead",
        decisionWeight: "Commercial Terms & Contract Compliance",
        corePriority: "Contract Velocity, Price Parity, Strict SLA Penalties",
        buyingTriggers: "Transparent tier pricing, standardized master service agreements (MSA), compliance clearance.",
        objectionTendency: "Enforces commoditization, compares with budget low-tier alternatives.",
        baseWinPropensity: 48,
        avgCycleDays: 45,
        recommendedPlaybook: "Provide vendor compliance packet with pre-signed SLA guarantees and volume tier options."
      },
      multi_stakeholder_committee: {
        id: "multi_stakeholder_committee",
        title: "Cross-Functional Buying Committee",
        personas: "3+ Evaluators (Finance + Tech + Commercial)",
        decisionWeight: "Consensus Voting & Veto Powers",
        corePriority: "Stakeholder Alignment & Mutual Consensus",
        buyingTriggers: "Unified consensus briefing that satisfies all 3 scorecards simultaneously.",
        objectionTendency: "Internal deadlock; competing departmental goals stall momentum.",
        baseWinPropensity: 38,
        avgCycleDays: 60,
        recommendedPlaybook: "Run a Joint Consensus Briefing aligning CFO ROI, CTO Architecture, and VP Sales Quota."
      }
    };

    this.objectionLibrary = {
      price_objection: {
        title: "Price Too High / No Budget",
        rootCause: "Unclear economic value, risk aversion, or comparing with commoditized low-end alternatives.",
        psychology: "The prospect is saying: 'The perceived risk of spending this money is higher than the pain of doing nothing.'",
        rebuttalFramework: "Isolate -> Reframe to Cost of Inaction (COI) -> Phased Risk Reversal",
        suggestedPitch: `“I completely respect that budget discipline is non-negotiable right now, [Name]. In fact, most of our current partners in [Industry] initially said the exact same thing before seeing the numbers. The reality is that [Primary Leakage] is silently costing you an estimated 3x to 5x this investment every single quarter in lost customer conversion. If we can demonstrate a mathematical payback model within 60 days, would it make sense to review the economics together?”`,
        killerQuestion: "“Aside from the upfront capital, is there any reason you wouldn't want to eliminate this leakage immediately?”"
      },
      think_about_it: {
        title: "“I Need to Think About It” / Indecision",
        rootCause: "Unresolved hidden risk, fear of internal embarrassment, or lack of compelling deadline.",
        psychology: "Polite deferral concealing an unvoiced objection or missing stakeholder buy-in.",
        rebuttalFramework: "Validate -> Disarm -> Expose the Unspoken Hesitation",
        suggestedPitch: `“That makes total sense, [Name]. A decision like this deserves careful thought. When executives tell me they need to think it over, it's usually because of one of two things: either the timing genuinely isn't feasible, or there's a specific question or internal stakeholder concern that I haven't addressed clearly enough. Between the two, which one is it for you right now?”`,
        killerQuestion: "“When you speak with your team about this, what is the single biggest risk or doubt they are likely to raise?”"
      },
      competitor_comparison: {
        title: "“Competitor X is 50% Cheaper”",
        rootCause: "Product differentiation failure; perceived as a feature-for-feature commodity.",
        psychology: "Commodity trap: buyer sees no outcome difference, so price becomes the only variable.",
        rebuttalFramework: "Acknowledge -> Contrast Business Outcome vs Feature Checklist -> Highlight Hidden Churn Costs",
        suggestedPitch: `“Competitor X has built a decent tool if you only need basic surface-level tracking. The main reason organizations migrate from them to us is because their system lacks workflow orchestration, meaning your sales team still wastes 60% of their day on manual coordination. That hidden labor cost wipes out the software savings within 90 days. Are you looking for the lowest sticker price or the highest net profit return?”`,
        killerQuestion: "“If the cheaper option fails to solve your lead leakage, what is the financial impact on your annual quota?”"
      },
      committee_conflict: {
        title: "Internal Team Conflict / Divided Board",
        rootCause: "Internal buying committee conflict; misaligned departmental metrics.",
        psychology: "Each executive (CFO vs VP Sales vs CTO) is protecting their own distinct scorecard.",
        rebuttalFramework: "Multi-Stakeholder Consensus Mapping -> Offer Custom Executive Briefing",
        suggestedPitch: `“Internal misalignment is actually the number one reason purchase decisions stall today—Finance worries about cash flow, Operations worries about implementation disruption, and Sales wants immediate revenue. We've built an Executive Alignment Briefing that maps the exact wins for each department so you don't have to carry the burden of convincing them alone. Shall we prepare that customized breakdown for your next meeting?”`,
        killerQuestion: "“Who on the committee is currently the most skeptical, and what metric would they need to see to say yes?”"
      },
      trust_deficit: {
        title: "“Will It Really Work for Us?” / Trust Deficit",
        rootCause: "Past failed vendor implementations, cynicism from over-promising software.",
        psychology: "Fear of personal career blame if the implementation fails.",
        rebuttalFramework: "Acknowledge Skepticism -> Scoped Validation Pilot -> Performance Guardrail",
        suggestedPitch: `“I don't expect you to take my word for it. In fact, after seeing so many vendors overpromise, healthy skepticism is the smartest stance. That is why we offer a 14-day scoped validation pilot with agreed KPIs. If we don't deliver the verified baseline uplift, you pay nothing. We bear the execution risk, not you. Would that give your team complete peace of mind?”`,
        killerQuestion: "“What would undeniable, verified proof of success look like in your dashboard after the first 30 days?”"
      }
    };

    this.followUpCadences = [
      {
        step: 1,
        timeframe: "Within 5 Minutes of Inbound",
        channel: "Direct Phone / WhatsApp",
        objective: "Capitalize on high-intent momentum before lead decay kicks in",
        template: "“Hi [Name], saw your inquiry regarding [Topic]. I pulled up your industry benchmarks and spotted 2 immediate revenue leaks. Have 2 minutes to review them quickly?”"
      },
      {
        step: 2,
        timeframe: "Day 2 (Follow-up + Value Proof)",
        channel: "Email with 1-page Micro Case Study",
        objective: "Provide credibility without asking for a commitment",
        template: "“Hey [Name], thought this might help your team: here is how [Similar Company] in [Industry] recovered [Metric] in 45 days without adding head count. Check page 2 for their exact workflow.”"
      },
      {
        step: 3,
        timeframe: "Day 5 (Multi-Stakeholder Perspective)",
        channel: "Email + LinkedIn Touch",
        objective: "Address committee conflict and provide decision frameworks",
        template: "“Hi [Name], when leadership teams evaluate this, CFOs usually ask about payback while VPs ask about adoption speed. I mapped out the answers to both here: [Link]. Happy to share details.”"
      },
      {
        step: 4,
        timeframe: "Day 10 (Direct Friction Check)",
        channel: "Short SMS or Direct Message",
        objective: "Test whether timing or priorities shifted",
        template: "“Hey [Name], checking in—did your priorities shift for this quarter, or should we revisit next month?”"
      },
      {
        step: 5,
        timeframe: "Day 18 (Graceful Break-Up Email)",
        channel: "Email",
        objective: "Psychological takeaway; often generates highest response rate (32%)",
        template: "“Hi [Name], haven't heard back, so I assume this isn't a priority right now. I'll close out your file so I don't clutter your inbox. If you ever want to revisit fixing [Leakage], my door is open. Wishing you all the best!”"
      }
    ];

    this.roleFollowUpScripts = {
      executive_sponsor: {
        step1: {
          channel: "Direct Phone Call / WhatsApp",
          subject: "Urgent: Revenue leakage benchmark for [Company]",
          opener: "“Hello [Name], saw your executive inquiry regarding scaling pipeline conversion at [Company]. We benchmarked your vertical against top performers and identified a potential 18% recovery in dropped inbound revenue. Have 3 minutes for a high-level summary?”"
        },
        step2: {
          channel: "Executive Email",
          subject: "1-Page Financial Impact Briefing for [Company]",
          opener: "“Hi [Name], following up on our initial touch. Attached is a 1-page executive summary outlining how peer enterprise leaders achieved a 60-day payback and cut response latency from 45 mins down to 3 mins. Would an 8-minute briefing with your RevOps lead make sense this week?”"
        },
        step3: {
          channel: "Email + LinkedIn Touch",
          subject: "Board-level revenue protection playbook",
          opener: "“Hi [Name], as you review quarterly growth initiatives, here is how other CEOs eliminate the hidden 70% pipeline drop-off without expanding headcount. Happy to share our private benchmark model whenever you're ready.”"
        },
        step4: {
          channel: "Direct SMS / WhatsApp",
          subject: "Quick check on quarterly priorities",
          opener: "“Hi [Name], understand board priorities shift quickly. Should we hold off on the pipeline audit for [Company] until next quarter, or is revenue recovery still top of mind?”"
        },
        step5: {
          channel: "Graceful Break-Up Email",
          subject: "Closing out file: [Company] Revenue Recovery",
          opener: "“Hi [Name], haven't heard back, so I assume scaling pipeline automation isn't a current focus. I will close out your file to keep your inbox clean. If you ever need to eliminate inbound drop-off in the future, feel free to reach out anytime. Best regards!”"
        }
      },
      finance_buyer: {
        step1: {
          channel: "Direct Call / Email",
          subject: "TCO & Cost of Inaction (COI) model for [Company]",
          opener: "“Hello [Name], noticed your team's evaluation. We compiled an economic impact audit showing that every month of delayed inbound triage costs [Company] approximately ₹8.5L in unrecovered pipeline. Do you have 5 minutes to inspect the math?”"
        },
        step2: {
          channel: "Financial Briefing Email",
          subject: "Verified 60-Day Payback Calculator for [Company]",
          opener: "“Hi [Name], CFOs we partner with require strict capital neutrality before moving forward. Attached is our interactive ROI & Payback calculator showing cash-flow breakeven by Day 42. Would you like our finance team to validate the assumptions with your model?”"
        },
        step3: {
          channel: "Email",
          subject: "Risk-mitigated commercial terms & staged rollout",
          opener: "“Hi [Name], to eliminate budget risk, we offer phased milestones where licensing scales only after initial ROI targets are verified in your CRM. Can we review this structure on a brief 10-minute call?”"
        },
        step4: {
          channel: "Direct Email / SMS",
          subject: "Budget cycle alignment for [Company]",
          opener: "“Hi [Name], checking in—has your capital allocation for revenue infrastructure been committed for this quarter, or should we align with your Q2 budget window?”"
        },
        step5: {
          channel: "Break-Up Email",
          subject: "Releasing budget hold for [Company]",
          opener: "“Hi [Name], since we haven't connected, I'm releasing the reserved promotional tier pricing for [Company] back to the queue. If you want to revisit the economic business case later this year, I'll be glad to help. All the best!”"
        }
      },
      commercial_champion: {
        step1: {
          channel: "Phone / High-Priority WhatsApp",
          subject: "Fast-Track: Rescuing dropped inbound leads",
          opener: "“Hi [Name], saw your inquiry. Right now, 73% of inbound prospects buy from the vendor that calls within 5 minutes. We can instantly put automated response sentinels on your team's pipeline. Have 2 minutes to see how reps use it?”"
        },
        step2: {
          channel: "Email with Rep Workflow Video",
          subject: "How reps save 2.5 hours/day of administrative overhead",
          opener: "“Hey [Name], wanted to share how sales teams in [Industry] eliminated manual CRM logging and automated objection handling on live calls. Here is a 90-second workflow clip. When are you free to test-drive this with 2 of your top reps?”"
        },
        step3: {
          channel: "Email + Slack / WhatsApp",
          subject: "Overcoming buying committee hesitation",
          opener: "“Hi [Name], often sales leaders love the platform but face slow approvals from Finance or IT. I put together an internal stakeholder slide deck you can present in 5 minutes to get instant green-light approval. Shall I send it over?”"
        },
        step4: {
          channel: "Short WhatsApp / SMS",
          subject: "Quick check: team bandwidth",
          opener: "“Hey [Name], are your reps still struggling with response delays, or did you find an alternative way to patch the leak? Let me know if you'd like a quick sanity check.”"
        },
        step5: {
          channel: "Break-Up Email",
          subject: "Permission to close your ticket",
          opener: "“Hi [Name], looks like timing might not be ideal right now. I'll archive our notes so I don't crowd your schedule. If quota pressure rises and you want to deploy sub-5m routing, ping me anytime!”"
        }
      },
      technical_evaluator: {
        step1: {
          channel: "Technical Direct Email",
          subject: "API Specs, Architecture & SOC2 Compliance for [Company]",
          opener: "“Hello [Name], saw your evaluation request. Rather than sales decks, here are our direct REST API endpoints, webhooks documentation, and post-quantum encryption specs. Do you have 5 minutes to review our integration sandbox?”"
        },
        step2: {
          channel: "Email with Sandbox Credentials",
          subject: "Instant Sandbox Access + CRM Connector Docs",
          opener: "“Hi [Name], I've provisioned a dedicated sandbox tenant for your engineering team with pre-configured Salesforce/HubSpot mock pipelines. Let me know if you need our lead architect on a 15-minute technical deep-dive.”"
        },
        step3: {
          channel: "Technical Check-In",
          subject: "Security review clearance for [Company]",
          opener: "“Hi [Name], following up on your compliance review. We have pre-filled CAIQ and SOC2 Type II audit packages ready to upload to your vendor portal to save your team hours of questionnaire work.”"
        },
        step4: {
          channel: "Direct Email",
          subject: "Architecture roadmap query",
          opener: "“Hi [Name], checking if your integration roadmap shifted this sprint. Did you have any questions regarding our sub-second latency guarantees?”"
        },
        step5: {
          channel: "Break-Up Email",
          subject: "Deactivating sandbox environment for [Company]",
          opener: "“Hi [Name], since we haven't heard back, our DevOps team will spin down the inactive sandbox tenant for [Company] this Friday. Let me know if you want us to extend it. Best regards!”"
        }
      },
      procurement_gatekeeper: {
        step1: {
          channel: "Commercial Direct Email",
          subject: "Vendor Onboarding Packet & MSA for [Company]",
          opener: "“Hello [Name], reaching out regarding vendor qualification for [Company]. We have pre-approved enterprise MSAs, compliance certs, and transparent tier pricing ready for expedited onboarding. Who is the best contact to receive the pack?”"
        },
        step2: {
          channel: "Email with Pricing Tiers",
          subject: "Enterprise Volume Tiering & SLA Guarantees",
          opener: "“Hi [Name], attached are our enterprise volume discount tiers with 99.95% uptime SLAs and penalty-backed performance guarantees. Would you like to schedule 10 minutes to finalize contract terms?”"
        },
        step3: {
          channel: "Procurement Follow-Up",
          subject: "Contract redline status: [Company] agreement",
          opener: "“Hi [Name], checking on the legal review status. We have accepted standard customer indemnity terms to accelerate sign-off. Let me know if any clauses require clarification.”"
        },
        step4: {
          channel: "Direct Follow-Up",
          subject: "Pricing validity deadline for [Company]",
          opener: "“Hi [Name], our quoted volume terms are locked through month-end. Please confirm if purchase order processing is on track so we can hold this tier for your account.”"
        },
        step5: {
          channel: "Break-Up Email",
          subject: "Closing procurement ticket: [Company]",
          opener: "“Hi [Name], closing out this procurement request as inactive. We will archive the contract drafts. Feel free to re-open whenever your sourcing team is ready. Thank you!”"
        }
      }
    };
  }

  getJobFunctions() {
    return Object.values(this.jobFunctions);
  }

  getJobFunction(id) {
    return this.jobFunctions[id] || this.jobFunctions.executive_sponsor;
  }

  /**
   * Evaluates Win Propensity dynamically based on Buyer Job Function and deal variables
   */
  calculateWinPropensity({
    jobFunction = "executive_sponsor",
    budgetStatus = "confirmed",      // "confirmed", "contingent", "unfunded"
    timeline = "immediate",          // "immediate", "planned", "exploring"
    committeeConsensus = "aligned",  // "aligned", "moderate", "divided"
    dealSize = 500000
  }) {
    const role = this.getJobFunction(jobFunction);
    let score = role.baseWinPropensity;
    let cycleDays = role.avgCycleDays;

    // Budget Modifier
    if (budgetStatus === "confirmed") {
      score += 6;
      cycleDays -= 3;
    } else if (budgetStatus === "contingent") {
      score -= 8;
      cycleDays += 7;
    } else {
      score -= 24;
      cycleDays += 18;
    }

    // Timeline Urgency Modifier
    if (timeline === "immediate") {
      score += 8;
      cycleDays -= 5;
    } else if (timeline === "planned") {
      score += 0;
    } else {
      score -= 16;
      cycleDays += 20;
    }

    // Committee Consensus / Conflict Modifier
    if (committeeConsensus === "aligned") {
      score += 5;
      cycleDays -= 2;
    } else if (committeeConsensus === "moderate") {
      score -= 10;
      cycleDays += 10;
    } else {
      // Divided Committee
      score -= 28;
      cycleDays += 25;
    }

    score = Math.min(96, Math.max(12, Math.round(score)));
    cycleDays = Math.max(7, Math.round(cycleDays));

    let tierTag = "Standard Velocity";
    let badgeClass = "badge-beta";
    let priorityAction = "";

    if (score >= 78) {
      tierTag = "Fast-Track Win (High Propensity)";
      badgeClass = "badge-alpha";
      priorityAction = "🚀 Immediate VIP Engagement: Send tailored Executive Impact Briefing & lock calendar.";
    } else if (score >= 55) {
      tierTag = "Value-Nurture (ROI Dependent)";
      badgeClass = "badge-beta";
      priorityAction = "⚡ Consultative Verification: Provide 60-day interactive payback model to resolve budget caution.";
    } else {
      tierTag = "High Slippage Risk";
      badgeClass = "badge-omega";
      priorityAction = "⚠️ Buying Committee Deadlock Warning: Trigger multi-stakeholder consensus workshop immediately.";
    }

    return {
      jobFunctionId: role.id,
      jobFunctionTitle: role.title,
      personas: role.personas,
      winPropensity: score,
      avgCycleDays: cycleDays,
      tierTag,
      badgeClass,
      corePriority: role.corePriority,
      buyingTriggers: role.buyingTriggers,
      recommendedPlaybook: role.recommendedPlaybook,
      priorityAction
    };
  }

  /**
   * Generates Role-Tailored Next Best Follow-Up Script
   */
  getRoleTailoredFollowUp({
    jobFunction = "executive_sponsor",
    stage = 1,
    channel = "phone",
    recipientName = "[Name]",
    companyName = "[Company]"
  }) {
    const roleScripts = this.roleFollowUpScripts[jobFunction] || this.roleFollowUpScripts.executive_sponsor;
    const stepKey = `step${stage}`;
    const stepData = roleScripts[stepKey] || roleScripts.step1;
    const generalCadence = this.followUpCadences[stage - 1] || this.followUpCadences[0];

    let scriptText = stepData.opener
      .replace(/\[Name\]/g, recipientName)
      .replace(/\[Company\]/g, companyName)
      .replace(/\[Industry\]/g, "your industry")
      .replace(/\[Topic\]/g, "pipeline automation")
      .replace(/\[Metric\]/g, "₹18L in recoverable pipeline")
      .replace(/\[Leakage\]/g, "response latency leakage");

    return {
      stage: generalCadence.step,
      timeframe: generalCadence.timeframe,
      objective: generalCadence.objective,
      channel: stepData.channel || generalCadence.channel,
      subject: stepData.subject.replace(/\[Company\]/g, companyName),
      script: scriptText,
      jobFunctionTitle: (this.jobFunctions[jobFunction] || {}).title || "Executive Buyer"
    };
  }

  getObjectionGuidance(type) {
    return this.objectionLibrary[type] || this.objectionLibrary.price_objection;
  }

  getFollowUpCadence() {
    return this.followUpCadences;
  }

  diagnoseDealLoss(reasonCode) {
    const diagnostics = {
      price_lost: {
        category: "Value Gap / Differentiation",
        responsible: "Marketing & Sales Enablement",
        atRiskPersona: "CFO / Finance Gatekeeper",
        rootCause: "Sales rep pitched features instead of Cost of Inaction (COI); lack of ROI proof collateral.",
        correctiveAction: "Implement mandatory 2-minute ROI calculator during discovery stage; forbid quote sending without quantified business case."
      },
      ghosted_demo: {
        category: "Process & Follow-up Friction",
        responsible: "Sales Cadence & Lead Qualification",
        atRiskPersona: "VP Sales / Commercial Champion",
        rootCause: "Unqualified demo scheduled without authority check; response lag allowed prospect excitement to cool.",
        correctiveAction: "Implement 5-minute automated WhatsApp meeting lock-in; require 2-question qualification gate prior to demo."
      },
      competitor_won: {
        category: "Product & Market Positioning",
        responsible: "Product Strategy & Marketing",
        atRiskPersona: "Director of Procurement",
        rootCause: "Prospect perceived both products as identical commodities and chose lower price or brand familiarity.",
        correctiveAction: "Update sales battlecard highlighting workflow integration depth; establish 3 unique non-negotiable differentiator hooks."
      },
      internal_gridlock: {
        category: "Buying Committee Conflict (Gartner 74%)",
        responsible: "Enterprise Sales Methodology",
        atRiskPersona: "Cross-Functional Buying Committee",
        rootCause: "Rep only spoke with single champion; failed to engage Finance/Operations stakeholders early.",
        correctiveAction: "Mandate multi-threading protocol: automatically trigger CFO-specific business case deck whenever deal exceeds target threshold."
      },
      product_gap: {
        category: "Product-Market Fit Defect",
        responsible: "Product Engineering Roadmap",
        atRiskPersona: "CTO / Technical Evaluator",
        rootCause: "Crucial integration, compliance standard, or ease-of-use feature missing in current version.",
        correctiveAction: "Route loss reason directly to Product backlog with estimated revenue loss metric to prioritize sprint fixes."
      }
    };

    return diagnostics[reasonCode] || diagnostics.price_lost;
  }
}
