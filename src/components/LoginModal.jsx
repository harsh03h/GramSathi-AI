import React, { useState } from 'react';
import { X, User, Phone, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, lang, onLoginSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoggedInUser({
      name: lang === 'hi' ? 'रामेश्वर यादव' : 'Rameshwar Yadav',
      role: lang === 'hi' ? 'किसान (ग्रेटर नोएडा)' : 'Farmer (Greater Noida)',
      phone: phoneNumber || '9876543210'
    });
    if (onLoginSuccess) {
      onLoginSuccess({
        name: lang === 'hi' ? 'रामेश्वर यादव' : 'Rameshwar Yadav',
        role: lang === 'hi' ? 'किसान (ग्रेटर नोएडा)' : 'Farmer (Greater Noida)'
      });
    }
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleQuickDemoUser = (userProfile) => {
    setLoggedInUser(userProfile);
    if (onLoginSuccess) onLoginSuccess(userProfile);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {lang === 'hi' ? 'ग्रामसाथी नागरिक लॉगिन' : 'GramSathi Citizen Login'}
              </h3>
              <p className="text-xs text-emerald-100">
                {lang === 'hi' ? 'अपने मोबाइल नंबर से सुरक्षित प्रवेश करें' : 'Login securely with Mobile OTP'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {loggedInUser ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce-subtle" />
              <h4 className="text-lg font-bold text-slate-900">
                {lang === 'hi' ? 'लॉगिन सफल!' : 'Login Successful!'}
              </h4>
              <p className="text-xs text-slate-600">
                {lang === 'hi' ? 'स्वागत है' : 'Welcome back'}, <strong>{loggedInUser.name}</strong> ({loggedInUser.role})
              </p>
            </div>
          ) : (
            <>
              {/* Phone OTP Form */}
              <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर दर्ज करें:' : 'Enter Mobile Number:'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      disabled={otpSent}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'hi' ? 'ओटीपी (OTP) दर्ज करें (उदा. 1234):' : 'Enter 4-Digit OTP (e.g. 1234):'}
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="1234"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-center tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all mt-2"
                >
                  {otpSent 
                    ? (lang === 'hi' ? 'सत्यापित करें व लॉगिन करें' : 'Verify & Continue') 
                    : (lang === 'hi' ? 'ओटीपी भेजें (Send OTP)' : 'Send OTP')}
                </button>
              </form>

              {/* Quick 1-Click Demo Profiles */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center">
                  {lang === 'hi' ? 'या डेमो प्रोफाइल से एक-क्लिक में लॉगिन करें:' : 'Or 1-Click Demo Citizen Profiles:'}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickDemoUser({
                      name: lang === 'hi' ? 'रामेश्वर यादव' : 'Rameshwar Yadav',
                      role: lang === 'hi' ? 'किसान (ग्रेटर नोएडा)' : 'Farmer (Greater Noida)'
                    })}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all group"
                  >
                    <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-800">
                      {lang === 'hi' ? 'रामेश्वर यादव' : 'Rameshwar Yadav'}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {lang === 'hi' ? 'किसान (2.5 एकड़ भूमि)' : 'Farmer (2.5 Acres)'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoUser({
                      name: lang === 'hi' ? 'सुनीता देवी' : 'Sunita Devi',
                      role: lang === 'hi' ? 'महिला स्वयं सहायता समूह' : 'SHG Member'
                    })}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-left transition-all group"
                  >
                    <span className="text-xs font-bold text-slate-900 block group-hover:text-amber-800">
                      {lang === 'hi' ? 'सुनीता देवी' : 'Sunita Devi'}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {lang === 'hi' ? 'लखपति दीदी सदस्या' : 'Lakhpati Didi SHG'}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? '100% सुरक्षित एवं निःशुल्क ग्रामीण मंच' : '100% Secure & Free Citizen Platform'}</span>
        </div>

      </div>
    </div>
  );
}
