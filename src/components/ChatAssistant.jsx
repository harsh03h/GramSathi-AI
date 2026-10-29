import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Key, 
  RotateCcw,
  Bot,
  User,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { voiceService, queryGramSathiAI } from '../utils/aiEngine';

export default function ChatAssistant({ 
  lang, 
  soundEnabled, 
  apiKey, 
  setApiKey, 
  onOpenVoiceModal 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'hi' 
        ? "नमस्ते! मैं ग्रामसाथी एआई हूँ। आप मुझसे सरकारी योजनाओं, आज के मंडी भाव, आयुष्मान कार्ड, फसल सुरक्षा या मनरेगा के बारे में कुछ भी पूछ सकते हैं।" 
        : "Namaste! I am GramSathi AI. You can ask me about government schemes, today's mandi prices, Ayushman card, crop protection, or MGNREGA."
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputQuery.trim() || isTyping) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    // Append user message
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await queryGramSathiAI(userText, lang, apiKey);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: response };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (soundEnabled) {
        voiceService.speak(response, lang === 'hi' ? 'hi-IN' : 'en-IN');
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: "Error connecting to AI service. Please try again." }
      ]);
    }
  };

  const handleQuickQuestion = (questionText) => {
    setInputQuery(questionText);
    setTimeout(() => {
      const form = document.getElementById('chat-input-form');
      if (form) form.requestSubmit();
    }, 100);
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-full shadow-2xl shadow-emerald-700/40 flex items-center gap-2.5 transition-all transform hover:scale-105 group"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs sm:text-sm font-semibold">
            {lang === 'hi' ? 'साथी एआई से पूछें' : 'Ask Sathi AI'}
          </span>
        </button>
      )}

      {/* Chat Window Drawer / Floating Box */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>GramSathi AI</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded">Online</span>
                </h3>
                <p className="text-[10px] text-emerald-100">
                  {lang === 'hi' ? 'ग्रामीण जन सेवा साथी' : 'Rural Assistance Assistant'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                title="Configure Gemini API Key"
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
                  apiKey ? 'bg-emerald-500/30 text-amber-300' : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gemini API Key Drawer */}
          {showKeyModal && (
            <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs">
              <span className="font-bold text-amber-900 block mb-1">
                Optional: Google Gemini API Key
              </span>
              <p className="text-amber-800 text-[11px] mb-2">
                GramSathi AI has built-in rural domain knowledge. You can also paste your Gemini API key for live generative intelligence.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 p-1.5 bg-white border border-amber-300 rounded text-xs"
                />
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded text-xs"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2 bg-slate-100/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              lang === 'hi' ? 'पीएम किसान' : 'PM Kisan',
              lang === 'hi' ? 'मंडी भाव' : 'Mandi Rates',
              lang === 'hi' ? 'आयुष्मान कार्ड' : 'Ayushman Card',
              lang === 'hi' ? 'फसल बीमा' : 'Crop Insurance',
              lang === 'hi' ? 'GCET टीम' : 'Team Info'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(chip)}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-[11px] font-semibold rounded-lg border border-slate-200 shadow-2xs transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            id="chat-input-form"
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={onOpenVoiceModal}
              title="Voice Input (Tap to Speak)"
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'अपना प्रश्न यहाँ लिखें...' : 'Ask GramSathi AI...'}
              className="flex-1 p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
