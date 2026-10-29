# GramSathi AI (ग्रामसाथी एआई)
### An Intelligent Rural Assistance Platform for Inclusive and Sustainable Development
> *"Connecting Rural India to Opportunities through AI" • "मेरा गाँव मेरा विकास"*

---

### 🏛️ Academic Institution & Affiliation
- **College:** Galgotias College of Engineering & Technology (GCET), Greater Noida
- **Department:** Department of Artificial Intelligence & Machine Learning
- **Course:** B.Tech Computer Science & Engineering (AIML)
- **Project Type:** Mini Project

### 👩‍🏫 Project Guide & Mentorship
- **Guide Name:** **Ms. Ritu**
- **Designation:** Assistant Professor
- **Department:** Department of Artificial Intelligence & Machine Learning, GCET Greater Noida

### 👨‍💻 Project Team Members
| Name | University Roll No. | Branch | Key Role |
| :--- | :--- | :--- | :--- |
| **Harsh Gupta** | 2300971530059 | CSE(AIML) | Full Stack & AI Architecture |
| **Digdarshan Kumar** | 2300971530049 | CSE(AIML) | AI & NLP Pipeline Specialist |
| **Devansh Saxena** | 2300971530047 | CSE(AIML) | Backend & Integration Engineer |
| **Ayushmaan Singh** | 2300971530042 | CSE(AIML) | UI/UX & Rural Accessibility |

---

## 🌟 Overview & Innovation

Rural citizens face acute difficulty in accessing welfare schemes, agricultural market intelligence, affordable healthcare, and legal rights due to complex paperwork, low digital literacy, and linguistic barriers.

**GramSathi AI** bridges this digital divide through an accessible, voice-first, bilingual (Hindi & English) platform featuring:
1. **Interactive Smartphone & Web Simulator:** Realistic recreation of the GramSathi AI mobile app showcased in the project slides.
2. **Web Speech AI Assistant (STT & TTS):** Tap-to-speak voice recognition with audio wave animation and audible spoken answers.
3. **Smart Scheme Eligibility Engine:** 4-step wizard matching land holding, income, and category with 100% eligible welfare programs.
4. **Agriculture & Mandi Intelligence:** Live APMC Mandi rates ticker, 5-day agro-meteorological weather advisory, pest diagnosis (Crop Doctor), and fertilizer dosage calculator.
5. **Healthcare & Legal Aid:** Jan Aushadhi generic medicines lookup (saving 70-80%), local PHC/CHC directory for Greater Noida, 24x7 emergency helplines, and UP Bhulekh online land records guide.
6. **Academic Presentation Deck (Viva Mode):** Interactive 9-slide presentation matching the college evaluation deck with keyboard navigation and full-screen presentation view.

---

## 🛠️ Technology Stack

- **Frontend:** React.js 18, Vite 6, Tailwind CSS, Lucide React, Canvas Confetti
- **Speech & AI:** Web Speech API (SpeechRecognition & SpeechSynthesis), Google Gemini API integration option, Built-in Rural NLP Engine
- **Styling:** Custom rural Indian themes (Gram Green, Tiranga Saffron, Terracotta, Navy)
- **Deployment & Tooling:** Git, GitHub, VS Code, Postman, Vercel / Render

---

## 🚀 How to Run the Platform

### 1. Launch via Batch Script
Double-click `start-platform.bat` inside this directory.

### 2. Launch via Terminal
```bash
npm run dev
```
Open **[http://localhost:5174](http://localhost:5174)** in your web browser.

---

## 📁 Directory Structure
```
gramsathi-ai/
├── dist/                      # Production build assets
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Branding, tabs, language & audio toggles
│   │   ├── LiveAppView.jsx    # Interactive smartphone frame & service tiles
│   │   ├── VoiceAssistantModal.jsx # Web Speech STT/TTS voice modal
│   │   ├── EligibilityChecker.jsx  # AI-based welfare scheme calculator
│   │   ├── SchemeExplorer.jsx # Central & state schemes directory & modal
│   │   ├── MandiWeatherWidget.jsx  # APMC mandi rates, weather & crop health
│   │   ├── HealthcareLegalWidget.jsx # Generic medicines, PHCs, helplines
│   │   ├── PresentationView.jsx    # 9-slide academic presentation deck
│   │   ├── TeamSection.jsx    # Guide Ms. Ritu & team member credentials
│   │   └── ChatAssistant.jsx  # Floating conversational AI drawer
│   ├── data/
│   │   ├── presentationData.js # Slides content, problem statement, architecture
│   │   ├── schemesData.js     # Comprehensive welfare schemes database
│   │   ├── mandiData.js       # Mandi rates, weather forecast, pest triage
│   │   └── healthcareData.js  # Emergency numbers, medicines, hospital directory
│   ├── utils/
│   │   └── aiEngine.js        # Speech STT/TTS service & Gemini AI client
│   ├── App.jsx                # Main unified application component
│   ├── index.css              # Tailwind directives & soundwave animations
│   └── main.jsx               # React DOM entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── start-platform.bat         # 1-click Windows launcher
```
