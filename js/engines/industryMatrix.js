/**
 * RevNexus AI - 32 Industry Knowledge Engine & Pain Point Matrix (2026 Edition)
 * Based on comprehensive B2B + B2C global & Indian market research
 */

export const INDUSTRY_DATABASE = [
  {
    id: "real_estate",
    name: "Real Estate & Property Development",
    category: "B2C / High-Ticket",
    commonPains: "Low-intent browsing leads, broker duplication, missed site visits, long financing delays.",
    rootCauses: "Low barrier to online portal inquiries, emotional decision without financing pre-check, lack of rapid follow-up.",
    salespersonImpact: "Over 75% of sales time wasted chasing uncontactable browsers who never attend booked site visits.",
    highValueIntervention: "Instant WhatsApp qualification bot, financial feasibility pre-check, automated calendar site-visit scheduling with SMS ride credits.",
    benchmarkConv: "1.8%",
    avgDealValue: "₹85,00,000 / $120,000",
    leakageFocus: "Site Visit No-Shows & Slow Response Decay",
    icon: "home"
  },
  {
    id: "healthcare_clinics",
    name: "Healthcare Clinics & Specialized Centers",
    category: "B2C / Services",
    commonPains: "Patient trust barriers, appointment no-shows (25-35%), scheduling friction, post-consult drop-off.",
    rootCauses: "Anxiety regarding procedures, complex pricing, manual phone booking with busy reception lines.",
    salespersonImpact: "Clinic coordinators face awkward sales pushback; aggressive selling damages clinical reputation.",
    highValueIntervention: "Consent-based conversational booking, automated multi-channel appointment confirmations, transparent procedure cost calculator.",
    benchmarkConv: "8.5%",
    avgDealValue: "₹18,000 / $350",
    leakageFocus: "Appointment No-Shows & Consult Friction",
    icon: "activity"
  },
  {
    id: "education_coaching",
    name: "Education, EdTech & Test Prep",
    category: "B2C / B2B",
    commonPains: "Low-quality admission inquiries, counseling delays, fee objections, parent skepticism.",
    rootCauses: "Free demo registrations with zero intent; counselors pitching features instead of career outcomes.",
    salespersonImpact: "Counselors face aggressive parent price objections and low answer rates (under 20% pickup).",
    highValueIntervention: "Skill assessment diagnostic gate, outcome-based video proof, automated counselor round-robin with instant callback.",
    benchmarkConv: "3.2%",
    avgDealValue: "₹65,000 / $1,200",
    leakageFocus: "Demo-to-Enrollment Drop-off",
    icon: "book"
  },
  {
    id: "insurance",
    name: "Insurance (Life, Health, General)",
    category: "B2C / Financial",
    commonPains: "Trust deficit, policy complexity, poor-fit customer complaints, lapsed renewals.",
    rootCauses: "Commission-driven mis-selling, opaque policy exclusion clauses, transactional mindset.",
    salespersonImpact: "Agents face persistent rejection ('I'll think about it') and high lapse rate eroding clawback commissions.",
    highValueIntervention: "Suitability-focused advisory workflow, visual claim-settlement transparency score, automated renewal grace alerts.",
    benchmarkConv: "2.4%",
    avgDealValue: "₹35,000 / $600 / yr",
    leakageFocus: "First-Year Policy Renewal Lapse",
    icon: "shield"
  },
  {
    id: "banking_lending",
    name: "Banking & Lending (MSME / Retail)",
    category: "B2B / B2C",
    commonPains: "Lengthy documentation, eligibility uncertainty, KYC drop-offs, application abandonment.",
    rootCauses: "Complex underwriting forms, manual physical document collection, slow credit sanction turnaround.",
    salespersonImpact: "Loan officers spend 65% of their day chasing missing bank statements and GST filings.",
    highValueIntervention: "Digital account aggregator integration, instant eligibility check in 60s, automated WhatsApp document locker.",
    benchmarkConv: "4.1%",
    avgDealValue: "₹5,00,000 / $15,000",
    leakageFocus: "Mid-Application Document Abandonment",
    icon: "dollar-sign"
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Direct-to-Consumer (D2C)",
    category: "B2C / Retail",
    commonPains: "70% cart abandonment (Baymard 2026), exorbitant CAC, high return-to-origin (RTO), price competition.",
    rootCauses: "Unexpected shipping/tax fees at checkout, forced account creation, lack of social proof on checkout page.",
    salespersonImpact: "Support team overwhelmed with 'Where is my order?' (WISMO) and return dispute handling.",
    highValueIntervention: "1-Click checkout, proactive exit-intent risk reversal, automated RTO verification for Cash-on-Delivery.",
    benchmarkConv: "2.1%",
    avgDealValue: "₹2,800 / $65",
    leakageFocus: "Checkout Abandonment (70% benchmark)",
    icon: "shopping-bag"
  },
  {
    id: "retail_stores",
    name: "Physical Retail & Multi-Brand Outlets",
    category: "B2C / Physical",
    commonPains: "Walk-in without purchase, stockouts on floor, zero post-visit data capture, showrooming.",
    rootCauses: "Untrained floor staff, disconnected POS and warehouse inventory, lack of customer phone capture.",
    salespersonImpact: "Store reps act as passive cashiers rather than consultative brand advocates.",
    highValueIntervention: "QR-based digital loyalty & digital receipting, omni-channel endless aisle ordering, clienteling app for staff.",
    benchmarkConv: "18.0%",
    avgDealValue: "₹4,200 / $80",
    leakageFocus: "Uncaptured Walk-In Footfall",
    icon: "shopping-cart"
  },
  {
    id: "fmcg",
    name: "FMCG & Packaged Consumer Goods",
    category: "B2B / Wholesale",
    commonPains: "Distributor coverage gaps, retail shelf stockouts, slow secondary sales data, payment collection friction.",
    rootCauses: "Manual sales rep beats, paper order books, delayed reporting from tier-2/3 distributor networks.",
    salespersonImpact: "Field reps spend majority of shop visits scribbling handwritten replenishment orders instead of cross-selling.",
    highValueIntervention: "Automated distributor stock alert portal, WhatsApp B2B ordering bot for kirana/retailers, predictive replenishment.",
    benchmarkConv: "35.0%",
    avgDealValue: "₹1,20,000 / $2,000",
    leakageFocus: "Distributor Stockouts & Collection Delays",
    icon: "package"
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals & Healthcare Supply",
    category: "B2B / Regulated",
    commonPains: "Strict marketing regulation, doctor detail compliance, slow sample distribution, distribution leaks.",
    rootCauses: "Strict regulatory boundaries preventing direct advertising, reliance on brief 2-minute doctor calls.",
    salespersonImpact: "Medical representatives wait hours in clinics for 90 seconds of rushed visual detail pitching.",
    highValueIntervention: "Compliant digital detailing platform, automated CME webinar invitations, verified sample delivery tracking.",
    benchmarkConv: "12.0%",
    avgDealValue: "₹85,000 / $1,500",
    leakageFocus: "Doctor Detail Call Conversion",
    icon: "thermometer"
  },
  {
    id: "automobiles",
    name: "Automobile Dealerships & OEM Sales",
    category: "B2C / High-Ticket",
    commonPains: "Test-drive scheduling no-shows, prolonged decision cycles, financing delays, cross-dealer price wars.",
    rootCauses: "Customers cross-shopping 4 dealerships simultaneously; reps failing to follow up within 15 minutes of web inquiry.",
    salespersonImpact: "Reps struggle to explain complex EV battery warranties, tech packages, and trade-in valuations.",
    highValueIntervention: "Doorstep test-drive booking app, dynamic competitor feature-cost comparison sheet, instant trade-in valuation engine.",
    benchmarkConv: "4.5%",
    avgDealValue: "₹12,00,000 / $28,000",
    leakageFocus: "Test-Drive to Booking Transition",
    icon: "truck"
  },
  {
    id: "manufacturing",
    name: "Industrial Equipment & Manufacturing",
    category: "B2B / Industrial",
    commonPains: "Long custom quotation delays (2-3 weeks), complex technical specs, multi-tier procurement approvals.",
    rootCauses: "Engineering team bottlenecked on custom drawings, sales reps lacking technical pricing rules.",
    salespersonImpact: "Sales reps spend weeks calculating bill-of-materials rather than negotiating with C-suite plant heads.",
    highValueIntervention: "Configure-Price-Quote (CPQ) automation, standardized technical scope templates, client ROI calculator.",
    benchmarkConv: "6.0%",
    avgDealValue: "₹45,00,000 / $90,000",
    leakageFocus: "RFQ (Request for Quotation) Response Lag",
    icon: "cpu"
  },
  {
    id: "saas_software",
    name: "B2B SaaS & Cloud Software",
    category: "B2B / Tech",
    commonPains: "Trial-to-paid activation failure, buyer committee friction (74% conflict), churn after 6 months, ghosted demos.",
    rootCauses: "Product feature overload, lack of guided onboarding, misalignment between buyer and end-users.",
    salespersonImpact: "AEs conduct 45-minute generic feature walkthroughs; buyers say 'looks great' then disappear forever.",
    highValueIntervention: "Product-led activation alerts, multi-stakeholder business case builder, real-time objection debunking copilot.",
    benchmarkConv: "3.8%",
    avgDealValue: "₹14,00,000 / $24,000 / yr",
    leakageFocus: "Demo-to-Trial Activation & Ghosting",
    icon: "layers"
  },
  {
    id: "it_services",
    name: "IT Services, Cloud & Digital Transformation",
    category: "B2B / Services",
    commonPains: "Ambiguous project scope, 6-12 month sales cycles, commoditized hourly billing pressure, trust deficit.",
    rootCauses: "Pitching generic developer resumes rather than outcome-guaranteed solutions; lack of published IP.",
    salespersonImpact: "Sales teams lose deals to lower-cost offshore competitors during final procurement price negotiations.",
    highValueIntervention: "Fixed-outcome value framing, standardized architectural audit offerings, executive proof-of-concept roadmaps.",
    benchmarkConv: "5.2%",
    avgDealValue: "₹35,00,000 / $75,000",
    leakageFocus: "Proposal Negotiation Commoditization",
    icon: "terminal"
  },
  {
    id: "professional_services",
    name: "Consulting, Accounting & Advisory",
    category: "B2B / Professional",
    commonPains: "Intangible expertise difficult to evaluate, fee resistance, scope creep, partner billing downtime.",
    rootCauses: "Partners selling by pitching time rather than business impact; absence of structured diagnostic entrance offers.",
    salespersonImpact: "Partners spend unpaid hours writing 50-page bespoke proposals that get circulated to cheaper rivals.",
    highValueIntervention: "Paid Initial Diagnostic Audit, value-based milestone pricing, automated proposal generator with client sign-off.",
    benchmarkConv: "14.0%",
    avgDealValue: "₹15,00,000 / $30,000",
    leakageFocus: "Bespoke Unpaid Proposal Creep",
    icon: "briefcase"
  },
  {
    id: "legal_services",
    name: "Legal Services & Law Firms",
    category: "B2B / B2C",
    commonPains: "Client trust barrier, opaque hourly retainer fees, slow intake screening, conflict check delays.",
    rootCauses: "Clients terrified of runaway hourly bills; lawyers viewing marketing as unprofessional.",
    salespersonImpact: "Attorneys spend non-billable hours answering repetitive triage questions from unqualified prospects.",
    highValueIntervention: "Transparent flat-fee scope packages, automated client intake screening form, automated retainer agreement signing.",
    benchmarkConv: "9.0%",
    avgDealValue: "₹2,50,000 / $6,000",
    leakageFocus: "Intake Screening & Fee Hesitation",
    icon: "award"
  },
  {
    id: "hospitality_hotels",
    name: "Hotels, Resorts & Luxury Stays",
    category: "B2C / Travel",
    commonPains: "Massive OTA commission drain (18-25%), extreme seasonal demand volatility, low repeat guest booking.",
    rootCauses: "Lack of direct booking incentive, failure to capture guest preferences during stay, generic blast emails.",
    salespersonImpact: "B2B corporate sales teams lose banquet/MICE leads due to slow customized quotation turnaround.",
    highValueIntervention: "Direct booking perk engine, automated post-stay guest re-engagement cadence, instant MICE event quote calculator.",
    benchmarkConv: "2.8%",
    avgDealValue: "₹18,000 / $300",
    leakageFocus: "OTA Commission Drain & Low Direct Rebooking",
    icon: "map-pin"
  },
  {
    id: "restaurants_dining",
    name: "Restaurants, Cafes & Cloud Kitchens",
    category: "B2C / Food",
    commonPains: "Aggregator delivery commission squeeze (25-30%), low customer lifetime value, weekday empty tables.",
    rootCauses: "No direct customer database; relying entirely on third-party delivery apps that own the customer relationship.",
    salespersonImpact: "Store managers unable to predict footfalls or run targeted promotions without high ad spend.",
    highValueIntervention: "Direct ordering via WhatsApp/web, dynamic table reservation specials for slow hours, automated SMS birthday loyalty perks.",
    benchmarkConv: "15.0%",
    avgDealValue: "₹1,400 / $25",
    leakageFocus: "Zero Direct Customer Retention",
    icon: "coffee"
  },
  {
    id: "travel_tourism",
    name: "Travel Agencies & Custom Tour Operators",
    category: "B2C / B2B",
    commonPains: "Aggressive price shopping across competitors, last-minute cancellations, slow multi-day itinerary building.",
    rootCauses: "Bespoke itinerary compilation takes 48-72 hours; during this time the traveler books elsewhere.",
    salespersonImpact: "Travel consultants spend hours compiling flight/hotel combinations only to be ghosted.",
    highValueIntervention: "AI-assisted interactive itinerary builder with live pricing, tiered good/better/best package quotes in 10 minutes.",
    benchmarkConv: "4.0%",
    avgDealValue: "₹1,80,000 / $3,500",
    leakageFocus: "Itinerary Proposal Turnaround Delay",
    icon: "compass"
  },
  {
    id: "beauty_wellness",
    name: "Salons, Spas & Aesthetic Clinics",
    category: "B2C / Wellness",
    commonPains: "Unbooked appointment slots during off-peak hours, low cross-selling of retail products, client churn to rivals.",
    rootCauses: "Staff lack consultative sales training to recommend high-ticket treatments; paper appointment books.",
    salespersonImpact: "Therapists uncomfortable pitching membership plans or packages.",
    highValueIntervention: "Automated recurring rebooking reminders based on service frequency (e.g. 28-day haircut reminder), off-peak dynamic pricing.",
    benchmarkConv: "22.0%",
    avgDealValue: "₹3,500 / $70",
    leakageFocus: "Lapsed Rebooking Frequency",
    icon: "feather"
  },
  {
    id: "fashion_apparel",
    name: "Fashion, Apparel & Luxury Footwear",
    category: "B2C / Fashion",
    commonPains: "High return rates (30-40% due to sizing/fit issues), trend obsolescence, heavy discounting eroding margins.",
    rootCauses: "Poor fit guides online, impulse buying without sizing guidance, aggressive flash-sale habituation.",
    salespersonImpact: "Brand managers forced into constant discounting spirals to clear old seasonal inventory.",
    highValueIntervention: "AI size recommendation assistant, interactive virtual styling lookbooks, post-purchase styling tips to reduce returns.",
    benchmarkConv: "1.9%",
    avgDealValue: "₹4,500 / $95",
    leakageFocus: "Fit-Related Returns & Discount Dependency",
    icon: "scissors"
  },
  {
    id: "electronics",
    name: "Consumer Electronics & Smart Appliances",
    category: "B2C / Durable",
    commonPains: "Specification confusion, intense price comparison across Amazon/Flipkart, warranty & service hesitation.",
    rootCauses: "Jargon-heavy technical specs that don't explain real-life user benefits; fear of repair costs.",
    salespersonImpact: "Retail sales reps battle showrooming customers scanning barcodes on phones for cheaper deals.",
    highValueIntervention: "Side-by-side comparison matrix, bundled extended warranty with no-questions-asked replacement, trade-in bonus.",
    benchmarkConv: "3.0%",
    avgDealValue: "₹28,000 / $450",
    leakageFocus: "Showrooming & Post-Purchase Warranty Anxiety",
    icon: "tv"
  },
  {
    id: "renewables_solar",
    name: "Solar Energy & Clean Tech (Residential/Commercial)",
    category: "B2B / B2C",
    commonPains: "High initial capex resistance, financing uncertainty, complex net-metering regulatory approvals, long payback fear.",
    rootCauses: "Customers don't understand payback timeline or subsidy mechanics; fear of vendor disappearing.",
    salespersonImpact: "Solar reps pitch kilowatts instead of monthly electricity bill savings.",
    highValueIntervention: "Interactive 25-Year Electricity Savings Simulator, instant subsidy calculator, zero-down solar financing integration.",
    benchmarkConv: "2.7%",
    avgDealValue: "₹3,50,000 / $12,000",
    leakageFocus: "Capex Hesitation & Payback Uncertainty",
    icon: "sun"
  },
  {
    id: "construction_materials",
    name: "Construction Materials & Building Supplies",
    category: "B2B / Wholesale",
    commonPains: "Contractor loyalty swings, razor-thin dealer margins, credit payment defaults, logistics delays.",
    rootCauses: "Pure price commoditization; failure to tie contractors into digital reward & milestone rebate schemes.",
    salespersonImpact: "Reps spend Friday afternoons chasing overdue receivables rather than signing new project contractors.",
    highValueIntervention: "Contractor mobile wallet & barcode reward points, automated credit limit checks, digital dispatch tracking.",
    benchmarkConv: "20.0%",
    avgDealValue: "₹4,00,000 / $6,500",
    leakageFocus: "Receivables Default & Dealer Switching",
    icon: "tool"
  },
  {
    id: "furniture_interiors",
    name: "Custom Furniture & Interior Design",
    category: "B2C / B2B",
    commonPains: "Long custom 3D drawing turnaround, measurement changes, budget sticker shock, delayed milestone payments.",
    rootCauses: "Designer-client communication breakdown; unaligned aesthetic expectations vs actual manufacturing budget.",
    salespersonImpact: "Designers spend 3 weeks making bespoke renders only for the client to cancel upon seeing quotation.",
    highValueIntervention: "Real-time 3D quotation configurator, staged milestone escrow payment contracts, virtual walkthrough showroom.",
    benchmarkConv: "3.5%",
    avgDealValue: "₹8,00,000 / $15,000",
    leakageFocus: "Quotation Shock & 3D Render Delay",
    icon: "layout"
  },
  {
    id: "wholesale_distribution",
    name: "Wholesale & B2B Distribution",
    category: "B2B / Trade",
    commonPains: "Slow reorders, sales rep order-taking fatigue, credit risk management, lost catalog visibility.",
    rootCauses: "Paper ordering and WhatsApp chats with forgotten line items; no automated replenishment alerts.",
    salespersonImpact: "Sales reps function as order-takers rather than category expansion consultants.",
    highValueIntervention: "Wholesale self-service B2B portal, 1-click reorder based on customer inventory consumption cycle, automated credit gate.",
    benchmarkConv: "28.0%",
    avgDealValue: "₹2,50,000 / $4,000",
    leakageFocus: "Lapsed Reorders & Credit Default Risk",
    icon: "archive"
  },
  {
    id: "logistics_freight",
    name: "Logistics, Freight & Supply Chain Services",
    category: "B2B / Operations",
    commonPains: "Commoditized spot rate bidding wars, lack of real-time shipment visibility, delayed billing reconciliation.",
    rootCauses: "Shippers treating freight as an interchangeable commodity; spot market price fluctuations.",
    salespersonImpact: "Freight brokers spending all morning checking carrier capacity instead of closing enterprise shippers.",
    highValueIntervention: "Instant spot quote engine with guaranteed capacity SLA, real-time milestone portal, automated POD invoice generation.",
    benchmarkConv: "7.0%",
    avgDealValue: "₹1,50,000 / $2,800 / shipment",
    leakageFocus: "Spot Rate Bidding Abandonment",
    icon: "navigation"
  },
  {
    id: "recruitment_staffing",
    name: "Staffing, Headhunting & Talent Solutions",
    category: "B2B / HR",
    commonPains: "Hiring manager interview ghosting, candidate drop-offs after offer rollout, slow candidate screening.",
    rootCauses: "Vague job descriptions, misaligned salary expectations, recruiters submitting unvetted resume floods.",
    salespersonImpact: "Recruiters lose 30-40% of placements at the final offer stage due to counter-offers.",
    highValueIntervention: "Structured video candidate dossier with benchmark score, automated pre-close offer negotiation protocol, talent pipeline SLA tracker.",
    benchmarkConv: "6.5%",
    avgDealValue: "₹1,20,000 / $3,000 / placement",
    leakageFocus: "Post-Offer Candidate Drop-off",
    icon: "users"
  },
  {
    id: "telecom",
    name: "Telecommunications & ISP Providers",
    category: "B2C / B2B",
    commonPains: "High churn rate to competitors offering promotional discounts, plan complexity, billing dispute complaints.",
    rootCauses: "Subscribers feeling ignored after initial sign-up; long customer service resolution wait times.",
    salespersonImpact: "Retention agents firefighting angry churn requests without real-time upgrade incentives.",
    highValueIntervention: "Proactive network quality alerts, personalized plan recommendation engine, automated retention rescue offer at point of dissatisfaction.",
    benchmarkConv: "5.0%",
    avgDealValue: "₹12,000 / $180 / yr",
    leakageFocus: "Contract Expiration Churn",
    icon: "phone"
  },
  {
    id: "media_agencies",
    name: "Digital Marketing & Advertising Agencies",
    category: "B2B / Agency",
    commonPains: "Proving true business ROI beyond vanity clicks, client churn after 90 days, endless scope creep.",
    rootCauses: "Agencies reporting impressions/clicks instead of pipeline revenue; misalignment on qualified lead definition.",
    salespersonImpact: "Agency owners constantly scrambling to replace lost retainer clients in a stressful acquisition treadmill.",
    highValueIntervention: "Closed-loop revenue attribution dashboard, shared definition of MQL/SQL with client, quarterly strategic business review automation.",
    benchmarkConv: "4.5%",
    avgDealValue: "₹1,00,000 / $2,500 / mo",
    leakageFocus: "90-Day Retainer Churn",
    icon: "trending-up"
  },
  {
    id: "events_weddings",
    name: "Event Management, Weddings & Expos",
    category: "B2C / B2B",
    commonPains: "Extreme seasonal inquiry spikes, aggressive price comparisons across venues, vendor coordination chaos.",
    rootCauses: "Clients receiving complex unformatted vendor quotes days after initial excitement cools.",
    salespersonImpact: "Event planners spend 40 hours creating custom mood boards for clients who pick a cheaper decorator.",
    highValueIntervention: "Interactive budget planner & visual venue selector, tiered event packages, automated milestone planning calendar.",
    benchmarkConv: "3.0%",
    avgDealValue: "₹15,00,000 / $25,000",
    leakageFocus: "Proposal Ghosting After Initial Meeting",
    icon: "calendar"
  },
  {
    id: "agritech",
    name: "Agricultural Inputs & AgriTech Equipment",
    category: "B2B / Rural",
    commonPains: "Seasonal crop window dependence, heavy dealer credit risk, farmer skepticism of new biologicals/machinery.",
    rootCauses: "Lack of localized crop proof plots; reliance on traditional village dealer networks.",
    salespersonImpact: "Field agronomists travel vast distances with low daily visit capacity.",
    highValueIntervention: "Localized demo plot video proof via WhatsApp, seasonal harvest-linked payment terms, village dealer order app.",
    benchmarkConv: "12.0%",
    avgDealValue: "₹45,000 / $800",
    leakageFocus: "Seasonal Crop Window Missed Orders",
    icon: "globe"
  },
  {
    id: "industrial_machinery",
    name: "Heavy Machinery & Capital Equipment",
    category: "B2B / Capex",
    commonPains: "High capital cost, technical evaluation committees, spare parts confidence, long procurement cycles (9-15 months).",
    rootCauses: "Risk of plant downtime; multiple stakeholders (Plant Head, CFO, Maintenance Director) with competing agendas.",
    salespersonImpact: "Sales engineers spend months doing site surveys only to see Capex deferred by corporate board.",
    highValueIntervention: "Total Cost of Ownership (TCO) calculator, guaranteed spare parts uptime SLA, equipment leasing options.",
    benchmarkConv: "3.5%",
    avgDealValue: "₹1,20,00,000 / $250,000",
    leakageFocus: "Board Capex Deferral & Multi-Stakeholder Gridlock",
    icon: "settings"
  }
];

