import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Clock, 
  Sparkles,
  PhoneCall,
  User,
  Phone,
  Landmark,
  AlertCircle
} from 'lucide-react';

export default function SchemeApplyModal({ 
  isOpen, 
  onClose, 
  scheme, 
  lang = 'en', 
  loggedInUser = null 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    aadhaar: '',
    category: 'farmer',
    bankAccount: '',
    ifsc: '',
    landAcres: '2.5',
    hasAadhaarLinked: true,
    hasLandOrRationDoc: true,
    hasActiveBankAccount: true,
    declared: true
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);
  const [submissionTime, setSubmissionTime] = useState('');

  useEffect(() => {
    if (isOpen && scheme) {
      setSubmitted(false);
      setSubmitting(false);
      setCopiedToken(false);
      
      // Auto-prefill if user is logged in
      setFormData(prev => ({
        ...prev,
        name: loggedInUser?.name || prev.name || '',
        phone: loggedInUser?.phone || prev.phone || '',
        district: prev.district || (lang === 'hi' ? 'ग्रेटर नोएडा, गौतम बुद्ध नगर' : 'Greater Noida, Gautam Buddha Nagar'),
        category: scheme?.category?.toLowerCase().includes('farmer') ? 'farmer' : 
                  scheme?.category?.toLowerCase().includes('health') ? 'citizen' :
                  scheme?.category?.toLowerCase().includes('women') ? 'women_shg' : 'farmer'
      }));
    }
  }, [isOpen, scheme, loggedInUser, lang]);

  if (!isOpen || !scheme) return null;

  const handleOpenOfficialPortal = (e) => {
    e?.preventDefault();
    if (!scheme?.officialLink) return;
    try {
      const win = window.open(scheme.officialLink, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = scheme.officialLink;
      }
    } catch {
      window.location.href = scheme.officialLink;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const tokenPrefix = scheme?.id ? scheme.id.replace('pm-', '').replace('-', '').toUpperCase().slice(0, 4) : 'SCHM';
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const generatedId = `GS-${tokenPrefix}-2026-${randomDigits}`;
    const timestampStr = new Date().toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    setTimeout(() => {
      setApplicationId(generatedId);
      setSubmissionTime(timestampStr);
      setSubmitting(false);
      setSubmitted(true);

      // Persist in localStorage registry
      try {
        const stored = JSON.parse(localStorage.getItem('gramsathi_applications') || '[]');
        const record = {
          id: generatedId,
          schemeId: scheme.id,
          schemeName: scheme.name,
          hindiSchemeName: scheme.hindiName,
          applicantName: formData.name,
          phone: formData.phone,
          district: formData.district,
          aadhaarLast4: formData.aadhaar ? formData.aadhaar.slice(-4) : 'XXXX',
          timestamp: timestampStr,
          status: 'Under Review'
        };
        localStorage.setItem('gramsathi_applications', JSON.stringify([record, ...stored]));
      } catch (err) {
        console.warn('Could not store application record:', err);
      }
    }, 600);
  };

  const copyToken = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 shadow-md">
          <div className="space-y-1 pr-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-emerald-100 backdrop-blur-xs border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'hi' ? 'ग्रामसाथी डिजिटल आवेदन सेवा' : 'GramSathi Digital Application Desk'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight text-white line-clamp-1">
              {lang === 'hi' ? scheme.hindiName : scheme.name}
            </h3>
            <p className="text-xs text-emerald-200 line-clamp-1 font-medium">
              {lang === 'hi' ? scheme.hindiBenefit : scheme.benefit}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 transition-colors"
            title="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {submitted ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="text-center space-y-4 py-2 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-bounce-subtle">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {lang === 'hi' ? 'ऑनलाइन आवेदन सफलतापूर्वक पंजीकृत' : 'Application Registered Successfully'}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                  {lang === 'hi' ? 'आपका आवेदन दर्ज कर लिया गया है!' : 'Application Successfully Submitted!'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {lang === 'hi'
                    ? `बधाई! ${formData.name} जी, ${scheme.hindiName} हेतु आपका प्राथमिक आवेदन ग्रामसाथी एआई डिजिटल पंजीकरण प्रणाली में दर्ज हो गया है।`
                    : `Congratulations! ${formData.name}, your application for ${scheme.name} has been recorded in the GramSathi AI Rural Registry.`}
                </p>
              </div>

              {/* Reference Token Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-md mx-auto space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{lang === 'hi' ? 'आवेदन संदर्भ टोकन (Application ID):' : 'Application Reference ID:'}</span>
                  <span className="font-mono text-[11px]">{submissionTime}</span>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700">
                  <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-300 tracking-wider">
                    {applicationId}
                  </span>
                  <button
                    type="button"
                    onClick={copyToken}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 transition-colors border border-emerald-200 dark:border-emerald-800"
                    title="Copy Token"
                  >
                    {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedToken ? (lang === 'hi' ? 'कॉपी हुआ' : 'Copied!') : (lang === 'hi' ? 'कॉपी करें' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Verified Next Steps Card */}
              <div className="text-left p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 max-w-md mx-auto space-y-2 text-xs">
                <strong className="text-amber-950 dark:text-amber-300 font-bold block flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{lang === 'hi' ? 'अगले महत्वपूर्ण चरण (Next Steps):' : 'Next Steps & Verification:'}</span>
                </strong>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">1.</span>
                    <span>{lang === 'hi' ? 'तहसील राजस्व लेखपाल / ग्राम सचिव 3 से 7 कार्यदिवसों में विवरण का सत्यापन करेंगे।' : 'Tehsil revenue officer or Gram Panchayat secretary verifies your land/ration records within 3-7 days.'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">2.</span>
                    <span>{lang === 'hi' ? 'पंजीकृत मोबाइल नंबर पर आधिकारिक एसएमएस पुष्टिकरण प्राप्त होगा।' : 'An official SMS notification will be dispatched to your registered mobile number.'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">3.</span>
                    <span>{lang === 'hi' ? 'यदि e-KYC या बायोमेट्रिक शेष है, तो टोकन लेकर नजदीकी CSC (जन सेवा केंद्र) पर जाएं।' : 'If e-KYC or biometric is required, visit your nearest CSC with this Token ID.'}</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons on Success */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleOpenOfficialPortal}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>{lang === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Official Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold rounded-xl text-xs transition-colors"
                >
                  {lang === 'hi' ? 'संपन्न (Close)' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            /* APPLICATION INPUT FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Quick Info Ribbon */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                    {lang === 'hi' ? 'निशुल्क एवं सुरक्षित ग्रामीण नागरिक पंजीकरण' : '100% Free & Secure Rural Citizen Application Desk'}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                    {lang === 'hi'
                      ? 'अपनी बुनियादी जानकारी भरें। सत्यापन के उपरांत आपका आवेदन आधिकारिक विभागीय पोर्टल से जोड़ दिया जाएगा।'
                      : 'Fill in your basic credentials. Verified records are linked with the state welfare registry.'}
                  </p>
                </div>
              </div>

              {/* Citizen Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'hi' ? 'नागरिक / किसान का पूरा नाम *' : 'Applicant Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'उदा. रामेश्वर यादव' : 'e.g. Rameshwar Yadav'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर (10 अंक) *' : 'Mobile Number (10 digits) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Aadhaar Number & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'hi' ? 'आधार कार्ड नंबर (12 अंक) *' : 'Aadhaar Number (12 digits) *'}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={formData.aadhaar}
                    onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '') })}
                    placeholder="123456789012"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold tracking-wider font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'hi' ? 'जिला / गाँव का नाम *' : 'District / Village *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder={lang === 'hi' ? 'उदा. ग्रेटर नोएडा, दनकौर' : 'e.g. Greater Noida, Dankaur'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'hi' ? 'लाभार्थी श्रेणी (Category):' : 'Beneficiary Category:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'farmer', en: 'Farmer', hi: 'किसान' },
                    { id: 'women_shg', en: 'Women / SHG', hi: 'महिला / SHG' },
                    { id: 'laborer', en: 'Wage Laborer', hi: 'श्रमिक' },
                    { id: 'senior', en: 'Senior Citizen', hi: 'वरिष्ठ नागरिक' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        formData.category === cat.id
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'hi' ? cat.hi : cat.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Checkbox Affirmation */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  {lang === 'hi' ? 'दस्तावेज़ उपलब्धता सत्यापन:' : 'Document Availability Checklist:'}
                </span>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.hasAadhaarLinked}
                    onChange={(e) => setFormData({ ...formData, hasAadhaarLinked: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>{lang === 'hi' ? 'मेरे पास आधार कार्ड है व मोबाइल नंबर लिंक है' : 'Aadhaar Card is available & linked with mobile'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.hasLandOrRationDoc}
                    onChange={(e) => setFormData({ ...formData, hasLandOrRationDoc: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>{lang === 'hi' ? 'खतौनी / राशन कार्ड / पात्रता दस्तावेज उपलब्ध है' : 'Land Revenue Records (Khatauni) / Ration Card is available'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.hasActiveBankAccount}
                    onChange={(e) => setFormData({ ...formData, hasActiveBankAccount: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>{lang === 'hi' ? 'बैंक खाता DBT / NPCI से लिंक व सक्रिय है' : 'Bank Account is active with Aadhaar DBT/NPCI seeding'}</span>
                </label>
              </div>

              {/* Self Declaration */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    required
                    checked={formData.declared}
                    onChange={(e) => setFormData({ ...formData, declared: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded mt-0.5"
                  />
                  <span>
                    {lang === 'hi'
                      ? 'मैं प्रमाणित करता/करती हूँ कि ऊपर दी गई सभी जानकारी पूर्णतः सत्य है तथा मैं इस योजना के निर्धारित पात्रता मानदंडों को पूरा करता/करती हूँ।'
                      : 'I hereby declare that all information furnished above is true and I satisfy the eligibility conditions for this scheme.'}
                  </span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleOpenOfficialPortal}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center justify-center gap-1.5 transition-colors order-2 sm:order-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'सीधे सरकारी पोर्टल खोलें' : 'Open GOI Portal Directly'}</span>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 order-1 sm:order-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{lang === 'hi' ? 'आवेदन दर्ज हो रहा है...' : 'Submitting Application...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'आवेदन जमा करें (Submit Application)' : 'Submit Application Now'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Modal Footer with Helpline Note */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-5 py-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'योजना हेल्पलाइन:' : 'Helpline:'} <strong className="text-slate-800 dark:text-slate-200">{scheme?.helpline || '1800-180-1551'}</strong></span>
          </div>
          <span className="shrink-0">{lang === 'hi' ? 'निशुल्क सहायता' : '100% Free Service'}</span>
        </div>

      </div>
    </div>
  );
}
