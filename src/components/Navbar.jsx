import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  LogIn, 
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  soundEnabled, 
  setSoundEnabled,
  onOpenLogin,
  onOpenVoiceModal,
  loggedInUser
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'services', labelEn: 'Services', labelHi: 'सेवाएं' },
    { id: 'ask', labelEn: 'Ask GramSathi', labelHi: 'ग्रामसाथी से पूछें', isSpecial: true },
    { id: 'about', labelEn: 'About', labelHi: 'परिचय (About)' },
    { id: 'contact', labelEn: 'Contact', labelHi: 'संपर्क (टीम)' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'ask') {
      onOpenVoiceModal();
      return;
    }
    setCurrentTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2 gap-4">
          
          {/* Logo & Brand matching Reference Screenshot */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <img 
              src="/gramsathi-logo.png" 
              alt="GramSathi AI Logo" 
              className="w-10 h-10 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
                  GramSathi <span className="text-emerald-700">AI</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight hidden md:block">
                {lang === 'hi' 
                  ? 'ग्रामीण सहायता एवं समावेशी विकास का बुद्धिमान मंच' 
                  : 'An Intelligent Rural Assistance Platform for Inclusive Development'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  item.isSpecial
                    ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                    : currentTab === item.id
                    ? 'text-emerald-800 bg-slate-100 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {lang === 'hi' ? item.labelHi : item.labelEn}
              </button>
            ))}
          </nav>

          {/* Right Controls: Language, Sound, Login */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? (lang === 'hi' ? "आवाज़ वाचन सक्रिय" : "Audio Speech Enabled") : (lang === 'hi' ? "आवाज़ वाचन म्यूट" : "Audio Speech Muted")}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Segmented Language Switcher */}
            <div className="flex items-center bg-amber-50/90 p-0.5 sm:p-1 rounded-xl border border-amber-300 shadow-xs text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  lang === 'hi'
                    ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-600 font-black'
                    : 'text-amber-900 hover:bg-amber-100/80 font-semibold'
                }`}
              >
                <span>हिंदी</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-600 font-black'
                    : 'text-amber-900 hover:bg-amber-100/80 font-semibold'
                }`}
              >
                <span>English</span>
              </button>
            </div>

            {/* Login Button (Matching Reference Screenshot) */}
            <button
              onClick={onOpenLogin}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 transform hover:scale-102"
            >
              {loggedInUser ? (
                <>
                  <UserCheck className="w-4 h-4 text-emerald-300" />
                  <span className="hidden sm:inline">{loggedInUser.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                  currentTab === item.id
                    ? 'bg-emerald-700 text-white font-black'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                {item.isSpecial && (
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                )}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
