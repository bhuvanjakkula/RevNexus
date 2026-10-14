/**
 * RevNexus AI — Frontline Sales Triadic Capability & Consultative Matrix
 * 
 * Enterprise Capabilities:
 * - Frontline technical competency, responsiveness, and post-sales coordination.
 * - Triadic capabilities (Analytical, Technical, Relational) replacing intuitive selling with data-informed value creation.
 * - Frontline consultative orientation driving customer value delivery and margin retention.
 */

export class TriadicCapabilityMatrix {
  constructor() {
    this.capabilityDimensions = {
      analytical: {
        name: "Analytical Modeling Skill",
        description: "Ability to construct Total Cost of Ownership (TCO), ROI payback schedules, and energy/efficiency amortization models for CFOs.",
        weight: 0.35,
        citation: "Financial Modeling & TCO Analysis"
      },
      technical: {
        name: "Technical Domain Mastery",
        description: "Fluency in engineering specs, tolerance limits, compliance standards, and component durability in complex B2B sectors.",
        weight: 0.35,
        citation: "Engineering & Technical Fluency"
      },
      relational: {
        name: "Relational Experiential Orientation",
        description: "Customer orientation, consultative discovery, consensus building across divided buying teams, and after-sales stewardship.",
        weight: 0.30,
        citation: "Stakeholder Alignment & Customer Care"
      }
    };

    this.repArchetypes = [
      {
        id: "transactional_pitcher",
        title: "Transactional Feature Pitcher",
        description: "Relies on pre-written pitch decks and aggressive follow-up. Severe deficit in financial modeling and deep technical questions.",
        winRate: "18%",
        riskFactor: "Critical Risk: Buyers perceive as an interchangeable commodity rep.",
        coachingCues: [
          "Mandate TCO calculator training before allowing unsupervised enterprise pitches.",
          "Pair with a Senior Application Engineer on industrial proposals above ₹25 Lakhs.",
          "Shift talk-to-listen ratio from 75/25 to 30/70 during initial discovery."
        ]
      },
      {
        id: "pure_engineer",
        title: "Technical Spec Specialist",
        description: "Excellent technical depth, but struggles to translate engineering specs into executive business value or navigate internal buying politics.",
        winRate: "34%",
        riskFactor: "Moderate Risk: Stalls when CFO or Procurement questions financial payback and contract terms.",
        coachingCues: [
          "Provide Executive Alignment Deck template to map technical specs to CFO balance-sheet gains.",
          "Practice consultative objection handling on price and ROI rather than technical tolerances.",
          "Introduce multi-threading protocol to engage non-technical stakeholders early."
        ]
      },
      {
        id: "consultative_triadic",
        title: "Triadic Value Partner (Modern Benchmark)",
        description: "Balances analytical financial modeling, engineering technical fluency, and empathetic stakeholder alignment.",
        winRate: "68%",
        riskFactor: "Optimal Performance: Aligned with modern benchmark for complex B2B markets.",
        coachingCues: [
          "Deploy on highest-ticket Capex deals and strategic enterprise accounts.",
          "Utilize as mentor for peer ride-alongs and recorded call coaching reviews.",
          "Lead post-purchase handover to ensure continuous after-sales coordination."
        ]
      }
    ];
  }

  evaluateRep(analyticalScore, technicalScore, relationalScore) {
    const compositeScore = Math.round(
      (analyticalScore * 0.35) +
      (technicalScore * 0.35) +
      (relationalScore * 0.30)
    );

    let archetype;
    if (compositeScore >= 75 && analyticalScore >= 65 && technicalScore >= 65) {
      archetype = this.repArchetypes[2]; // consultative_triadic
    } else if (technicalScore > 70 && analyticalScore < 50) {
      archetype = this.repArchetypes[1]; // pure_engineer
    } else {
      archetype = this.repArchetypes[0]; // transactional_pitcher
    }

    return {
      scores: {
        analytical: analyticalScore,
        technical: technicalScore,
        relational: relationalScore,
        composite: compositeScore
      },
      archetype,
      gapAnalysis: {
        analyticalGap: Math.max(0, 80 - analyticalScore),
        technicalGap: Math.max(0, 80 - technicalScore),
        relationalGap: Math.max(0, 80 - relationalScore)
      }
    };
  }

  getArchetypes() {
    return this.repArchetypes;
  }
}
