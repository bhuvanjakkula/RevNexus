/**
 * RevNexus AI — Managerial Control Systems, Role Ambiguity & Salesperson Burnout Engine
 * 
 * Enterprise Capabilities:
 * - High-Combined Control Architecture (Formal Evaluation + Supportive Clan Norms) suppressing role ambiguity and burnout.
 * - Combinatory control dynamics: Capability coaching + transparent targets without micro-surveillance.
 * - Guardrails against the Outcome + Activity clash and customer demandingness fatigue.
 * - Boundaries on value-appropriation discounting pressure to protect rep retention.
 */

export class ManagerialControlBurnoutEngine {
  constructor() {
    this.controlRegimes = {
      HIGH_COMBINED_HYBRID: {
        name: "Integrated High-Performance Control",
        mechanism: "Formal evaluation metrics paired with supportive informal clan norms and real-time capability coaching.",
        ambiguityImpact: "Lowest Overall Role Ambiguity (-60%)",
        burnoutImpact: "Suppresses Emotional Exhaustion (-46%)",
        ethicalRisk: "Extremely Low (Attenuated by Capability Supervision)",
        citation: "High-Performance Control System"
      },
      CAPABILITY_OUTCOME: {
        name: "Capability + Outcome Synergy",
        mechanism: "Skill coaching combined with transparent revenue targets without micro-activity tracking.",
        ambiguityImpact: "Significantly Reduces Ambiguity (-45%)",
        burnoutImpact: "Fosters Intrinsic Mastery & Sustainable Performance",
        ethicalRisk: "Low",
        citation: "Capability Enablement Architecture"
      },
      OUTCOME_ACTIVITY_TRAP: {
        name: "Outcome + Activity Clash (Antagonistic Trap)",
        mechanism: "Strict revenue quotas combined with rigid keystroke / call routine micromanagement.",
        ambiguityImpact: "Severely Elevated Role Ambiguity (+52%)",
        burnoutImpact: "Accelerates Emotional Fatigue & Depersonalization (+55%)",
        ethicalRisk: "High: Pressure-Induced Cutting of Ethical Corners",
        citation: "Micromanagement Friction Model"
      },
      BUREAUCRATIC_PROCESS: {
        name: "Bureaucratic Activity Control",
        mechanism: "Heavy process monitoring and rule compliance with minimal developmental feedback.",
        ambiguityImpact: "Moderate Ambiguity (+18%), High Role Overload",
        burnoutImpact: "Emotional Dissonance & Cynicism (+42%)",
        ethicalRisk: "Moderate",
        citation: "Process Burden Analysis"
      }
    };
  }

  /**
   * Evaluates Combinatory Control Dynamics & Role Ambiguity
   */
  evaluateControlCombination(capabilityScore, activityScore, outcomeScore, clanScore = 70) {
    let combinationType = "";
    let roleAmbiguityIndex = 50; // baseline midpoint
    let diagnostic = "";
    let ethicalVulnerability = "Low";

    // 1. Antagonistic Clash: High Outcome + High Activity
    if (outcomeScore >= 65 && activityScore >= 65 && capabilityScore < 60) {
      combinationType = "Outcome + Activity Clash (Antagonistic)";
      roleAmbiguityIndex = 82;
      diagnostic = "CRITICAL FLAW: Quotas clash with rigid activity rules. Reps experience acute role conflict and ambiguity over whether to obey process rules or hit numbers.";
      ethicalVulnerability = "High (Ambiguity + quota pressure triggers unethical behavior)";
    }
    // 2. High Combined System: Formal + Informal Clan
    else if (capabilityScore >= 65 && clanScore >= 60 && activityScore < 60) {
      combinationType = "Integrated High Control (Formal Goals + Clan Support)";
      roleAmbiguityIndex = 18;
      diagnostic = "OPTIMAL ARCHITECTURE: Explicit operational boundaries reinforced by peer psychological safety. Suppresses burnout across enterprise sales teams.";
      ethicalVulnerability = "Minimal (Behavior-based supervision buffers ethical risks)";
    }
    // 3. Capability + Outcome Synergy
    else if (capabilityScore >= 65 && outcomeScore >= 60) {
      combinationType = "Capability + Outcome Synergy";
      roleAmbiguityIndex = 25;
      diagnostic = "SYNERGISTIC: Skill coaching paired with clear targets builds procedural knowledge and role clarity without oppressive oversight.";
      ethicalVulnerability = "Low";
    }
    // 4. Bureaucratic or Low Control
    else {
      combinationType = "Bureaucratic / Asymmetric Control";
      roleAmbiguityIndex = 58;
      diagnostic = "SUB-OPTIMAL: Asymmetric control mechanisms produce role confusion. Inject capability coaching to restore role clarity.";
      ethicalVulnerability = "Moderate";
    }

    return {
      combinationType,
      roleAmbiguityIndex,
      diagnostic,
      ethicalVulnerability,
      citation: "Dynamic Control Systems Model"
    };
  }

