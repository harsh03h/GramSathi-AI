import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import SchemeExplorer from './components/SchemeExplorer';
import EligibilityChecker from './components/EligibilityChecker';
import MandiWeatherWidget from './components/MandiWeatherWidget';
import HealthcareLegalWidget from './components/HealthcareLegalWidget';
import PresentationView from './components/PresentationView';
import TeamSection from './components/TeamSection';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import ChatAssistant from './components/ChatAssistant';
import LoginModal from './components/LoginModal';
import { 
  Sprout, 
  Sparkles, 
  Mic, 
  HelpCircle, 
  Heart, 
  ShieldCheck, 
  GraduationCap,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { presentationData } from './data/presentationData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'services', 'about', 'contact'
  const [activeService, setActiveService] = useState('schemes'); // 'schemes', 'health', 'education', 'agriculture', 'employment', 'legal', 'emergency'
  const [lang, setLang] = useState('en'); // default matching reference image or toggleable
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  const handleSelectService = (serviceId) => {
    setActiveService(serviceId);
    // Smooth scroll down to active service interactive section
    const target = document.getElementById('active-service-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Navigation Bar matching reference layout */}
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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        
        {/* VIEW 1: HOME PAGE (Matches Reference Screenshot 1:1) */}
        {currentTab === 'home' && (
          <div className="space-y-10">
            {/* The Reference Hero & 7 Pastel Service Cards */}
            <HomeHero
              lang={lang}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onSelectService={handleSelectService}
              activeService={activeService}
            />

            {/* Active Service Deep Dive Section */}
            <div id="active-service-section" className="pt-2 space-y-6">
              
              {/* Service Header Indicator */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {activeService === 'schemes' && (lang === 'hi' ? '🏛️ सरकारी योजनाएं व पात्रता कैलकुलेटर' : '🏛️ Government Schemes & Eligibility Engine')}
                    {activeService === 'health' && (lang === 'hi' ? '🏥 स्वास्थ्य सहायता एवं जन औषधि केंद्र' : '🏥 Healthcare Assistance & Jan Aushadhi')}
                    {activeService === 'education' && (lang === 'hi' ? '🎓 शिक्षा, छात्रवृत्ति व कौशल विकास' : '🎓 Education Support & Scholarships')}
                    {activeService === 'agriculture' && (lang === 'hi' ? '🌾 कृषि मार्गदर्शन, मौसम व मंडी भाव' : '🌾 Agriculture Guidance & Mandi Prices')}
                    {activeService === 'employment' && (lang === 'hi' ? '💼 ग्रामीण रोज़गार एवं मनरेगा (MGNREGA)' : '💼 Rural Employment & MGNREGA')}
                    {activeService === 'legal' && (lang === 'hi' ? '⚖️ कानूनी सलाह एवं ऑनलाइन भूलेख' : '⚖️ Legal Guidance & UP Bhulekh')}
                    {activeService === 'emergency' && (lang === 'hi' ? '🚨 24x7 आपातकालीन हेल्पलाइन सेवाएं' : '🚨 24x7 Emergency Helplines')}
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {lang === 'hi' ? 'इंटरएक्टिव मॉड्यूल' : 'Interactive Module'}
                </span>
              </div>

              {/* Dynamic Content per Active Service */}
              {activeService === 'schemes' && (
                <div className="space-y-8">
                  <EligibilityChecker
                    lang={lang}
                    onSelectScheme={(scheme) => setActiveModalScheme(scheme)}
                  />
                  <SchemeExplorer
                    lang={lang}
                    activeModalScheme={activeModalScheme}
                    setActiveModalScheme={setActiveModalScheme}
                    onOpenEligibility={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  />
                </div>
              )}

              {activeService === 'agriculture' && (
                <MandiWeatherWidget lang={lang} />
              )}

              {(activeService === 'health' || activeService === 'education' || activeService === 'legal' || activeService === 'emergency') && (
                <HealthcareLegalWidget lang={lang} />
              )}

              {activeService === 'employment' && (
                <div className="space-y-8">
                  <EligibilityChecker
                    lang={lang}
                    onSelectScheme={(scheme) => setActiveModalScheme(scheme)}
                  />
                  <SchemeExplorer
                    lang={lang}
                    activeModalScheme={activeModalScheme}
                    setActiveModalScheme={setActiveModalScheme}
                    onOpenEligibility={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  />
                </div>
              )}

            </div>
          </div>
        )}

        {/* VIEW 2: SERVICES DIRECTORY */}
        {currentTab === 'services' && (
          <div className="space-y-8">
            <EligibilityChecker
              lang={lang}
              onSelectScheme={(scheme) => setActiveModalScheme(scheme)}
            />
            <SchemeExplorer
              lang={lang}
              activeModalScheme={activeModalScheme}
              setActiveModalScheme={setActiveModalScheme}
              onOpenEligibility={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <MandiWeatherWidget lang={lang} />
            <HealthcareLegalWidget lang={lang} />
          </div>
        )}

        {/* VIEW 3: ABOUT (Presentation Slides from PDF) */}
        {currentTab === 'about' && (
          <PresentationView
            lang={lang}
            onOpenLiveDemo={() => setCurrentTab('home')}
          />
        )}

        {/* VIEW 4: CONTACT (Team & Guide Ms. Ritu) */}
        {currentTab === 'contact' && (
          <TeamSection lang={lang} />
        )}

      </main>

      {/* Footer matching modern clean layout */}
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
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'hi' 
                  ? 'समावेशी और सतत विकास के लिए एक बुद्धिमान ग्रामीण सहायता मंच।' 
                  : 'An Intelligent Rural Assistance Platform for Inclusive and Sustainable Development.'}
              </p>
              <p className="text-xs text-emerald-400 font-hindi">
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
            <p>© 2026 GramSathi AI. Department of AI & ML, GCET Greater Noida.</p>
            <div className="flex items-center gap-4">
              <span>{lang === 'hi' ? 'ग्रामीण भारत के लिए एआई एवं एमएल से निर्मित' : 'Made with AI & ML for Rural India'}</span>
              <span className="text-emerald-500">● MERN + Gemini LLM Architecture</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        lang={lang}
        onLoginSuccess={(user) => setLoggedInUser(user)}
      />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        lang={lang}
        soundEnabled={soundEnabled}
        apiKey={apiKey}
      />

      {/* Floating Chat Assistant Drawer */}
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
