import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Layers, 
  MessageSquare, 
  MapPin, 
  User, 
  Info, 
  PhoneCall, 
  LogOut, 
  LogIn, 
  Volume2, 
  VolumeX,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  soundEnabled, 
  setSoundEnabled,
  theme = 'light',
  setTheme,
  onOpenLogin,
  onOpenVoiceModal,
  loggedInUser,
  onLogout
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const desktopNavLinks = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'services', labelEn: 'Services', labelHi: 'सेवाएं' },
    { id: 'ask', labelEn: 'Ask GramSathi', labelHi: 'ग्रामसाथी से पूछें' },
    { id: 'nearest', labelEn: 'Nearest Services', labelHi: 'नजदीकी सेवाएं' },
    { id: 'about', labelEn: 'About', labelHi: 'परिचय (About)' },
    { id: 'contact', labelEn: 'Contact', labelHi: 'टीम व गाइड' },
  ];

  const mobileDrawerItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', icon: Home },
    { id: 'services', labelEn: 'Services', labelHi: 'सेवाएं (Our Services)', icon: Layers },
    { id: 'ask', labelEn: 'Ask GramSathi', labelHi: 'ग्रामसाथी से पूछें (AI Chat)', icon: MessageSquare },
    { id: 'nearest', labelEn: 'Nearest Services', labelHi: 'नजदीकी सेवाएं (Map)', icon: MapPin },
    { id: 'profile', labelEn: 'My Profile', labelHi: 'मेरी प्रोफ़ाइल (Profile)', icon: User },
    { id: 'about', labelEn: 'About', labelHi: 'प्रोजेक्ट परिचय (About)', icon: Info },
    { id: 'contact', labelEn: 'Contact', labelHi: 'संपर्क (टीम व गाइड)', icon: PhoneCall },
  ];

  const handleNavClick = (id) => {
    setMobileDrawerOpen(false);
    setCurrentTab(id);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 py-2 gap-2 sm:gap-3">
            
            {/* Logo matching Screen 1, 2, 3, 4, 5, 6 */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0 min-w-0"
            >
              <img 
                src="/gramsathi-mascot.png" 
                alt="GramSathi AI Logo" 
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="min-w-0">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-1">
                  <span>GramSathi</span> <span className="text-amber-600">AI</span>
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight hidden lg:block font-medium">
                  {lang === 'hi' ? 'ग्रामीण सशक्तिकरण एवं विकास मंच' : 'An Intelligent Rural Assistance Platform'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
              {desktopNavLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all ${
                    currentTab === item.id
                      ? 'text-emerald-900 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/60 font-black border border-emerald-200 dark:border-emerald-800'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/70'
                  }`}
                >
                  {lang === 'hi' ? item.labelHi : item.labelEn}
                </button>
              ))}
            </nav>

            {/* Right Controls: Audio, Theme Switcher, Segmented Language Switcher, Profile/Login */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Audio Speech Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? (lang === 'hi' ? "आवाज़ वाचन सक्रिय" : "Audio Speech Enabled") : (lang === 'hi' ? "आवाज़ वाचन म्यूट" : "Audio Speech Muted")}
                className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
                  soundEnabled 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              {/* Theme Switcher Toggle (Light Mode Default / Dark Mode) */}
              <button
                type="button"
                onClick={() => setTheme && setTheme(theme === 'dark' ? 'light' : 'dark')}
                title={theme === 'dark' ? (lang === 'hi' ? 'लाइट मोड सक्रिय करें' : 'Switch to Light Mode') : (lang === 'hi' ? 'डार्क मोड सक्रिय करें' : 'Switch to Dark Mode')}
                className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-amber-400/40 text-amber-400 hover:bg-slate-700 shadow-2xs'
                    : 'bg-amber-50/90 border-amber-200 text-slate-700 hover:bg-amber-100/90'
                }`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
                )}
              </button>

              {/* Segmented Language Switcher */}
              <div className="flex items-center bg-amber-50/90 dark:bg-slate-800 p-0.5 rounded-xl border border-amber-300 dark:border-slate-700 shadow-2xs text-[11px] sm:text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  title="हिंदी भाषा सक्रिय करें"
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg flex items-center gap-1 transition-all ${
                    lang === 'hi'
                      ? 'bg-emerald-800 text-white shadow-xs font-black'
                      : 'text-amber-900 dark:text-slate-300 hover:bg-amber-100/80 dark:hover:bg-slate-750 font-semibold'
                  }`}
                >
                  <span>हिंदी</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  title="Switch to English"
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg flex items-center gap-1 transition-all ${
                    lang === 'en'
                      ? 'bg-emerald-800 text-white shadow-xs font-black'
                      : 'text-amber-900 dark:text-slate-300 hover:bg-amber-100/80 dark:hover:bg-slate-750 font-semibold'
                  }`}
                >
                  <span>EN</span>
                </button>
              </div>

              {/* Login / Profile Button */}
              {loggedInUser ? (
                <button
                  onClick={() => handleNavClick('profile')}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-full text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  title="View Profile"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="hidden sm:inline">{loggedInUser.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 transform hover:scale-102"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
                </button>
              )}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="md:hidden p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-fade-in md:hidden">
          <div className="w-72 bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto border-l border-slate-200 dark:border-slate-800">
            
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <img src="/gramsathi-mascot.png" alt="GramSathi AI" className="w-8 h-8 object-contain rounded-lg" />
                  <span className="text-lg font-black text-slate-900 dark:text-white">GramSathi <span className="text-amber-600">AI</span></span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Toggle Card in Mobile Drawer */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  )}
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {theme === 'dark' 
                      ? (lang === 'hi' ? 'डार्क मोड' : 'Dark Mode') 
                      : (lang === 'hi' ? 'लाइट मोड' : 'Light Mode')}
                  </span>
                </div>
                <button
                  onClick={() => setTheme && setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="px-2.5 py-1 rounded-xl bg-emerald-800 text-white text-[11px] font-bold shadow-xs hover:bg-emerald-900"
                >
                  {theme === 'dark' ? (lang === 'hi' ? 'लाइट करें' : 'Light') : (lang === 'hi' ? 'डार्क करें' : 'Dark')}
                </button>
              </div>

              {/* Drawer Menu Items */}
              <div className="space-y-1.5">
                {mobileDrawerItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-emerald-800 text-white font-black shadow-xs'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom Logout/Login Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              {loggedInUser ? (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'लॉगआउट (Logout)' : 'Logout'}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'लॉगिन करें' : 'Login'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