export class IndustryMatrixEngine {
  constructor() {
    this.database = INDUSTRY_DATABASE;
  }

  getAll() {
    return this.database;
  }

  getById(id) {
    return this.database.find(item => item.id === id) || this.database[0];
  }

  filter(category = 'all', query = '') {
    const q = (query || '').toLowerCase().trim();
    return this.database.filter(item => {
      let matchCat = true;
      if (category && category !== 'all') {
        const catUpper = item.category.toUpperCase();
        if (category === 'B2B') {
          matchCat = catUpper.includes('B2B') || catUpper.includes('INDUSTRIAL') || catUpper.includes('WHOLESALE') || catUpper.includes('TRADE') || catUpper.includes('AGENCY') || catUpper.includes('HR') || catUpper.includes('OPERATIONS') || catUpper.includes('PROFESSIONAL') || catUpper.includes('TECH') || catUpper.includes('CAPEX');
        } else if (category === 'B2C') {
          matchCat = catUpper.includes('B2C') || catUpper.includes('RETAIL') || catUpper.includes('CONSUMER') || catUpper.includes('FOOD') || catUpper.includes('WELLNESS') || catUpper.includes('FASHION') || catUpper.includes('TRAVEL');
        } else if (category === 'High-Ticket') {
          matchCat = catUpper.includes('HIGH-TICKET') || catUpper.includes('CAPEX') || item.id === 'real_estate' || item.id === 'automobiles' || item.id === 'industrial_machinery' || item.id === 'manufacturing' || item.id === 'renewables_solar' || item.id === 'it_services';
        } else if (category === 'Wholesale') {
          matchCat = catUpper.includes('WHOLESALE') || catUpper.includes('TRADE') || catUpper.includes('SUPPLY') || item.id === 'fmcg' || item.id === 'construction_materials' || item.id === 'wholesale_distribution' || item.id === 'agritech' || item.id === 'logistics_freight';
        }
      }

      let matchQuery = true;
      if (q) {
        matchQuery = item.name.toLowerCase().includes(q) ||
                     item.category.toLowerCase().includes(q) ||
                     item.commonPains.toLowerCase().includes(q) ||
                     item.rootCauses.toLowerCase().includes(q) ||
                     item.salespersonImpact.toLowerCase().includes(q) ||
                     item.highValueIntervention.toLowerCase().includes(q) ||
                     item.leakageFocus.toLowerCase().includes(q);
      }

      return matchCat && matchQuery;
    });
  }

