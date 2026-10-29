import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  PhoneCall, 
  RotateCcw,
  BadgeCheck,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { schemesData } from '../data/schemesData';

export default function EligibilityChecker({ lang, onSelectScheme }) {
  const [occupation, setOccupation] = useState('farmer');
  const [landAcres, setLandAcres] = useState('marginal'); // 'none', 'marginal' (<2.5), 'small' (2.5-5), 'large' (>5)
  const [annualIncome, setAnnualIncome] = useState('low'); // 'bpl' (<1L), 'low' (1-2.5L), 'mid' (2.5-5L), 'high' (>5L)
  const [hasGirlChild, setHasGirlChild] = useState(false);
  const [hasSeniorCitizen, setHasSeniorCitizen] = useState(false);
  const [isKutchaHouse, setIsKutchaHouse] = useState(false);
  const [isSHGWoman, setIsSHGWoman] = useState(false);
  const [needsWageLabor, setNeedsWageLabor] = useState(false);
  const [wantsSolar, setWantsSolar] = useState(false);

  const [hasCalculated, setHasCalculated] = useState(false);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);

  const handleCalculate = (e) => {
    e.preventDefault();

    const matches = schemesData.filter((scheme) => {
      // PM-Kisan
      if (scheme.id === 'pm-kisan') {
        return (occupation === 'farmer' || landAcres !== 'none') && annualIncome !== 'high';
      }
      // Ayushman Bharat
      if (scheme.id === 'ayushman-bharat') {
        return annualIncome === 'bpl' || annualIncome === 'low' || hasSeniorCitizen;
      }
      // PM Awas Yojana
      if (scheme.id === 'pm-awas-gramin') {
        return isKutchaHouse || (annualIncome === 'bpl' && landAcres === 'none');
      }
      // PM Fasal Bima
      if (scheme.id === 'pm-fasal-bima') {
        return occupation === 'farmer' || landAcres !== 'none';
      }
      // Kisan Credit Card
      if (scheme.id === 'kisan-credit-card') {
        return occupation === 'farmer' || landAcres !== 'none';
      }
      // Sukanya Samriddhi
      if (scheme.id === 'sukanya-samriddhi') {
        return hasGirlChild;
      }
      // Lakhpati Didi
      if (scheme.id === 'lakhpati-didi') {
        return isSHGWoman || occupation === 'artisan';
      }
      // PM Ujjwala
      if (scheme.id === 'pm-ujjwala') {
        return annualIncome === 'bpl' || annualIncome === 'low';
      }
      // MGNREGA
      if (scheme.id === 'mgnrega') {
        return needsWageLabor || occupation === 'laborer' || occupation === 'unemployed' || landAcres === 'none';
      }
      // PM Surya Ghar
      if (scheme.id === 'pm-surya-ghar') {
        return wantsSolar || annualIncome === 'mid' || annualIncome === 'low';
      }
      return false;
    });

    setEligibleSchemes(matches);
    setHasCalculated(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // non-blocking
    }
  };

  const handleReset = () => {
    setHasCalculated(false);
    setEligibleSchemes([]);
    setOccupation('farmer');
    setLandAcres('marginal');
    setAnnualIncome('low');
    setHasGirlChild(false);
    setHasSeniorCitizen(false);
    setIsKutchaHouse(false);
    setIsSHGWoman(false);
    setNeedsWageLabor(false);
    setWantsSolar(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'hi' ? 'एआई आधारित योजना मिलान' : 'AI-Powered Eligibility Engine'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {lang === 'hi' ? 'अपनी पात्रता जांचें और योजनाएं पाएं' : 'Check Welfare Schemes You Qualify For'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {lang === 'hi' 
              ? 'अपनी जानकारी दर्ज करें, ग्रामसाथी एआई आपके लिए शत-प्रतिशत सटीक सरकारी योजनाओं की सूची तैयार करेगा।' 
              : 'Answer 4 simple questions to discover all direct cash benefits and subsidies applicable to your family.'}
          </p>
        </div>
        {hasCalculated && (
          <button
            onClick={handleReset}
            className="self-start sm:self-center px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'hi' ? 'फिर से जांचें' : 'Reset Form'}</span>
          </button>
        )}
      </div>

      {!hasCalculated ? (
        <form onSubmit={handleCalculate} className="pt-6 space-y-6">
          
          {/* Step 1: Occupation */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              1. {lang === 'hi' ? 'मुख्य व्यवसाय / आजीविका:' : 'Primary Rural Occupation:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'farmer', en: 'Farmer / Cultivator', hi: 'किसान / काश्तकार' },
                { id: 'laborer', en: 'Agricultural Laborer', hi: 'खेतिहर / ग्रामीण मजदूर' },
                { id: 'artisan', en: 'Artisan / Small Business', hi: 'कारीगर / छोटा व्यापारी' },
                { id: 'unemployed', en: 'Youth / Looking for Work', hi: 'बेरोजगार / युवा' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setOccupation(item.id)}
                  className={`p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all text-left flex flex-col justify-between ${
                    occupation === item.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                  }`}
                >
                  <span>{lang === 'hi' ? item.hi : item.en}</span>
                  {occupation === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 self-end mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Land Ownership */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              2. {lang === 'hi' ? 'कृषि भूमि का विवरण:' : 'Agricultural Land Holding:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'none', en: 'Landless (0 Acres)', hi: 'भूमिहीन (शून्य भूमि)' },
                { id: 'marginal', en: 'Up to 2.5 Acres (Marginal)', hi: 'सीमांत किसान (2.5 एकड़ तक)' },
                { id: 'small', en: '2.5 to 5 Acres (Small)', hi: 'लघु किसान (2.5 से 5 एकड़)' },
                { id: 'large', en: 'More than 5 Acres', hi: 'बड़ा किसान (5 एकड़ से अधिक)' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setLandAcres(item.id)}
                  className={`p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all text-left flex flex-col justify-between ${
                    landAcres === item.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                  }`}
                >
                  <span>{lang === 'hi' ? item.hi : item.en}</span>
                  {landAcres === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 self-end mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Annual Income */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              3. {lang === 'hi' ? 'परिवार की कुल वार्षिक आय:' : 'Total Annual Family Income:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'bpl', en: 'Below ₹1,00,000 (BPL / Antyodaya)', hi: '₹1 लाख से कम (BPL / अंत्योदय)' },
                { id: 'low', en: '₹1 Lakh to ₹2.5 Lakh', hi: '₹1 लाख से ₹2.5 लाख तक' },
                { id: 'mid', en: '₹2.5 Lakh to ₹5 Lakh', hi: '₹2.5 लाख से ₹5 लाख तक' },
                { id: 'high', en: 'Above ₹5 Lakh / Taxpayer', hi: '₹5 लाख से अधिक / आयकरदाता' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setAnnualIncome(item.id)}
                  className={`p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all text-left flex flex-col justify-between ${
                    annualIncome === item.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                  }`}
                >
                  <span>{lang === 'hi' ? item.hi : item.en}</span>
                  {annualIncome === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 self-end mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Special Household Attributes */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              4. {lang === 'hi' ? 'पारिवारिक विशेषताएं (जो लागू हों चुनें):' : 'Household Specifics (Select all that apply):'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              
              <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition-all ${
                hasGirlChild ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-slate-50/50 border-slate-200 text-slate-700'
              }`}>
                <input 
                  type="checkbox" 
                  checked={hasGirlChild} 
                  onChange={(e) => setHasGirlChild(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">
                  {lang === 'hi' ? 'परिवार में 10 वर्ष से कम की बेटी है' : 'Have girl child under 10 years'}
                </span>
              </label>

              <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition-all ${
                hasSeniorCitizen ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-slate-50/50 border-slate-200 text-slate-700'
              }`}>
                <input 
                  type="checkbox" 
                  checked={hasSeniorCitizen} 
                  onChange={(e) => setHasSeniorCitizen(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">
                  {lang === 'hi' ? '70+ वर्ष के वृद्धजन (वरिष्ठ नागरिक)' : 'Senior citizen (70+ years)'}
                </span>
              </label>

              <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition-all ${
                isKutchaHouse ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-slate-50/50 border-slate-200 text-slate-700'
              }`}>
                <input 
                  type="checkbox" 
                  checked={isKutchaHouse} 
                  onChange={(e) => setIsKutchaHouse(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">
                  {lang === 'hi' ? 'कच्चा मकान / बेघर हैं' : 'Living in kutcha house / houseless'}
                </span>
              </label>

              <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition-all ${
                isSHGWoman ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-slate-50/50 border-slate-200 text-slate-700'
              }`}>
                <input 
                  type="checkbox" 
                  checked={isSHGWoman} 
                  onChange={(e) => setIsSHGWoman(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">
                  {lang === 'hi' ? 'महिला स्वयं सहायता समूह (SHG) सदस्या' : 'Woman in Self-Help Group (SHG)'}
                </span>
              </label>

              <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition-all ${
                needsWageLabor ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-slate-50/50 border-slate-200 text-slate-700'
              }`}>
                <input 
                  type="checkbox" 
                  checked={needsWageLabor} 
                  onChange={(e) => setNeedsWageLabor(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">
                  {lang === 'hi' ? '100 दिन का अकुशल सरकारी रोज़गार चाहिए' : 'Need 100 days wage manual labor'}
                </span>
              </label>

              <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition-all ${
                wantsSolar ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-slate-50/50 border-slate-200 text-slate-700'
              }`}>
                <input 
                  type="checkbox" 
                  checked={wantsSolar} 
                  onChange={(e) => setWantsSolar(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">
                  {lang === 'hi' ? 'छत पर सोलर पैनल (मुफ्त बिजली) लगवाना है' : 'Interested in rooftop solar power'}
                </span>
              </label>

            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{lang === 'hi' ? 'मेरी पात्र योजनाएं खोजें (Find My Schemes)' : 'Match Schemes with AI'}</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>

        </form>
      ) : (
        /* Results Section */
        <div className="pt-6 space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {lang === 'hi' ? 'बधाई हो! एआई मिलान सफल' : 'AI Matching Completed!'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {lang === 'hi' 
                    ? `आपके परिवार के लिए ${eligibleSchemes.length} योजनाएं पात्र पाई गईं!` 
                    : `Your family is eligible for ${eligibleSchemes.length} Government Schemes!`}
                </h3>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl border border-emerald-300 shadow-sm text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  {lang === 'hi' ? 'अनुमानित वार्षिक लाभ' : 'Estimated Value'}
                </span>
                <span className="text-lg font-black text-emerald-700">₹70,000 - ₹5,00,000+</span>
              </div>
            </div>
          </div>

          {/* Matched Scheme Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {lang === 'hi' ? scheme.hindiCategory : scheme.category}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      {scheme.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {lang === 'hi' ? scheme.hindiName : scheme.name}
                  </h4>

                  <div className="my-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2 text-xs">
                    <Coins className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="font-bold text-amber-900">
                      {lang === 'hi' ? scheme.hindiBenefit : scheme.benefit}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {lang === 'hi' ? scheme.hindiDescription : scheme.description}
                  </p>

                  {/* Required Documents Checklist */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-slate-500" />
                      {lang === 'hi' ? 'ज़रूरी दस्तावेज़ चेकलिस्ट:' : 'Key Documents Required:'}
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-1">
                      {scheme.documents.slice(0, 3).map((doc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={scheme.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>{lang === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onSelectScheme(scheme)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>{lang === 'hi' ? 'विस्तार से देखें' : 'View Full Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
