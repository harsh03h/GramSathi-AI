import React from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Code2, 
  Sparkles, 
  Award, 
  ExternalLink, 
  Building2, 
  FolderGit2, 
  Cpu
} from 'lucide-react';
import { presentationData } from '../data/presentationData';

export default function TeamSection({ lang }) {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* College & Department Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Building2 className="w-4 h-4" />
            <span>GALGOTIAS COLLEGE OF ENGINEERING & TECHNOLOGY (GCET), GREATER NOIDA</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {lang === 'hi' ? presentationData.hindiDepartment : presentationData.department}
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            {lang === 'hi' ? 'मिनी प्रोजेक्ट:' : 'Mini Project:'}{' '}
            <strong className="text-emerald-400">GramSathi AI</strong> —{' '}
            {lang === 'hi' ? presentationData.hindiSubtitle : presentationData.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
              {lang === 'hi' ? 'सत्र: 2026-2027' : 'Session: 2026-2027'}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
              {lang === 'hi' ? 'शाखा: बी.टेक सीएसई (आर्टिफिशियल इंटेलिजेंस एवं मशीन लर्निंग)' : 'Branch: B.Tech CSE (Artificial Intelligence & Machine Learning)'}
            </span>
          </div>
        </div>
      </div>

      {/* Guide Spotlight Card */}
      <div className="bg-white rounded-3xl border border-amber-200 shadow-md p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/30">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 shrink-0">
          <Award className="w-12 h-12 stroke-[1.8]" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'परियोजना मार्गदर्शक एवं मेंटर' : 'PROJECT GUIDE & MENTOR'}</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            {lang === 'hi' ? presentationData.guide.hindiName : presentationData.guide.name}
          </h3>
          <p className="text-sm font-semibold text-emerald-800">
            {lang === 'hi' ? presentationData.guide.hindiDesignation : presentationData.guide.designation}
          </p>
          <p className="text-xs text-slate-600">
            {lang === 'hi' ? presentationData.guide.hindiDept : presentationData.guide.dept}
          </p>
          <p className="text-xs text-slate-500 pt-1 italic">
            {lang === 'hi' 
              ? '"ग्रामीण एआई मॉडलिंग, तकनीकी मार्गदर्शन और रणनीतिक परियोजना मूल्यांकन के लिए निरंतर मार्गदर्शन हेतु हार्दिक आभार।"' 
              : '"Sincere gratitude for continuous mentorship, technical insight into rural AI modeling, and strategic project evaluation."'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center shrink-0">
          <span className="text-xs text-slate-500 font-semibold block mb-0.5">
            {lang === 'hi' ? 'मूल्यांकन चरण' : 'Evaluation Phase'}
          </span>
          <span className="text-sm font-bold text-slate-900">
            {lang === 'hi' ? 'मिनी प्रोजेक्ट वाइवा' : 'Mini Project Viva'}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            {lang === 'hi' ? 'सत्यापित एवं स्वीकृत' : 'Verified & Approved'}
          </span>
        </div>
      </div>

      {/* Team Members Grid */}
      <div>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'छात्र डेवलपर टीम • CSE(AIML)' : 'STUDENT DEVELOPERS • CSE(AIML)'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'hi' ? 'परियोजना निर्माता छात्र' : 'Project Team Members'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {presentationData.team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                  {member.name.charAt(0)}
                </div>

                <h4 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {lang === 'hi' ? member.hindiName || member.name : member.name}
                </h4>

                <div className="my-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block border border-amber-200">
                  {lang === 'hi' ? 'रोल नं:' : 'Roll:'} {member.rollNo}
                </div>

                <p className="text-xs font-semibold text-slate-700 mt-2">
                  {lang === 'hi' ? member.hindiRole || member.role : member.role}
                </p>

                <p className="text-[11px] text-slate-500 mt-0.5">
                  {member.branch}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>GCET Greater Noida</span>
                <Code2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Project Architecture & Code Structure Summary */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              {lang === 'hi' ? 'वाइवा प्रस्तुति हेतु मुख्य तकनीकी विशेषताएं' : 'Technical Highlights for Viva Defense'}
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">React 18 • Vite 6 • Tailwind CSS • Web Speech API</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <strong className="text-emerald-400 block mb-1">
              {lang === 'hi' ? 'आवाज़-आधारित समावेशन:' : 'Voice First Accessibility:'}
            </strong>
            <p className="text-slate-300">
              {lang === 'hi' 
                ? 'वेब स्पीच एपीआई (एसटीटी और टीटीएस) का उपयोग, जिससे ग्रामीण नागरिक बिना टाइप किए सीधे हिंदी में बोलकर और सुनकर बातचीत कर सकते हैं।' 
                : 'Integrates Web Speech API STT and TTS so illiterate rural users can speak and listen in conversational Hindi and English without typing.'}
            </p>
          </div>
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <strong className="text-amber-400 block mb-1">
              {lang === 'hi' ? 'स्मार्ट पात्रता इंजन:' : 'Smart Eligibility Engine:'}
            </strong>
            <p className="text-slate-300">
              {lang === 'hi' 
                ? 'भूमि, वार्षिक आय, वर्ग और पारिवारिक स्थिति के आधार पर सरकारी कल्याणकारी योजनाओं का स्वतः व सटीक मिलान।' 
                : 'Multi-variable algorithmic matcher mapping land size, annual income, caste, and age against central/state welfare schemes.'}
            </p>
          </div>
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <strong className="text-sky-400 block mb-1">
              {lang === 'hi' ? 'मंडी एवं स्वास्थ्य सेवाएं:' : 'Mandi & Healthcare Triage:'}
            </strong>
            <p className="text-slate-300">
              {lang === 'hi' 
                ? 'लाइव एपीएमसी मंडी भाव, जन औषधि सस्ती दवाएं (70-80% बचत), आपातकालीन नंबर और यूपी भूलेख ऑनलाइन मार्गदर्शन।' 
                : 'APMC market price updates, Jan Aushadhi generic medicines lookup (saving 70-80%), and UP Bhulekh land records guidance.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