  calculateLeakage(id, { monthlyVolume = 150, currency = 'USD' } = {}) {
    const ind = this.getById(id);
    let numericACV = 25000;
    
    if (ind.avgDealValue) {
      if (currency === 'INR') {
        const inrMatch = ind.avgDealValue.match(/₹([0-9,]+)/);
        if (inrMatch) {
          const raw = inrMatch[1].replace(/,/g, '');
          numericACV = parseInt(raw, 10);
        } else {
          numericACV = 350000;
        }
      } else {
        const usdMatch = ind.avgDealValue.match(/\$([0-9,]+)/);
        if (usdMatch) {
          numericACV = parseInt(usdMatch[1].replace(/,/g, ''), 10);
        } else {
          numericACV = 25000;
        }
      }
    }

    const convPct = parseFloat(ind.benchmarkConv) || 3.5;
    const inquiries = parseInt(monthlyVolume || 150, 10);

    const liftPct = convPct < 5 ? 1.85 : 1.45;
    const newConvPct = +(convPct * liftPct).toFixed(1);
    const reclaimedDeals = Math.max(1, Math.round(inquiries * ((newConvPct - convPct) / 100)));
    
    const lostInquiries = Math.round(inquiries * 0.42);
    const monthlyLeakage = Math.round(lostInquiries * (convPct / 100) * numericACV);
    const monthlyRecovery = Math.round(reclaimedDeals * numericACV);
    const annualizedUpside = monthlyRecovery * 12;
    const platformCost = currency === 'INR' ? 450000 : 15000;
    const paybackDays = Math.max(12, Math.round((platformCost / (Math.max(1, monthlyRecovery) / 30))));
    const roiMultiple = (annualizedUpside / platformCost).toFixed(1);

    return {
      industry: ind,
      numericACV,
      convPct,
      newConvPct,
      inquiries,
      lostInquiries,
      monthlyLeakage,
      monthlyRecovery,
      annualizedUpside,
      paybackDays,
      roiMultiple
    };
  }

