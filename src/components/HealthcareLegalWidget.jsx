import React, { useState } from 'react';
import { 
  HeartPulse, 
  Scale, 
  PhoneCall, 
  Hospital, 
  Pill, 
  GraduationCap, 
  MapPin, 
  ExternalLink,
  ShieldAlert,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { healthcareData } from '../data/healthcareData';

export default function HealthcareLegalWidget({ lang }) {
  const [activeSubTab, setActiveSubTab] = useState('emergency'); // 'emergency', 'medicines', 'centers', 'education', 'legal'

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'जन स्वास्थ्य, कानूनी अधिकार एवं आपातकालीन सुरक्षा' : 'Public Health, Legal Rights & Safety'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'hi' ? 'स्वास्थ्य, शिक्षा एवं कानूनी सहायता' : 'Healthcare, Education & Legal Aid'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {lang === 'hi' 
              ? 'जन औषधि सस्ती दवाइयां, नज़दीकी स्वास्थ्य केंद्र, आपातकालीन नंबर, यूपी भूलेख नकल एवं टेली-लॉ कानूनी सहायता।' 
              : 'Affordable generic medicines, local primary health centers, 24x7 emergency helplines, land records and free advocate advice.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'emergency', labelEn: '🚨 Emergency Dial', labelHi: '🚨 आपातकालीन नंबर' },
            { id: 'medicines', labelEn: '💊 Jan Aushadhi Medicines', labelHi: '💊 जन औषधि सस्ती दवाएं' },
            { id: 'centers', labelEn: '🏥 Local Hospitals & PHCs', labelHi: '🏥 अस्पताल व प्राथमिक केंद्र' },
            { id: 'education', labelEn: '📚 Education & Youth', labelHi: '📚 छात्रवृत्ति व कौशल' },
            { id: 'legal', labelEn: '⚖️ Land Records & Legal', labelHi: '⚖️ भूलेख व कानूनी अधिकार' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-white text-slate-900 shadow-md ring-2 ring-white/30'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {lang === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Emergency Helplines */}
      {activeSubTab === 'emergency' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>{lang === 'hi' ? 'एक क्लिक आपातकालीन टोल फ्री नंबर' : '24x7 One-Click Emergency Helplines'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'hi' ? 'सीधे डायल करने के लिए नंबर पर टैप करें (निःशुल्क सेवा)' : 'Tap any number to initiate direct phone call'}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 self-start sm:self-center">
              ● 24x7 Toll Free Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {healthcareData.emergencyHelplines.map((item, idx) => (
              <a
                key={idx}
                href={`tel:${item.number}`}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-600 bg-slate-50/50 dark:bg-slate-800/80 hover:bg-rose-50/30 dark:hover:bg-slate-750 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded-full inline-block mb-1">
                    {item.badge}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-800 dark:group-hover:text-rose-300 transition-colors">
                    {lang === 'hi' ? item.hindiLabel : item.label}
                  </h4>
                  <span className="text-2xl font-black text-rose-600 dark:text-rose-400 tracking-tight block mt-1">
                    {item.number}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Jan Aushadhi Generic Medicines */}
      {activeSubTab === 'medicines' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === 'hi' ? 'प्रधानमंत्री जन औषधि केंद्र - सस्ती जेनेरिक दवाएं' : 'Pradhan Mantri Jan Aushadhi Generic Medicines'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'hi' ? 'वही गुणवत्ता, पर ब्रांडेड दवाओं से 70% से 80% तक सस्ती' : 'Same chemical salt & efficacy at 70% to 80% lower cost than branded medicines'}
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-center">
              💰 Save 70-80% on Medicines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                  <th className="py-3 px-4">{lang === 'hi' ? 'दवा का नाम व उपयोग' : 'Medicine & Use'}</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'ब्रांडेड दवा मूल्य (MRP)' : 'Branded Price'}</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'जन औषधि मूल्य' : 'Jan Aushadhi Price'}</th>
                  <th className="py-3 px-3 text-right">{lang === 'hi' ? 'बचत' : 'Direct Savings'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {healthcareData.genericMedicines.map((med, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/30 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block">{med.name}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{med.use}</span>
                    </td>
                    <td className="py-3.5 px-3 text-rose-600 dark:text-rose-400 font-bold line-through">
                      {med.brandedPrice}
                    </td>
                    <td className="py-3.5 px-3 text-emerald-700 dark:text-emerald-400 font-extrabold text-base">
                      {med.janAushadhiPrice}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-2.5 py-1 rounded-full border border-transparent dark:border-emerald-800">
                        {med.savings} OFF
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Local Hospitals & PHCs */}
      {activeSubTab === 'centers' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Hospital className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{lang === 'hi' ? 'नजदीकी सरकारी स्वास्थ्य केंद्र (ग्रेटर नोएडा क्षेत्र)' : 'Primary & Community Health Centers (Greater Noida)'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'hi' ? 'मुफ्त डॉक्टर परामर्श, दवाइयां, टीकाकरण और आयुष्मान भारत डेस्क' : 'Free consultation, vaccinations, laboratory tests and Ayushman PM-JAY facilities'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {healthcareData.nearbyCenters.map((center, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                    {center.type}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">
                    {center.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{center.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{center.timings}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <strong className="text-slate-800 dark:text-white block mb-0.5">{lang === 'hi' ? 'सुविधाएं:' : 'Services:'}</strong>
                    {center.services}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                  <a
                    href={`tel:${center.contact}`}
                    className="text-xs font-bold text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{center.contact}</span>
                  </a>
                  <span className="text-[11px] text-slate-400">GCET Zone</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Education & Youth */}
      {activeSubTab === 'education' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>{lang === 'hi' ? 'ग्रामीण युवाओं के लिए छात्रवृत्ति एवं कौशल विकास' : 'Rural Scholarships & Skill India Initiatives'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'hi' ? 'नवोदय विद्यालय प्रवेश, मुफ्त तकनीकी हुनर और 100% छात्रवृत्ति' : 'Free vocational certifications, boarding school admissions, and financial stipends'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {healthcareData.educationInitiatives.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {lang === 'hi' ? edu.hindiTitle : edu.title}
                  </h4>
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs mb-3">
                    <strong className="text-amber-900 dark:text-amber-300 block mb-0.5">{lang === 'hi' ? 'पात्रता:' : 'Eligibility:'}</strong>
                    <span className="text-slate-700 dark:text-slate-300">{edu.eligibility}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">{lang === 'hi' ? 'लाभ:' : 'Benefit:'}</strong>
                    {edu.benefit}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{edu.portal}</span>
                  <a
                    href={`https://${edu.portal}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>{lang === 'hi' ? 'पोर्टल' : 'Visit'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Land Records & Legal Rights */}
      {activeSubTab === 'legal' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>{lang === 'hi' ? 'ऑनलाइन भूलेख खतौनी एवं टेली-लॉ मुफ्त कानूनी वकील' : 'Online Land Records & Tele-Law Free Advocates'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'hi' ? 'बिना रिश्वत के अपनी ज़मीन का रिकॉर्ड देखें और सरकारी वकील से सलाह लें' : 'Check land revenue maps without agent fees, and consult certified advocates via Tele-Law'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {healthcareData.legalRights.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md transition-all">
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  {lang === 'hi' ? item.hindiTitle : item.title}
                </h4>
                <div className="space-y-2">
                  {item.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
