import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Code2, 
  MessageSquare, 
  HelpCircle, 
  Clock, 
  AlertCircle, 
  Award,
  Sparkles,
  PhoneCall,
  Check
} from 'lucide-react';
import { presentationData } from '../data/presentationData';

export default function TeamSection({ lang }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    category: 'schemes',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
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
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-fade-in pb-10">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'संपर्क एवं सहायता केंद्र' : 'CONTACT & CITIZEN HELPLINE'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {lang === 'hi' ? 'हमसे संपर्क करें • ग्रामसाथी एआई डेस्क' : 'Get in Touch • GramSathi AI Desk'}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {lang === 'hi' 
              ? 'सरकारी योजनाओं, कृषि परामर्श, स्वास्थ्य सेवाओं या कॉलेज मिनी प्रोजेक्ट के संबंध में किसी भी प्रश्न या प्रतिक्रिया हेतु हमसे संपर्क करें।' 
              : 'Have questions regarding rural welfare schemes, agricultural guidance, nearest healthcare, or our college mini project? Reach out to our team.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>GCET Greater Noida • CSE(AIML)</span>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? '24x7 ऑनलाइन एआई सहायता' : '24x7 Online AI Assistance'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top 3 Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Emergency & Rural Helplines */}
        <div className="bg-white rounded-3xl p-6 border border-rose-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {lang === 'hi' ? 'कल्याणकारी हेल्पलाइन' : 'Toll-Free Helplines'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'hi' ? 'ग्रामीण नागरिकों के लिए आपातकालीन व सरकारी नंबर' : 'National emergency & farmer support lines'}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">{lang === 'hi' ? 'किसान कॉल सेंटर' : 'Kisan Call Center'}</span>
                  <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'कृषि परामर्श (सुबह 6 - रात 10)' : 'Agri advisory (6 AM - 10 PM)'}</span>
                </div>
                <a href="tel:18001801551" className="font-mono font-bold text-emerald-800 hover:underline">
                  1800-180-1551
                </a>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">{lang === 'hi' ? 'आपातकालीन सहायता' : 'National Emergency'}</span>
                  <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'पुलिस / एम्बुलेंस' : 'Police / Medical'}</span>
                </div>
                <a href="tel:112" className="font-mono font-bold text-rose-700 hover:underline">
                  112 / 108
                </a>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">{lang === 'hi' ? 'महिला हेल्पलाइन' : 'Women Helpline'}</span>
                  <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'महिला सुरक्षा एवं सहायता' : 'Safety & support'}</span>
                </div>
                <a href="tel:1090" className="font-mono font-bold text-purple-700 hover:underline">
                  1090 / 181
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Email & GitHub Project Desk */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {lang === 'hi' ? 'परियोजना डेस्क एवं रिपोजिटरी' : 'Project Desk & Repository'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'hi' ? 'सॉफ्टवेयर कोड, तकनीकी सहयोग एवं ईमेल' : 'Source code, feedback & developer email'}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  {lang === 'hi' ? 'डेवलपर ईमेल' : 'Developer Email'}
                </span>
                <a 
                  href="mailto:harsh03h.dev@gmail.com" 
                  className="font-medium text-emerald-800 hover:underline block break-all text-xs"
                >
                  harsh03h.dev@gmail.com
                </a>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  {lang === 'hi' ? 'गिटहब ओपन-सोर्स कोड' : 'GitHub Open Source'}
                </span>
                <a 
                  href="https://github.com/harsh03h/GramSathi-AI" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-semibold text-slate-800 hover:text-emerald-800 flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>harsh03h/GramSathi-AI</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  {lang === 'hi' ? 'प्रतिक्रिया समय' : 'Response Time'}
                </span>
                <span className="text-slate-700 font-semibold block">
                  {lang === 'hi' ? '24 घंटे के भीतर उत्तर' : 'Within 24 working hours'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Campus & College Location */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {lang === 'hi' ? 'संस्थान एवं इनोवेशन लैब' : 'Institution & Department'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'hi' ? 'कैंपस का पता एवं शैक्षणिक विभाग' : 'College campus address & department info'}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-slate-600">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <strong className="text-slate-900 block">
                  Galgotias College of Engineering & Technology (GCET)
                </strong>
                <p className="text-[11px] text-slate-500">
                  {lang === 'hi' ? presentationData.hindiDepartment : presentationData.department}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  {lang === 'hi' ? 'परिसर का पता' : 'Campus Location'}
                </span>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  1, Knowledge Park II, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306
                </p>
              </div>

              <a 
                href="https://maps.google.com/?q=Galgotias+College+of+Engineering+and+Technology+Greater+Noida"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{lang === 'hi' ? 'गूगल मैप्स पर देखें' : 'View on Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Section: Interactive Contact Form & Team Credits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Interactive Query / Feedback Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'ऑनलाइन संदेश सेवा' : 'Online Citizen Inquiry'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === 'hi' ? 'नागरिक सहायता एवं संदेश फॉर्म' : 'Citizen Inquiry & Feedback Form'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'hi' 
                ? 'अपना प्रश्न या सुझाव लिखें। हमारी टीम जल्द से जल्द आपसे संपर्क करेगी।' 
                : 'Send your questions, grievance, or feedback. We will get back to you promptly.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl animate-fade-in">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900">
                  {lang === 'hi' ? 'संदेश सफलतापूर्वक प्राप्त हुआ!' : 'Query Received Successfully!'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {lang === 'hi' 
                    ? `आपका संदर्भ नंबर है:` 
                    : `Your inquiry reference token is:`}{' '}
                  <strong className="font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {ticketId}
                  </strong>
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  {lang === 'hi' 
                    ? 'ग्रामसाथी एआई टीम आपके विवरण का संज्ञान लेगी और आवश्यक मार्गदर्शन उपलब्ध कराएगी।' 
                    : 'The GramSathi AI desk has recorded your message and will review it.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                {lang === 'hi' ? 'दूसरा संदेश भेजें' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'उदा. रामेश्वर यादव' : 'e.g. Rameshwar Yadav'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'hi' ? 'जिला / गाँव का नाम' : 'District / Village'}
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder={lang === 'hi' ? 'उदा. ग्रेटर नोएडा / दादरी' : 'e.g. Greater Noida / Dadri'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'hi' ? 'विषय / श्रेणी' : 'Inquiry Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="schemes">{lang === 'hi' ? 'सरकारी योजना सहायता' : 'Government Welfare Schemes'}</option>
                    <option value="agriculture">{lang === 'hi' ? 'कृषि एवं मंडी भाव' : 'Agriculture & Mandi Prices'}</option>
                    <option value="healthcare">{lang === 'hi' ? 'स्वास्थ्य एवं नजदीकी केंद्र' : 'Healthcare & Medical Aid'}</option>
                    <option value="technical">{lang === 'hi' ? 'वेबसाइट तकनीकी सहायता' : 'Technical Support / Feedback'}</option>
                    <option value="academic">{lang === 'hi' ? 'कॉलेज प्रोजेक्ट संबंधी प्रश्न' : 'College Mini Project Inquiry'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'आपका संदेश / प्रश्न *' : 'Your Message / Inquiry *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'hi' 
                    ? 'कृपया अपनी समस्या अथवा प्रश्न का संक्षिप्त विवरण यहाँ लिखें...' 
                    : 'Please describe your inquiry, scheme question or suggestions...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'संदेश भेजें (Submit Inquiry)' : 'Submit Inquiry'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Right Column (5 cols): Project Mentor & Developer Team */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Faculty Guide Card */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/40 rounded-3xl border border-amber-300/80 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                <Award className="w-7 h-7 stroke-[2]" />
              </div>
              <div className="truncate">
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1 border border-amber-300">
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
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
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

                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-right">
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
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Frequently Asked Questions (FAQ) for Contact & Citizen Help */}
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
              {lang === 'hi' ? 'क्या ग्रामसाथी एआई का उपयोग पूरी तरह निशुल्क है?' : 'Is GramSathi AI completely free to use?'}
            </h5>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'hi' 
                ? 'हाँ, ग्रामसाथी एआई ग्रामीण नागरिकों, किसानों और विद्यार्थियों के कल्याण हेतु एक निशुल्क सार्वजनिक सेवा मंच है।' 
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
