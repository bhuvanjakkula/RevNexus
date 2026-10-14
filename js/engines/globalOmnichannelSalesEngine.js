/**
 * Global Omnichannel Marketing, Sales & Multilingual Interaction Engine (2026 Edition)
 * Comprehensive international enterprise operating system covering:
 * - 12+ Global & Regional Languages with native localization dictionaries
 * - Global Multi-Touch Attribution across worldwide channels (Search, ABM, Social, Messaging)
 * - Real-Time International Customer Persona Interaction Simulator
 * - Multi-Currency Purchasing Power & Cross-Border Funnel Velocity
 * - 1-Click Global Multi-Channel Outreach Dispatcher (WhatsApp, Email, LinkedIn, WeChat, Line)
 */

export class GlobalOmnichannelSalesEngine {
  constructor() {
    this.currentLanguage = 'en';
    this.currentCurrency = 'USD';

    // Global Exchange Rates relative to USD (1.0)
    this.currencyRates = {
      USD: { symbol: '$', rate: 1.0, name: 'USD (United States)' },
      EUR: { symbol: '€', rate: 0.92, name: 'EUR (Eurozone)' },
      GBP: { symbol: '£', rate: 0.79, name: 'GBP (United Kingdom)' },
      JPY: { symbol: '¥', rate: 154.5, name: 'JPY (Japan)' },
      AUD: { symbol: 'A$', rate: 1.52, name: 'AUD (Australia)' },
      CAD: { symbol: 'C$', rate: 1.37, name: 'CAD (Canada)' },
      AED: { symbol: 'AED ', rate: 3.67, name: 'AED (United Arab Emirates)' },
      INR: { symbol: '₹', rate: 83.5, name: 'INR (India)' },
      CNY: { symbol: '¥', rate: 7.24, name: 'CNY (China)' },
      BRL: { symbol: 'R$', rate: 5.15, name: 'BRL (Brazil)' },
      SAR: { symbol: 'SAR ', rate: 3.75, name: 'SAR (Saudi Arabia)' }
    };

    // 12 Major Global & Regional Languages Database
    this.languages = {
      en: {
        code: 'en',
        name: 'English (Global)',
        flag: '🌐',
        dir: 'ltr',
        greeting: "Hello, welcome to our Enterprise Revenue platform.",
        ctaPitch: "Accelerate your global sales velocity, eliminate funnel leakages, and achieve guaranteed ROI within 60 days.",
        channelPreference: "LinkedIn B2B ABM, Email Sequences, Google Search",
        culturalNote: "Direct, metric-driven, emphasizes time-to-value and software integration.",
        objectionCounter: "We integrate directly with your existing CRM stack in under 48 hours with guaranteed zero workflow disruption.",
        closingQuestion: "Would you be open to reviewing the custom 60-day payback model for your executive team this Thursday?"
      },
      es: {
        code: 'es',
        name: 'Español (Spanish / LatAm & Spain)',
        flag: '🇪🇸',
        dir: 'ltr',
        greeting: "Hola, le damos la bienvenida a nuestra plataforma de optimización de ingresos.",
        ctaPitch: "Aumente la velocidad de sus ventas globales, elimine las pérdidas en el embudo y obtenga un retorno de inversión verificado en 60 días.",
        channelPreference: "WhatsApp Business, LinkedIn, Campañas Meta Advantage+",
        culturalNote: "Relacional y colaborativo; valora el soporte humano dedicado y la confianza directa.",
        objectionCounter: "Ofrecemos incorporación personalizada en español y garantía de recuperación de inversión auditada por contrato.",
        closingQuestion: "¿Le gustaría que coordinemos una sesión ejecutiva de 20 minutos con nuestro especialista para revisar sus números?"
      },
      zh: {
        code: 'zh',
        name: '简体中文 (Mandarin Chinese)',
        flag: '🇨🇳',
        dir: 'ltr',
        greeting: "您好，欢迎使用全球智能收入与全渠道营销销售系统。",
        ctaPitch: "加速跨国商业转化，消除漏斗损耗，通过算法赋能实现60天明确投资回报。",
        channelPreference: "企业微信 (WeChat Work), 百度推广, 领英海外拓展",
        culturalNote: "注重长期战略合作、技术实力认证及规模化降本增效。",
        objectionCounter: "我们的架构支持本地化私有部署与高可用量子级数据防护，保障企业跨境数据合规与资产安全。",
        closingQuestion: "我们可以为您定制专属跨国业务ROI测算报告，本周是否有时间简短对接？"
      },
      fr: {
        code: 'fr',
        name: 'Français (French / France & Europe)',
        flag: '🇫🇷',
        dir: 'ltr',
        greeting: "Bonjour, bienvenue sur notre plateforme d'optimisation commerciale globale.",
        ctaPitch: "Accélérez vos cycles de vente internationaux, sécurisez vos marges et obtenez un retour sur investissement certifié en 60 jours.",
        channelPreference: "Email B2B personnalisé, LinkedIn, Événements Sectoriels",
        culturalNote: "Exigence de rigueur méthodologique, conformité RGPD stricte et distinction de marque.",
        objectionCounter: "Notre plateforme respecte scrupuleusement la réglementation européenne (RGPD/IA Act) et s'adapte sans friction à vos processus.",
        closingQuestion: "Seriez-vous disponible pour une présentation stratégique de 15 minutes afin d'analyser vos gisements de croissance ?"
      },
      de: {
        code: 'de',
        name: 'Deutsch (German / DACH Region)',
        flag: '🇩🇪',
        dir: 'ltr',
        greeting: "Guten Tag, willkommen bei der führenden Plattform für globale Umsatzoptimierung.",
        ctaPitch: "Steigern Sie Ihre internationale Vertriebseffizienz, beseitigen Sie Pipeline-Verluste und sichern Sie messbaren ROI in 60 Tagen.",
        channelPreference: "XING, LinkedIn B2B, Strukturierte E-Mail-Dossiers",
        culturalNote: "Fokus auf technische Präzision, Datensicherheit, DSGVO-Konformität und Vertragsklarheit.",
        objectionCounter: "Vollständige DSGVO-Konformität und Post-Quantum-Verschlüsselung garantieren höchste Datensouveränität nach Industriestandard.",
        closingQuestion: "Können wir Ihnen eine detaillierte technische Machbarkeits- und Wirtschaftlichkeitsanalyse für Ihre Geschäftsführung zusenden?"
      },
      ja: {
        code: 'ja',
        name: '日本語 (Japanese / Japan)',
        flag: '🇯🇵',
        dir: 'ltr',
        greeting: "お世話になっております。グローバル売上最適化プラットフォームへようこそ。",
        ctaPitch: "グローバル営業プロセスのボトルネックを解消し、再現性の高い成約率向上と60日以内のROI達成をご支援いたします。",
        channelPreference: "LINE WORKS, 厳選されたビジネスメール, 個別対面デモ",
        culturalNote: "徹底した合意形成（根回し）、導入後の手厚いアフターサポート、長期的な信頼関係を重視。",
        objectionCounter: "専任のカスタマーサクセスチームによる伴走支援と厳格なセキュリティ基準で、円滑な組織定着をお約束いたします。",
        closingQuestion: "貴社の業務フローに合わせた個別提案資料をご用意いたしましたので、来週ご確認いただくことは可能でしょうか？"
      },
      ar: {
        code: 'ar',
        name: 'العربية (Arabic / GCC & Middle East)',
        flag: '🇸🇦',
        dir: 'rtl',
        greeting: "أهلاً وسهلاً بكم في منصة تحسين الإيرادات وتوسيع المبيعات العالمية.",
        ctaPitch: "قم بتسريع نمو مبيعاتك الإقليمية والدولية، وحقق عائداً استثمارياً مضموناً خلال 60 يوماً بأحدث تقنيات الذكاء الاصطناعي السيادي.",
        channelPreference: "واتساب للأعمال (WhatsApp), لينكد إن (LinkedIn), اللقاءات التنفيذية المباشرة",
        culturalNote: "تقدير الشراكات المرموقة، الكرم في التعامل، التركيز على المشاريع الاستراتيجية ورؤية التحول الرقمي.",
        objectionCounter: "نوفر أعلى معايير السيادة الرقمية والتشفير الكمي المتوافق مع متطلبات الأمن السيبراني الإقليمية وحوكمة البيانات.",
        closingQuestion: "يسعدنا تقديم استعراض تنفيذي خاص لمجلس إدارتكم، هل يناسبكم موعد مطلع الأسبوع المقبل؟"
      },
      pt: {
        code: 'pt',
        name: 'Português (Portuguese / Brazil & Portugal)',
        flag: '🇧🇷',
        dir: 'ltr',
        greeting: "Olá, seja bem-vindo à plataforma de otimização de vendas e receita global.",
        ctaPitch: "Aumente a conversão do seu funil comercial, reduza o custo de aquisição e garanta um ROI acelerado em até 60 dias.",
        channelPreference: "WhatsApp Comercial, LinkedIn, Tráfego Pago Meta/Google",
        culturalNote: "Agilidade, foco em resultados rápidos de caixa e comunicação calorosa e direta.",
        objectionCounter: "Nossos planos flexíveis permitem recuperar o investimento logo no primeiro trimestre com suporte completo em português.",
        closingQuestion: "Podemos agendar uma demonstração rápida de 15 minutos para mostrar o potencial de receita da sua operação?"
      },
      hi: {
        code: 'hi',
        name: 'हिन्दी (Hindi / India & South Asia)',
        flag: '🇮🇳',
        dir: 'ltr',
        greeting: "नमस्ते, वैश्विक राजस्व और बिक्री अनुकूलन प्लेटफॉर्म में आपका स्वागत है।",
        ctaPitch: "अपनी बिक्री गति को 35% तक बढ़ाएं, लीड लीकेज बंद करें और 60 दिनों के भीतर प्रमाणित लाभ प्राप्त करें।",
        channelPreference: "WhatsApp B2B, Direct Outreach, Business Phone",
        culturalNote: "विश्वसनीय व्यक्तिगत संबंध, सटीक लागत-लाभ विश्लेषण और त्वरित सहायता।",
        objectionCounter: "शून्य जोखिम और गारंटीड 60-दिन पेबैक मॉडल के साथ आपकी पूरी टीम का निशुल्क प्रशिक्षण प्रदान किया जाता है।",
        closingQuestion: "क्या हम इस गुरुवार को आपके लिए विशेष रूप से तैयार की गई आरओआई रिपोर्ट की समीक्षा कर सकते हैं?"
      },
      ru: {
        code: 'ru',
        name: 'Русский (Russian / Eurasia)',
        flag: '🇷🇺',
        dir: 'ltr',
        greeting: "Здравствуйте, добро пожаловать на платформу глобальной оптимизации продаж.",
        ctaPitch: "Ускорьте цикл закрытия международных сделок и гарантируйте возврат инвестиций в течение 60 дней.",
        channelPreference: "Telegram B2B, Email-рассылки, Корпоративные презентации",
        culturalNote: "Практичный расчет, независимость решений, акцент на окупаемость и надежность.",
        objectionCounter: "Система обеспечивает полную автономность данных, высокую производительность и устойчивость к внешним блокировкам.",
        closingQuestion: "Готовы ли вы ознакомиться с расчетом финансовой окупаемости для вашей компании на этой неделе?"
      },
      it: {
        code: 'it',
        name: 'Italiano (Italian / Italy & Europe)',
        flag: '🇮🇹',
        dir: 'ltr',
        greeting: "Buongiorno e benvenuti sulla piattaforma di ottimizzazione dei ricavi globali.",
        ctaPitch: "Potenzia la conversione delle vendite internazionali e ottieni un ROI certificato entro 60 giorni.",
        channelPreference: "LinkedIn B2B, Email personalizzate, Consulenza Diretta",
        culturalNote: "Attenzione alla qualità dell'esperienza, cura del brand e partnership duratura.",
        objectionCounter: "Forniamo assistenza diretta e garanzia contrattuale sui risultati per difendere i tuoi margini.",
        closingQuestion: "Possiamo organizzare una breve sessione di 15 minuti per illustrarle i dettagli operativi?"
      },
      ko: {
        code: 'ko',
        name: '한국어 (Korean / South Korea)',
        flag: '🇰🇷',
        dir: 'ltr',
        greeting: "안녕하십니까, 글로벌 매출 및 영업 파이프라인 최적화 플랫폼에 오신 것을 환영합니다.",
        ctaPitch: "글로벌 세일즈 리드 전환 속도를 획기적으로 개선하고, 60일 내 검증된 투자 대비 수익(ROI)을 달성하십시오.",
        channelPreference: "카카오톡 비즈니스 (Kakao), 기업 이메일, 링크드인",
        culturalNote: "신속한 의사결정, 최첨단 기술 적용 선호, 수치로 검증된 성과 지표 중시.",
        objectionCounter: "최신 AI 및 양자 암호화 보안 기술이 적용되어 시스템 안정성과 데이터 보안을 완벽히 보장합니다.",
        closingQuestion: "귀사의 비즈니스 성장을 위한 맞춤형 ROI 시뮬레이션 결과를 이번 주 중으로 공유해 드릴까요?"
      }
    };

    // Realistic Global Buyer Personas for Live Interactive Sales Dialogue
    this.customerPersonas = [
      {
        id: 'persona_us',
        name: 'Alex Rivera',
        role: 'VP of Revenue Operations',
        company: 'Apex Cloud Solutions (San Francisco, USA)',
        langCode: 'en',
        avatar: 'AR',
        badge: '🇺🇸 North America',
        preferredChannel: 'LinkedIn & Email',
        budgetCap: '$120,000 / yr',
        painPoint: 'High sales cycle latency and 35% lead drop-off between qualification and discovery.',
        dialogueStarter: "Hi there. We're currently reviewing our sales enablement stack. We have 40 SDRs and our conversion from inbound MQL to SQL dropped 14% last quarter. What specifically does your platform do that Salesforce or HubSpot can't solve out of the box?",
        responses: {
          pitch: "We address the critical 30-minute first-response SLA bottleneck and provide reps with real-time objection battlecards. Automated ID-stitching across 20+ touchpoints lifts conversion efficiency by +20% to 30%.",
          pricing: "Our annual enterprise license delivers a payback period of under 45 days based on recovering just 2 additional deals per rep month.",
          objection: "Unlike generic CRMs that just log calls, RevNexus acts as an active intelligence sentinel that dynamically predicts deal leakage and protects margins in real time."
        }
      },
      {
        id: 'persona_de',
        name: 'Dr. Stefan Weber',
        role: 'Chief Procurement & IT Director',
        company: 'Vanguard Industrial Automation GmbH (Munich, Germany)',
        langCode: 'de',
        avatar: 'SW',
        badge: '🇩🇪 Europe (DACH)',
        preferredChannel: 'Formal Encrypted Email',
        budgetCap: '€95,000 / yr',
        painPoint: 'Strict GDPR compliance requirements and high supplier integration overhead.',
        dialogueStarter: "Guten Tag. Bevor wir über geschäftliche Aspekte sprechen: Wie gewährleisten Sie die vollständige DSGVO-Konformität und den Schutz sensibler Kundendaten bei KI-gestützten Vertriebsanalysen?",
        responses: {
          pitch: "Unsere Plattform verfügt über eine NIST FIPS 203 & 204 Post-Quantum-Verschlüsselung (ML-KEM-768) und erfüllt strengste europäische Datenschutzvorgaben ohne Datentransfer an Drittanbieter.",
          pricing: "Die Gesamtwirtschaftlichkeitsrechnung (LCC) amortisiert sich innerhalb von 60 Tagen durch signifikant geringere Prozessreibungen.",
          objection: "Alle Audit-Protokolle sind fälschungssicher und revisionssicher auf Unternehmensebene nachweisbar."
        }
      },
      {
        id: 'persona_jp',
        name: 'Kenji Takahashi (高橋 健二)',
        role: 'General Manager of DX Strategy',
        company: 'Nippon Systems Integration Corp (Tokyo, Japan)',
        langCode: 'ja',
        avatar: 'KT',
        badge: '🇯🇵 Asia-Pacific (Japan)',
        preferredChannel: 'LINE WORKS & Scheduled Briefing',
        budgetCap: '¥15,000,000 / yr',
        painPoint: 'Need high organizational consensus and dedicated Japanese customer success support.',
        dialogueStarter: "初めまして。当社では現在、営業組織全体のDX推進を進めております。御社のシステムは既存のワークフローにスムーズに適応し、現場の営業担当者が混乱なく活用できる設計になっているでしょうか？",
        responses: {
          pitch: "はい。現場の営業担当者が直感的に使える5大コア質問対応スクリプトと、自動化されたリード配分機能により、初期研修なしですぐに定着可能です。",
          pricing: "専任のサポート体制と日本語対応のプレイブックが標準で含まれており、高い費用対効果を確実に実現します。",
          objection: "導入初期の伴走支援と品質保証により、現場の負担を最小限に抑えながら成約率を向上させます。"
        }
      },
      {
        id: 'persona_sa',
        name: 'Khalid Al-Mansoor (خالد المنصور)',
        role: 'Chief Digital Officer',
        company: 'Riyadh Sovereign Enterprise (Riyadh, Saudi Arabia)',
        langCode: 'ar',
        avatar: 'KM',
        badge: '🇸🇦 Middle East (GCC)',
        preferredChannel: 'WhatsApp VIP & Direct Briefing',
        budgetCap: 'SAR 450,000 / yr',
        painPoint: 'Enterprise digital transformation aligned with Vision 2030 and local data sovereignty.',
        dialogueStarter: "مرحباً بكم. نحن نقود مبادرة تحول رقمي وطنية ونبحث عن منصات مبيعات ذكية تتماشى مع رؤية المملكة 2030. كيف تدعم منصتكم السيادة الرقمية وتوسيع الأعمال في أسواق الخليج؟",
        responses: {
          pitch: "منصتنا مزودة بأعلى معايير التشفير المقاوم للكم (PQC) مع دعم كامل للغة العربية ونماذج التقييم التجاري المخصصة لأسواق الشرق الأوسط.",
          pricing: "نوفر خططاً استثمارية متميزة تحقق عائداً ملموساً من خلال إغلاق الصفقات الكبرى بسرعة مضاعفة.",
          objection: "نلتزم بحوكمة البيانات المحلية مع أمان غير قابل للاختراق وحسابات VIP مخصصة لقيادات الأعمال."
        }
      },
      {
        id: 'persona_br',
        name: 'Mariana Silva',
        role: 'Head of Commercial Growth',
        company: 'NovaLog Tecnologia (São Paulo, Brazil)',
        langCode: 'pt',
        avatar: 'MS',
        badge: '🇧🇷 Latin America',
        preferredChannel: 'WhatsApp Direct & LinkedIn',
        budgetCap: 'R$ 380,000 / yr',
        painPoint: 'High customer churn and need for ultra-fast WhatsApp-driven sales engagement.',
        dialogueStarter: "Olá! Nosso maior desafio no Brasil é que nossos leads esfriam muito rápido no WhatsApp. Como a sua plataforma garante que a equipe responda imediatamente sem perder a personalização da proposta?",
        responses: {
          pitch: "Nossa tecnologia aplica o protocolo automatizado de SLA de 30 minutos com disparo de pitches customizados no WhatsApp em um clique, aumentando a retenção imediata em até 30%.",
          pricing: "O plano se paga em poucas semanas ao recuperar leads que antes eram descartados ou perdidos por demora no atendimento.",
          objection: "Oferecemos modelos dinâmicos de proposta comercial com cálculo de ROI que o vendedor pode enviar em segundos pelo WhatsApp."
        }
      }
    ];

    // Global Omnichannel Marketing Channels
    this.marketingChannels = [
      {
        channel: 'Google Global Search & PMax',
        region: 'North America & Europe',
        spendMonthlyUSD: 18500,
        leadsGenerated: 1420,
        cacUSD: 13.02,
        conversionRate: '4.8%',
        roiMultiplier: '4.2x',
        status: 'Optimal'
      },
      {
        channel: 'LinkedIn B2B ABM Intent Ads',
        region: 'Global Enterprise (US, UK, DE, SG)',
        spendMonthlyUSD: 24000,
        leadsGenerated: 680,
        cacUSD: 35.29,
        conversionRate: '8.4%',
        roiMultiplier: '5.6x',
        status: 'Top Tier'
      },
      {
        channel: 'Meta & Instagram Advantage+',
        region: 'LATAM, APAC & Southern Europe',
        spendMonthlyUSD: 9500,
        leadsGenerated: 1850,
        cacUSD: 5.14,
        conversionRate: '3.2%',
        roiMultiplier: '3.4x',
        status: 'High Volume'
      },
      {
        channel: 'WhatsApp & SMS Direct Dispatch',
        region: 'India, Brazil, Mexico, UAE',
        spendMonthlyUSD: 3200,
        leadsGenerated: 940,
        cacUSD: 3.40,
        conversionRate: '12.6%',
        roiMultiplier: '7.8x',
        status: 'Highest ROI'
      },
      {
        channel: 'WeChat & Line B2B Partner Ecosystem',
        region: 'China, Japan, Taiwan',
        spendMonthlyUSD: 7800,
        leadsGenerated: 510,
        cacUSD: 15.29,
        conversionRate: '6.5%',
        roiMultiplier: '4.9x',
        status: 'Strategic'
      }
    ];
  }

