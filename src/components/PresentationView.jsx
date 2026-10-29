import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Layers, 
  Cpu, 
  Database, 
  Globe, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  GraduationCap, 
  PhoneCall, 
  ShieldAlert, 
  ArrowRight, 
  ExternalLink, 
  Laptop,
  BookOpen,
  Award,
  Heart,
  Sprout,
  Building2,
  Users,
  Check,
  FileText,
  Code2
} from 'lucide-react';
import { presentationData } from '../data/presentationData';

export default function PresentationView({ lang = 'en', onOpenLiveDemo }) {
  const [viewMode, setViewMode] = useState('overview'); // 'overview' or 'slides'
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = presentationData.slides;
  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation for slide deck mode
  useEffect(() => {
    if (viewMode !== 'slides') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, viewMode]);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className={`space-y-8 max-w-6xl mx-auto animate-fade-in pb-12 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      
      {/* 1. Mode Switcher Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-2 sm:p-2.5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setViewMode('overview')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'overview'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'hi' ? 'परियोजना परिचय एवं दृष्टिकोण' : 'Platform Mission & Overview'}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('slides')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'slides'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'hi' ? 'वाइवा प्रस्तुति (9 स्लाइड्स)' : 'Academic Viva Slides (9)'}</span>
          </button>
        </div>

        {viewMode === 'overview' ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 px-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>GCET Greater Noida • CSE(AIML) Mini Project</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 text-xs flex items-center gap-1 border border-slate-200"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* 2. MODE A: MODERN PRODUCT & MISSION OVERVIEW (Default View) */}
      {viewMode === 'overview' && (
        <div className="space-y-10">
          
          {/* Hero Banner with Robot Mascot */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'hi' ? 'ग्रामीण सशक्तिकरण एवं तकनीकी समावेशन' : 'RURAL EMPOWERMENT THROUGH AI'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
                  GramSathi <span className="text-amber-400">AI</span>
                </h1>

                <p className="text-base sm:text-xl font-bold text-emerald-300">
                  {lang === 'hi' ? presentationData.hindiSubtitle : presentationData.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {lang === 'hi' 
                    ? 'ग्रामसाथी एआई ग्रामीण भारत के 90+ करोड़ नागरिकों के लिए एक समावेशी व बुद्धिमान डिजिटल साथी है। यह आवाज़-आधारित हिंदी व क्षेत्रीय भाषा में सरकारी योजनाओं, स्वास्थ्य, कृषि और रोज़गार की सटीक जानकारी बिना किसी बिचौलिए के सीधे नागरिकों तक पहुंचाता है।' 
                    : 'GramSathi AI is an intelligent rural assistance ecosystem bridging the digital divide for 900+ million citizens across India. Powered by voice recognition, intelligent eligibility algorithms, and verified government portals.'}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenLiveDemo}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{lang === 'hi' ? 'लाइव पोर्टल चलाएं' : 'Launch Live Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('slides')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-all"
                  >
                    <span>{lang === 'hi' ? 'वाइवा प्रेजेंटेशन देखें' : 'View Viva Presentation'}</span>
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mascot Emblem Card */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 text-center space-y-3 max-w-[280px]">
                  <img 
                    src="/gramsathi-mascot.png" 
                    alt="GramSathi AI Mascot" 
                    className="w-32 h-32 object-contain mx-auto filter drop-shadow-lg"
                  />
                  <div>
                    <h4 className="text-lg font-black text-white">GramSathi AI</h4>
                    <p className="text-xs text-emerald-300">
                      {lang === 'hi' ? 'आपका अपना ग्रामीण डिजिटल साथी' : 'Your Friendly Rural AI Companion'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 4 Impact Metric Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-800">900M+</span>
              <h4 className="text-xs font-bold text-slate-800">{lang === 'hi' ? 'ग्रामीण जनसंख्या' : 'Target Rural Citizens'}</h4>
              <p className="text-[11px] text-slate-500">{lang === 'hi' ? 'डिजिटल समावेशन का लक्ष्य' : 'Inclusion across villages'}</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-700">100%</span>
              <h4 className="text-xs font-bold text-slate-800">{lang === 'hi' ? 'आवाज़-आधारित (STT/TTS)' : 'Voice-First AI'}</h4>
              <p className="text-[11px] text-slate-500">{lang === 'hi' ? 'बिना टाइप किए बोलकर पूछें' : 'Speak in natural Hindi & English'}</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-teal-700">10+</span>
              <h4 className="text-xs font-bold text-slate-800">{lang === 'hi' ? 'प्रमुख सरकारी योजनाएं' : 'Welfare Schemes'}</h4>
              <p className="text-[11px] text-slate-500">{lang === 'hi' ? 'सीधे बैंक खाते में लाभ' : 'Direct benefit welfare verification'}</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-purple-700">₹0</span>
              <h4 className="text-xs font-bold text-slate-800">{lang === 'hi' ? 'पूर्णतः निशुल्क सेवा' : '100% Free Public Good'}</h4>
              <p className="text-[11px] text-slate-500">{lang === 'hi' ? 'बिचौलियों और कमीशन से मुक्ति' : 'Zero middleman exploitation'}</p>
            </div>
          </div>

          {/* Problem vs Solution Split Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Rural Challenge */}
            <div className="bg-rose-50/70 rounded-3xl p-6 sm:p-8 border border-rose-200 space-y-4">
              <div className="flex items-center gap-2.5 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>{lang === 'hi' ? 'ग्रामीण भारत की मुख्य समस्याएं' : 'The Rural Digital Challenge'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'hi' ? 'योजनाएं बहुत हैं, पर जानकारी और पहुंच नहीं' : 'Welfare exists, but access is blocked'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">✕</span>
                  <span><strong>{lang === 'hi' ? 'जागरूकता का भारी अभाव:' : 'Severe Information Deficit:'}</strong> {lang === 'hi' ? '68% से अधिक ग्रामीण परिवार पात्रता होने पर भी लाभ से वंचित रह जाते हैं।' : 'Over 68% of eligible beneficiaries miss out on state and central welfare.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">✕</span>
                  <span><strong>{lang === 'hi' ? 'भाषा व साक्षरता की बाधा:' : 'Language & Tech Barrier:'}</strong> {lang === 'hi' ? 'ज्यादातर पोर्टल जटिल अंग्रेजी या कठिन प्रशासनिक शब्दावली में होते हैं।' : 'Most government portals are heavily bureaucratic and English-centric.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">✕</span>
                  <span><strong>{lang === 'hi' ? 'दफ्तरों के चक्कर व बिचौलिए:' : 'Middlemen & Wage Loss:'}</strong> {lang === 'hi' ? 'ब्लॉक व तहसील के 20-50 किमी चक्कर लगाने में ग्रामीणों की दिहाड़ी और धन नष्ट होता है।' : 'Citizens travel 30-50 km to block offices, losing daily wages to corrupt agents.'}</span>
                </li>
              </ul>
            </div>

            {/* The GramSathi AI Solution */}
            <div className="bg-emerald-50/70 rounded-3xl p-6 sm:p-8 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'hi' ? 'ग्रामसाथी एआई का समाधान' : 'The GramSathi AI Solution'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'hi' ? 'आवाज़, तकनीक और विश्वास का संगम' : 'Voice-First Intelligent Empowerment'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</span>
                  <span><strong>{lang === 'hi' ? 'बोलकर बातचीत (Voice Assistant):' : 'Bilingual Conversational AI:'}</strong> {lang === 'hi' ? 'नागरिक सीधे हिंदी में बोलकर सवाल पूछ सकते हैं और आवाज़ में उत्तर सुन सकते हैं।' : 'Illiterate and elderly villagers speak naturally in Hindi or English.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</span>
                  <span><strong>{lang === 'hi' ? 'स्मार्ट पात्रता चेकर:' : 'Instant Eligibility Matcher:'}</strong> {lang === 'hi' ? 'जमीन, आय, आयु और श्रेणी के अनुसार सही सरकारी योजनाओं का स्वतः मिलान।' : 'Algorithmic matching of land, income, caste, and age against official rules.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</span>
                  <span><strong>{lang === 'hi' ? 'सत्यापित चेकलिस्ट व पोर्टल लिंक:' : 'Verified Direct Checklists:'}</strong> {lang === 'hi' ? 'आधिकारिक सरकारी वेबसाइटों (pmkisan, nha) के सीधे लिंक और कागजात सूची।' : 'Direct portal links, document requirements, and CSC centers map.'}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* 4 Core Pillars of the Platform */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {lang === 'hi' ? 'मुख्य तकनीकी स्तंभ' : 'Platform Pillars'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {lang === 'hi' ? 'ग्रामसाथी एआई की ४ मुख्य विशेषताएं' : 'Core Capabilities of GramSathi AI'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {lang === 'hi' ? 'आवाज़-आधारित समावेशन' : 'Voice-First Interface'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi' 
                    ? 'वेब स्पीच एसटीटी (स्पीच-टू-टेक्स्ट) एवं टीटीएस (टेक्स्ट-टू-स्पीच) के माध्यम से बिना टाइप किए बातचीत।' 
                    : 'Built with Web Speech API for real-time speech-to-text and conversational playback.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {lang === 'hi' ? 'कल्याणकारी योजना मिलान' : 'Smart Scheme Matcher'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi' 
                    ? 'पीएम किसान, आयुष्मान भारत, पीएम आवास, फसल बीमा आदि का सटीक पात्रता मूल्यांकन।' 
                    : 'Multi-criteria matching engine filtering central and state government benefits.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {lang === 'hi' ? 'नजदीकी सेवाएं व मानचित्र' : 'Nearest Services Directory'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi' 
                    ? 'अस्पताल, जन सेवा केंद्र (CSC), प्राथमिक स्वास्थ्य केंद्र व स्कूलों की दूरी व संपर्क नंबर।' 
                    : 'Interactive directory locating nearby hospitals, CSC kiosks, and administrative offices.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {lang === 'hi' ? 'मंडी भाव व मौसम सलाह' : 'Mandi & Weather Advisory'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi' 
                    ? 'ग्रेटर नोएडा व यूपी की मंडियों के दैनिक भाव, मौसम पूर्वानुमान व कीट नियंत्रण उपाय।' 
                    : 'Real-time APMC mandi market commodity prices and localized weather alerts for farmers.'}
                </p>
              </div>

            </div>
          </div>

          {/* Academic Affiliation Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                GCET Greater Noida • CSE(AIML)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'hi' ? 'गलगोटियास कॉलेज ऑफ इंजीनियरिंग एंड टेक्नोलॉजी' : 'Galgotias College of Engineering & Technology'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {lang === 'hi' 
                  ? 'आर्टिफिशियल इंटेलिजेंस एवं मशीन लर्निंग विभाग के तत्वावधान में विकसित मिनी प्रोजेक्ट। परियोजना मार्गदर्शक: सुश्री रितु (सहायक प्रोफेसर)।' 
                  : 'Developed under the Department of AI & ML as an academic mini project innovation. Project Guide: Ms. Ritu (Assistant Professor).'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setViewMode('slides')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'hi' ? '९ वाइवा स्लाइड्स खोलें' : 'Open 9 Viva Slides'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 3. MODE B: 9-SLIDE ACADEMIC VIVA SLIDESHOW (Presentation Deck) */}
      {viewMode === 'slides' && (
        <div className="space-y-6">
          
          {/* Slide Navigation Controller */}
          <div className="bg-white rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-800 text-white">
                {lang === 'hi' ? `स्लाइड ${currentSlide.id} / ${slides.length}` : `Slide ${currentSlide.id} of ${slides.length}`}
              </span>
              <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                {lang === 'hi' ? currentSlide.hindiCategory || currentSlide.category : currentSlide.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    currentSlideIndex === idx
                      ? 'bg-emerald-800 text-white shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 text-xs font-bold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={nextSlide}
                disabled={currentSlideIndex === slides.length - 1}
                className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 min-h-[460px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  {lang === 'hi' ? currentSlide.hindiBadge || currentSlide.badge : currentSlide.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">GCET CSE(AIML) 2026</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {lang === 'hi' ? currentSlide.hindiTitle || currentSlide.title : currentSlide.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {lang === 'hi' ? currentSlide.hindiDescription || currentSlide.description : currentSlide.description}
              </p>

              {/* Slide Bullet Highlights */}
              {currentSlide.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  {(lang === 'hi' ? currentSlide.hindiHighlights || currentSlide.highlights : currentSlide.highlights).map((item, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs font-medium text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Department of Artificial Intelligence & Machine Learning</span>
              <span>Guide: Ms. Ritu (Asst. Prof)</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
