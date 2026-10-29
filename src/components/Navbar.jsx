import React from 'react';
import { 
  Sprout, 
  Languages, 
  Smartphone, 
  Monitor, 
  Presentation, 
  Sparkles, 
  Volume2, 
  VolumeX,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  deviceView, 
  setDeviceView,
  soundEnabled,
  setSoundEnabled 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* College & Department Top Header Strip */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-amber-900 text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide border border-emerald-500/30">
              GCET GREATER NOIDA
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-slate-200">Department of Artificial Intelligence & Machine Learning</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <span>Guide: <strong className="text-amber-300 font-semibold">Ms. Ritu</strong> (Asst. Prof)</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Mini Project 2026-27</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentTab('live-app')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  Gram<span className="text-emerald-600">Sathi</span>
                </span>
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight hidden sm:block">
                {lang === 'hi' ? 'आपका गाँव • आपका साथी' : 'Connecting Rural India through AI'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('live-app')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                currentTab === 'live-app'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'लाइव ऍप सिमुलेटर' : 'Live App Demo'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('schemes')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'schemes'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'योजनाएं व पात्रता' : 'Govt Schemes'}
            </button>

            <button
              onClick={() => setCurrentTab('agriculture')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'agriculture'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'कृषि व मौसम' : 'Agri & Mandi'}
            </button>

            <button
              onClick={() => setCurrentTab('health-legal')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'health-legal'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'स्वास्थ्य व कानूनी' : 'Health & Legal'}
            </button>

            <button
              onClick={() => setCurrentTab('presentation')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'presentation'
                  ? 'bg-amber-50 text-amber-800 shadow-sm border border-amber-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Presentation className="w-4 h-4 text-amber-600" />
              <span>{lang === 'hi' ? 'प्रोजेक्ट प्रेजेंटेशन' : 'Project Slides'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('team')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'team'
                  ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-slate-500" />
              <span>{lang === 'hi' ? 'टीम व गाइड' : 'Team & Guide'}</span>
            </button>
          </nav>

          {/* Right Controls: Language Switch, Sound, View Mode */}
          <div className="flex items-center gap-2">
            
            {/* View Mode Toggle (Phone frame vs Desktop) when in Live App */}
            {currentTab === 'live-app' && (
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
                <button
                  onClick={() => setDeviceView('phone')}
                  title="Mobile App View"
                  className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                    deviceView === 'phone'
                      ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
                <button
                  onClick={() => setDeviceView('desktop')}
                  title="Full Portal View"
                  className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                    deviceView === 'desktop'
                      ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Portal</span>
                </button>
              </div>
            )}

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Audio Speech Enabled" : "Audio Speech Muted"}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs sm:text-sm transition-all shadow-sm"
            >
              <Languages className="w-4 h-4 text-amber-700" />
              <span>{lang === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar for small screens */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 gap-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setCurrentTab('live-app')}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold ${
              currentTab === 'live-app' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {lang === 'hi' ? '📱 लाइव ऍप' : '📱 Live App'}
          </button>
          <button
            onClick={() => setCurrentTab('schemes')}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold ${
              currentTab === 'schemes' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {lang === 'hi' ? '🏛️ योजनाएं' : '🏛️ Schemes'}
          </button>
          <button
            onClick={() => setCurrentTab('agriculture')}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold ${
              currentTab === 'agriculture' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {lang === 'hi' ? '🌾 कृषि' : '🌾 Agriculture'}
          </button>
          <button
            onClick={() => setCurrentTab('health-legal')}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold ${
              currentTab === 'health-legal' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {lang === 'hi' ? '🏥 स्वास्थ्य' : '🏥 Health'}
          </button>
          <button
            onClick={() => setCurrentTab('presentation')}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold ${
              currentTab === 'presentation' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {lang === 'hi' ? '📊 प्रेजेंटेशन' : '📊 Slides'}
          </button>
          <button
            onClick={() => setCurrentTab('team')}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold ${
              currentTab === 'team' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {lang === 'hi' ? '👥 टीम' : '👥 Team'}
          </button>
        </div>
      </div>
    </header>
  );
}
