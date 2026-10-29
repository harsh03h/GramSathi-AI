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
  Code2,
  ShieldCheck,
  FileWarning,
  Languages,
  Bot
} from 'lucide-react';
import { presentationData } from '../data/presentationData';

export default function PresentationView({ lang = 'en', onOpenLiveDemo }) {
  const [viewMode, setViewMode] = useState('slides'); // 'slides' or 'overview'
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = presentationData.slides;
  const currentSlide = slides[currentSlideIndex];

  const slideShortTitles = [
    { id: 1, titleEn: 'Vision', titleHi: 'परिचय' },
    { id: 2, titleEn: 'Problem', titleHi: 'समस्या' },
    { id: 3, titleEn: 'Survey', titleHi: 'सर्वेक्षण' },
    { id: 4, titleEn: 'Solution', titleHi: 'समाधान' },
    { id: 5, titleEn: 'Architecture', titleHi: 'संरचना' },
    { id: 6, titleEn: 'Tech Stack', titleHi: 'स्टैक' },
    { id: 7, titleEn: 'Impact', titleHi: 'प्रभाव' },
    { id: 8, titleEn: 'Roadmap', titleHi: 'रोडमैप' },
    { id: 9, titleEn: 'Credits', titleHi: 'आभार' },
  ];

  // Keyboard navigation for slide deck mode
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
    <div className={`space-y-6 max-w-6xl mx-auto animate-fade-in pb-12 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-8 overflow-y-auto' : ''}`}>
      
      {/* 1. Header Toolbar & Mode Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-2.5 sm:p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Toggle Mode Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
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
            <span>{lang === 'hi' ? 'वाइवा प्रेजेंटेशन (9 स्लाइड्स)' : 'Academic Viva Deck (9 Slides)'}</span>
          </button>

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
            <span>{lang === 'hi' ? 'विस्तृत परिचय एवं दृष्टिकोण' : 'Platform Mission & Story'}</span>
          </button>
        </div>

        {/* Right Info & Fullscreen */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 hidden md:inline">
            GCET Greater Noida • CSE(AIML)
          </span>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>

      </div>

      {/* 2. MODE: 9-SLIDE MODERN ACADEMIC VIVA DECK */}
      {viewMode === 'slides' && (
        <div className="space-y-5">
          
          {/* Modern Slide Stepper & Progress Navigation */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-3">
            {/* Top Row: Slide Counter, Title & Navigation Controls */}
            <div className="flex items-center justify-between gap-3">
              {/* Left: Badge & Slide Heading */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 shrink-0">
                  {String(currentSlide.id).padStart(2, '0')} / 09
                </span>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 truncate block sm:inline">
                    {lang === 'hi' ? currentSlide.hindiTitle || currentSlide.title : currentSlide.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline ml-2">
                    • {lang === 'hi' ? currentSlide.hindiCategory || currentSlide.category : currentSlide.category}
                  </span>
                </div>
              </div>

              {/* Right: Prev & Next Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white text-slate-700 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                  title="Previous Slide (← / PageUp)"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-30 disabled:hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed"
                  title="Next Slide (→ / Space / PageDown)"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stepper Segments: Exactly 9 columns, responsive, 0 scrollbars, 0 wrapping */}
            <div className="grid grid-cols-9 gap-1 sm:gap-2 pt-1">
              {slides.map((s, idx) => {
                const isSelected = currentSlideIndex === idx;
                const isPassed = currentSlideIndex > idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    title={`${s.id}. ${lang === 'hi' ? slideShortTitles[idx].titleHi : slideShortTitles[idx].titleEn}`}
                    className={`group relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/40 font-black'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 border border-emerald-200/60 font-bold'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/60 font-semibold'
                    }`}
                  >
                    <span className="text-xs font-mono leading-none">
                      {s.id}
                    </span>
                    <span className="text-[10px] tracking-tight mt-1 truncate max-w-full hidden md:block">
                      {lang === 'hi' ? slideShortTitles[idx].titleHi : slideShortTitles[idx].titleEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Animated Progress Track */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Slide Presentation Stage (16:9 widescreen feel) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 lg:p-12 min-h-[580px] flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Slide Header */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                    {lang === 'hi' ? currentSlide.hindiBadge || currentSlide.badge : currentSlide.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                    • {lang === 'hi' ? currentSlide.hindiCategory || currentSlide.category : currentSlide.category}
                  </span>
                </div>

                <div className="text-right text-[11px] font-mono text-slate-400">
                  GCET GREATER NOIDA • MINI PROJECT 2026
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-sans">
                  {lang === 'hi' ? currentSlide.hindiTitle || currentSlide.title : currentSlide.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-4xl">
                  {lang === 'hi' ? currentSlide.hindiDescription || currentSlide.description : currentSlide.description}
                </p>
              </div>

              {/* BESPOKE CONTENT FOR EACH SLIDE TYPE */}

              {/* SLIDE 1: COVER & VISION */}
              {currentSlide.id === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(lang === 'hi' ? currentSlide.hindiHighlights || currentSlide.highlights : currentSlide.highlights).map((item, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-2.5 text-xs font-semibold text-emerald-950">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">Project Guide & Mentor</span>
                        <strong className="text-sm font-black text-slate-900">{presentationData.guide.name}</strong>
                        <span className="text-xs text-slate-600 ml-1.5">({presentationData.guide.designation}, Dept of AI & ML)</span>
                      </div>
                      <Award className="w-7 h-7 text-amber-600" />
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-center">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-2 w-full max-w-[260px] shadow-sm">
                      <img src="/gramsathi-mascot.png" alt="GramSathi Mascot" className="w-24 h-24 object-contain mx-auto" />
                      <h4 className="text-base font-black text-slate-900">GramSathi AI</h4>
                      <p className="text-[11px] text-slate-500">Connecting Rural India to Opportunities through AI</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: PROBLEM STATEMENT (Pain Points Grid) */}
              {currentSlide.id === 2 && currentSlide.painPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                  {currentSlide.painPoints.map((point, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 hover:border-rose-300 transition-all space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-xl bg-rose-200 text-rose-800 font-bold flex items-center justify-center text-xs">
                          !
                        </span>
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Problem {i + 1}</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-900 pt-1">
                        {lang === 'hi' ? point.hindiTitle || point.title : point.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {lang === 'hi' ? point.hindiDesc || point.desc : point.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* SLIDE 3: LITERATURE SURVEY & RESEARCH GAP */}
              {currentSlide.id === 3 && currentSlide.surveyPoints && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentSlide.surveyPoints.map((item, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs font-bold text-slate-900">
                            {lang === 'hi' ? item.hindiArea || item.area : item.area}
                          </strong>
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {lang === 'hi' ? item.hindiStatus || item.status : item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {lang === 'hi' ? item.hindiDetail || item.detail : item.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Research Gap Highlight */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>{lang === 'hi' ? 'पहचाना गया अनुसंधान अंतर (Identified Research Gap)' : 'Identified Research Gap'}</span>
                    </span>
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {lang === 'hi' ? currentSlide.hindiResearchGap || currentSlide.researchGap : currentSlide.researchGap}
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 4: PROPOSED SOLUTION (Feature Innovation Cards) */}
              {currentSlide.id === 4 && currentSlide.features && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {currentSlide.features.map((feat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-400 transition-all space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                          {lang === 'hi' ? feat.hindiBadge || feat.badge : feat.badge}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900 pt-1">
                        {lang === 'hi' ? feat.hindiName || feat.name : feat.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {lang === 'hi' ? feat.hindiDesc || feat.desc : feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* SLIDE 5: SYSTEM ARCHITECTURE (Pipeline Component Layers) */}
              {currentSlide.id === 5 && currentSlide.components && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {currentSlide.components.map((comp, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 hover:border-emerald-500 transition-colors shadow-2xs">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="w-6 h-6 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                              {i + 1}
                            </span>
                            <Cpu className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <h4 className="text-xs font-black text-slate-900 leading-tight">
                            {lang === 'hi' ? comp.hindiLayer || comp.layer : comp.layer}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-emerald-800 block mt-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 truncate">
                            {comp.tech}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {lang === 'hi' ? comp.hindiRole || comp.role : comp.role}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900 text-white rounded-2xl text-xs flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">End-to-End Pipeline:</span>
                    <span className="font-mono text-slate-300 text-[11px]">
                      Citizen Voice/Text → Web Speech API → Express API → Gemini LLM → MongoDB & Portals
                    </span>
                  </div>
                </div>
              )}

              {/* SLIDE 6: TECHNOLOGY STACK */}
              {currentSlide.id === 6 && currentSlide.stack && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                  {currentSlide.stack.map((group, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Code2 className="w-4 h-4 text-emerald-700" />
                          <h4 className="text-xs font-black text-slate-900">
                            {lang === 'hi' ? group.hindiCategory || group.category : group.category}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {group.items.map((tech, j) => (
                            <span key={j} className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-800 shadow-2xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200">
                        {lang === 'hi' ? group.hindiDesc || group.desc : group.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* SLIDE 7: EXPECTED IMPACT & UN SDGS */}
              {currentSlide.id === 7 && currentSlide.impacts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {currentSlide.impacts.map((imp, i) => (
                    <div key={i} className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between space-y-2 shadow-2xs">
                      <div>
                        <span className="text-3xl font-black text-emerald-800 tracking-tight block">
                          {imp.metric}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 mt-1">
                          {lang === 'hi' ? imp.hindiLabel || imp.label : imp.label}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {lang === 'hi' ? imp.hindiDesc || imp.desc : imp.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* SLIDE 8: FUTURE SCOPE & ROADMAP */}
              {currentSlide.id === 8 && currentSlide.roadmap && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  {currentSlide.roadmap.map((step, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 hover:border-emerald-400 transition-colors">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 inline-block mb-1">
                          Step {i + 1}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 leading-tight">
                          {lang === 'hi' ? step.hindiPhase || step.phase : step.phase}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {lang === 'hi' ? step.hindiDesc || step.desc : step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* SLIDE 9: ACKNOWLEDGEMENT & CONCLUSION */}
              {currentSlide.id === 9 && (
                <div className="space-y-5 pt-1">
                  <div className="p-6 rounded-3xl bg-emerald-950 text-white space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <Award className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'विशेष आभार एवं कृतज्ञता' : 'Special Acknowledgement & Gratitude'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {lang === 'hi' ? currentSlide.hindiNotes || currentSlide.notes : currentSlide.notes}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {presentationData.team.map((member, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                        <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center mx-auto">
                          {member.name.charAt(0)}
                        </div>
                        <h5 className="text-xs font-black text-slate-900 truncate">{member.name}</h5>
                        <p className="text-[10px] text-slate-500 font-mono">Roll: {member.rollNo}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Slide Stage Footer */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 mt-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Dept of AI & ML, GCET Greater Noida</span>
                <span>•</span>
                <span>Guide: <strong className="text-slate-800 font-bold">Ms. Ritu</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>Keyboard:</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">←</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">→</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">Space</kbd>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    disabled={currentSlideIndex === 0}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white text-slate-700 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    className="px-3.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-30 disabled:hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 3. MODE: PLATFORM MISSION & STORY (Overview View) */}
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

        </div>
      )}

    </div>
  );
}
