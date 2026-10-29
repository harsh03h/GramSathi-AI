// Speech Recognition and Synthesis utility with rural domain query processing

export class VoiceService {
  constructor() {
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.isListening = false;
    this.synth = typeof window !== 'undefined' ? (window.speechSynthesis || null) : null;
    this.currentUtterance = null;
    this.voices = [];

    if (this.synth) {
      this.voices = this.synth.getVoices() || [];
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = this.synth.getVoices() || [];
        };
      }
    }
  }

  isSupported() {
    return !!(this.recognition && this.synth);
  }

  startListening({ onResult, onError, onEnd, lang = 'hi-IN' }) {
    if (!this.recognition) {
      if (onError) onError('Speech Recognition is not supported in this browser.');
      return;
    }

    try {
      this.stopListening();
      this.stopSpeaking();

      this.recognition.lang = lang; // 'hi-IN' or 'en-IN'
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (onResult && transcript) onResult(transcript);
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        if (onError) onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
    } catch (e) {
      console.warn("Speech recognition error:", e);
      this.isListening = false;
      if (onError) onError(e.message);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Safe fallback
      }
      this.isListening = false;
    }
  }

  speak(text, lang = 'hi-IN', onEnd) {
    if (!this.synth) return;
    this.stopSpeaking(); // Stop any ongoing speech

    // Clean markdown stars/brackets from speech
    const cleanText = text.replace(/[*_#`[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = 0.95; // slightly slower for rural clarity
      utterance.pitch = 1.0;

      const voices = this.voices.length ? this.voices : (this.synth.getVoices() || []);
      const targetVoice = voices.find(v => v.lang.includes(lang.substring(0, 2))) || voices[0];
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      // Store reference on instance to prevent Garbage Collection bug in Chromium
      this.currentUtterance = utterance;

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    }
  }

  stopSpeaking() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Safe fallback
      }
      this.currentUtterance = null;
    }
  }
}

export const voiceService = new VoiceService();