  getTacticalPlaybook(id, currency = 'USD') {
    const ind = this.getById(id);
    const forensics = this.calculateLeakage(id, { currency });

    const playbookMap = {
      real_estate: {
        whatsappPitch: "Hi {{Name}}, regarding your interest in {{Project_Name}}, our VIP digital concierge has scheduled a private site visit preview with priority floor plans and verified bank financing eligibility in 60 seconds. Would you prefer a morning or afternoon slot this Saturday?",
        topObjection: "We are just browsing online right now and not ready for a site visit.",
        rebuttal: {
          hook: "I completely understand—exploring options from home is the best way to start.",
          proof: "Our buyers who review our 3-minute financial pre-check first save an average of ₹4.5 Lakhs in preferred launch pricing and avoid losing their preferred unit to broker duplicates.",
          cta: "Can I send the instant WhatsApp floor plan brochure so you can browse the exact layouts without any sales pressure?"
        },
        sopSteps: [
          "1. Instant WhatsApp Bot engages lead in < 2 minutes with floor plans & pricing tier.",
          "2. Automated credit & home loan pre-qualification check in 60 seconds.",
          "3. Calendar booking with automated Uber/ride credit voucher for site visit confirmation.",
          "4. Post-visit instant quotation locked with 72-hour price freeze to prevent shopping."
        ]
      },
      saas_software: {
        whatsappPitch: "Hi {{Name}}, saw {{Company}} is scaling out sales operations. We noticed most teams in your stage lose 38% of qualified demo requests to response lag. We built an autonomous 30m SLA watchdog that guarantees zero lost pipeline. Are you free for a 10-minute live demo on Thursday?",
        topObjection: "We already use Salesforce / HubSpot and our reps don't want another tool.",
        rebuttal: {
          hook: "That makes total sense—nobody wants another shelfware CRM with zero adoption.",
          proof: "RevNexus AI doesn't replace your CRM—it lives as an invisible copilot inside WhatsApp and Slack, automatically preventing deals from decaying past the 30-minute SLA.",
          cta: "Can I show you our 2-minute native webhook integration so your reps never have to log data manually again?"
        },
        sopSteps: [
          "1. Autonomous BANT & committee readiness scoring on all inbound demo requests.",
          "2. Instant calendar sync with senior AE based on deal size tier.",
          "3. Pre-call automated executive briefing dossier generated from company domain.",
          "4. 3-tier objection debunker copilot armed during live zoom call."
        ]
      },
      ecommerce: {
        whatsappPitch: "Hi {{Name}}, your cart items at {{Store_Name}} have been reserved with complimentary express delivery. Complete checkout within the next 30 minutes to unlock an exclusive instant discount code: FLASH500. Tap here to complete in 1 click: {{Checkout_Link}}",
        topObjection: "The shipping fee and taxes at final checkout are higher than expected.",
        rebuttal: {
          hook: "We completely agree—unexpected checkout fees are the #1 reason carts get abandoned.",
          proof: "We have waived all shipping charges for the next 2 hours, and our 100% money-back guarantee covers any fit or delivery issues.",
          cta: "Would you like me to apply the zero-shipping code directly to your cart right now?"
        },
        sopSteps: [
          "1. Exit-intent cart abandonment trigger fires in < 3 minutes via WhatsApp.",
          "2. Dynamic prepaid discount incentive to prevent Cash-on-Delivery RTO return bleed.",
          "3. 1-Click checkout link with pre-filled shipping address.",
          "4. Real-time courier dispatch tracking sent directly to customer phone."
        ]
      },
      healthcare_clinics: {
        whatsappPitch: "Hello {{Name}}, this is {{Clinic_Name}} Care Concierge. We have reserved your requested consultation slot with Dr. {{Doctor}} for {{Date_Time}}. To confirm your appointment and receive our pre-consult health checklist, please reply YES.",
        topObjection: "The consultation and procedure pricing seems very high compared to other centers.",
        rebuttal: {
          hook: "Understood—clarity on healthcare costs is essential before making any clinical commitment.",
          proof: "Our package includes all post-procedure follow-ups, diagnostic pathology, and a 0% EMI financing plan that requires zero upfront down payment.",
          cta: "Can our care coordinator share the transparent breakdown and insurance cashless pre-approval with you today?"
        },
        sopSteps: [
          "1. Instant consent-based WhatsApp appointment confirmation within 90 seconds.",
          "2. Pre-consult transparent cost estimator & insurance cashless eligibility check.",
          "3. 24-hour and 2-hour multi-channel SMS/WhatsApp reminders to eliminate no-shows.",
          "4. Automated post-consult care instructions and 14-day digital follow-up booking."
        ]
      },
      manufacturing: {
        whatsappPitch: "Dear {{Name}}, thank you for submitting your RFQ for {{Component_Name}}. Our engineering team has generated your preliminary technical Bill-of-Materials and ISO-compliant tolerance analysis. Are you available for a 15-minute engineering review call tomorrow at 11 AM?",
        topObjection: "Your quotation is 15% higher than local fabrication suppliers.",
        rebuttal: {
          hook: "We appreciate that upfront unit price is under heavy scrutiny by your plant procurement team.",
          proof: "Our CPQ-engineered parts deliver 99.8% first-pass yield and guaranteed 48-hour replacement SLA, which saves an estimated $85,000 per year in unbudgeted assembly line downtime compared to uncertified suppliers.",
          cta: "Would you like us to run the Total Cost of Ownership (TCO) comparison sheet for your procurement committee?"
        },
        sopSteps: [
          "1. CPQ engine auto-generates preliminary quote & drawings in < 4 hours instead of 2 weeks.",
          "2. Automated engineering tolerance check & material cost indexing.",
          "3. Multi-stakeholder procurement business case builder delivered to Plant Head & CFO.",
          "4. Milestone-based production tracking portal with real-time delivery dispatch alerts."
        ]
      }
    };

    const genericPlaybook = {
      whatsappPitch: `Hello {{Name}}, regarding your inquiry for ${ind.name}, our specialist advisory desk has prepared a custom operational audit addressing ${ind.leakageFocus}. Would you like to review the 3-minute executive brief today?`,
      topObjection: "We already have an existing vendor and cannot switch right now.",
      rebuttal: {
        hook: "We completely respect your relationship with your current vendor.",
        proof: `RevNexus AI was designed to augment and plug the ${ind.leakageFocus} that existing vendors miss, delivering an average ${forensics.roiMultiple}x ROI in under ${forensics.paybackDays} days.`,
        cta: "Can we share our 1-page sector benchmark report so you have hard comparison metrics for your next vendor review?"
      },
      sopSteps: [
        "1. Capture inbound inquiries across multi-channel webhooks in < 30 seconds.",
        "2. Automate multi-vector qualification and assign to dedicated sector specialist.",
        `3. Deploy targeted ${ind.highValueIntervention.substring(0, 50)}... to prevent drop-off.`,
        "4. Enforce margin guardrails and track closed-loop revenue recovery telemetry."
      ]
    };

    const specific = playbookMap[id] || genericPlaybook;

    return {
      industry: ind,
      forensics,
      ...specific
    };
  }
}

