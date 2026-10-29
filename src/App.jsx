import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LiveAppView from './components/LiveAppView';
import SchemeExplorer from './components/SchemeExplorer';
import EligibilityChecker from './components/EligibilityChecker';
import MandiWeatherWidget from './components/MandiWeatherWidget';
import HealthcareLegalWidget from './components/HealthcareLegalWidget';
import PresentationView from './components/PresentationView';
import TeamSection from './components/TeamSection';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import ChatAssistant from './components/ChatAssistant';
import { 
  Sprout, 
  Sparkles, 
  Mic, 
  HelpCircle, 
  Heart, 
  ShieldCheck, 
  GraduationCap,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { presentationData } from './data/presentationData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('live-app'); // 'live-app', 'schemes', 'agriculture', 'health-legal', 'presentation', 'team'
  const [lang, setLang] = useState('hi'); // Default 'hi' (Hindi)
  const [deviceView, setDeviceView] = useState('phone'); // 'phone' or 'desktop'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        deviceView={deviceView}
        setDeviceView={setDeviceView}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: LIVE APP DEMO */}
        {currentTab === 'live-app' && (
          <div className="space-y-8">
            <LiveAppView
              lang={lang}
              deviceView={deviceView}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onSelectTab={(tab) => setCurrentTab(tab)}
              onOpenEligibility={() => setCurrentTab('schemes')}
            />

            {/* In-page Eligibility Teaser on Live App tab */}
            <div className="pt-4">
              <EligibilityChecker
                lang={lang}
                onSelectScheme={(scheme) => {
                  setActiveModalScheme(scheme);
                  setCurrentTab('schemes');
                }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: SCHEMES & ELIGIBILITY */}
        {currentTab === 'schemes' && (
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

        {/* TAB 3: AGRICULTURE & MANDI */}
        {currentTab === 'agriculture' && (
          <MandiWeatherWidget lang={lang} />
        )}

        {/* TAB 4: HEALTHCARE, LEGAL & EMERGENCY */}
        {currentTab === 'health-legal' && (
          <HealthcareLegalWidget lang={lang} />
        )}

        {/* TAB 5: PRESENTATION & VIVA DECK */}
        {currentTab === 'presentation' && (
          <PresentationView
            lang={lang}
            onOpenLiveDemo={() => setCurrentTab('live-app')}
          />
        )}

        {/* TAB 6: TEAM & GUIDE */}
        {currentTab === 'team' && (
          <TeamSection lang={lang} />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">GramSathi AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'hi' 
                  ? 'समावेशी और सतत विकास के लिए एक बुद्धिमान ग्रामीण सहायता मंच।' 
                  : 'An Intelligent Rural Assistance Platform for Inclusive and Sustainable Development.'}
              </p>
              <p className="text-xs text-emerald-400 font-hindi">
                "कनेक्टिंग रूरल इंडिया टू अपॉर्चुनिटीज थ्रू एआई"
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
            <p>© 2026 GramSathi AI. Developed for GCET Greater Noida AIML Mini Project.</p>
            <div className="flex items-center gap-4">
              <span>{lang === 'hi' ? 'ग्रामीण भारत के लिए एआई एवं एमएल से निर्मित' : 'Made with AI & ML for Rural India'}</span>
              <span className="text-emerald-500">● MERN + Gemini LLM Architecture</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Voice Assistant Modal (Web Speech STT + TTS) */}
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