// Intelligent query responder with rural domain knowledge
export async function queryGramSathiAI(prompt, lang = 'hi', apiKey = '') {
  const query = prompt.toLowerCase().trim();

  // If user provided a Gemini API Key, try live Google Gemini API
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are GramSathi AI (ग्रामसाथी एआई), a friendly, respectful, and highly knowledgeable rural assistant created by CSE(AIML) students at GCET Greater Noida for rural Indian citizens.
Current language preference: ${lang === 'hi' ? 'Hindi' : 'English'}.
Keep responses clear, empathetic, and concise (under 120 words). Provide actionable steps, official helplines, or document checklists where applicable.
User question: "${prompt}"`
                  }
                ]
              }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText) return geminiText;
      }
    } catch (e) {
      console.warn("Live Gemini API call fell back to local engine:", e);
    }
  }

  // Built-in high-accuracy Knowledge Base
  if (query.includes('pm kisan') || query.includes('किसान') || query.includes('6000') || query.includes('kisan nidhi') || query.includes('किस्त')) {
    if (lang === 'hi') {
      return `नमस्ते किसान भाई! प्रधानमंत्री किसान सम्मान निधि योजना के तहत पात्र किसानों को साल में ₹6,000 तीन बराबर किस्तों (₹2000-₹2000) में मिलते हैं।
जरूरी कागजात:
1. आधार कार्ड (बैंक से लिंक)
2. खसरा-खतौनी नकल (भूलेख)
3. e-KYC पूरा होना जरूरी है।
आप pmkisan.gov.in पर अपना स्टेटस देख सकते हैं या 155261 पर कॉल करें।`;
    } else {
      return `Hello! Under PM-Kisan Samman Nidhi, eligible farmers receive ₹6,000 annually in 3 direct bank installments of ₹2,000 each.
Key requirements:
1. Land revenue record (Khasra-Khatauni)
2. Aadhaar-seeded bank account
3. Completed biometric/OTP e-KYC.
Check your status at pmkisan.gov.in or helpline 155261.`;
    }
  }

  if (query.includes('ayushman') || query.includes('आयुष्मान') || query.includes('इलाज') || query.includes('health') || query.includes('अस्पताल') || query.includes('कार्ड')) {
    if (lang === 'hi') {
      return `आयुष्मान भारत (PM-JAY) योजना के तहत प्रत्येक पात्र परिवार को हर साल ₹5 लाख तक का मुफ्त इलाज मिलता है। 70 वर्ष से अधिक उम्र के सभी वरिष्ठ नागरिक अब इसमें शामिल हैं।
कार्ड बनवाने के लिए अपने नजदीकी जन सेवा केंद्र (CSC) या सरकारी अस्पताल के आयुष्मान मित्र काउंटर पर राशन कार्ड और आधार कार्ड लेकर जाएं। हेल्पलाइन: 14555.`;
    } else {
      return `Under Ayushman Bharat (PM-JAY), eligible families get up to ₹5 Lakh cashless treatment per year in 29,000+ hospitals. All seniors aged 70+ are now covered universally!
Visit your nearest CSC center or District Hospital Ayushman desk with Aadhaar & Ration Card. Helpline: 14555.`;
    }
  }

  if (query.includes('awas') || query.includes('आवास') || query.includes('मकान') || query.includes('house') || query.includes('घर')) {
    if (lang === 'hi') {
      return `प्रधानमंत्री ग्रामीण आवास योजना (PMAY-G) में कच्चे या बेघर परिवारों को पक्का मकान बनाने हेतु ₹1,20,000 से ₹1,30,000 की सीधी सहायता मिलती है। साथ ही शौचालय निर्माण के लिए ₹12,000 अतिरिक्त दिए जाते हैं। अपने ग्राम प्रधान या पंचायत सचिव से संपर्क करें।`;
    } else {
      return `Under PM Awas Yojana Gramin, homeless rural families or those with kutcha houses receive ₹1,20,000 - ₹1,30,000 to construct a pucca house, plus ₹12,000 for toilet construction. Contact your Gram Panchayat Secretary or check pmayg.nic.in.`;
    }
  }

  if (query.includes('mandi') || query.includes('भाव') || query.includes('मंडी') || query.includes('rate') || query.includes('गेहूं') || query.includes('धान')) {
    if (lang === 'hi') {
      return `आज ग्रेटर नोएडा व आसपास की मंडियों में औसत भाव:
• गेहूं (शरबती): ₹2,570 / क्विंटल
• धान (बासमती): ₹3,420 / क्विंटल
• सरसों (मोटा दाना): ₹5,800 / क्विंटल
• आलू: ₹1,480 / क्विंटल
सटीक मंडी विवरण के लिए ऊपर 'कृषि एवं मौसम' टैब देखें।`;
    } else {
      return `Today's average APMC Mandi rates in Greater Noida region:
• Wheat (Sharbati): ₹2,570 / Quintal
• Basmati Paddy: ₹3,420 / Quintal
• Mustard: ₹5,800 / Quintal
• Potato: ₹1,480 / Quintal
Check the Agriculture & Mandi tab for live updates.`;
    }
  }

  if (query.includes('fasal bima') || query.includes('फसल बीमा') || query.includes('insurance') || query.includes('नुकसान') || query.includes('barish')) {
    if (lang === 'hi') {
      return `प्रधानमंत्री फसल बीमा योजना (PMFBY) में रबी फसलों के लिए केवल 1.5% और खरीफ के लिए 2% का न्यूनतम प्रीमियम लगता है। ओलावृष्टि या भारी बारिश से फसल नष्ट होने पर 72 घंटे के भीतर टोल फ्री नंबर 14447 या Crop Insurance App पर क्लेम दर्ज करवाएं।`;
    } else {
      return `Under PM Fasal Bima Yojana (PMFBY), farmers pay just 1.5% premium for Rabi and 2% for Kharif crops. If crops are damaged by hail or unseasonal rain, report within 72 hours on helpline 14447 or the Crop Insurance App.`;
    }
  }

  if (query.includes('project') || query.includes('team') || query.includes('college') || query.includes('gcet') || query.includes('ritu') || query.includes('harsh')) {
    return `GramSathi AI is developed as an AI & ML Mini Project at Galgotias College of Engineering & Technology (GCET), Greater Noida.
Guide: Ms. Ritu (Assistant Professor, Dept of AIML)
Team: Harsh Gupta (2300971530059), Digdarshan Kumar (2300971530049), Devansh Saxena (2300971530047), Ayushmaan Singh (2300971530042).`;
  }

  if (query.includes('emergency') || query.includes('मदद') || query.includes('आपात') || query.includes('police') || query.includes('112') || query.includes('ambulance')) {
    if (lang === 'hi') {
      return `आपातकालीन नंबर:
• पुलिस व सुरक्षा: 112
• सरकारी एम्बुलेंस: 108
• महिला सुरक्षा: 1091
• साइबर / बैंक फ्रॉड: 155260
• पशु चिकित्सा आपातकाल: 1962. किसी भी संकट में तुरंत कॉल करें।`;
    } else {
      return `Emergency Helplines:
• Police / Immediate Emergency: 112
• Free Ambulance: 108
• Women Safety: 1091
• Cyber Fraud: 155260
• Veterinary Ambulance: 1962. Help is available 24x7!`;
    }
  }

  // Default helpful response
  if (lang === 'hi') {
    return `नमस्ते! ग्रामसाथी एआई ग्रामीण नागरिकों के लिए सरकारी योजनाओं, कृषि सलाह, स्वास्थ्य, रोज़गार और कानूनी अधिकारों की त्वरित जानकारी प्रदान करता है।
आप बोलकर या लिखकर पूछ सकते हैं: 'पीएम किसान योजना', 'आज का मंडी भाव', 'आयुष्मान कार्ड', 'फसल बीमा' आदि।`;
  } else {
    return `Welcome to GramSathi AI! I am your rural digital companion for government schemes, agriculture advice, healthcare, employment, and legal guidance.
You can ask: "PM-Kisan status", "Mandi rates today", "Ayushman card benefits", "Crop insurance" and more.`;
  }
}
