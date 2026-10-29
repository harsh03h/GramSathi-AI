import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  PhoneCall, 
  FileText, 
  CheckCircle2, 
  X, 
  Coins, 
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { schemesData } from '../data/schemesData';

export default function SchemeExplorer({ lang, activeModalScheme, setActiveModalScheme, onOpenEligibility }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', en: 'All Schemes', hi: 'सभी योजनाएं' },
    { id: 'Farmer', en: 'Agriculture & Farmers', hi: 'किसान व कृषि' },
    { id: 'Health', en: 'Healthcare', hi: 'स्वास्थ्य' },
    { id: 'Women & Child', en: 'Women & Child', hi: 'महिला एवं बाल' },
    { id: 'Housing', en: 'Rural Housing', hi: 'ग्रामीण आवास' },
    { id: 'Employment', en: 'Employment & Labor', hi: 'रोज़गार व मनरेगा' },
    { id: 'Energy', en: 'Solar & Utilities', hi: 'सोलर व बिजली' },
  ];

  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      scheme.name.toLowerCase().includes(query) ||
      scheme.hindiName.toLowerCase().includes(query) ||
      scheme.description.toLowerCase().includes(query) ||
      scheme.benefit.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Search */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'केंद्रीय एवं राज्य सरकार की कल्याणकारी योजनाएं' : 'Central & State Welfare Repository'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'hi' ? 'सरकारी योजनाएं व प्रत्यक्ष लाभ' : 'Explore Government Schemes & Direct Benefits'}
          </h2>
          <p className="text-sm text-emerald-100/90 mt-2">
            {lang === 'hi' 
              ? 'बिना किसी दलाल के, सीधे अपने मोबाइल से जानें योजनाओं के नियम, पात्रता और आवश्यक दस्तावेज।' 
              : 'Direct access to official welfare programs without middlemen or complicated paperwork.'}
          </p>

          {/* Search Box */}
          <div className="mt-5 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'hi' ? 'योजना का नाम खोजें (जैसे: किसान, आवास, आयुष्मान, 6000...)' : 'Search scheme (e.g. Kisan, Ayushman, Housing, Solar)...'}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-lg"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Floating Quick Action */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-8 sm:bottom-8 z-10">
          <button
            onClick={onOpenEligibility}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{lang === 'hi' ? 'स्मार्ट पात्रता कैलकुलेटर' : 'Smart Eligibility Calculator'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {lang === 'hi' ? cat.hi : cat.en}
          </button>
        ))}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-5">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {lang === 'hi' ? scheme.hindiCategory : scheme.category}
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  {scheme.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {lang === 'hi' ? scheme.hindiName : scheme.name}
              </h3>

              <div className="my-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2 text-xs">
                <Coins className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-bold text-amber-900">
                  {lang === 'hi' ? scheme.hindiBenefit : scheme.benefit}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                {lang === 'hi' ? scheme.hindiDescription : scheme.description}
              </p>

              <div className="text-[11px] text-slate-500 font-medium">
                <span>{scheme.ministry}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalScheme(scheme)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group-hover:underline"
              >
                <span>{lang === 'hi' ? 'पात्रता व दस्तावेज़' : 'Eligibility & Docs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>{lang === 'hi' ? 'वेबसाइट' : 'Apply Link'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">
            {lang === 'hi' ? 'कोई योजना नहीं मिली। कृपया दूसरा नाम खोजें।' : 'No matching schemes found. Try a different search term.'}
          </p>
        </div>
      )}

      {/* Scheme Detail Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 px-6 py-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-emerald-100 inline-block mb-1">
                  {lang === 'hi' ? activeModalScheme.hindiCategory : activeModalScheme.category}
                </span>
                <h3 className="text-lg font-bold leading-tight">
                  {lang === 'hi' ? activeModalScheme.hindiName : activeModalScheme.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalScheme(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              {/* Highlight Benefit */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Coins className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-amber-900 block">
                    {lang === 'hi' ? 'मुख्य वित्तीय लाभ:' : 'Key Financial Benefit:'}
                  </span>
                  <p className="text-sm font-extrabold text-amber-950 mt-0.5">
                    {lang === 'hi' ? activeModalScheme.hindiBenefit : activeModalScheme.benefit}
                  </p>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {lang === 'hi' ? 'योजना का विवरण' : 'Description'}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {lang === 'hi' ? activeModalScheme.hindiDescription : activeModalScheme.description}
                </p>
              </div>

              {/* Documents Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  {lang === 'hi' ? 'आवश्यक दस्तावेज़ (चेकलिस्ट):' : 'Required Documents Checklist:'}
                </h4>
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {activeModalScheme.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Helpline & Ministry */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'} <strong>{activeModalScheme.helpline}</strong></span>
                </div>
                <div>
                  <span>{activeModalScheme.ministry}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalScheme(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                {lang === 'hi' ? 'बंद करें' : 'Close'}
              </button>

              <a
                href={activeModalScheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>{lang === 'hi' ? 'आधिकारिक पोर्टल पर आवेदन करें' : 'Apply on Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