  // Currency Conversion Utility
  formatCurrency(amountInUSD, targetCurrency = this.currentCurrency) {
    const info = this.currencyRates[targetCurrency] || this.currencyRates.USD;
    const converted = amountInUSD * info.rate;
    
    // Format based on currency locale
    if (targetCurrency === 'INR') {
      return info.symbol + Math.round(converted).toLocaleString('en-IN');
    } else if (targetCurrency === 'JPY') {
      return info.symbol + Math.round(converted).toLocaleString('ja-JP');
    } else {
      return info.symbol + Math.round(converted).toLocaleString('en-US');
    }
  }

  getLanguage(code = this.currentLanguage) {
    return this.languages[code] || this.languages.en;
  }

  getAllLanguages() {
    return Object.values(this.languages);
  }

  getAllPersonas() {
    return this.customerPersonas;
  }

  getPersonaById(id) {
    return this.customerPersonas.find(p => p.id === id) || this.customerPersonas[0];
  }

  getMarketingChannels() {
    return this.marketingChannels;
  }

  /**
   * Generates localized multi-channel outreach message
   */
  generateOutreachMessage(channelType, persona, langCode = this.currentLanguage) {
    const lang = this.getLanguage(langCode);
    const recipient = persona.name;
    const company = persona.company;

    switch (channelType) {
      case 'whatsapp':
        return `*${lang.greeting}* ${recipient},\n\n` +
               `${lang.ctaPitch}\n\n` +
               `💡 *Key Strategic Benefit:* ${lang.objectionCounter}\n\n` +
               `👉 ${lang.closingQuestion}\n\n` +
               `_Sent via RevNexus AI Global Revenue Engine_`;

      case 'email':
        return `Subject: Strategic Revenue Acceleration for ${company}\n\n` +
               `Dear ${recipient},\n\n` +
               `${lang.greeting}\n\n` +
               `We noticed ${company}'s ongoing expansion in ${persona.badge}. Many revenue leaders face the challenge where: "${persona.painPoint}".\n\n` +
               `${lang.ctaPitch}\n\n` +
               `Our verified client benchmarks demonstrate a 60-day payback period backed by strict compliance.\n\n` +
               `${lang.closingQuestion}\n\n` +
               `Best regards,\nExecutive Revenue Operations\nRevNexus AI Global Platform`;

      case 'linkedin':
        return `Hi ${recipient}, saw your leadership at ${company}. ${lang.greeting}\n\n` +
               `${lang.ctaPitch}\n\n` +
               `${lang.closingQuestion}`;

      default:
        return `${lang.greeting} ${recipient} (${company}). ${lang.ctaPitch} ${lang.closingQuestion}`;
    }
  }
}
