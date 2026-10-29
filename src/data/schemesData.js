export const schemesData = [
  {
    id: "pm-kisan",
    name: "PM-Kisan Samman Nidhi",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि योजना",
    category: "Farmer",
    hindiCategory: "किसान",
    benefit: "₹6,000 / year in 3 direct bank installments",
    hindiBenefit: "₹6,000 प्रति वर्ष (₹2,000 की 3 समान किस्तों में सीधे बैंक खाते में)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    hindiMinistry: "कृषि एवं किसान कल्याण मंत्रालय",
    criteria: {
      maxLandAcres: 50,
      maxIncome: 1000000,
      mustBeFarmer: true,
      excludesTaxPayers: true
    },
    description: "Financial assistance provided directly to landholding farmer families to support procurement of agricultural inputs and domestic needs.",
    hindiDescription: "भूमिधारक किसान परिवारों को कृषि आदानों की खरीद और घरेलू जरूरतों की पूर्ति के लिए सीधे बैंक खाते में वित्तीय सहायता प्रदान की जाती है।",
    documents: [
      "Aadhaar Card (आधार कार्ड)",
      "Land Ownership Documents / Khasra-Khatauni (भूलेख / खसरा-खतौनी)",
      "Bank Account Passbook with IFSC (बैंक पासबुक)",
      "Active Mobile number linked to Aadhaar (आधार लिंक मोबाइल नंबर)"
    ],
    officialLink: "https://pmkisan.gov.in",
    helpline: "155261 / 011-24300606",
    badge: "Most Popular",
    hindiBadge: "सर्वाधिक लोकप्रिय"
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat PM-JAY",
    hindiName: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    category: "Health",
    hindiCategory: "स्वास्थ्य",
    benefit: "Cashless health cover up to ₹5,00,000 per family per year",
    hindiBenefit: "प्रति वर्ष प्रति परिवार ₹5,00,000 तक का निःशुल्क कैशलेस इलाज",
    ministry: "National Health Authority (NHA)",
    hindiMinistry: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)",
    criteria: {
      maxIncome: 250000,
      isSECCBeneficiary: true,
      elderlyIncluded: true
    },
    description: "The world's largest health assurance scheme providing secondary and tertiary hospitalization cover across 29,000+ empaneled hospitals.",
    hindiDescription: "देश के 29,000 से अधिक सूचीबद्ध सरकारी और निजी अस्पतालों में गंभीर बीमारियों के इलाज के लिए ₹5 लाख का मुफ्त स्वास्थ्य कवर।",
    documents: [
      "Aadhaar Card (आधार कार्ड)",
      "Ration Card / SECC Data proof (राशन कार्ड)",
      "Mobile Number for OTP verification (सत्यापन हेतु मोबाइल नंबर)"
    ],
    officialLink: "https://beneficiary.nha.gov.in",
    helpline: "14555",
    badge: "Life Saving",
    hindiBadge: "जीवन रक्षक"
  },
  {
    id: "pm-awas-gramin",
    name: "PM Awas Yojana (Gramin)",
    hindiName: "प्रधानमंत्री आवास योजना (ग्रामीण)",
    category: "Housing",
    hindiCategory: "आवास",
    benefit: "₹1,20,000 (Plains) to ₹1,30,000 (Hilly areas) for building pakka house",
    hindiBenefit: "पक्का मकान बनाने के लिए ₹1,20,000 (मैदानी क्षेत्र) / ₹1,30,000 की वित्तीय सहायता",
    ministry: "Ministry of Rural Development",
    hindiMinistry: "ग्रामीण विकास मंत्रालय",
    criteria: {
      mustBeHouselessOrKutcha: true,
      maxIncome: 180000
    },
    description: "Provides financial grant to homeless rural families and those living in dilapidated kutcha houses to build pucca houses with clean toilet.",
    hindiDescription: "ग्रामीण क्षेत्रों में बेघर या कच्चे मकान में रहने वाले परिवारों को शौचालय युक्त पक्का मकान बनाने के लिए सीधी आर्थिक सहायता।",
    documents: [
      "Aadhaar Card of head and family members (आधार कार्ड)",
      "MGNREGA Job Card (मनरेगा जॉब कार्ड)",
      "Bank Account details (बैंक खाता विवरण)",
      "Consent letter for land / house site (जमीन का स्वप्रमाणित विवरण)"
    ],
    officialLink: "https://pmayg.nic.in",
    helpline: "1800-11-6446",
    badge: "High Subsidy",
    hindiBadge: "उच्च अनुदान"
  },
  {
    id: "pm-fasal-bima",
    name: "PM Fasal Bima Yojana (PMFBY)",
    hindiName: "प्रधानमंत्री फसल बीमा योजना",
    category: "Farmer",
    hindiCategory: "किसान",
    benefit: "Full financial compensation for crop damage due to drought, flood, pests",
    hindiBenefit: "बाढ़, सूखा, बेमौसम बारिश व कीटों से फसल खराब होने पर शत-प्रतिशत मुआवजा",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    hindiMinistry: "कृषि एवं किसान कल्याण मंत्रालय",
    criteria: {
      mustBeFarmer: true
    },
    description: "Comprehensive risk insurance covering post-harvest losses, localized calamities, prevented sowing, and yield loss at minimal farmer premium (1.5% - 2%).",
    hindiDescription: "सूखा, बाढ़ या कीट से फसल क्षति पर किसानों को नाममात्र प्रीमियम (1.5% - 2%) पर व्यापक बीमा सुरक्षा।",
    documents: [
      "Crop Sowing Certificate / Patwari Panchnama (बोआई प्रमाण पत्र)",
      "Land Record / Khasra-Khatauni (भूलेख प्रति)",
      "Aadhaar & Bank Passbook (आधार व बैंक पासबुक)"
    ],
    officialLink: "https://pmfby.gov.in",
    helpline: "14447",
    badge: "Risk Protection",
    hindiBadge: "फसल जोखिम सुरक्षा"
  },
  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC)",
    hindiName: "किसान क्रेडिट कार्ड (KCC)",
    category: "Farmer",
    hindiCategory: "किसान",
    benefit: "Low-interest loans up to ₹3,00,000 at effective 4% interest rate",
    hindiBenefit: "4% रियायती ब्याज दर पर ₹3 लाख तक का आसान कृषि ऋण",
    ministry: "Ministry of Finance & Agriculture",
    hindiMinistry: "वित्त एवं कृषि मंत्रालय",
    criteria: {
      mustBeFarmer: true
    },
    description: "Meets short-term credit requirements for cultivation, post-harvest expenses, animal husbandry, and maintenance of farm assets.",
    hindiDescription: "बीज, खाद, कीटनाशक खरीदने और पशुपालन हेतु बिना किसी जटिल बंधक के 4% ब्याज पर रियायती लोन।",
    documents: [
      "Filled KCC application form (आवेदन पत्र)",
      "Identity Proof (Aadhaar/Voter ID)",
      "Land Record verified by Revenue Officer (खतौनी नकल)",
      "Passport size photographs (पासपोर्ट फोटो)"
    ],
    officialLink: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card",
    helpline: "1800-180-1551",
    badge: "Low Interest",
    hindiBadge: "रियायती ब्याज लोन"
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    hindiName: "सुकन्या समृद्धि योजना",
    category: "Women & Child",
    hindiCategory: "महिला एवं बाल",
    benefit: "8.2% high annual compound interest + tax exemption for girl child",
    hindiBenefit: "बेटियों की उच्च शिक्षा व विवाह हेतु 8.2% चक्रवृद्धि ब्याज दर व कर छूट",
    ministry: "Ministry of Finance",
    hindiMinistry: "वित्त मंत्रालय",
    criteria: {
      hasGirlChildUnder10: true
    },
    description: "A government-backed savings scheme for parents of girl children under 10 years old to secure fund for higher education and marriage.",
    hindiDescription: "10 वर्ष से कम उम्र की बालिकाओं के उज्ज्वल भविष्य और उच्च शिक्षा के लिए पोस्ट ऑफिस में उच्चतम ब्याज वाली बचत योजना।",
    documents: [
      "Girl child birth certificate (बालिका का जन्म प्रमाण पत्र)",
      "Guardian Aadhaar Card & PAN (अभिभावक का आधार कार्ड)",
      "Address proof (निवास प्रमाण पत्र)"
    ],
    officialLink: "https://www.indiapost.gov.in",
    helpline: "1800-266-6868",
    badge: "Safe Savings",
    hindiBadge: "सुरक्षित बचत योजना"
  },
  {
    id: "lakhpati-didi",
    name: "Lakhpati Didi Initiative",
    hindiName: "लखपति दीदी योजना",
    category: "Women & Child",
    hindiCategory: "महिला एवं बाल",
    benefit: "Skill training, micro-enterprise loans, and target income of ₹1,00,000+/year",
    hindiBenefit: "स्वयं सहायता समूह की महिलाओं को मुफ्त हुनर प्रशिक्षण व ₹1 लाख+ सालाना आय का लक्ष्य",
    ministry: "Ministry of Rural Development (NRLM)",
    hindiMinistry: "ग्रामीण विकास मंत्रालय (एनआरएलएम)",
    criteria: {
      isWomanInSHG: true
    },
    description: "Empowers rural women in Self Help Groups (SHGs) to start micro-businesses in food processing, tailoring, drone operation, and nursery farming.",
    hindiDescription: "ग्रामीण स्वयं सहायता समूहों (SHG) की महिलाओं को सिलाई, ड्रोन दीदी, फूड प्रोसेसिंग और डेयरी में आत्मनिर्भर बनाने की योजना।",
    documents: [
      "SHG Membership ID / Passbook (स्वयं सहायता समूह सदस्यता)",
      "Aadhaar Card (आधार कार्ड)",
      "Bank Account Passbook (बैंक पासबुक)"
    ],
    officialLink: "https://aajeevika.gov.in",
    helpline: "011-23381611",
    badge: "Women Empowerment",
    hindiBadge: "महिला सशक्तिकरण"
  },
  {
    id: "pm-ujjwala",
    name: "PM Ujjwala Yojana 2.0",
    hindiName: "प्रधानमंत्री उज्ज्वला योजना 2.0",
    category: "Women & Child",
    hindiCategory: "महिला एवं बाल",
    benefit: "Free LPG gas cylinder, regulator, pipe, stove + ₹300 per refill subsidy",
    hindiBenefit: "मुफ्त एलपीजी गैस कनेक्शन, चूल्हा, भरा हुआ सिलेंडर व ₹300 प्रति रिफिल सब्सिडी",
    ministry: "Ministry of Petroleum & Natural Gas",
    hindiMinistry: "पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय",
    criteria: {
      mustBeWomanAdult: true,
      maxIncome: 200000
    },
    description: "Provides clean cooking fuel to rural poor women, protecting families from toxic smoke of firewood and cow dung cakes.",
    hindiDescription: "ग्रामीण महिलाओं को चूल्हे के जहरीले धुएं से मुक्ति दिलाने के लिए निःशुल्क गैस कनेक्शन व चूल्हा।",
    documents: [
      "Ration Card with all family members listed (राशन कार्ड)",
      "Aadhaar Card of adult woman applicant (आधार कार्ड)",
      "Bank Passbook linked to Aadhaar (बैंक पासबुक)"
    ],
    officialLink: "https://pmuy.gov.in",
    helpline: "1800-266-6696",
    badge: "Free Connection",
    hindiBadge: "मुफ्त गैस कनेक्शन"
  },
  {
    id: "mgnrega",
    name: "MGNREGA Rural Employment",
    hindiName: "मनरेगा (महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी)",
    category: "Employment",
    hindiCategory: "रोज़गार",
    benefit: "Guaranteed 100 days of wage employment in public manual work per household",
    hindiBenefit: "प्रत्येक ग्रामीण परिवार को प्रति वर्ष 100 दिन के अकुशल रोज़गार की कानूनी गारंटी",
    ministry: "Ministry of Rural Development",
    hindiMinistry: "ग्रामीण विकास मंत्रालय",
    criteria: {
      isRuralAdult: true,
      willingToManualLabor: true
    },
    description: "Guarantees 100 days of unskilled wage labor on rural infrastructure like pond rejuvenation, canal cleaning, and farm leveling within 5 km of village.",
    hindiDescription: "गाँव के 5 किमी के भीतर तालाब खुदाई, चकबंदी, वृक्षारोपण व नहर सफाई कार्य में दैनिक मजदूरी (उत्तर प्रदेश में ₹237/दिन)।",
    documents: [
      "Family photo (परिवार का संयुक्त फोटो)",
      "Aadhaar Card (आधार कार्ड)",
      "Bank/Post Office Savings Account (बैंक खाता)"
    ],
    officialLink: "https://nrega.nic.in",
    helpline: "1800-345-6527",
    badge: "Legal Right",
    hindiBadge: "कानूनी अधिकार"
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar Muft Bijli",
    hindiName: "पीएम सूर्य घर मुफ्त बिजली योजना",
    category: "Energy",
    hindiCategory: "ऊर्जा व विकास",
    benefit: "Up to ₹78,00,00 direct subsidy on rooftop solar system + up to 300 units free power",
    hindiBenefit: "छत पर सोलर पैनल लगवाने पर ₹78,000 तक की सीधी सब्सिडी व 300 यूनिट मुफ्त बिजली",
    ministry: "Ministry of New and Renewable Energy",
    hindiMinistry: "नवीन एवं नवीकरणीय ऊर्जा मंत्रालय",
    criteria: {
      hasElectricityConnection: true,
      hasRoofSpace: true
    },
    description: "Subsidizes rooftop solar installation for rural and suburban houses to eliminate monthly electricity bills and earn money by feeding back to grid.",
    hindiDescription: "गाँव के घरों की छतों पर सोलर सिस्टम लगाकर हर महीने बिजली का बिल शून्य करें और अतिरिक्त बिजली बेचें।",
    documents: [
      "Latest Electricity Bill (बिजली का बिल)",
      "Aadhaar Card (आधार कार्ड)",
      "Proof of house roof ownership (मकान की रजिस्ट्री/प्रमाण पत्र)"
    ],
    officialLink: "https://pmsuryaghar.gov.in",
    helpline: "15555",
    badge: "Save Money",
    hindiBadge: "बिजली बिल बचत"
  }
];
