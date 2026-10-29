import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  PhoneCall, 
  FileText, 
  X, 
  Coins, 
  ArrowLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { schemesData } from '../data/schemesData';

export default function SchemeGuidancePage({ lang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeDetailScheme, setActiveDetailScheme] = useState(null);
  const [modalTab, setModalTab] = useState('overview'); // 'overview', 'eligibility', 'documents'

  const filterChips = [
    { id: 'All', en: 'All', hi: 'सभी' },
    { id: 'Farmer', en: 'Farmers', hi: 'किसान' },
    { id: 'Students', en: 'Students', hi: 'विद्यार्थी' },
    { id: 'Women & Child', en: 'Women', hi: 'महिला' },
    { id: 'Health', en: 'Healthcare', hi: 'स्वास्थ्य' },
    { id: 'Employment', en: 'Employment', hi: 'रोज़गार' },
    { id: 'Housing', en: 'Housing', hi: 'आवास' }
  ];

  // Map preview imagery for realistic visual presentation matching Screen 4
  const schemeImages = {
    'pm-kisan': 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80',
    'ayushman-bharat': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    'pm-awas-gramin': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    'pm-fasal-bima': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    'kisan-credit-card': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
    'sukanya-samriddhi': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    'lakhpati-didi': 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80',
    'pm-ujjwala': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    'mgnrega': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    'pm-surya-ghar': 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80'
  };

  const filteredSchemes = schemesData.filter((scheme) => {
    let matchesCategory = false;
    if (selectedFilter === 'All') matchesCategory = true;
    else if (selectedFilter === 'Students') matchesCategory = scheme.id === 'sukanya-samriddhi';
    else matchesCategory = scheme.category === selectedFilter;

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      scheme.name.toLowerCase().includes(query) ||
      scheme.hindiName.toLowerCase().includes(query) ||
      scheme.description.toLowerCase().includes(query) ||
      scheme.benefit.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Title & Subtitle matching Screen 4 */}
      <div className="text-center space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {lang === 'hi' ? 'सरकारी योजनाएं (Government Schemes)' : 'Government Schemes'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
          {lang === 'hi'
            ? 'अपनी प्रोफ़ाइल और आवश्यकताओं के अनुसार प्रासंगिक योजनाएं खोजें'
            : 'Find schemes relevant to your profile and needs'}
        </p>
      </div>

      {/* Search Bar with Green Search Button matching Screen 4 */}
      <div className="max-w-2xl mx-auto flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'योजना खोजें (जैसे: PM Kisan, Ayushman Bharat, Awas)...'
                : 'Search scheme (e.g. PM Kisan, Ayushman Bharat)...'
            }
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
          />
        </div>
        <button
          className="p-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl shadow-md transition-all shrink-0"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Chips matching Screen 4 */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setSelectedFilter(chip.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              selectedFilter === chip.id
                ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-700'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {lang === 'hi' ? chip.hi : chip.en}
          </button>
        ))}
      </div>

      {/* Scheme Cards Grid matching Screen 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Card Header Image */}
              <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={schemeImages[scheme.id] || '/farmer-hero.png'}
                  alt={scheme.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-800 border border-emerald-200 shadow-xs">
                  {lang === 'hi' ? scheme.hindiBadge || scheme.badge : scheme.badge}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {lang === 'hi' ? scheme.hindiName : scheme.name}
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                    {lang === 'hi' ? `पात्रता: ${scheme.hindiCategory}` : `For ${scheme.category}`}
                  </span>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1 font-medium">
                    {lang === 'hi' ? scheme.hindiBenefit : scheme.benefit}
                  </p>
                </div>

                {/* 3 Green Checklist Bullets matching Screen 4 */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'hi' ? 'पात्रता मानदंड (Eligibility)' : 'Eligibility Verified'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'hi' ? 'ज़रूरी दस्तावेज़ (Required Documents)' : 'Required Documents Checklist'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'hi' ? 'आवेदन प्रक्रिया (How to Apply)' : 'Direct Application Walkthrough'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button matching Screen 4 */}
            <div className="p-5 pt-0">
              <button
                onClick={() => setActiveDetailScheme(scheme)}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>{lang === 'hi' ? 'विवरण देखें (View Details)' : 'View Details'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Details Modal matching Screen 4 (Right panel "Scheme Details (Mobile)") */}
      {activeDetailScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
            
            {/* Modal Header with Back Arrow */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white px-5 py-4 flex items-center justify-between">
              <button
                onClick={() => setActiveDetailScheme(null)}
                className="flex items-center gap-1.5 text-xs font-bold hover:text-emerald-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="truncate max-w-[260px]">
                  {lang === 'hi' ? activeDetailScheme.hindiName : activeDetailScheme.name}
                </span>
              </button>
              <button
                onClick={() => setActiveDetailScheme(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Tabs: [ Overview ] [ Eligibility ] [ Documents ] matching Screen 4 */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
              {[
                { id: 'overview', en: 'Overview', hi: 'विवरण' },
                { id: 'eligibility', en: 'Eligibility', hi: 'पात्रता' },
                { id: 'documents', en: 'Documents', hi: 'दस्तावेज़' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setModalTab(tab.id)}
                  className={`flex-1 py-3 text-center border-b-2 transition-all ${
                    modalTab === tab.id
                      ? 'border-emerald-700 text-emerald-800 bg-white font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'hi' ? tab.hi : tab.en}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              
              {/* Header Banner Image */}
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                <img
                  src={schemeImages[activeDetailScheme.id] || '/farmer-hero.png'}
                  alt={activeDetailScheme.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TAB 1: OVERVIEW */}
              {modalTab === 'overview' && (
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-snug">
                      {lang === 'hi' ? activeDetailScheme.hindiName : activeDetailScheme.name}
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                      {lang === 'hi' ? activeDetailScheme.hindiMinistry : activeDetailScheme.ministry}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                    <Coins className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-amber-950 block">
                        {lang === 'hi' ? 'मुख्य वित्तीय लाभ:' : 'Primary Benefit:'}
                      </strong>
                      <p className="text-sm font-extrabold text-amber-900 mt-0.5">
                        {lang === 'hi' ? activeDetailScheme.hindiBenefit : activeDetailScheme.benefit}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {lang === 'hi' ? activeDetailScheme.hindiDescription : activeDetailScheme.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
                    <span>{lang === 'hi' ? 'टोल फ्री हेल्पलाइन:' : 'Toll-Free Helpline:'}</span>
                    <strong className="text-emerald-800">{activeDetailScheme.helpline}</strong>
                  </div>
                </div>
              )}

              {/* TAB 2: ELIGIBILITY */}
              {modalTab === 'eligibility' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'hi' ? 'पात्रता मानदंड (Eligibility Criteria):' : 'Eligibility Criteria:'}
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block">{lang === 'hi' ? 'लक्षित लाभार्थी:' : 'Target Beneficiary:'}</strong>
                        <span className="text-slate-600">{lang === 'hi' ? activeDetailScheme.hindiCategory : activeDetailScheme.category} category citizens</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block">{lang === 'hi' ? 'आय सीमा:' : 'Income Ceiling:'}</strong>
                        <span className="text-slate-600">
                          {activeDetailScheme.criteria.maxIncome 
                            ? `Annual income below ₹${(activeDetailScheme.criteria.maxIncome/100000).toFixed(1)} Lakh` 
                            : 'Applicable universally for eligible rural citizens'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block">{lang === 'hi' ? 'आवेदन माध्यम:' : 'How to Apply:'}</strong>
                        <span className="text-slate-600">Through nearest Common Service Center (CSC), Panchayat Office or official web portal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DOCUMENTS */}
              {modalTab === 'documents' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'hi' ? 'आवश्यक दस्तावेज़ चेकलिस्ट:' : 'Required Documents Checklist:'}
                  </h4>
                  <div className="space-y-2">
                    {activeDetailScheme.documents.map((doc, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Solid Green Button at Bottom matching Screen 4 right */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <a
                href={activeDetailScheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>{lang === 'hi' ? 'अभी आवेदन करें / आधिकारिक लिंक' : 'Apply Now / View Official Link'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
