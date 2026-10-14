/**
 * RevNexus AI - Quantitative Revenue Leakage & Economics Simulator
 * Converts vague business complaints into verified financial models.
 * Calculates stage-by-stage drop-off costs, recovery upside, and sales rep capacity gains.
 */

export class LeakageCalculatorEngine {
  constructor() {
    this.currencySymbol = '₹';
  }

  setCurrency(symbol) {
    this.currencySymbol = symbol;
  }

  /**
   * Calculates comprehensive funnel metrics and recoverable profit
   */
  simulate(params) {
    const {
      monthlyVisitors = 25000,
      visitorToLeadRate = 4.0, // 4%
      leadToQualRate = 25.0,    // 25%
      qualToOppRate = 40.0,     // 40%
      oppToCloseRate = 25.0,    // 25%
      unitProfit = 35000,       // Profit per sale
      salesRepCount = 5,
      avgRepSalary = 50000,     // Monthly cost per rep
      currentSellingPercent = 40, // Salesforce 2026 benchmark: reps spend 40% time selling, 60% admin
      conversionImprovementPp = 2.0 // e.g. +2 percentage points
    } = params;

    // 1. Current Funnel Math
    const totalLeads = Math.round(monthlyVisitors * (visitorToLeadRate / 100));
    const qualifiedLeads = Math.round(totalLeads * (leadToQualRate / 100));
    const opportunities = Math.round(qualifiedLeads * (qualToOppRate / 100));
    const currentWins = Math.max(1, Math.round(opportunities * (oppToCloseRate / 100)));

    const overallConversion = (currentWins / totalLeads) * 100;
    const currentMonthlyProfit = currentWins * unitProfit;
    const currentAnnualProfit = currentMonthlyProfit * 12;

    // 2. Stage-by-Stage Leakage Breakdown
    const leakedLeads = totalLeads - qualifiedLeads;
    const leakedOpps = qualifiedLeads - opportunities;
    const lostDeals = opportunities - currentWins;

    // Financial value of lost opportunities (valued at oppToCloseRate * unitProfit)
    const monthlyOpportunityLeakValue = lostDeals * unitProfit;

    // 3. Simulated Conversion Improvement (+X percentage points on overall conversion)
    const improvedOverallConversion = overallConversion + conversionImprovementPp;
    const improvedWins = Math.round(totalLeads * (improvedOverallConversion / 100));
    const additionalWins = Math.max(0, improvedWins - currentWins);
    const additionalMonthlyProfit = additionalWins * unitProfit;
    const additionalAnnualProfit = additionalMonthlyProfit * 12;

    // 4. Sales Rep Bandwidth & Operational Efficiency Gain
    // Moving selling time from 40% to 65% via automated qualification, objection scripts, and auto-CRM entry
    const standardHoursPerRepMonth = 160;
    const currentSellingHoursPerRep = standardHoursPerRepMonth * (currentSellingPercent / 100);
    const targetSellingPercent = 65;
    const targetSellingHoursPerRep = standardHoursPerRepMonth * (targetSellingPercent / 100);
    const recoveredHoursPerRep = targetSellingHoursPerRep - currentSellingHoursPerRep;
    const totalTeamHoursRecovered = Math.round(recoveredHoursPerRep * salesRepCount);

    // Monetized value of rep capacity freed up
    const repProductivityValueMonthly = Math.round((totalTeamHoursRecovered / standardHoursPerRepMonth) * avgRepSalary);
    const repProductivityValueAnnual = repProductivityValueMonthly * 12;

    // 5. Total Economic Impact
    const totalAnnualValueCreated = additionalAnnualProfit + repProductivityValueAnnual;
    const roiMultiplier = (totalAnnualValueCreated / (avgRepSalary * salesRepCount * 0.15)).toFixed(1);

    return {
      funnelCounts: {
        visitors: monthlyVisitors,
        leads: totalLeads,
        qualified: qualifiedLeads,
        opportunities,
        wins: currentWins
      },
      leakageCounts: {
        unqualifiedLeads: leakedLeads,
        stalledOpportunities: leakedOpps,
        lostDeals
      },
      currentFinancials: {
        overallConversionRate: Number(overallConversion.toFixed(2)),
        monthlyProfit: currentMonthlyProfit,
        annualProfit: currentAnnualProfit,
        monthlyOpportunityLeakValue
      },
      projectedImprovement: {
        improvedConversionRate: Number(improvedOverallConversion.toFixed(2)),
        improvedWins,
        additionalWins,
        additionalMonthlyProfit,
        additionalAnnualProfit
      },
      repProductivity: {
        currentSellingPercent,
        targetSellingPercent,
        hoursRecoveredPerRep: recoveredHoursPerRep,
        totalTeamHoursRecovered,
        repProductivityValueMonthly,
        repProductivityValueAnnual
      },
      totalImpact: {
        totalAnnualValueCreated,
        roiMultiplier: `${roiMultiplier}x`
      }
    };
  }
}
