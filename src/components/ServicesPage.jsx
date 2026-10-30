import React from 'react';
import { 
  Landmark, 
  HeartPulse, 
  GraduationCap, 
  Sprout, 
  Briefcase, 
  Scale, 
  BellRing, 
  ArrowRight,
  ExternalLink,
  PhoneCall
} from 'lucide-react';

export default function ServicesPage({ lang, onNavigateService, onOpenEmergency }) {
  const services = [
    {
      id: 'schemes',
      title: 'Government Schemes',
      hindiTitle: 'सरकारी योजनाएं',
      desc: 'Know eligibility, documents and application process',
      hindiDesc: 'पात्रता, आवश्यक दस्तावेज़ और ऑनलाइन आवेदन प्रक्रिया जानें',
      icon: Landmark,
      bg: 'bg-blue-50/90 dark:bg-slate-800/80 hover:bg-blue-100/90 dark:hover:bg-slate-750 border-blue-200/90 dark:border-slate-700',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
      arrowColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'health',
      title: 'Healthcare Assistance',
      hindiTitle: 'स्वास्थ्य सहायता',
      desc: 'Find nearby hospitals, government health schemes and basic health guidance',
      hindiDesc: 'नज़दीकी अस्पताल, आयुष्मान भारत योजना और जन औषधि केंद्र खोजें',
      icon: HeartPulse,
      bg: 'bg-rose-50/90 dark:bg-slate-800/80 hover:bg-rose-100/90 dark:hover:bg-slate-750 border-rose-200/90 dark:border-slate-700',
      iconBg: 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400',
      arrowColor: 'text-rose-600 dark:text-rose-400'
    },
    {
      id: 'education',
      title: 'Education Support',
      hindiTitle: 'शिक्षा सहायता',
      desc: 'Information about scholarships, admissions and learning resources',
      hindiDesc: 'छात्रवृत्ति, नवोदय विद्यालय प्रवेश और मुफ्त हुनर प्रशिक्षण की जानकारी',
      icon: GraduationCap,
      bg: 'bg-purple-50/90 dark:bg-slate-800/80 hover:bg-purple-100/90 dark:hover:bg-slate-750 border-purple-200/90 dark:border-slate-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
      arrowColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'agriculture',
      title: 'Agriculture Guidance',
      hindiTitle: 'कृषि सलाह',
      desc: 'Crop advice, weather information and farming schemes',
      hindiDesc: 'दैनिक मंडी भाव, 5-दिवसीय मौसम सलाह, कीट नियंत्रण व खाद कैलकुलेटर',
      icon: Sprout,
      bg: 'bg-emerald-50/90 dark:bg-slate-800/80 hover:bg-emerald-100/90 dark:hover:bg-slate-750 border-emerald-200/90 dark:border-slate-700',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
      arrowColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'employment',
      title: 'Employment Opportunities',
      hindiTitle: 'रोज़गार अवसर',
      desc: 'Job schemes, skill development and career guidance',
      hindiDesc: 'मनरेगा 100 दिन काम की गारंटी, महिला स्वयं सहायता समूह ऋण व रोज़गार',
      icon: Briefcase,
      bg: 'bg-orange-50/90 dark:bg-slate-800/80 hover:bg-orange-100/90 dark:hover:bg-slate-750 border-orange-200/90 dark:border-slate-700',
      iconBg: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400',
      arrowColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      id: 'legal',
      title: 'Legal Guidance',
      hindiTitle: 'कानूनी सलाह',
      desc: 'Basic legal information and citizen rights',
      hindiDesc: 'यूपी भूलेख खतौनी नकल, टेली-लॉ सरकारी वकील और नागरिक अधिकार',
      icon: Scale,
      bg: 'bg-amber-50/90 dark:bg-slate-800/80 hover:bg-amber-100/90 dark:hover:bg-slate-750 border-amber-200/90 dark:border-slate-700',
      iconBg: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400',
      arrowColor: 'text-amber-700 dark:text-amber-400'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Page Title & Subtitle matching Screen 2 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {lang === 'hi' ? 'हमारी सेवाएं (Our Services)' : 'Our Services'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium">
          {lang === 'hi'
            ? 'एआई-संचालित मार्गदर्शन और सहायता प्राप्त करने के लिए किसी भी सेवा का चयन करें'
            : 'Choose a service to get AI-powered guidance and support'}
        </p>
      </div>

      {/* Grid of 6 Top Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              onClick={() => onNavigateService(svc.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 group ${svc.bg}`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-2xs group-hover:scale-110 transition-transform ${svc.iconBg}`}>
                  <Icon className="w-7 h-7 stroke-[2.2]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {lang === 'hi' ? svc.hindiTitle : svc.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {lang === 'hi' ? svc.hindiDesc : svc.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-end">
                <span className={`text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${svc.arrowColor}`}>
                  <span>{lang === 'hi' ? 'खोलें' : 'Access Service'}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Assistance (Full-width banner matching Screen 2 bottom) */}
      <div
        onClick={onOpenEmergency}
        className="p-6 rounded-3xl border border-red-200/90 dark:border-red-900/50 bg-red-50/90 dark:bg-slate-900 hover:bg-red-100/90 dark:hover:bg-slate-800/90 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-2xs">
            <BellRing className="w-7 h-7 stroke-[2.2] animate-bounce-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                {lang === 'hi' ? 'आपातकालीन सहायता (Emergency Assistance)' : 'Emergency Assistance'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                24x7 Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
              {lang === 'hi' 
                ? 'हेल्पलाइन नंबर (112, 108, 1091, 155260, 1962) और तत्काल सहायता' 
                : 'Helpline numbers and emergency support (Police, Ambulance, Women Safety, Cyber Fraud)'}
            </p>
          </div>
        </div>

        <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all shrink-0">
          <PhoneCall className="w-4 h-4" />
          <span>{lang === 'hi' ? 'आपातकालीन नंबर देखें' : 'View Helplines'} →</span>
        </button>
      </div>

    </div>
  );
}
