import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import ServicesPage from './components/ServicesPage';
import ChatAssistantPage from './components/ChatAssistantPage';
import SchemeGuidancePage from './components/SchemeGuidancePage';
import LocationServicesPage from './components/LocationServicesPage';
import ProfileSettingsPage from './components/ProfileSettingsPage';
import MandiWeatherWidget from './components/MandiWeatherWidget';
import HealthcareLegalWidget from './components/HealthcareLegalWidget';
import PresentationView from './components/PresentationView';
import TeamSection from './components/TeamSection';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import ChatAssistant from './components/ChatAssistant';
import LoginModal from './components/LoginModal';
import { presentationData } from './data/presentationData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'services', 'ask', 'schemes', 'nearest', 'profile', 'about', 'contact'
  const [lang, setLang] = useState('en'); // 'en' or 'hi'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Handle service navigation from Home Hero or Services Page
  const handleNavigateService = (serviceId) => {
    if (serviceId === 'schemes' || serviceId === 'employment') {
      setCurrentTab('schemes');
    } else if (serviceId === 'health' || serviceId === 'emergency') {
      setCurrentTab('nearest');
    } else if (serviceId === 'agriculture') {
      setCurrentTab('services-agri');
    } else if (serviceId === 'education' || serviceId === 'legal') {
      setCurrentTab('services-health-legal');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col font-sans text-slate-800 selection:bg-emerald-600 selection:text-white">
      
      {/* Top Header & Navigation Bar matching Screen 1, 2, 3, 4, 5, 6 & Mobile Drawer */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        loggedInUser={loggedInUser}
        onLogout={() => setLoggedInUser(null)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* SCREEN 1: HOME PAGE (Desktop & Mobile) */}
        {currentTab === 'home' && (
          <div className="space-y-10">
            <HomeHero
              lang={lang}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onSelectService={handleNavigateService}
              activeService="schemes"
            />

            {/* Quick Interactive Preview of Popular Schemes directly on Home */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {lang === 'hi' ? 'लोकप्रिय सरकारी योजनाएं' : 'Featured Government Schemes'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'hi' ? 'ग्रामीण परिवारों के लिए प्रत्यक्ष लाभ व सब्सिडी' : 'Direct benefit welfare programs with verified checklists'}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab('schemes')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>{lang === 'hi' ? 'सभी योजनाएं देखें' : 'View All Schemes'} →</span>
                </button>
              </div>

              <SchemeGuidancePage lang={lang} />
            </div>
          </div>
        )}

        {/* SCREEN 2: SERVICES PAGE (Desktop & Mobile) */}
        {currentTab === 'services' && (
          <ServicesPage
            lang={lang}
            onNavigateService={handleNavigateService}
            onOpenEmergency={() => setCurrentTab('nearest')}
          />
        )}

        {/* SCREEN 3: AI CHAT ASSISTANT ("Ask GramSathi") */}
        {currentTab === 'ask' && (
          <ChatAssistantPage
            lang={lang}
            soundEnabled={soundEnabled}
            apiKey={apiKey}
            setLang={setLang}
            setSoundEnabled={setSoundEnabled}
            onNavigateSchemes={() => setCurrentTab('schemes')}
          />
        )}

        {/* SCREEN 4: SCHEME GUIDANCE PAGE & DETAILS MODAL */}
        {currentTab === 'schemes' && (
          <SchemeGuidancePage lang={lang} />
        )}

        {/* SCREEN 5: LOCATION BASED SERVICES ("Nearest Services" & Map) */}
        {currentTab === 'nearest' && (
          <LocationServicesPage lang={lang} />
        )}

        {/* SCREEN 6: USER PROFILE & SETTINGS ("My Profile") */}
        {currentTab === 'profile' && (
          <ProfileSettingsPage
            lang={lang}
            setLang={setLang}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onLogout={() => {
              setLoggedInUser(null);
              setCurrentTab('home');
            }}
          />
        )}

        {/* AGRICULTURE & MANDI INTEGRATED SERVICE VIEW */}
        {currentTab === 'services-agri' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentTab('services')}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              ← {lang === 'hi' ? 'वापस सेवाओं की सूची पर जाएं' : 'Back to All Services'}
            </button>
            <MandiWeatherWidget lang={lang} />
          </div>
        )}

        {/* HEALTHCARE & LEGAL SUB-SERVICE VIEW */}
        {currentTab === 'services-health-legal' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentTab('services')}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              ← {lang === 'hi' ? 'वापस सेवाओं की सूची पर जाएं' : 'Back to All Services'}
            </button>
            <HealthcareLegalWidget lang={lang} />
          </div>
        )}

        {/* ABOUT VIEW (College Viva Presentation Deck from PDF) */}
        {currentTab === 'about' && (
          <PresentationView
            lang={lang}
            onOpenLiveDemo={() => setCurrentTab('home')}
          />
        )}

        {/* CONTACT VIEW (Team & Guide Ms. Ritu, GCET Greater Noida AIML Dept) */}
        {currentTab === 'contact' && (
          <TeamSection lang={lang} />
        )}

      </main>

      {/* Footer matching modern design */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/gramsathi-logo.png" 
                  alt="GramSathi AI Logo" 
                  className="w-8 h-8 object-contain rounded-lg"
                />
                <span className="text-xl font-bold tracking-tight">GramSathi AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {lang === 'hi' 
                  ? 'समावेशी और सतत विकास के लिए एक बुद्धिमान ग्रामीण सहायता मंच।' 
                  : 'An Intelligent Rural Assistance Platform for Inclusive and Sustainable Development.'}
              </p>
              <p className="text-xs text-emerald-400 font-bold">
                "Connecting Rural India to Opportunities through AI"
              </p>
            </div>

            {/* Col 2: Institutional Affiliation */}
            <div className="space-y-2 text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-200 block mb-2">
                {lang === 'hi' ? 'शैक्षणिक संबद्धता' : 'Academic Affiliation'}
              </span>
              <p className="font-semibold text-slate-300">
                {lang === 'hi' ? presentationData.hindiDepartment : presentationData.department}
              </p>
              <p>Galgotias College of Engineering & Technology (GCET), Greater Noida</p>
              <p>
                {lang === 'hi' ? 'परियोजना मार्गदर्शक:' : 'Project Guide:'}{' '}
                <strong className="text-amber-400">{lang === 'hi' ? presentationData.guide.hindiName : presentationData.guide.name}</strong>{' '}
                ({lang === 'hi' ? presentationData.guide.hindiDesignation : presentationData.guide.designation})
              </p>
            </div>

            {/* Col 3: Student Developers */}
            <div className="space-y-2 text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-200 block mb-2">
                {lang === 'hi' ? 'परियोजना निर्माता छात्र' : 'Project Developers'}
              </span>
              <ul className="space-y-1">
                <li>• {lang === 'hi' ? 'हर्ष गुप्ता' : 'Harsh Gupta'} (2300971530059)</li>
                <li>• {lang === 'hi' ? 'दिग्दर्शन कुमार' : 'Digdarshan Kumar'} (2300971530049)</li>
                <li>• {lang === 'hi' ? 'देवांश सक्सेना' : 'Devansh Saxena'} (2300971530047)</li>
                <li>• {lang === 'hi' ? 'आयुष्मान सिंह' : 'Ayushmaan Singh'} (2300971530042)</li>
              </ul>
              <p className="text-[11px] text-slate-500">
                {lang === 'hi' ? 'शाखा: बी.टेक सीएसई (एआईएमएल)' : 'Branch: B.Tech CSE(AIML)'}
              </p>
            </div>

            {/* Col 4: Quick Portals */}
            <div className="space-y-2 text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-200 block mb-2">
                {lang === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portals'}
              </span>
              <div className="flex flex-col space-y-1.5">
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  pmkisan.gov.in ({lang === 'hi' ? 'पीएम किसान' : 'PM Kisan'})
                </a>
                <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  nha.gov.in ({lang === 'hi' ? 'आयुष्मान भारत' : 'Ayushman PM-JAY'})
                </a>
                <a href="https://upbhulekh.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  upbhulekh.gov.in ({lang === 'hi' ? 'यूपी भूलेख' : 'UP Bhulekh'})
                </a>
                <a href="https://nrega.nic.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  nrega.nic.in ({lang === 'hi' ? 'मनरेगा पोर्टल' : 'MGNREGA Portal'})
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 GramSathi AI.</p>
          </div>
        </div>
      </footer>

      {/* Citizen Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        lang={lang}
        onLoginSuccess={(user) => {
          setLoggedInUser(user);
          setIsLoginModalOpen(false);
        }}
      />

      {/* Global Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        lang={lang}
        soundEnabled={soundEnabled}
        apiKey={apiKey}
      />

      {/* Global Floating Chat Bubble Drawer (Active on all pages) */}
      <ChatAssistant
        lang={lang}
        soundEnabled={soundEnabled}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
      />

    </div>
  );
}
