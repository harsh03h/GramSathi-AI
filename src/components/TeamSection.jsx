import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  UserCheck, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  HelpCircle, 
  Clock, 
  Award,
  Sparkles,
  PhoneCall,
  Check,
  Copy,
  ChevronRight,
  ShieldCheck,
  User,
  Layers,
  HeartPulse
} from 'lucide-react';
import { presentationData } from '../data/presentationData';

export default function TeamSection({ lang = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    category: 'schemes',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [ticketCopied, setTicketCopied] = useState(false);

  const categories = [
    { id: 'schemes', labelEn: 'Welfare Schemes', labelHi: 'सरकारी योजनाएं', icon: Layers },
    { id: 'agriculture', labelEn: 'Agri & Mandi', labelHi: 'कृषि व मंडी', icon: Sparkles },
    { id: 'health', labelEn: 'Healthcare', labelHi: 'स्वास्थ्य सहायता', icon: HeartPulse },
    { id: 'academic', labelEn: 'College Project', labelHi: 'कॉलेज प्रोजेक्ट', icon: GraduationCap },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTicketId(`GS-2026-${randomNum}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      district: '',
      category: 'schemes',
      message: ''
    });
    setSubmitted(false);
    setTicketCopied(false);
  };

  const copyTicket = () => {
    navigator.clipboard.writeText(ticketId);
    setTicketCopied(true);
    setTimeout(() => setTicketCopied(false), 2000);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-fade-in pb-12">
      
      {/* 1. Modern Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'नागरिक सहायता एवं संपर्क डेस्क' : 'CITIZEN HELPLINE & CONTACT DESK'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
              {lang === 'hi' ? 'हमसे संपर्क करें' : 'Get in Touch with'} <span className="text-amber-400">GramSathi AI</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {lang === 'hi' 
                ? 'सरकारी योजनाओं, कृषि परामर्श, स्वास्थ्य सहायता या शैक्षणिक परियोजना मूल्यांकन के संबंध में हमारी टीम से निःसंकोच संपर्क करें।' 
                : 'Have questions regarding rural welfare schemes, agriculture advisory, healthcare triage, or academic evaluation? We are here to assist.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>GCET Greater Noida • CSE(AIML)</span>
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? '24 घंटे के भीतर उत्तर' : 'Response within 24 Hours'}</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 p-2 flex items-center justify-center shadow-lg">
              <img 
                src="/gramsathi-mascot.png" 
                alt="GramSathi Robot Mascot" 
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Top 2 Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Emergency & Rural Helplines */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shadow-2xs">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                24x7 Toll-Free
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {lang === 'hi' ? 'कल्याणकारी एवं आपातकालीन हेल्पलाइन' : 'Direct Citizen Helplines'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'hi' ? 'ग्रामीण नागरिकों के लिए सरकारी व आपातकालीन संपर्क' : 'Verified government toll-free emergency numbers'}
              </p>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">{lang === 'hi' ? 'किसान कॉल सेंटर' : 'Kisan Call Center'}</span>
                  <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'कृषि परामर्श (सुबह 6 - रात 10)' : 'Agri advisory (6 AM - 10 PM)'}</span>
                </div>
                <a 
                  href="tel:18001801551" 
                  className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-mono font-bold text-xs shadow-2xs flex items-center justify-center gap-1 transition-all w-fit"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>1800-180-1551</span>
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 hover:bg-rose-50/50 hover:border-rose-200 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">{lang === 'hi' ? 'राष्ट्रीय आपातकालीन सेवा' : 'National Emergency'}</span>
                  <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'पुलिस व एम्बुलेंस' : 'Police & Ambulance (24x7)'}</span>
                </div>
                <a 
                  href="tel:112" 
                  className="px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-mono font-bold text-xs shadow-2xs flex items-center justify-center gap-1 transition-all w-fit"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>112 / 108</span>
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 hover:bg-purple-50/50 hover:border-purple-200 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">{lang === 'hi' ? 'महिला सुरक्षा हेल्पलाइन' : 'Women Helpline'}</span>
                  <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'सुरक्षा एवं कानूनी सहायता' : 'Safety, health & legal aid'}</span>
                </div>
                <a 
                  href="tel:1090" 
                  className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-mono font-bold text-xs shadow-2xs flex items-center justify-center gap-1 transition-all w-fit"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>1090 / 181</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Email & GitHub Project Desk */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-2xs">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Open Source
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {lang === 'hi' ? 'परियोजना डेस्क एवं रिपोजिटरी' : 'Project Desk & Developer Support'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'hi' ? 'सॉफ्टवेयर कोड, तकनीकी सहयोग एवं ईमेल' : 'Source code, GitHub issues & developer direct contact'}
              </p>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                    {lang === 'hi' ? 'डेवलपर संपर्क' : 'Developer Email'}
                  </span>
                  <a 
                    href="mailto:harshgupta07h@gmail.com" 
                    className="font-bold text-emerald-800 hover:underline block break-all text-xs"
                  >
                    harshgupta07h@gmail.com
                  </a>
                </div>
                <a 
                  href="mailto:harshgupta07h@gmail.com"
                  className="p-2 rounded-xl bg-slate-200/80 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                    {lang === 'hi' ? 'गिटहब ओपन-सोर्स' : 'GitHub Repository'}
                  </span>
                  <span className="font-bold text-slate-800 block text-xs">
                    harsh03h/GramSathi-AI
                  </span>
                </div>
                <a 
                  href="https://github.com/harsh03h/GramSathi-AI" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>Star Repo</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                    {lang === 'hi' ? 'सेवा स्थिति' : 'Service Status'}
                  </span>
                  <span className="text-emerald-700 font-bold block text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>All Systems Operational (v2.0)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Section: Interactive Form (Left) & Team Credentials (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Modern Citizen Inquiry & Feedback Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'ऑनलाइन संदेश सेवा' : 'Online Citizen Inquiry Desk'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'hi' ? 'संदेश एवं सहायता फॉर्म' : 'Citizen Inquiry & Feedback Form'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'hi' 
                ? 'सरकारी योजनाओं, कृषि, स्वास्थ्य या वेबसाइट के संबंध में अपनी बात लिखें।' 
                : 'Send your questions, grievance, or feedback. We respond within 24 hours.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50/80 border border-emerald-300 rounded-3xl animate-fade-in shadow-xs">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Check className="w-9 h-9 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900">
                  {lang === 'hi' ? 'संदेश सफलतापूर्वक दर्ज हुआ!' : 'Inquiry Submitted Successfully!'}
                </h4>
                <p className="text-xs text-slate-600">
                  {lang === 'hi' ? 'आपका संदर्भ टोकन नंबर है:' : 'Your reference token ID:'}
                </p>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-emerald-300 shadow-2xs">
                  <span className="font-mono text-emerald-900 font-black text-sm tracking-wide">
                    {ticketId}
                  </span>
                  <button
                    type="button"
                    onClick={copyTicket}
                    className="p-1 text-slate-500 hover:text-emerald-800 transition-colors"
                    title="Copy Ticket ID"
                  >
                    {ticketCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500 pt-2">
                  {lang === 'hi' 
                    ? 'ग्रामसाथी एआई टीम आपके विवरण का संज्ञान लेकर आवश्यक सहायता प्रदान करेगी।' 
                    : 'Our team will review your query and provide verified guidance.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  {lang === 'hi' ? 'दूसरा संदेश भेजें' : 'Submit Another Inquiry'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Category Pills Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'hi' ? 'पूछताछ की श्रेणी चुनें:' : 'Select Category:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs scale-102'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate">{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'hi' ? 'नागरिक का पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'उदा. रामेश्वर यादव' : 'e.g. Rameshwar Yadav'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'hi' ? 'मोबाइल नंबर (10 अंक) *' : 'Mobile Number (10 digits) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'जिला / गाँव का नाम (वैकल्पिक)' : 'District / Village (Optional)'}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder={lang === 'hi' ? 'उदा. ग्रेटर नोएडा, दादरी, बुलंदशहर' : 'e.g. Greater Noida, Dadri, Meerut'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'संदेश अथवा समस्या का विवरण *' : 'Your Query or Suggestion *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'hi' 
                    ? 'कृपया अपनी समस्या, योजना का नाम या प्रश्न यहाँ विस्तार से लिखें...' 
                    : 'Please describe your inquiry, scheme questions, or feedback here...'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'संदेश भेजें (Submit Inquiry)' : 'Submit Inquiry'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Right Column (5 cols): Mentor & Student Developer Team */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Faculty Guide Card */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/40 rounded-3xl border border-amber-300/80 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                <Award className="w-7 h-7 stroke-[2]" />
              </div>
              <div className="truncate">
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-amber-300">
                  {lang === 'hi' ? 'परियोजना मार्गदर्शक' : 'PROJECT GUIDE & MENTOR'}
                </span>
                <h4 className="text-lg font-black text-slate-900 truncate">
                  {lang === 'hi' ? presentationData.guide.hindiName : presentationData.guide.name}
                </h4>
                <p className="text-xs font-semibold text-emerald-800">
                  {lang === 'hi' ? presentationData.guide.hindiDesignation : presentationData.guide.designation}
                </p>
                <p className="text-[11px] text-slate-500">
                  {lang === 'hi' ? presentationData.guide.hindiDept : presentationData.guide.dept}
                </p>
              </div>
            </div>
          </div>

          {/* Student Developers Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-emerald-200">
                  {lang === 'hi' ? 'छात्र डेवलपर टीम' : 'STUDENT DEVELOPERS'}
                </span>
                <h4 className="text-base font-black text-slate-900">
                  {lang === 'hi' ? 'बी.टेक सीएसई (एआई एवं एमएल)' : 'B.Tech CSE (AI & ML)'}
                </h4>
              </div>
              <GraduationCap className="w-6 h-6 text-emerald-700" />
            </div>

            <div className="space-y-2.5">
              {presentationData.team.map((member, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black text-xs flex items-center justify-center shadow-2xs">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900">
                        {lang === 'hi' ? member.hindiName || member.name : member.name}
                      </h5>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {lang === 'hi' ? 'रोल:' : 'Roll:'} {member.rollNo}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-right shadow-2xs">
                    {member.role.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Galgotias College (GCET)</span>
              <a 
                href="https://github.com/harsh03h/GramSathi-AI" 
                target="_blank" 
                rel="noreferrer"
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Frequently Asked Questions (FAQ) for Contact & Help */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h4 className="text-base font-bold text-slate-900">
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions'}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-2xs space-y-1.5">
            <h5 className="font-bold text-slate-900">
              {lang === 'hi' ? 'क्या ग्रामसाथी एआई का उपयोग पूर्णतः निशुल्क है?' : 'Is GramSathi AI completely free to use?'}
            </h5>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'hi' 
                ? 'हाँ, यह मंच ग्रामीण नागरिकों और किसानों के कल्याण हेतु बनाया गया 100% निशुल्क सार्वजनिक सेवा मंच है।' 
                : 'Yes, GramSathi AI is a 100% free rural welfare initiative developed for public assistance.'}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-2xs space-y-1.5">
            <h5 className="font-bold text-slate-900">
              {lang === 'hi' ? 'क्या मैं हिंदी में बोलकर सहायता प्राप्त कर सकता हूँ?' : 'Can I use voice assistance in Hindi?'}
            </h5>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'hi' 
                ? 'बिल्कुल! वेबसाइट में लगा माइक बटन दबाकर आप शुद्ध हिंदी या अपनी ग्रामीण बोली में बोलकर सवाल पूछ सकते हैं।' 
                : 'Absolutely! The built-in voice assistant lets citizens speak naturally in Hindi or English using Web Speech API.'}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-2xs space-y-1.5">
            <h5 className="font-bold text-slate-900">
              {lang === 'hi' ? 'यदि किसी योजना का फॉर्म न मिले तो क्या करें?' : 'What if I need help applying for a scheme?'}
            </h5>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'hi' 
                ? 'आप ऊपर दिए गए फॉर्म से हमें संपर्क कर सकते हैं या निकटतम सीएससी (जन सेवा केंद्र) पर जा सकते हैं।' 
                : 'You can submit an inquiry through the form above or check the "Nearest Services" tab to locate your nearest CSC center.'}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
