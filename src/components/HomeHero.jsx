import React from 'react';
import { 
  MessageSquare, 
  Sprout, 
  Landmark, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  Scale, 
  BellRing,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function HomeHero({ 
  lang, 
  onNavigateAsk,
  onNavigateServices,
  onOpenVoiceModal, 
  onSelectService, 
  activeService 
}) {
  const serviceCards = [
    {
      id: 'schemes',
      title: 'Government Schemes',
      hindiTitle: 'सरकारी योजनाएं',
      icon: Landmark,
      bg: 'bg-blue-50/90 hover:bg-blue-100/90 border-blue-200/80',
      iconBg: 'bg-blue-100 text-blue-600',
      badge: '10+ Schemes'
    },
    {
      id: 'health',
      title: 'Healthcare Assistance',
      hindiTitle: 'स्वास्थ्य सहायता',
      icon: HeartPulse,
      bg: 'bg-rose-50/90 hover:bg-rose-100/90 border-rose-200/80',
      iconBg: 'bg-rose-100 text-rose-600',
      badge: '₹5L Cover'
    },
    {
      id: 'education',
      title: 'Education Support',
      hindiTitle: 'शिक्षा सहायता',
      icon: GraduationCap,
      bg: 'bg-purple-50/90 hover:bg-purple-100/90 border-purple-200/80',
      iconBg: 'bg-purple-100 text-purple-600',
      badge: 'Scholarships'
    },
    {
      id: 'agriculture',
      title: 'Agriculture Guidance',
      hindiTitle: 'कृषि सलाह',
      icon: Sprout,
      bg: 'bg-emerald-50/90 hover:bg-emerald-100/90 border-emerald-200/80',
      iconBg: 'bg-emerald-100 text-emerald-600',
      badge: 'Mandi Rates'
    },
    {
      id: 'employment',
      title: 'Employment Opportunities',
      hindiTitle: 'रोज़गार अवसर',
      icon: Briefcase,
      bg: 'bg-orange-50/90 hover:bg-orange-100/90 border-orange-200/80',
      iconBg: 'bg-orange-100 text-orange-600',
      badge: 'MGNREGA'
    },
    {
      id: 'legal',
      title: 'Legal Guidance',
      hindiTitle: 'कानूनी सलाह',
      icon: Scale,
      bg: 'bg-amber-50/90 hover:bg-amber-100/90 border-amber-200/80',
      iconBg: 'bg-amber-100 text-amber-700',
      badge: 'Tele-Law'
    },
    {
      id: 'emergency',
      title: 'Emergency Assistance',
      hindiTitle: 'आपातकालीन सहायता',
      icon: BellRing,
      bg: 'bg-red-50/90 hover:bg-red-100/90 border-red-200/80',
      iconBg: 'bg-red-100 text-red-600',
      badge: '112 / 108'
    }
  ];

  const handleScrollToServices = () => {
    const el = document.getElementById('home-services-ribbon');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Main Hero Card Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md p-4 sm:p-10 lg:p-12 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Column: Typography, Taglines & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left z-10">
            
            {/* Main Brand Title */}
            <div>
              <div className="flex items-center gap-2.5 sm:gap-4 mb-2">
                <img 
                  src="/gramsathi-mascot.png" 
                  alt="GramSathi AI Mascot" 
                  className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain rounded-2xl shadow-xs bg-amber-50/70 p-1 border border-amber-200/80 transform hover:scale-105 transition-transform shrink-0"
                />
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-sans">
                  GramSathi <span className="text-amber-600">AI</span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <h2 className="text-xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight mt-1">
                {lang === 'hi' ? 'आपका एआई-संचालित ग्रामीण साथी' : 'Your AI-Powered Rural Companion'}
              </h2>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-base text-slate-600 max-w-xl leading-relaxed font-medium">
              {lang === 'hi'
                ? 'सरकारी योजनाओं, स्वास्थ्य, शिक्षा, कृषि, रोज़गार और अन्य जन सेवाओं पर सटीक मार्गदर्शन पाएं — अपनी सरल भाषा में।'
                : 'Get guidance on government schemes, healthcare, education, agriculture, employment and more — in your language.'}
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={onNavigateAsk}
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-full shadow-lg shadow-emerald-900/20 flex items-center gap-2 text-xs sm:text-base transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 shrink-0" />
                <span>{lang === 'hi' ? 'ग्रामसाथी से पूछें' : 'Ask GramSathi'}</span>
              </button>

              <button
                type="button"
                onClick={onNavigateServices || handleScrollToServices}
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-emerald-50 text-emerald-900 font-bold rounded-full border-2 border-emerald-800 text-xs sm:text-base transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <span>{lang === 'hi' ? 'सेवाएं देखें' : 'Explore Services'}</span>
              </button>
            </div>

            {/* Quoted Tagline Card */}
            <div className="pt-1 sm:pt-2">
              <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 shadow-xs max-w-lg">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
                </div>
                <p className="text-[11px] sm:text-sm font-bold text-slate-800 italic">
                  "{lang === 'hi' 
                    ? 'एआई तकनीक से ग्रामीण भारत को नए अवसरों से जोड़ना' 
                    : 'Connecting Rural India to Opportunities through AI'}"
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Farmer & Landscape Illustration (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center z-10">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] h-[260px] sm:h-[340px] lg:h-[370px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200/80 group bg-emerald-50/50">
              <img
                src="/farmer-hero.png"
                alt="GramSathi AI Rural Farmer Illustration"
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>

      {/* 7 Pastel Public Service Cards Ribbon (Directly below Hero) */}
      <div id="home-services-ribbon" className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-1 gap-1">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
            {lang === 'hi' ? '७ मुख्य ग्रामीण जन सेवाएं' : '7 Core Rural Assistance Services'}
          </h3>
          <span className="text-[11px] sm:text-xs font-semibold text-emerald-700">
            {lang === 'hi' ? 'विस्तार से देखने के लिए किसी भी सेवा पर क्लिक करें' : 'Click any card to explore details'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3.5">
          {serviceCards.map((card) => {
            const Icon = card.icon;
            const isSelected = activeService === card.id;
            return (
              <button
                key={card.id}
                onClick={() => onSelectService(card.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between min-h-[120px] sm:min-h-[135px] group ${
                  card.bg
                } ${
                  isSelected
                    ? 'ring-2 ring-emerald-600 shadow-md scale-102 bg-white'
                    : 'shadow-2xs hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Icon Box */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-2 shadow-2xs group-hover:scale-108 transition-transform ${card.iconBg}`}>
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Card Title */}
                <span className="text-xs sm:text-xs font-extrabold text-slate-900 leading-tight group-hover:text-emerald-800 transition-colors line-clamp-2">
                  {lang === 'hi' ? card.hindiTitle : card.title}
                </span>

                {/* Micro Badge */}
                <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
                  {card.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
