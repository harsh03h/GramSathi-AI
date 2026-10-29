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
  CheckCircle2
} from 'lucide-react';
import { voiceService, queryGramSathiAI } from '../utils/aiEngine';

export default function ChatAssistantPage({ lang, soundEnabled, apiKey, onNavigateSchemes }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: lang === 'hi' 
        ? "पीएम किसान योजना के लिए कौनसे डॉक्यूमेंट्स चाहिए?" 
        : "PM Kisan Yojana ke liye kaunse documents chahiye?"
    },
    {
      id: 2,
      sender: 'bot',
      text: lang === 'hi'
        ? `पीएम किसान योजना के लिए आमतौर पर ये दस्तावेज आवश्यक होते हैं:
1. आधार कार्ड (बैंक खाते से लिंक)
2. बैंक खाता विवरण (IFSC कोड सहित)
3. खसरा-खतौनी नकल (भूलेख/स्वामित्व प्रमाण)
4. आधार से जुड़ा सक्रिय मोबाइल नंबर
5. पासपोर्ट साइज फोटो

आप अपने नजदीकी जन सेवा केंद्र (CSC) या कृषि विभाग कार्यालय में जाकर आवेदन कर सकते हैं।`
        : `PM Kisan Yojana ke liye aam taur par ye documents required hote hain:
1. Aadhaar Card (Bank account linked)
2. Bank Account Details (with IFSC Code)
3. Land Records (Khasra/Khatauni/Ownership documents)
4. Mobile Number linked with Aadhaar
5. Passport Size Photo

Aap apne najdiki CSC kendra ya krishi vibhag karyalaya me apply kar sakte hain.`,
      hasLink: true,
      officialLink: 'https://pmkisan.gov.in',
      linkText: lang === 'hi' ? 'आधिकारिक पोर्टल लिंक' : 'View Official Link'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [likedMap, setLikedMap] = useState({});

  const chatEndRef = useRef(null);

  const recentChats = [
    { id: 1, title: 'PM Kisan Yojana', promptHi: 'पीएम किसान योजना के नियम', promptEn: 'PM Kisan Yojana documents' },
    { id: 2, title: 'Ayushman Bharat', promptHi: 'आयुष्मान भारत में 5 लाख का इलाज', promptEn: 'Ayushman Bharat 5 Lakh health card' },
    { id: 3, title: 'Nearest hospital', promptHi: 'नजदीकी अस्पताल और प्राथमिक स्वास्थ्य केंद्र', promptEn: 'Nearest hospital and CHC center' },
    { id: 4, title: 'Scholarship for 12th', promptHi: '12वीं के बाद छात्रवृत्ति कैसे पाएं?', promptEn: 'Post-matric scholarship process' },
    { id: 5, title: 'Wheat crop advice', promptHi: 'गेहूं की बुवाई और माहू कीट का उपचार', promptEn: 'Wheat crop sowing and pest advice' },
    { id: 6, title: 'Job opportunities', promptHi: 'मनरेगा रोज़गार और हुनर प्रशिक्षण', promptEn: 'MGNREGA wage job card and PMKVY' },
    { id: 7, title: 'Birth certificate process', promptHi: 'जन्म प्रमाण पत्र कैसे बनवाएं?', promptEn: 'Birth certificate process in village' }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userText = inputVal.trim();
    setInputVal('');

    const newMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    try {
      const reply = await queryGramSathiAI(userText, lang, apiKey);
      const botMsg = { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: reply,
        hasLink: userText.toLowerCase().includes('kisan') || userText.toLowerCase().includes('ayushman'),
        officialLink: userText.toLowerCase().includes('ayushman') ? 'https://beneficiary.nha.gov.in' : 'https://pmkisan.gov.in',
        linkText: lang === 'hi' ? 'आधिकारिक पोर्टल लिंक' : 'View Official Link'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (soundEnabled) {
        voiceService.speak(reply, lang === 'hi' ? 'hi-IN' : 'en-IN');
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: 'Error fetching reply. Please try again.' }
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
        setInputVal(text);
        setTimeout(() => {
          const form = document.getElementById('chat-page-form');
          if (form) form.requestSubmit();
        }, 100);
      },
      onError: () => setIsListening(false),
      onEnd: () => setIsListening(false)
    });
  };

  const handleNewChat = () => {
    voiceService.stopSpeaking();
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: lang === 'hi'
          ? 'नमस्ते! नया वार्तालाप शुरू हो गया है। आप सरकारी योजनाओं, स्वास्थ्य, फसल सलाह या रोज़गार के बारे में पूछ सकते हैं।'
          : 'Hello! Starting a new conversation. Feel free to ask about any government schemes, agriculture, health or legal rights.'
      }
    ]);
  };

  const handleSelectRecent = (chat) => {
    const text = lang === 'hi' ? chat.promptHi : chat.promptEn;
    setInputVal(text);
    setTimeout(() => {
      const form = document.getElementById('chat-page-form');
      if (form) form.requestSubmit();
    }, 100);
  };

  const toggleFeedback = (msgId, type) => {
    setLikedMap((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col md:flex-row min-h-[640px] max-w-6xl mx-auto animate-fade-in">
      
      {/* Left Sidebar (Desktop): + New Chat & Recent Chats matching Screen 3 */}
      <div className="hidden md:flex w-72 bg-slate-50 border-r border-slate-200 p-4 flex-col justify-between shrink-0">
        <div className="space-y-4">
          
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 text-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'hi' ? 'नया वार्तालाप (+ New Chat)' : '+ New Chat'}</span>
          </button>

          {/* Recent Chats List */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">
              {lang === 'hi' ? 'हालिया प्रश्न (Recent Chats)' : 'Recent Chats'}
            </span>
            <div className="space-y-1">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectRecent(chat)}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white text-xs font-semibold text-slate-700 hover:text-emerald-900 hover:shadow-2xs transition-all flex items-center gap-2 group"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Footer info */}
        <div className="p-3 bg-white rounded-2xl border border-slate-200/80 text-[11px] text-slate-500">
          <span className="font-bold text-slate-800 block mb-0.5">GramSathi AI 2.0</span>
          <span>{lang === 'hi' ? 'द्विभाषी ग्रामीण संवादी सहायक' : 'Bilingual Rural Assistant'}</span>
        </div>
      </div>

      {/* Right Main Chat Window matching Screen 3 */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{lang === 'hi' ? 'ग्रामसाथी एआई से पूछें' : 'Ask GramSathi AI'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'hi' 
                ? 'सरकारी योजनाओं, सेवाओं और अधिकारों पर त्वरित व्यक्तिगत मार्गदर्शन प्राप्त करें' 
                : 'Get instant guidance on government schemes, services and more'}
            </p>
          </div>

          <button
            onClick={handleNewChat}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Sprout className="w-5 h-5 text-emerald-200" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none space-y-3'
                }`}
              >
                <div>{msg.text}</div>

                {/* Bot Message Additional Interactive Controls matching Screen 3 */}
                {msg.sender === 'bot' && (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    
                    {/* Feedback thumbs */}
                    <div className="flex items-center gap-1 text-slate-400">
                      <button
                        onClick={() => toggleFeedback(msg.id, 'up')}
                        className={`p-1.5 rounded-lg hover:bg-slate-100 ${likedMap[msg.id] === 'up' ? 'text-emerald-600 bg-emerald-50' : ''}`}
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleFeedback(msg.id, 'down')}
                        className={`p-1.5 rounded-lg hover:bg-slate-100 ${likedMap[msg.id] === 'down' ? 'text-rose-600 bg-rose-50' : ''}`}
                        title="Not helpful"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Official Link Button matching Screen 3 */}
                    {msg.hasLink && (
                      <a
                        href={msg.officialLink || 'https://pmkisan.gov.in'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 transition-all"
                      >
                        <span>{msg.linkText || (lang === 'hi' ? 'आधिकारिक पोर्टल लिंक' : 'View Official Link')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sprout className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-3xl rounded-bl-none shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar matching Screen 3 */}
        <form
          id="chat-page-form"
          onSubmit={handleSend}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 sm:gap-3"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              isListening
                ? (lang === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... speak now')
                : (lang === 'hi' ? 'यहाँ अपना प्रश्न लिखें... (या माइक दबाकर बोलें)' : 'Type your message here... (or click mic to speak)')
            }
            className={`flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border font-medium focus:outline-none transition-all ${
              isListening
                ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500'
            }`}
          />

          {/* Mic Button */}
          <button
            type="button"
            onClick={handleStartVoice}
            className={`p-3 rounded-2xl transition-all shadow-sm ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
            }`}
            title="Click to speak (Voice Recognition)"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="p-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 disabled:hover:bg-emerald-800 text-white rounded-2xl shadow-md transition-all shrink-0"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
}
