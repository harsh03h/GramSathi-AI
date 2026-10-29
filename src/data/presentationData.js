export const presentationData = {
  projectTitle: "GramSathi AI",
  subtitle: "An Intelligent Rural Assistance Platform for Inclusive and Sustainable Development",
  tagline: "Connecting Rural India to Opportunities through AI",
  hindiTagline: "मेरा गाँव मेरा विकास • आपका गाँव आपका साथी",
  college: "GCET Greater Noida",
  department: "Department of Artificial Intelligence & Machine Learning",
  guide: {
    name: "Ms. Ritu",
    designation: "Assistant Professor",
    dept: "Department of AI & ML, GCET Greater Noida"
  },
  team: [
    {
      name: "Harsh Gupta",
      rollNo: "2300971530059",
      role: "Lead Full Stack & AI Developer",
      branch: "CSE(AIML)"
    },
    {
      name: "Digdarshan Kumar",
      rollNo: "2300971530049",
      role: "AI & NLP Pipeline Architect",
      branch: "CSE(AIML)"
    },
    {
      name: "Devansh Saxena",
      rollNo: "2300971530047",
      role: "Backend & System Integration",
      branch: "CSE(AIML)"
    },
    {
      name: "Ayushmaan Singh",
      rollNo: "2300971530042",
      role: "Frontend & UI/UX Specialist",
      branch: "CSE(AIML)"
    }
  ],
  slides: [
    {
      id: 1,
      title: "GramSathi AI",
      category: "Title & Vision",
      badge: "Project Cover",
      description: "An Intelligent Rural Assistance Platform for Inclusive and Sustainable Development",
      highlights: [
        "Department of Artificial Intelligence & Machine Learning, GCET Greater Noida",
        "Empowering 900+ million rural citizens with voice-first AI assistance",
        "Bridging the digital divide between rural India and welfare opportunities",
        "Guided by Ms. Ritu, Assistant Professor"
      ]
    },
    {
      id: 2,
      title: "Problem Statement",
      category: "Rural Challenges",
      badge: "The Problem",
      description: "Rural citizens face acute difficulty in accessing essential government and public services due to multi-layered socio-technical barriers.",
      painPoints: [
        {
          title: "Lack of Awareness",
          hindi: "जागरूकता का अभाव",
          desc: "Over 68% of eligible rural beneficiaries miss out on central & state welfare schemes due to lack of timely, localized information.",
          icon: "HelpCircle"
        },
        {
          title: "Complex Procedures & Paperwork",
          hindi: "जटिल कागजी प्रक्रिया",
          desc: "Multi-step documentation, complex eligibility rules, and lack of verified checklists lead to frequent rejections.",
          icon: "FileWarning"
        },
        {
          title: "Language Barriers & Low Digital Literacy",
          hindi: "भाषा की रुकावट एवं कम डिजिटल साक्षरता",
          desc: "Most official portals are primarily English or formal Hindi, excluding non-tech-savvy villagers and dialect speakers.",
          icon: "Languages"
        },
        {
          title: "Multiple Office Visits",
          hindi: "सरकारी दफ्तरों के बार-बार चक्कर",
          desc: "Citizens travel 20-50 km to block/tehsil offices, losing daily wages and spending high travel costs without guaranteed resolution.",
          icon: "Building2"
        },
        {
          title: "Limited Access to Reliable Guidance",
          hindi: "विश्वसनीय सलाह की कमी",
          desc: "Exploitation by middlemen, agents, and counterfeit application services charging illegal commissions.",
          icon: "ShieldAlert"
        }
      ]
    },
    {
      id: 3,
      title: "Literature Survey & Research Gap",
      category: "Prior Works & Gap",
      badge: "State of Art",
      description: "Existing digital solutions are fragmented, siloed, and fail to cater to low-literacy rural demographics.",
      surveyPoints: [
        {
          area: "Digital Platforms",
          detail: "Portals like myScheme, UMANG provide comprehensive data, but require heavy text navigation and desktop digital skills.",
          status: "Information exists but inaccessible"
        },
        {
          area: "Chatbots & Rule-based AI",
          detail: "Generic FAQ chatbots fail when rural users ask queries in mixed Hindi-English (Hinglish), regional slang, or incomplete voice queries.",
          status: "Fails on informal speech"
        },
        {
          area: "Mobile & Voice Solutions",
          detail: "Kisan Call Centers provide voice support but suffer from busy lines, limited human agents, and zero instant document checking.",
          status: "Scalability bottlenecks"
        },
        {
          area: "Multilingual Support",
          detail: "Translates literal terms into incomprehensible bureaucratic jargon instead of simple conversational village tongue.",
          status: "Poor cultural adaptation"
        }
      ],
      researchGap: "Current systems lack an integrated, conversational, voice-first platform that seamlessly aggregates Government Schemes, Healthcare, Agriculture, Education, and Legal rights with personalized eligibility evaluation."
    },
    {
      id: 4,
      title: "Proposed Solution - GramSathi AI",
      category: "Solution Blueprint",
      badge: "Core Innovation",
      description: "A single intelligent platform connecting rural citizens with essential services through simple, multilingual and personalized voice/text assistance.",
      features: [
        {
          name: "Multilingual Voice & Text AI",
          desc: "Tap-to-speak voice recognition in Hindi, English, and regional dialects with audible read-aloud responses.",
          badge: "Accessibility"
        },
        {
          name: "Smart Scheme Eligibility Engine",
          desc: "Algorithmic matcher taking land holding, annual income, caste, and gender to pinpoint 100% matching welfare programs.",
          badge: "Welfare"
        },
        {
          name: "Integrated Agriculture & Mandi Advisory",
          desc: "Live APMC mandi rates, weather forecast, crop pest triage, and fertilizer dosage guidance for farmers.",
          badge: "Farming"
        },
        {
          name: "Healthcare, Education & Legal Triage",
          desc: "Jan Aushadhi generic drug lookup, Ayushman card assistance, rural scholarships, and Tele-Law guidance.",
          badge: "Human Rights"
        },
        {
          name: "Instant Emergency Support Hub",
          desc: "One-tap direct access to 112, 108 ambulance, 1091 women helpline, and 1962 animal husbandry emergency.",
          badge: "Safety"
        }
      ]
    },
    {
      id: 5,
      title: "System Architecture",
      category: "Technical Architecture",
      badge: "System Design",
      description: "End-to-end modular pipeline integrating Voice UI, RESTful API Orchestration, Generative LLM Intelligence, and Official External Data Services.",
      components: [
        {
          layer: "User Interface",
          tech: "React.js + Vite + Web Speech API",
          role: "Clean, high-contrast, bilingual interface optimized for 2G/3G mobile devices and low digital literacy."
        },
        {
          layer: "Backend Server",
          tech: "Node.js + Express.js REST API",
          role: "Handles authentication, rate limiting, scheme matching logic, external API webhooks, and session storage."
        },
        {
          layer: "AI & NLP Module",
          tech: "Google Gemini LLM / Speech Synthesis",
          role: "Processes informal Hinglish/Hindi audio, extracts intent & entities, verifies eligibility criteria, and crafts empathetic responses."
        },
        {
          layer: "Database",
          tech: "MongoDB / Structured Schemas",
          role: "Stores schemes repository, applicant eligibility vectors, local PHC directories, mandi historical trends, and query logs."
        },
        {
          layer: "External APIs",
          tech: "Govt Portals, OpenWeather, Agmarknet Mandis",
          role: "Retrieves live weather alerts, market prices, and official portal deep links."
        }
      ]
    },
    {
      id: 6,
      title: "Technology Stack",
      category: "Tech Stack",
      badge: "Modern MERN + AI",
      description: "Production-ready, battle-tested modern web and AI frameworks ensuring ultra-low latency and smooth offline reliability.",
      stack: [
        {
          category: "Frontend",
          items: ["React.js 18", "Vite", "Tailwind CSS", "Lucide Icons", "Web Speech API"],
          desc: "Lightning fast, mobile-first responsive rural interface"
        },
        {
          category: "Backend",
          items: ["Node.js", "Express.js", "RESTful Architecture", "CORS Middleware"],
          desc: "High concurrency microservice orchestration"
        },
        {
          category: "Database",
          items: ["MongoDB", "Mongoose ORM", "Schema Indexing"],
          desc: "Flexible NoSQL storage for scheme criteria & telemetry"
        },
        {
          category: "AI & NLP",
          items: ["Google Gemini API", "Speech-to-Text (STT)", "Text-to-Speech (TTS)", "Prompt Engineering"],
          desc: "Conversational bilingual intelligence with rural domain knowledge"
        },
        {
          category: "APIs & Deployment",
          items: ["Weather API", "Agmarknet APMC", "Git & GitHub", "Vercel / Render"],
          desc: "Continuous integration & global edge delivery"
        }
      ]
    },
    {
      id: 7,
      title: "Expected Impact & Benefits",
      category: "Societal Impact",
      badge: "Outcome Metrics",
      description: "Empowering rural citizens through digital inclusion, significant economic savings, and UN Sustainable Development Goal (SDG) acceleration.",
      impacts: [
        {
          metric: "80%",
          label: "Reduction in Travel Time & Cost",
          desc: "Villagers can verify eligibility and document requirements from home without paying broker fees or travelling."
        },
        {
          metric: "3x",
          label: "Higher Scheme Adoption",
          desc: "Personalized matching increases enrollment in PM-Kisan, Ayushman Bharat, and PM Awas Yojana."
        },
        {
          metric: "100%",
          label: "Voice-First Inclusivity",
          desc: "Illiterate or semi-literate citizens can speak naturally in Hindi or their regional dialect to get instant audio guidance."
        },
        {
          metric: "SDG 1, 2, 3, 8",
          label: "Global Alignment",
          desc: "Direct contribution to No Poverty, Zero Hunger, Good Health & Well-being, and Decent Work."
        }
      ]
    },
    {
      id: 8,
      title: "Future Scope & Roadmap",
      category: "Future Enhancements",
      badge: "Scalability",
      description: "Expanding beyond web and smartphones to touch every rural household across India.",
      roadmap: [
        {
          phase: "Phase 1: IVR & Feature Phone Toll-Free",
          desc: "Integrating Interactive Voice Response (IVR) so farmers with basic 2G feature phones can dial a toll-free number and speak to GramSathi AI."
        },
        {
          phase: "Phase 2: Offline-First PWA & Edge AI",
          desc: "Local on-device caching of essential scheme guidelines and emergency medical steps for zero-connectivity zones."
        },
        {
          phase: "Phase 3: Deep Multi-Dialect Support",
          desc: "Fine-tuning models on regional dialects like Bhojpuri, Maithili, Awadhi, Bundelkhandi, and Haryanvi."
        },
        {
          phase: "Phase 4: Government CSC Integration",
          desc: "Official API integration with Common Service Centers (CSC) and Gram Panchayats for one-click application filing."
        }
      ]
    },
    {
      id: 9,
      title: "Acknowledgement & Thanks",
      category: "Conclusion",
      badge: "Thank You",
      description: "Heartfelt gratitude to our esteemed mentor Ms. Ritu, GCET faculty, and the Department of Artificial Intelligence & Machine Learning.",
      notes: "We extend our deepest gratitude to our project guide Ms. Ritu (Assistant Professor), the Head of Department, and all faculty members of CSE(AIML) at Galgotias College of Engineering & Technology, Greater Noida, for their invaluable guidance, constant encouragement, and technical support throughout the development of GramSathi AI."
    }
  ]
};
