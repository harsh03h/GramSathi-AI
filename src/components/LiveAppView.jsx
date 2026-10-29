import React, { useState } from 'react';
import { 
  Building2, 
  HeartPulse, 
  GraduationCap, 
  Wheat, 
  Briefcase, 
  Scale, 
  PhoneCall, 
  Mic, 
  Search, 
  ChevronRight, 
  Sparkles, 
  ShieldAlert, 
  ArrowUpRight,
  Sun,
  Coins,
  MapPin,
  TrendingUp,
  Volume2
} from 'lucide-react';

export default function LiveAppView({ 
  lang, 
  deviceView, 
  onOpenVoiceModal, 
  onSelectTab, 
  onOpenEligibility 
}) {
  const [quickSearch, setQuickSearch] = useState('');

  // 6 Primary Service modules from Slide 1 & Slide 4
  const serviceCards = [
    {
      id: 'schemes',
      title: 'Government Schemes',
      hindiTitle: 'सरकारी योजनाएं',
      subtitle: 'PM-Kisan, Ayushman, PMAY, Subsidies',
      hindiSubtitle: 'पीएम किसान, आवास, राशन व 100% सब्सिडी',
      icon: Building2,
      color: 'from-emerald-600 to-teal-700',
      tagColor: 'bg-emerald-100 text-emerald-800',
      count: '10+ Active',
      action: () => onSelectTab('schemes')
    },
    {
      id: 'health',
      title: 'Healthcare Assistance',
      hindiTitle: 'स्वास्थ्य सहायता',
      subtitle: 'Ayushman Card, Jan Aushadhi, PHCs',
      hindiSubtitle: '₹5 लाख मुफ्त इलाज, सस्ती दवाएं, पीएचसी',
      icon: HeartPulse,
      color: 'from-rose-500 to-pink-600',
      tagColor: 'bg-rose-100 text-rose-800',
      count: '₹5L Free',
      action: () => onSelectTab('health-legal')
    },
    {
      id: 'agriculture',
      title: 'Agriculture Guidance',
      hindiTitle: 'कृषि सलाह व मंडी',
      subtitle: 'Mandi Rates, Weather, Pest Treatment',
      hindiSubtitle: 'ताज़ा मंडी भाव, 5 दिन मौसम, फसल डॉक्टर',
      icon: Wheat,
      color: 'from-amber-500 to-orange-600',
      tagColor: 'bg-amber-100 text-amber-800',
      count: 'Live Rates',
      action: () => onSelectTab('agriculture')
    },
    {
      id: 'education',
      title: 'Education Support',
      hindiTitle: 'शिक्षा एवं कौशल विकास',
      subtitle: 'Scholarships, PMKVY Skills, Navodaya',
      hindiSubtitle: 'छात्रवृत्ति, मुफ्त हुनर ट्रेनिंग व नवोदय',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-700',
      tagColor: 'bg-blue-100 text-blue-800',
      count: 'Free Grants',
      action: () => onSelectTab('health-legal')
    },
    {
      id: 'employment',
      title: 'Employment & MGNREGA',
      hindiTitle: 'रोज़गार एवं मनरेगा',
      subtitle: '100 Days Wage Guarantee, SHG Loans',
      hindiSubtitle: '100 दिन काम की गारंटी, महिला SHG ऋण',
      icon: Briefcase,
      color: 'from-purple-600 to-violet-700',
      tagColor: 'bg-purple-100 text-purple-800',
      count: '₹237/Day',
      action: () => onSelectTab('schemes')
    },
    {
      id: 'legal',
      title: 'Legal Guidance',
      hindiTitle: 'कानूनी सलाह व भूलेख',
      subtitle: 'UP Bhulekh Land Records, Tele-Law',
      hindiSubtitle: 'खसरा-खतौनी नकल, मुफ्त सरकारी वकील',
      icon: Scale,
      color: 'from-teal-600 to-cyan-700',
      tagColor: 'bg-teal-100 text-teal-800',
      count: 'Free Aid',
      action: () => onSelectTab('health-legal')
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onSelectTab('schemes');
    }
  };

  // Reusable App Content
  const appContent = (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 select-none">
      
      {/* App Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5 pt-6 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight">GramSathi AI</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded shadow-2xs">
                PROTOTYPE
              </span>
            </div>
            <p className="text-xs text-emerald-100 font-medium mt-0.5">
              {lang === 'hi' ? 'आपका गाँव • आपका साथी' : 'Aapka Gaon • Aapka Saathi'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('health-legal')}
              className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white shadow-sm flex items-center justify-center transition-all animate-pulse"
              title="Emergency 112 / 108"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="relative mt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder={lang === 'hi' ? 'योजना, फसल, दवा या समस्या खोजें...' : 'Search scheme, crop, healthcare...'}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/95 text-slate-900 text-xs sm:text-sm font-medium placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </form>
      </div>

      {/* Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Banner: Mera Gaon Mera Vikas */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full inline-block mb-1">
              {lang === 'hi' ? 'ग्रामीण सशक्तिकरण' : 'Rural Empowerment'}
            </span>
            <h4 className="text-base font-black">
              {lang === 'hi' ? 'मेरा गाँव • मेरा विकास' : 'Mera Gaon • Mera Vikas'}
            </h4>
            <p className="text-[11px] text-amber-100 mt-0.5">
              {lang === 'hi' ? 'एआई तकनीक से ग्रामीण भारत को नए अवसरों से जोड़ना' : 'Connecting Rural India to Opportunities through AI'}
            </p>
          </div>
          <button
            onClick={onOpenEligibility}
            className="px-3 py-2 bg-white text-slate-900 font-bold rounded-xl text-xs shadow-md shrink-0 ml-2 hover:bg-amber-50 transition-colors"
          >
            {lang === 'hi' ? 'पात्रता जांचें' : 'Check Eligibility'}
          </button>
        </div>

        {/* Central Voice Action Card (Slide 1 & 4 Spotlight) */}
        <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-2xl border-2 border-emerald-500/40 p-4 text-center shadow-md relative overflow-hidden">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            {lang === 'hi' ? 'आवाज़ सहायक (Voice Assistant)' : 'Voice-First AI Assistance'}
          </span>
          <p className="text-xs text-slate-600 mb-3">
            {lang === 'hi' 
              ? 'लिखने की जरूरत नहीं, बस माइक दबाकर अपनी भाषा में पूछें' 
              : 'No typing needed. Just tap and speak in your language.'}
          </p>

          <button
            onClick={onOpenVoiceModal}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all group ring-4 ring-emerald-100"
          >
            <Mic className="w-8 h-8 group-hover:animate-bounce-subtle" />
          </button>

          <span className="text-xs font-black text-slate-900 block mt-2.5">
            {lang === 'hi' ? 'बोलने के लिए यहाँ टैप करें' : 'Tap to Speak'}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            (हिंदी / English / अन्य भाषा)
          </span>
        </div>

        {/* Core Services Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {lang === 'hi' ? 'मुख्य जन सेवाएं (Services)' : 'Essential Public Services'}
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold">
              {lang === 'hi' ? '6 प्रमुख श्रेणियां' : '6 Core Modules'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={card.action}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/90 hover:border-emerald-500 hover:shadow-md transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {lang === 'hi' ? card.hindiTitle : card.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {lang === 'hi' ? card.hindiSubtitle : card.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.tagColor}`}>
                      {card.count}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Ticker Snapshot */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs mb-2 pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              {lang === 'hi' ? 'ग्रेटर नोएडा मंडी भाव' : 'Greater Noida Mandi'}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold">गेहूं: ₹2570/Qtl</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>धान बासमती: <strong className="text-slate-900">₹3420</strong></span>
            <span>सरसों: <strong className="text-slate-900">₹5800</strong></span>
            <span>आलू: <strong className="text-slate-900">₹1480</strong></span>
          </div>
        </div>

      </div>

      {/* Bottom Emergency Fast Bar */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
        <span className="text-[11px] font-bold text-slate-500">
          {lang === 'hi' ? 'आपातकालीन सहायता:' : 'Emergency Helpline:'}
        </span>
        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg font-bold text-[11px] flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3" />
            112 (Police)
          </a>
          <a
            href="tel:108"
            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg font-bold text-[11px] flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3" />
            108 (Ambulance)
          </a>
        </div>
      </div>

    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* View Explanation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {lang === 'hi' ? 'कार्यशील प्रोटोटाइप सिमुलेशन' : 'Interactive Prototype Simulator'}
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'hi' ? 'ग्रामसाथी एआई मोबाइल एवं वेब इंटरफ़ेस' : 'GramSathi AI Rural Application Interface'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'hi' 
              ? 'स्लाइड 1 और 4 में प्रदर्शित मोबाइल एप्लिकेशन का वास्तविक लाइव सिमुलेशन। माइक बटन दबाकर आवाज़ सहायक का परीक्षण करें।' 
              : 'Interactive replica of the smartphone user interface shown on Slide 1 & Slide 4. Tap the microphone to trigger live voice assistant.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={onOpenVoiceModal}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <Mic className="w-4 h-4" />
            <span>{lang === 'hi' ? 'माइक टेस्ट करें' : 'Test Voice AI'}</span>
          </button>
        </div>
      </div>

      {/* Device View Render */}
      {deviceView === 'phone' ? (
        <div className="flex justify-center py-4">
          {/* Realistic Smartphone Frame Mockup */}
          <div className="relative w-full max-w-[390px] h-[780px] bg-slate-900 rounded-[50px] p-3.5 phone-mockup-shadow border-4 border-slate-700/80">
            {/* Phone Speaker & Dynamic Island */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col relative pt-4">
              {appContent}
            </div>
          </div>
        </div>
      ) : (
        /* Wide Portal View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[650px] flex flex-col">
          {appContent}
        </div>
      )}

    </div>
  );
}
