export const healthcareData = {
  emergencyHelplines: [
    { number: "112", label: "National Emergency / Police", hindiLabel: "पुलिस व राष्ट्रीय आपातकाल", badge: "24x7" },
    { number: "108", label: "Free Medical Ambulance", hindiLabel: "मुफ्त सरकारी एम्बुलेंस सेवा", badge: "Priority" },
    { number: "1091", label: "Women Safety Helpline", hindiLabel: "महिला सुरक्षा हेल्पलाइन", badge: "Confidential" },
    { number: "155260", label: "Cyber / Bank Fraud Freeze", hindiLabel: "साइबर फ्रॉड व बैंक खाता सुरक्षा", badge: "Immediate" },
    { number: "1962", label: "Toll-Free Veterinary Emergency", hindiLabel: "पशु चिकित्सा आपातकाल (पशु एम्बुलेंस)", badge: "Free" },
    { number: "14555", label: "Ayushman Bharat Golden Card Help", hindiLabel: "आयुष्मान भारत कार्ड सहायता", badge: "Govt" },
    { number: "15100", label: "Tele-Law Free Legal Advocate", hindiLabel: "टेली-लॉ मुफ्त कानूनी वकील सलाह", badge: "Free Aid" }
  ],
  genericMedicines: [
    {
      name: "Paracetamol 650mg (बुखार / दर्द)",
      brandedPrice: "₹35 (Dolo 650)",
      janAushadhiPrice: "₹9.50",
      savings: "73%",
      use: "Fever and mild to moderate pain relief"
    },
    {
      name: "Metformin 500mg SR (डायबिटीज़ / शुगर)",
      brandedPrice: "₹65 (Glycomet)",
      janAushadhiPrice: "₹14.00",
      savings: "78%",
      use: "Blood glucose management in Type 2 Diabetes"
    },
    {
      name: "Telmisartan 40mg (ब्लड प्रेशर / बीपी)",
      brandedPrice: "₹120 (Telma 40)",
      janAushadhiPrice: "₹22.50",
      savings: "81%",
      use: "Hypertension / High blood pressure control"
    },
    {
      name: "Amoxicillin + Clavulanic Acid (एंटीबायोटिक)",
      brandedPrice: "₹210 (Augmentin)",
      janAushadhiPrice: "₹58.00",
      savings: "72%",
      use: "Bacterial infections of chest, throat, ear and wound"
    },
    {
      name: "Calcium 500mg + Vitamin D3 (हड्डी व कमजोरी)",
      brandedPrice: "₹145 (Shelcal 500)",
      janAushadhiPrice: "₹32.00",
      savings: "78%",
      use: "Strengthens bones, joints, pregnancy supplement"
    }
  ],
  nearbyCenters: [
    {
      name: "Community Health Center (CHC) Bhangel",
      type: "CHC (सामुदायिक स्वास्थ्य केंद्र)",
      location: "Bhangel, Greater Noida Expressway",
      timings: "24x7 Emergency, OPD: 8:00 AM - 2:00 PM",
      contact: "0120-2569871",
      services: "Delivery room, X-Ray, Blood testing, Ayushman Arogya Mandir"
    },
    {
      name: "Primary Health Center (PHC) Dankaur",
      type: "PHC (प्राथमिक स्वास्थ्य केंद्र)",
      location: "Near Tehsil Road, Dankaur, Greater Noida",
      timings: "OPD: 8:00 AM - 2:00 PM",
      contact: "0120-2895412",
      services: "Vaccinations, Free OPD medicines, Doctor consultation, Mother-Child care"
    },
    {
      name: "District Hospital Gautam Buddha Nagar",
      type: "District Civil Hospital",
      location: "Sector 39, Noida / Greater Noida Link",
      timings: "24x7 Emergency & Trauma",
      contact: "0120-2443001",
      services: "Full ICU, Dialysis, Surgery, PM-JAY Cashless desk"
    }
  ],
  educationInitiatives: [
    {
      title: "UP Pre-Matric & Post-Matric Scholarship",
      hindiTitle: "यूपी छात्रवृत्ति एवं शुल्क प्रतिपूर्ति योजना",
      eligibility: "SC/ST/OBC/General students with family income < ₹2.5 Lakh/year",
      benefit: "100% tuition fee reimbursement + annual maintenance allowance",
      portal: "scholarship.up.gov.in"
    },
    {
      title: "PM Kaushal Vikas Yojana (PMKVY 4.0)",
      hindiTitle: "प्रधानमंत्री कौशल विकास योजना (मुफ्त हुनर प्रशिक्षण)",
      eligibility: "Youth aged 15-45 with school dropout or looking for jobs",
      benefit: "Free certified training in Mobile repair, Solar installer, Drone pilot + ₹8,000 stipend",
      portal: "pmkvyofficial.org"
    },
    {
      title: "Jawahar Navodaya Vidyalaya Selection Test (JNVST)",
      hindiTitle: "जवाहर नवोदय विद्यालय (कक्षा 6 प्रवेश परीक्षा)",
      eligibility: "Rural class 5 students studying in govt/recognized schools",
      benefit: "100% free CBSE boarding school education, uniforms, books & sports till 12th",
      portal: "navodaya.gov.in"
    }
  ],
  legalRights: [
    {
      title: "Online Land Records (UP Bhulekh / Khasra-Khatauni)",
      hindiTitle: "ऑनलाइन खतौनी / खसरा नकल देखने का तरीका",
      steps: [
        "1. Open upbhulekh.gov.in on smartphone.",
        "2. Select your District (e.g., Gautam Buddha Nagar), Tehsil, and Village (Gram).",
        "3. Search by Gata Number (गाटा संख्या) or Khatauni Holder Name.",
        "4. View or print official digitally signed land map & record without paying bribes."
      ]
    },
    {
      title: "Free Legal Aid via Tele-Law (टेली-लॉ सेवा)",
      hindiTitle: "गाँव से ही सरकारी वकील से वीडियो/फोन पर मुफ्त कानूनी सलाह",
      steps: [
        "1. Visit your local Common Service Center (CSC / जन सेवा केंद्र).",
        "2. VLE registers your case on tele-law.in for free.",
        "3. Direct video conference scheduled with a High Court/District Legal Services advocate.",
        "4. Legal advice on land dispute, dowry, domestic violence, tenancy and inheritance."
      ]
    }
  ]
};
