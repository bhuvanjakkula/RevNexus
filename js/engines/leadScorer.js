/**
 * RevNexus AI - Multi-Vector Lead Qualification & Intent Momentum Engine
 * Solves: "Whom should I contact?" and "Which customer is most likely to purchase?"
 * Integrates Gartner 2025/2026 B2B buyer research & response-latency decay physics
 */

export class LeadScoringEngine {
  constructor() {
    // Decay factor per minute of delay past the golden 5-minute window
    this.decayRate = 0.012; 
  }

  /**
   * Evaluates a lead across 4 mathematical vectors:
   * 1. ICP Fit Vector (0 - 35 pts)
   * 2. Intent Momentum Vector (0 - 35 pts)
   * 3. Buying Committee Friction Vector (-25 to 0 pts)
   * 4. Time Decay Factor (exponential multiplier based on elapsed response time)
   */
  scoreLead(lead) {
    const {
      companySize = 50,
      authority = 'decision_maker', // 'decision_maker', 'influencer', 'end_user', 'student'
      budgetConfirmed = true,
      timeline = 'immediate', // 'immediate' (<14d), '1_month', 'quarter', 'exploring'
      touchpoints = 3,
      visitedPricing = true,
      committeeSize = 3, // Number of stakeholders
      committeeConflict = 'low', // 'low', 'medium', 'high'
      latencyMinutes = 4 // Minutes since inquiry submitted
    } = lead;

    // Vector 1: ICP Fit
    let icpScore = 0;
    if (authority === 'decision_maker') icpScore += 18;
    else if (authority === 'influencer') icpScore += 12;
    else if (authority === 'end_user') icpScore += 6;

    if (budgetConfirmed) icpScore += 12;
    else icpScore += 4;

    if (companySize >= 100) icpScore += 10;
    else if (companySize >= 20) icpScore += 8;
    else icpScore += 5;

    icpScore = Math.min(35, icpScore);

    // Vector 2: Intent Momentum
    let intentScore = 0;
    if (timeline === 'immediate') intentScore += 18;
    else if (timeline === '1_month') intentScore += 12;
    else if (timeline === 'quarter') intentScore += 6;
    else intentScore += 2;

    if (visitedPricing) intentScore += 9;
    intentScore += Math.min(8, touchpoints * 2);
    intentScore = Math.min(35, intentScore);

    // Vector 3: Buying Committee Friction & Conflict Risk (Gartner: 74% conflict)
    let conflictPenalty = 0;
    if (committeeConflict === 'high') {
      conflictPenalty += 18;
    } else if (committeeConflict === 'medium') {
      conflictPenalty += 9;
    }

    if (committeeSize > 6) {
      conflictPenalty += 7; // Massive buying committee increases stalled deal probability
    } else if (committeeSize >= 4) {
      conflictPenalty += 3;
    }

    // Base Propensity Score (0 - 100)
    const rawScore = Math.max(5, (icpScore + intentScore + 30) - conflictPenalty);

    // Vector 4: Latency Half-Life Decay Multiplier
    // Research shows 73% of B2B buyers choose the first relevant supplier to respond.
    // If response is within 5 minutes, decay is 1.0. Thereafter, decays exponentially.
    const effectiveLag = Math.max(0, latencyMinutes - 5);
    const latencyMultiplier = Math.max(0.25, Math.exp(-this.decayRate * effectiveLag));
    const compositeScore = Math.round(Math.min(100, rawScore * latencyMultiplier));

    // Dynamic Categorization
    let tier = 'Delta';
    let badgeClass = 'badge-gamma';
    let prescription = '';
    let winProbability = Math.round(compositeScore * 0.72) + '%';

    if (compositeScore >= 80) {
      tier = 'Platinum Alpha';
      badgeClass = 'badge-alpha';
      prescription = '🚀 IMMEDIATE HOT ACTION: Call within 3 mins + Send VIP ROI briefing to decision maker.';
    } else if (compositeScore >= 60) {
      tier = 'Warm Beta';
      badgeClass = 'badge-beta';
      prescription = '⚡ HIGH PRIORITY: Consultative discovery call within 2 hours + Share relevant industry case study.';
    } else if (compositeScore >= 40) {
      tier = 'Nurture Gamma';
      badgeClass = 'badge-gamma';
      prescription = '📬 ASYNC NURTURE: Enroll in automated value-sequence. Save live sales rep bandwidth.';
    } else {
      tier = 'Disqualify Omega';
      badgeClass = 'badge-omega';
      prescription = '🚫 AUTOMATED SELF-SERVE / DISQUALIFY: Zero live rep effort. Avoid wasting sales capacity.';
    }

    return {
      compositeScore,
      rawScore,
      latencyMultiplier: Number(latencyMultiplier.toFixed(2)),
      latencyDecayPercent: Math.round((1 - latencyMultiplier) * 100),
      tier,
      badgeClass,
      winProbability,
      prescription,
      breakdown: {
        icpScore,
        intentScore,
        conflictPenalty,
        effectiveLagMinutes: effectiveLag
      }
    };
  }
}