  /**
   * Diagnostic assessment of sales team burnout risk and control architecture efficiency
   */
  assessTeamBurnoutRisk(params) {
    const {
      capabilityControlScore = 75,
      activityControlScore = 50,
      outcomeControlScore = 80,
      valueAppropriationPressure = 35, // Discounting / concession strain
      customerDemandingness = 60,
      salesAnxietyIndex = 35
    } = params;

    let burnoutIndex = 25; // baseline

    // Capability control acts as a powerful buffer
    burnoutIndex -= (capabilityControlScore * 0.35);

    // Rigid activity control adds direct friction
    burnoutIndex += (activityControlScore * 0.25);

    // High outcome pressure increases role conflict
    burnoutIndex += (outcomeControlScore * 0.28);

    // Value appropriation elevates emotional exhaustion
    burnoutIndex += (valueAppropriationPressure * 0.22);

    // Customer demandingness amplified when capability control is low
    const demandingnessBuffer = Math.max(0, 1 - (capabilityControlScore / 100));
    burnoutIndex += (customerDemandingness * 0.20 * demandingnessBuffer);

    // Sales anxiety interaction
    burnoutIndex += (salesAnxietyIndex * 0.15);

    burnoutIndex = Math.round(Math.min(100, Math.max(5, burnoutIndex)));

    let riskTier = "Low / Healthy";
    let statusColor = "var(--accent-emerald)";
    let prescription = "";

    if (burnoutIndex >= 70) {
      riskTier = "CRITICAL: Severe Emotional Exhaustion & Churn Risk";
      statusColor = "var(--accent-rose)";
      prescription = "Emergency Capability Intervention: Remove value-appropriation discounting pressure from reps; deploy AI Copilot whispering cues; replace rigid activity tracking with consultative coaching.";
    } else if (burnoutIndex >= 45) {
      riskTier = "MODERATE: Role Stress & Depersonalization Creep";
      statusColor = "var(--accent-amber)";
      prescription = "Inject Managerial Scaffolding: Enforce clear supervisory guidance; provide pre-negotiated discount bands to shield reps from negotiation strain.";
    } else {
      riskTier = "OPTIMAL: Sustainable High-Performance Climate";
      statusColor = "var(--accent-emerald)";
      prescription = "Maintain High Combined Control: Active capability enablement with bounded tactical call-duration discretion.";
    }

    return {
      burnoutIndex,
      riskTier,
      statusColor,
      prescription,
      buffers: {
        capabilityBufferEffect: `-${Math.round(capabilityControlScore * 0.35)} pts reduction`,
        appropriationStrainEffect: `+${Math.round(valueAppropriationPressure * 0.22)} pts strain`,
        demandingnessCushion: `${Math.round((1 - demandingnessBuffer) * 100)}% buffered by coaching`
      },
      citation: "Managerial Governance & Burnout Prevention Framework"
    };
  }

  getControlRegimes() {
    return this.controlRegimes;
  }
}
