export const mandiData = {
  currentMandi: "Greater Noida APMC Mandi (गौतम बुद्ध नगर)",
  lastUpdated: "Today, 10:30 AM IST",
  commodities: [
    {
      id: "wheat",
      name: "Wheat (गेहूं - Sharbati/Lokwan)",
      variety: "Sharbati",
      unit: "Quintal (क्विंटल)",
      minPrice: 2450,
      maxPrice: 2680,
      modalPrice: 2570,
      change: "+₹45",
      trend: "up",
      msp: 2425
    },
    {
      id: "paddy",
      name: "Paddy (धान - Basmati 1509)",
      variety: "Basmati",
      unit: "Quintal (क्विंटल)",
      minPrice: 3200,
      maxPrice: 3550,
      modalPrice: 3420,
      change: "+₹80",
      trend: "up",
      msp: 2320
    },
    {
      id: "mustard",
      name: "Mustard (सरसों - Pusa Bold)",
      variety: "Pusa Bold",
      unit: "Quintal (क्विंटल)",
      minPrice: 5600,
      maxPrice: 5950,
      modalPrice: 5800,
      change: "-₹30",
      trend: "down",
      msp: 5650
    },
    {
      id: "potato",
      name: "Potato (आलू - Chipsona/Kufri)",
      variety: "Chipsona",
      unit: "Quintal (क्विंटल)",
      minPrice: 1350,
      maxPrice: 1600,
      modalPrice: 1480,
      change: "+₹20",
      trend: "up",
      msp: 1200
    },
    {
      id: "onion",
      name: "Onion (प्याज़ - Nashik Red)",
      variety: "Red Medium",
      unit: "Quintal (क्विंटल)",
      minPrice: 2100,
      maxPrice: 2500,
      modalPrice: 2350,
      change: "+₹50",
      trend: "up",
      msp: 1900
    },
    {
      id: "sugarcane",
      name: "Sugarcane (गन्ना - Early Co-0238)",
      variety: "Co-0238",
      unit: "Quintal (क्विंटल)",
      minPrice: 370,
      maxPrice: 390,
      modalPrice: 380,
      change: "Stable",
      trend: "stable",
      msp: 355
    }
  ],
  weatherForecast: {
    location: "Greater Noida & Western UP Belt",
    temp: "27°C",
    condition: "Partly Cloudy (आंशिक बादल)",
    humidity: "62%",
    windSpeed: "11 km/h",
    rainChance: "15%",
    advisory: "Favorable conditions for wheat sowing and pesticide spraying. Light morning dew observed.",
    hindiAdvisory: "गेहूं की अगेती बुवाई और चना/सरसों में खरपतवार नियंत्रण हेतु मौसम अनुकूल है। सुबह ओस के कारण दोपहर बाद ही कीटनाशक का छिड़काव करें।",
    days: [
      { day: "Today", temp: "28°C / 18°C", condition: "Sunny", rain: "5%" },
      { day: "Tomorrow", temp: "27°C / 17°C", condition: "Partly Cloudy", rain: "15%" },
      { day: "Fri", temp: "26°C / 16°C", condition: "Clear Sky", rain: "0%" },
      { day: "Sat", temp: "27°C / 16°C", condition: "Sunny", rain: "0%" },
      { day: "Sun", temp: "25°C / 15°C", condition: "Light Breeze", rain: "10%" }
    ]
  },
  pestAdvisory: [
    {
      id: "leaf-curl",
      crop: "Mustard & Vegetables (सरसों व सब्जी)",
      symptom: "Aphids / Maahu (माहू कीट - चिपचिपे काले-हरे कीड़े पत्तियों के नीचे)",
      solution: "Spray Neem Oil (5ml/L water) or Imidacloprid 17.8% SL (1ml in 3L water) in evening hours.",
      hindiSolution: "नीम का तेल (5 मिली/लीटर) या इमिडाक्लोप्रिड 17.8% SL (1 मिली प्रति 3 लीटर पानी) का शाम के समय छिड़काव करें।"
    },
    {
      id: "termite",
      crop: "Wheat & Gram (गेहूं व चना)",
      symptom: "Termite Attack (दीमक लगना - पौधे सूखना)",
      solution: "Treat seeds with Chlorpyrifos 20 EC before sowing, or apply Chlorpyrifos with light irrigation.",
      hindiSolution: "बुवाई से पहले बीज शोधन करें या हल्की सिंचाई के साथ क्लोरपायरीफॉस 20 ईसी 1.5 लीटर प्रति एकड़ पानी के साथ बहाएं।"
    },
    {
      id: "yellow-rust",
      crop: "Wheat (गेहूं)",
      symptom: "Yellow Rust (पीला रतुआ - पत्तियों पर पीली धारियां पाउडर जैसी)",
      solution: "Spray Propiconazole 25 EC (Tilt) @ 1ml per liter water immediately upon first appearance.",
      hindiSolution: "लक्षण दिखते ही प्रोपिकोनाजोल 25% EC (टिल्ट) 1 मिली प्रति लीटर पानी में घोलकर 15 दिन के अंतराल पर 2 बार छिड़कें।"
    }
  ]
};
