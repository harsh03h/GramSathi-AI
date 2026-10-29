import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  ArrowRight,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { voiceService, queryGramSathiAI } from '../utils/aiEngine';

export default function VoiceAssistantModal({ isOpen, onClose, lang, soundEnabled, apiKey }) {
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [responseLink, setResponseLink] = useState(null);
  const [responseLinkText, setResponseLinkText] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const quickPrompts = lang === 'hi' ? [
    "पीएम किसान के 6000 रुपये कैसे मिलेंगे?",
    "आज मंडी में गेहूं का क्या भाव है?",
    "आयुष्मान कार्ड से 5 लाख का इलाज कैसे मिलेगा?",
    "फसल में कीट लग गया है क्या करें?",
    "मनरेगा में काम पाने का क्या नियम है?"
  ] : [
    "How to get PM Kisan 6000 annual installment?",
    "What is today's wheat APMC mandi price?",
    "How to get Ayushman Bharat 5 Lakh health card?",
    "How to manage aphids and pest in mustard?",
    "What are MGNREGA job card rules?"
  ];

  useEffect(() => {
    if (!isOpen) {
      voiceService.stopListening();
      voiceService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
      setIsThinking(false);
      setTranscript('');
      setAiResponse('');
      setResponseLink(null);
      setResponseLinkText(null);
      setErrorMessage('');
    } else {
      // Auto-trigger prompt
      handleStartListening();
    }

    return () => {
      voiceService.stopListening();
      voiceService.stopSpeaking();
    };
  }, [isOpen]);

  const handleStartListening = () => {
    setErrorMessage('');
    setTranscript('');
    setAiResponse('');
    setResponseLink(null);
    setResponseLinkText(null);
    voiceService.stopSpeaking();
    setIsSpeaking(false);

    const speechLang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    voiceService.startListening({
      lang: speechLang,
      onResult: (text) => {
        setIsListening(false);
        setTranscript(text);
        processUserQuery(text);
      },
      onError: (err) => {
        setIsListening(false);
        setErrorMessage(
          lang === 'hi' 
            ? 'आवाज़ रिकॉर्ड करने में समस्या आई। कृपया नीचे दिए गए उदाहरणों में से चुनें या लिखकर पूछें।' 
            : 'Voice input error or permission denied. Please choose a sample query below or type.'
        );
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    setIsListening(true);
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const processUserQuery = async (queryText) => {
    setIsThinking(true);
    setResponseLink(null);
    setResponseLinkText(null);
    try {
      const response = await queryGramSathiAI(queryText, lang, apiKey);
      const replyText = typeof response === 'object' && response?.text 
        ? response.text 
        : (typeof response === 'string' ? response : String(response || ''));

      const officialLink = typeof response === 'object' && response?.officialLink 
        ? response.officialLink 
        : null;

      const linkText = typeof response === 'object' && response?.linkText 
        ? response.linkText 
        : (officialLink ? (lang === 'hi' ? 'आधिकारिक पोर्टल लिंक' : 'Official Portal Link') : null);

      setAiResponse(replyText);
      setResponseLink(officialLink);
      setResponseLinkText(linkText);
      setIsThinking(false);

      if (soundEnabled) {
        setIsSpeaking(true);
        const speechLang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        voiceService.speak(replyText, speechLang, () => {
          setIsSpeaking(false);
        });
      }
    } catch (err) {
      setIsThinking(false);
      setErrorMessage(
        lang === 'hi' 
          ? 'उत्तर प्राप्त करने में समस्या हुई। कृपया दोबारा प्रयास करें।' 
          : 'Failed to process response. Please try again.'
      );
    }
  };

  const handleSelectQuickPrompt = (promptText) => {
    voiceService.stopListening();
    setIsListening(false);
    setTranscript(promptText);
    processUserQuery(promptText);
  };

  const handleStopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {lang === 'hi' ? 'ग्रामसाथी आवाज़ सहायक' : 'GramSathi Voice Assistant'}
              </h3>
              <p className="text-xs text-emerald-100">
                {lang === 'hi' ? 'बोलकर पूछें • अपनी भाषा में उत्तर पाएं' : 'Speak naturally in Hindi or English'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Audio & Interactive Area */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col items-center text-center">
          
          {/* Animated Microphone Orb */}
          <div className="my-4 relative">
            {/* Pulsing rings when listening */}
            {isListening && (
              <>
                <span className="absolute -inset-4 rounded-full bg-emerald-500/20 animate-ping"></span>
                <span className="absolute -inset-8 rounded-full bg-emerald-500/10 animate-pulse"></span>
              </>
            )}

            {isSpeaking && (
              <span className="absolute -inset-4 rounded-full bg-amber-500/20 animate-pulse"></span>
            )}

            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white transition-all transform shadow-xl ${
                isListening
                  ? 'bg-rose-500 ring-4 ring-rose-200 scale-105'
                  : isSpeaking
                  ? 'bg-amber-500 ring-4 ring-amber-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 ring-4 ring-emerald-100'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 animate-bounce-subtle" />
              ) : isSpeaking ? (
                <Volume2 className="w-10 h-10 animate-pulse" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>

          {/* Status Text / Waveform */}
          <div className="h-10 flex items-center justify-center gap-1.5 my-2">
            {isListening ? (
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full animate-soundwave-1"></span>
                <span className="w-1.5 h-10 bg-emerald-500 rounded-full animate-soundwave-2"></span>
                <span className="w-1.5 h-7 bg-emerald-600 rounded-full animate-soundwave-3"></span>
                <span className="w-1.5 h-9 bg-emerald-400 rounded-full animate-soundwave-4"></span>
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full animate-soundwave-5"></span>
                <span className="text-sm font-semibold text-emerald-700 ml-2">
                  {lang === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... Speak now'}
                </span>
              </div>
            ) : isThinking ? (
              <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <span>{lang === 'hi' ? 'उत्तर तैयार कर रहा हूँ...' : 'Thinking & analyzing...'}</span>
              </div>
            ) : isSpeaking ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 bg-amber-500 rounded-full animate-soundwave-1"></span>
                  <span className="w-1.5 bg-amber-600 rounded-full animate-soundwave-2"></span>
                  <span className="w-1.5 bg-amber-500 rounded-full animate-soundwave-3"></span>
                </div>
                <span className="text-sm font-semibold text-amber-800">
                  {lang === 'hi' ? 'आवाज़ में उत्तर बोल रहा हूँ...' : 'Speaking answer aloud...'}
                </span>
                <button
                  onClick={handleStopSpeaking}
                  className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-md ml-1"
                >
                  Stop
                </button>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500">
                {lang === 'hi' 
                  ? 'माइक दबाएं और अपनी समस्या या योजना का नाम बोलें' 
                  : 'Tap microphone and ask about schemes, crops, health'}
              </p>
            )}
          </div>

          {/* Transcript / Result Box */}
          {transcript && (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-3 text-left">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-slate-400" />
                <span>{lang === 'hi' ? 'आपका प्रश्न' : 'Your Query'}:</span>
              </div>
              <p className="text-sm font-medium text-slate-800 italic">"{transcript}"</p>
            </div>
          )}

          {/* AI Response Output */}
          {aiResponse && (
            <div className="w-full bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-left mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {lang === 'hi' ? 'ग्रामसाथी सलाह:' : 'GramSathi AI Guidance:'}
                </span>
                {isSpeaking ? (
                  <button 
                    onClick={handleStopSpeaking}
                    className="text-[11px] text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <VolumeX className="w-3 h-3" /> Stop Voice
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsSpeaking(true);
                      voiceService.speak(aiResponse, lang === 'hi' ? 'hi-IN' : 'en-IN', () => setIsSpeaking(false));
                    }}
                    className="text-[11px] text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Listen Again
                  </button>
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                {aiResponse}
              </div>

              {responseLink && (
                <div className="mt-3 pt-2.5 border-t border-emerald-200/80 flex items-center justify-end">
                  <a
                    href={responseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-transform hover:scale-102"
                  >
                    <span>{responseLinkText || (lang === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Portal')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl mb-3 text-left">
              {errorMessage}
            </div>
          )}

          {/* Quick Clickable Suggestions */}
          <div className="w-full mt-2 text-left">
            <span className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              {lang === 'hi' ? 'या इन प्रश्नों पर सीधे टैप करें:' : 'Or tap a popular question:'}
            </span>
            <div className="flex flex-col gap-1.5 mt-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuickPrompt(q)}
                  className="text-left text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200/80 p-2.5 rounded-xl transition-all flex items-center justify-between group"
                >
                  <span className="text-slate-700 font-medium group-hover:text-emerald-900">{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>{lang === 'hi' ? 'भाषा: हिंदी / English समर्थित' : 'Supports Hindi & English Voice'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
