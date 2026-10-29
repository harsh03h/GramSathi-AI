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
  Laptop
} from 'lucide-react';
import { presentationData } from '../data/presentationData';

export default function PresentationView({ lang, onOpenLiveDemo }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeArchNode, setActiveArchNode] = useState('user');

  const slides = presentationData.slides;
  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

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
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      
      {/* Top Slide Control Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
            {lang === 'hi' ? `स्लाइड ${currentSlide.id} / ${slides.length}` : `Slide ${currentSlide.id} of ${slides.length}`}
          </span>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            {lang === 'hi' ? currentSlide.hindiCategory || currentSlide.category : currentSlide.category}
          </span>
        </div>

        {/* Quick Slide Number Chips */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                currentSlideIndex === idx
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.id}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700"
            title={lang === 'hi' ? "पिछली स्लाइड" : "Previous Slide"}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700"
            title={lang === 'hi' ? "अगली स्लाइड" : "Next Slide"}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
            title={lang === 'hi' ? "फुलस्क्रीन वाइवा मोड" : "Full Screen Viva Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden md:inline">{isFullscreen ? (lang === 'hi' ? 'वापस जाएं' : 'Exit Fullscreen') : (lang === 'hi' ? 'वाइवा मोड' : 'Viva Mode')}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800 min-h-[580px] flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle Decorative Background Rings */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Header */}
        <div className="relative z-10 border-b border-white/10 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                {lang === 'hi' ? currentSlide.hindiBadge || currentSlide.badge : currentSlide.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {lang === 'hi' ? presentationData.hindiDepartment : presentationData.department} • {lang === 'hi' ? presentationData.hindiCollege : presentationData.college}
              </span>
            </div>
            <span className="text-xs text-amber-300 font-medium">
              {lang === 'hi' ? `मार्गदर्शक: ${presentationData.guide.hindiName || presentationData.guide.name}` : `Guide: ${presentationData.guide.name}`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mt-1">
            {currentSlide.id}. {lang === 'hi' ? currentSlide.hindiTitle || currentSlide.title : currentSlide.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl leading-relaxed">
            {lang === 'hi' ? currentSlide.hindiDescription || currentSlide.description : currentSlide.description}
          </p>
        </div>

        {/* Slide Body Content - Dynamic per slide */}
        <div className="relative z-10 py-6 flex-1 flex flex-col justify-center">

          {/* SLIDE 1: COVER */}
          {currentSlide.id === 1 && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-3xl">
                <span className="text-amber-400 font-bold text-sm block mb-1">
                  "{lang === 'hi' ? presentationData.hindiTagline : presentationData.tagline}"
                </span>
                <p className="text-emerald-300 text-sm font-semibold">
                  {lang === 'hi' ? presentationData.hindiSubtitle : presentationData.subtitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {(lang === 'hi' && currentSlide.hindiHighlights ? currentSlide.hindiHighlights : currentSlide.highlights).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guide & Team Quick Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                  <span className="text-xs text-amber-300 uppercase tracking-wider font-bold block">
                    {lang === 'hi' ? 'परियोजना मार्गदर्शक:' : 'Project Guide:'}
                  </span>
                  <p className="text-base font-extrabold text-white mt-0.5">
                    {lang === 'hi' ? presentationData.guide.hindiName : presentationData.guide.name}
                  </p>
                  <p className="text-xs text-slate-300">
                    {lang === 'hi' ? presentationData.guide.hindiDesignation : presentationData.guide.designation}, {lang === 'hi' ? presentationData.hindiDepartment : presentationData.department}
                  </p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl">
                  <span className="text-xs text-emerald-300 uppercase tracking-wider font-bold block">
                    {lang === 'hi' ? 'परियोजना निर्माता छात्र:' : 'Developed by:'}
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {lang === 'hi' 
                      ? 'हर्ष गुप्ता, दिग्दर्शन कुमार, देवांश सक्सेना, आयुष्मान सिंह' 
                      : 'Harsh Gupta, Digdarshan Kumar, Devansh Saxena, Ayushmaan Singh'}
                  </p>
                  <p className="text-xs text-slate-300">B.Tech CSE(AIML) • GCET Greater Noida</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: PROBLEM STATEMENT */}
          {currentSlide.id === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSlide.painPoints.map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-emerald-400/50 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 block mb-1">
                      {item.hindiTitle}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">
                      {lang === 'hi' ? item.hindiTitle : item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi' ? item.hindiDesc : item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{lang === 'hi' ? `मुख्य ग्रामीण चुनौती #${idx + 1}` : `Critical Barrier #${idx + 1}`}</span>
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 3: LITERATURE SURVEY */}
          {currentSlide.id === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentSlide.surveyPoints.map((sp, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-white">
                        {lang === 'hi' ? sp.hindiArea || sp.area : sp.area}
                      </span>
                      <span className="text-[11px] font-semibold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full">
                        {lang === 'hi' ? sp.hindiStatus || sp.status : sp.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi' ? sp.hindiDetail || sp.detail : sp.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Research Gap Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  ⚡ {lang === 'hi' ? 'पहचाना गया अनुसंधान अंतर (Research Gap):' : 'Identified Research Gap (Why GramSathi AI is needed):'}
                </span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  {lang === 'hi' ? currentSlide.hindiResearchGap || currentSlide.researchGap : currentSlide.researchGap}
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 4: PROPOSED SOLUTION */}
          {currentSlide.id === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentSlide.features.map((feat, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-emerald-400/50 transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block mb-2">
                        {lang === 'hi' ? feat.hindiBadge || feat.badge : feat.badge}
                      </span>
                      <h3 className="text-base font-bold text-white mb-2">
                        {lang === 'hi' ? feat.hindiName || feat.name : feat.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'hi' ? feat.hindiDesc || feat.desc : feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={onOpenLiveDemo}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg inline-flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Laptop className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'hi' ? 'लाइव कार्यशील प्रोटोटाइप खोलें' : 'Launch Live Working Prototype'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 5: SYSTEM ARCHITECTURE (Interactive!) */}
          {currentSlide.id === 5 && (
            <div className="space-y-5">
              {/* Interactive Pipeline Diagram */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/10">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  {[
                    { id: 'user', nameEn: '1. Rural User', nameHi: '1. ग्रामीण उपयोगकर्ता', subEn: 'Voice & Text (Hinglish)', subHi: 'आवाज़ व टेक्स्ट (हिंग्लिश)', icon: PhoneCall },
                    { id: 'frontend', nameEn: '2. Frontend App', nameHi: '2. फ्रंटएंड ऍप', subEn: 'React + Vite (Mobile UI)', subHi: 'रिएक्ट + वाईट (मोबाइल)', icon: Laptop },
                    { id: 'backend', nameEn: '3. Backend Server', nameHi: '3. बैकएंड सर्वर', subEn: 'Node.js + Express API', subHi: 'नोड + एक्सप्रेस एपीआई', icon: Layers },
                    { id: 'ai', nameEn: '4. AI LLM Module', nameHi: '4. एआई मॉड्यूल', subEn: 'Google Gemini API', subHi: 'गूगल जेमिनी एआई', icon: Cpu },
                    { id: 'db', nameEn: '5. DB & APIs', nameHi: '5. डेटाबेस व एपीआई', subEn: 'MongoDB + Weather/Mandi', subHi: 'मोंगोडीबी + मंडी भाव', icon: Database },
                  ].map((node) => {
                    const Icon = node.icon;
                    const isSelected = activeArchNode === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setActiveArchNode(node.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white ring-2 ring-emerald-500/30'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span className="block font-bold">{lang === 'hi' ? node.nameHi : node.nameEn}</span>
                        <span className="text-[10px] text-slate-400">{lang === 'hi' ? node.subHi : node.subEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanatory Node Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentSlide.components.map((c, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-[11px] font-bold text-amber-400 block">
                      {lang === 'hi' ? c.hindiLayer || c.layer : c.layer}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-300 block mb-1">{c.tech}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi' ? c.hindiRole || c.role : c.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 6: TECH STACK */}
          {currentSlide.id === 6 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSlide.stack.map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                      {lang === 'hi' ? item.hindiCategory || item.category : item.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.items.map((tech, tIdx) => (
                        <span key={tIdx} className="bg-white/10 text-white text-xs px-2.5 py-1 rounded-lg font-medium border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 border-t border-white/10 pt-2.5">
                    {lang === 'hi' ? item.hindiDesc || item.desc : item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 7: EXPECTED IMPACT & BENEFITS */}
          {currentSlide.id === 7 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentSlide.impacts.map((imp, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-black text-amber-400 block mb-2">
                      {imp.metric}
                    </span>
                    <h3 className="text-sm font-bold text-white mb-2">
                      {lang === 'hi' ? imp.hindiLabel || imp.label : imp.label}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                    {lang === 'hi' ? imp.hindiDesc || imp.desc : imp.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 8: FUTURE SCOPE */}
          {currentSlide.id === 8 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentSlide.roadmap.map((step, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-500/40">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">
                      {lang === 'hi' ? step.hindiPhase || step.phase : step.phase}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi' ? step.hindiDesc || step.desc : step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 9: ACKNOWLEDGEMENT */}
          {currentSlide.id === 9 && (
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <GraduationCap className="w-8 h-8 text-slate-950" />
              </div>
              <h2 className="text-3xl font-black text-white">
                {lang === 'hi' ? 'हार्दिक धन्यवाद!' : 'Thank You!'}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                "{lang === 'hi' ? currentSlide.hindiNotes || currentSlide.notes : currentSlide.notes}"
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400">
                {lang === 'hi' ? presentationData.hindiDepartment : presentationData.department}, {lang === 'hi' ? 'गलगोटियास कॉलेज ऑफ इंजीनियरिंग एंड टेक्नोलॉजी, ग्रेटर नोएडा' : 'Galgotias College of Engineering & Technology, Greater Noida'}
              </div>
            </div>
          )}

        </div>

        {/* Slide Footer */}
        <div className="relative z-10 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              {lang === 'hi' ? 'स्लाइड बदलने के लिए बायां/दायां तीर (Arrow Keys) या स्पेसबार दबाएं' : 'Use Left/Right arrow keys or Spacebar to navigate slides'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white font-medium transition-all"
            >
              {lang === 'hi' ? 'पिछली' : 'Previous'}
            </button>
            <span className="font-semibold text-slate-300">
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-30 disabled:hover:bg-emerald-500 text-slate-950 font-bold transition-all"
            >
              {lang === 'hi' ? 'अगली' : 'Next'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
