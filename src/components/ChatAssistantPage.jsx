import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink, 
  Bot, 
  User, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Copy, 
  Check, 
  Compass, 
  Layers, 
  ChevronRight,
  ArrowRight,
  HelpCircle,
  PhoneCall,
  Search
} from 'lucide-react';
import { voiceService, queryGramSathiAI } from '../utils/aiEngine';

export default function ChatAssistantPage({ 
  lang = 'en', 
  setLang,
  soundEnabled = true, 
  setSoundEnabled,
  apiKey = '', 
  onNavigateSchemes 
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      timestamp: '10:15 AM',
      text: lang === 'hi' 
        ? "पीएम किसान योजना के लिए कौनसे डॉक्यूमेंट्स चाहिए?" 
        : "PM Kisan Yojana ke liye kaunse documents chahiye?"
    },
    {
      id: 2,
      sender: 'bot',
      timestamp: '10:15 AM',
      text: lang === 'hi'
        ? `पीएम किसान सम्मान निधि योजना के लिए आवश्यक मुख्य दस्तावेज:
1. आधार कार्ड (बैंक खाते और एनपीसीआई से लिंक)
2. बैंक खाता विवरण एवं पासबुक (सक्रिय IFSC कोड सहित)
3. खसरा-खतौनी की प्रमाणित नकल (भूलेख/स्वामित्व प्रमाण)
4. आधार से जुड़ा सक्रिय मोबाइल नंबर (ओटीपी सत्यापन हेतु)
5. पासपोर्ट साइज रंगीन फोटो

📌 महत्वपूर्ण: सभी किसान भाइयों को योजना की 19वीं किस्त पाने के लिए e-KYC करवाना अनिवार्य है। आप नजदीकी जन सेवा केंद्र (CSC) या कृषि विभाग कार्यालय में संपर्क कर सकते हैं।`
        : `PM Kisan Samman Nidhi Yojana requires the following verified documents:
1. Aadhaar Card (Linked with bank account & NPCI)
2. Bank Account Details (with active IFSC Code)
3. Land Revenue Record (Khasra/Khatauni/Ownership proof)
4. Active Mobile Number registered with Aadhaar (for OTP verification)
5. Recent Passport Size Photograph

📌 Note: Mandatory e-KYC is required for receiving continuous installment benefits. Visit your local CSC Center or Agriculture Office.`,
      hasLink: true,
      officialLink: 'https://pmkisan.gov.in',
      linkText: lang === 'hi' ? 'आधिकारिक पोर्टल (pmkisan.gov.in)' : 'Official Portal (pmkisan.gov.in)',
      canCheckEligibility: true
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [likedMap, setLikedMap] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const categories = [
    { id: 'all', labelEn: 'All Topics', labelHi: 'सभी विषय', icon: Compass },
    { id: 'schemes', labelEn: 'Schemes', labelHi: 'सरकारी योजनाएं', icon: Layers },
    { id: 'agriculture', labelEn: 'Agriculture', labelHi: 'कृषि व मंडी', icon: Sparkles },
    { id: 'health', labelEn: 'Health & Ayushman', labelHi: 'स्वास्थ्य व इलाज', icon: CheckCircle2 },
  ];

  const suggestedPrompts = [
    {
      id: 1,
      category: 'schemes',
      titleEn: 'PM Kisan Status & Documents',
      titleHi: 'पीएम किसान किस्त व दस्तावेज',
      promptEn: 'PM Kisan Yojana ke liye kaunse documents chahiye aur eKYC kaise karein?',
      promptHi: 'पीएम किसान योजना के लिए कौनसे दस्तावेज चाहिए और eKYC कैसे करें?'
    },
    {
      id: 2,
      category: 'health',
      titleEn: 'Ayushman Card ₹5 Lakh Free Care',
      titleHi: 'आयुष्मान 5 लाख मुफ्त इलाज',
      promptEn: 'Ayushman Bharat Golden Card kaise banwayein aur kahan ilaj hoga?',
      promptHi: 'आयुष्मान भारत कार्ड कैसे बनवाएं और ₹5 लाख का मुफ्त इलाज कैसे मिलेगा?'
    },
    {
      id: 3,
      category: 'schemes',
      titleEn: 'PM Awas Yojana ₹1.20 Lakh Help',
      titleHi: 'पीएम आवास योजना ₹1.20 लाख',
      promptEn: 'PM Awas Yojana Gramin me pakka makan banane ke liye aavedan kaise karein?',
      promptHi: 'पीएम आवास योजना ग्रामीण में पक्का मकान बनाने के लिए सहायता कैसे प्राप्त करें?'
    },
    {
      id: 4,
      category: 'agriculture',
      titleEn: 'Today APMC Mandi Rates',
      titleHi: 'आज का ताजा मंडी भाव',
      promptEn: 'Greater Noida aur najdiki mandiyon me gehun, sarson aur dhaan ka bhav kya hai?',
      promptHi: 'ग्रेटर नोएडा और नजदीकी मंडियों में गेहूं, सरसों और धान का आज का ताजा भाव क्या है?'
    },
    {
      id: 5,
      category: 'agriculture',
      titleEn: 'PM Fasal Bima Claim',
      titleHi: 'फसल बीमा क्लेम प्रक्रिया',
      promptEn: 'Fasal barish ya oley se kharab hone par bima claim kaise lein?',
      promptHi: 'बारिश या ओलावृष्टि से फसल नष्ट होने पर प्रधानमंत्री फसल बीमा क्लेम कैसे करें?'
    },
    {
      id: 6,
      category: 'health',
      titleEn: 'Emergency & Ambulance Toll-Free',
      titleHi: 'आपातकालीन हेल्पलाइन नंबर',
      promptEn: 'Emergency me ambulance aur kisan call center ka toll free number kya hai?',
      promptHi: 'आपातकाल में एम्बुलेंस और किसान सहायता केंद्र का टोल फ्री नंबर क्या है?'
    }
  ];

  const filteredPrompts = activeCategory === 'all' 
    ? suggestedPrompts 
    : suggestedPrompts.filter(p => p.category === activeCategory);

  const getFormattedTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputVal).trim();
    if (!text || isTyping) return;

    setInputVal('');

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      timestamp: getFormattedTime(),
      text
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    try {
      const reply = await queryGramSathiAI(text, lang, apiKey);
      
      const isKisan = text.toLowerCase().includes('kisan') || text.toLowerCase().includes('किसान') || text.toLowerCase().includes('pm kisan');
      const isAyushman = text.toLowerCase().includes('ayushman') || text.toLowerCase().includes('आयुष्मान') || text.toLowerCase().includes('health') || text.toLowerCase().includes('इलाज');
      const isAwas = text.toLowerCase().includes('awas') || text.toLowerCase().includes('आवास') || text.toLowerCase().includes('मकान');
      const isMandi = text.toLowerCase().includes('mandi') || text.toLowerCase().includes('मंडी') || text.toLowerCase().includes('भाव');

      let officialLink = null;
      let linkText = null;

      if (isKisan) {
        officialLink = 'https://pmkisan.gov.in';
        linkText = lang === 'hi' ? 'पीएम किसान पोर्टल खोलें' : 'Open PM Kisan Portal';
      } else if (isAyushman) {
        officialLink = 'https://beneficiary.nha.gov.in';
        linkText = lang === 'hi' ? 'आयुष्मान पोर्टल (NHA)' : 'Ayushman Portal (NHA)';
      } else if (isAwas) {
        officialLink = 'https://pmayg.nic.in';
        linkText = lang === 'hi' ? 'पीएम आवास पोर्टल' : 'PM Awas Portal';
      } else if (isMandi) {
        officialLink = 'https://agmarknet.gov.in';
        linkText = lang === 'hi' ? 'एगमार्कनेट मंडी पोर्टल' : 'Agmarknet Mandi Portal';
      }

      const botMsg = { 
        id: Date.now() + 1, 
        sender: 'bot', 
        timestamp: getFormattedTime(),
        text: reply,
        hasLink: !!officialLink,
        officialLink,
        linkText,
        canCheckEligibility: isKisan || isAyushman || isAwas
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (soundEnabled) {
        voiceService.speak(reply, lang === 'hi' ? 'hi-IN' : 'en-IN');
      }
    } catch (err) {
      console.error("Chat error:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now() + 1, 
          sender: 'bot', 
          timestamp: getFormattedTime(),
          text: lang === 'hi' 
            ? 'क्षमा करें, उत्तर प्राप्त करने में समस्या हुई। कृपया दोबारा प्रयास करें।' 
            : 'Sorry, could not process request right now. Please try again.' 
        }
      ]);
    }
  };

  const handleStartVoice = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      return;
    }

    voiceService.stopSpeaking();
    setIsListening(true);
    voiceService.startListening({
      lang: lang === 'hi' ? 'hi-IN' : 'en-IN',
      onResult: (text) => {
        setIsListening(false);
        if (text && text.trim()) {
          handleSend(text.trim());
        }
      },
      onError: (err) => {
        console.warn("Speech error:", err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const handleNewChat = () => {
    voiceService.stopSpeaking();
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        timestamp: getFormattedTime(),
        text: lang === 'hi'
          ? 'नमस्ते! नया वार्तालाप शुरू हो गया है। आप सरकारी योजनाओं, फसल सलाह, मौसम, मंडी भाव या स्वास्थ्य सेवाओं के बारे में निःसंकोच पूछ सकते हैं।'
          : 'Hello! Starting a new conversation. Feel free to ask about any government schemes, agriculture advice, health benefits, or mandi prices.'
      }
    ]);
    if (inputRef.current) inputRef.current.focus();
  };

  const toggleFeedback = (msgId, type) => {
    setLikedMap((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type
    }));
  };

  const handleCopyMessage = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleSpeakSingle = (msgId, text) => {
    if (speakingMsgId === msgId) {
      voiceService.stopSpeaking();
      setSpeakingMsgId(null);
      return;
    }
    setSpeakingMsgId(msgId);
    voiceService.speak(text, lang === 'hi' ? 'hi-IN' : 'en-IN', () => {
      setSpeakingMsgId(null);
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[660px] max-w-6xl mx-auto animate-fade-in">
      
      {/* 1. Left Sidebar (Desktop): + New Chat & Suggested Quick Inquiries */}
      <div className="hidden md:flex w-80 bg-slate-50 border-r border-slate-200 p-5 flex-col justify-between shrink-0">
        <div className="space-y-5">
          
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'hi' ? 'नया वार्तालाप (+ New Chat)' : '+ New Chat'}</span>
          </button>

          {/* Category Filter Chips */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
              {lang === 'hi' ? 'विषय चुनें' : 'Filter by Category'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-emerald-800 text-white shadow-2xs font-bold'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Prompts List */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
              {lang === 'hi' ? 'त्वरित ग्रामीण प्रश्न (Quick Inquiries)' : 'Suggested Questions'}
            </span>
            <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
              {filteredPrompts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSend(lang === 'hi' ? item.promptHi : item.promptEn)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-900 truncate">
                      {lang === 'hi' ? item.titleHi : item.titleEn}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-700 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Bottom Brand Info */}
        <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>GramSathi AI 2.0</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'hi' ? 'द्विभाषी ग्रामीण संवादी सहायक • जीसीईटी' : 'Bilingual Rural Assistant • GCET AIML'}
          </p>
        </div>
      </div>

      {/* 2. Main Chat Panel */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Modern Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur-xs sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/10 border border-emerald-600/20 flex items-center justify-center shrink-0">
              <img 
                src="/gramsathi-logo.png" 
                alt="GramSathi" 
                className="w-7 h-7 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <Bot className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {lang === 'hi' ? 'ग्रामसाथी एआई संवादी सहायक' : 'Ask GramSathi AI'}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>{lang === 'hi' ? 'सक्रिय' : 'Online'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {lang === 'hi' 
                  ? 'सरकारी योजनाओं, कृषि, स्वास्थ्य और ग्रामीण सेवाओं पर त्वरित समाधान' 
                  : 'Instant guidance on government schemes, agriculture, health & rural services'}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            {setSoundEnabled && (
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Speech Output Active' : 'Speech Output Muted'}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                  soundEnabled 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                    : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{soundEnabled ? (lang === 'hi' ? 'आवाज़ ऑन' : 'Audio On') : (lang === 'hi' ? 'म्यूट' : 'Muted')}</span>
              </button>
            )}

            {/* Language Switch */}
            {setLang && (
              <button
                type="button"
                onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1 transition-colors"
                title="Toggle Language"
              >
                <span>{lang === 'hi' ? 'English' : 'हिंदी'}</span>
              </button>
            )}

            {/* New Chat (Mobile) */}
            <button
              onClick={handleNewChat}
              className="md:hidden p-2 rounded-xl bg-emerald-800 text-white text-xs font-bold flex items-center gap-1"
              title="New Chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Quick-Chips Carousel (Hidden on Desktop) */}
        <div className="md:hidden px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">
            {lang === 'hi' ? 'सुझाव:' : 'Prompts:'}
          </span>
          {suggestedPrompts.slice(0, 4).map((p) => (
            <button
              key={p.id}
              onClick={() => handleSend(lang === 'hi' ? p.promptHi : p.promptEn)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-700 font-semibold whitespace-nowrap shadow-2xs hover:bg-emerald-50 hover:border-emerald-300 text-[11px]"
            >
              {lang === 'hi' ? p.titleHi : p.titleEn}
            </button>
          ))}
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-gradient-to-b from-slate-50/40 via-white to-slate-50/20">
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar */}
              {msg.sender === 'bot' && (
                <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs border border-emerald-700">
                  <Bot className="w-5 h-5 text-emerald-200" />
                </div>
              )}

              {/* Message Content Container */}
              <div
                className={`max-w-[88%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm transition-all ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-br-sm'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-sm space-y-3.5'
                }`}
              >
                {/* Message Header with sender & time */}
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-black/5 opacity-80">
                  <span className="font-bold">
                    {msg.sender === 'user' 
                      ? (lang === 'hi' ? 'आप (नागरिक)' : 'You (Citizen)')
                      : (lang === 'hi' ? 'ग्रामसाथी सहायक (GramSathi AI)' : 'GramSathi AI Assistant')}
                  </span>
                  <span className="text-[10px] font-mono">{msg.timestamp}</span>
                </div>

                {/* Text Body */}
                <div className="whitespace-pre-line font-medium leading-relaxed">
                  {msg.text}
                </div>

                {/* Bot Interactive Actions Toolbar */}
                {msg.sender === 'bot' && (
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    
                    {/* Left Actions: TTS Audio & Copy */}
                    <div className="flex items-center gap-1.5">
                      {/* Speak this answer */}
                      <button
                        type="button"
                        onClick={() => handleSpeakSingle(msg.id, msg.text)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                          speakingMsgId === msg.id
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-900 animate-pulse'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                        title={speakingMsgId === msg.id ? 'Stop Speaking' : 'Read Out Loud (बोलकर सुनाएं)'}
                      >
                        {speakingMsgId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span className="text-[11px] hidden sm:inline">
                          {speakingMsgId === msg.id 
                            ? (lang === 'hi' ? 'रोकें' : 'Stop')
                            : (lang === 'hi' ? 'बोलें' : 'Listen')}
                        </span>
                      </button>

                      {/* Copy Text */}
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[11px] text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px] hidden sm:inline">{lang === 'hi' ? 'कॉपी' : 'Copy'}</span>
                          </>
                        )}
                      </button>

                      {/* Feedback Thumbs */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 ml-1">
                        <button
                          type="button"
                          onClick={() => toggleFeedback(msg.id, 'up')}
                          className={`p-1.5 hover:bg-slate-100 transition-colors ${likedMap[msg.id] === 'up' ? 'text-emerald-700 bg-emerald-100' : 'text-slate-400'}`}
                          title="Helpful"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFeedback(msg.id, 'down')}
                          className={`p-1.5 hover:bg-slate-100 transition-colors border-l border-slate-200 ${likedMap[msg.id] === 'down' ? 'text-rose-700 bg-rose-100' : 'text-slate-400'}`}
                          title="Not helpful"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Right Actions: Direct Links & Check Eligibility */}
                    <div className="flex items-center gap-2">
                      {msg.canCheckEligibility && onNavigateSchemes && (
                        <button
                          type="button"
                          onClick={onNavigateSchemes}
                          className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-bold text-xs hover:bg-emerald-100 transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <span>{lang === 'hi' ? 'पात्रता जांचें' : 'Check Eligibility'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                      {msg.hasLink && msg.officialLink && (
                        <a
                          href={msg.officialLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 transition-all transform hover:scale-102"
                        >
                          <span>{msg.linkText || (lang === 'hi' ? 'आधिकारिक पोर्टल लिंक' : 'Official Portal Link')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                  </div>
                )}

              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <User className="w-5 h-5 text-emerald-200" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs border border-emerald-700">
                <Bot className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-3xl rounded-bl-sm shadow-xs flex items-center gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="font-semibold text-emerald-900 ml-1">
                  {lang === 'hi' ? 'ग्रामसाथी जानकारी जुटा रहा है...' : 'GramSathi is thinking...'}
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* 3. Bottom Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2">
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 sm:gap-3 bg-slate-50 border border-slate-200 p-1.5 sm:p-2 rounded-2xl focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all shadow-inner"
          >
            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isTyping}
              placeholder={
                isListening
                  ? (lang === 'hi' ? '🎙️ सुन रहा हूँ... अपनी बात कहिए' : '🎙️ Listening... speak your query')
                  : (lang === 'hi' ? 'यहाँ अपना प्रश्न लिखें... (उदा. पीएम किसान, मंडी भाव, आयुष्मान कार्ड)' : 'Type your question here... (e.g., PM Kisan, Mandi rates, Ayushman card)')
              }
              className="flex-1 px-3 sm:px-4 py-2.5 text-xs sm:text-sm bg-transparent font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
            />

            {/* Mic / Voice Input Button */}
            <button
              type="button"
              onClick={handleStartVoice}
              className={`p-2.5 sm:p-3 rounded-xl transition-all shadow-xs flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak via Voice Recognition (बोलकर पूछें)'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 sm:p-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 disabled:hover:bg-emerald-800 text-white rounded-xl shadow-md transition-all shrink-0 flex items-center justify-center transform active:scale-95"
              title="Send Message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Privacy & Official Data Disclaimer */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-2">
            <span>
              {lang === 'hi' 
                ? 'सरकारी पोर्टल्स (pmkisan, nha, upbhulekh) पर आधारित आधिकारिक जानकारी' 
                : 'Verified rural guidance based on official GOI & State portals'}
            </span>
            <span className="hidden sm:inline">GCET Greater Noida • CSE(AIML)</span>
          </div>

        </div>

      </div>

    </div>
  );
}
