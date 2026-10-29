import React, { useState, useEffect } from 'react';
import { 
  User, 
  Globe, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  LogIn,
  CheckCircle2, 
  Sparkles,
  Save
} from 'lucide-react';

export default function ProfileSettingsPage({ 
  lang, 
  setLang, 
  loggedInUser, 
  setLoggedInUser,
  onLogout,
  onOpenLogin
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'language', 'location', 'notification', 'privacy'
  const [name, setName] = useState(loggedInUser?.name || '');
  const [selectedLanguage, setSelectedLanguage] = useState(lang === 'hi' ? 'Hindi' : 'English');
  const [stateName, setStateName] = useState('Uttar Pradesh');
  const [district, setDistrict] = useState('Greater Noida');
  const [occupation, setOccupation] = useState('Student');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (loggedInUser?.name) {
      setName(loggedInUser.name);
    }
  }, [loggedInUser]);

  const sidebarLinks = [
    { id: 'profile', labelEn: 'Profile', labelHi: 'प्रोफ़ाइल (Profile)', icon: User },
    { id: 'language', labelEn: 'Language', labelHi: 'भाषा (Language)', icon: Globe },
    { id: 'location', labelEn: 'Location', labelHi: 'स्थान (Location)', icon: MapPin },
    { id: 'notification', labelEn: 'Notification', labelHi: 'सूचनाएं (Notification)', icon: Bell },
    { id: 'privacy', labelEn: 'Privacy & Security', labelHi: 'गोपनीयता व सुरक्षा', icon: ShieldCheck },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setLang(selectedLanguage === 'Hindi' ? 'hi' : 'en');
    setLoggedInUser({
      name: name.trim() || (lang === 'hi' ? 'नागरिक' : 'Citizen'),
      role: `${occupation} (${district})`
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col md:flex-row min-h-[580px] max-w-5xl mx-auto animate-fade-in">
      
      {/* Left Sidebar matching Screen 6 */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          
          {/* User Avatar Card */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-lg shadow-xs">
              {name.trim() ? name.trim().charAt(0).toUpperCase() : <User className="w-5 h-5 text-emerald-100" />}
            </div>
            <div className="truncate">
              <h4 className="text-sm font-black text-slate-900 truncate">
                {name.trim() || (lang === 'hi' ? 'अतिथि नागरिक' : 'Guest Citizen')}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {loggedInUser ? loggedInUser.role || occupation : (lang === 'hi' ? 'लॉगिन नहीं किया' : 'Not Logged In')}
              </p>
            </div>
          </div>

          {/* Navigation Links matching Screen 6 */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1.5 md:space-y-1 pb-1 md:pb-0 no-scrollbar">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isSelected = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`whitespace-nowrap md:w-full text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-700'
                      : 'text-slate-600 hover:text-slate-900 bg-white md:bg-transparent hover:bg-white border border-slate-200/80 md:border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{lang === 'hi' ? link.labelHi : link.labelEn}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Logout or Login Button */}
        {loggedInUser ? (
          <button
            onClick={onLogout}
            className="mt-6 w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors border border-transparent hover:border-rose-200"
          >
            <LogOut className="w-4 h-4" />
            <span>{lang === 'hi' ? 'लॉगआउट (Logout)' : 'Logout'}</span>
          </button>
        ) : (
          <button
            onClick={onOpenLogin}
            className="mt-6 w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <LogIn className="w-4 h-4" />
            <span>{lang === 'hi' ? 'लॉगिन करें (Citizen Login)' : 'Citizen Login'}</span>
          </button>
        )}
      </div>

      {/* Right Form Pane matching Screen 6 */}
      <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between bg-white">
        
        <div>
          {/* Pane Header */}
          <div className="border-b border-slate-100 pb-5 mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {lang === 'hi' ? 'मेरी प्रोफ़ाइल (My Profile)' : 'My Profile'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {lang === 'hi' 
                ? 'अपनी व्यक्तिगत जानकारी और ग्रामीण प्राथमिकताओं को प्रबंधित करें' 
                : 'Manage your information and preferences'}
            </p>
          </div>

          {/* Save Success Alert */}
          {isSaved && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2.5 text-xs font-bold animate-fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{lang === 'hi' ? 'आपकी प्राथमिकताएं सफलतापूर्वक सुरक्षित कर ली गई हैं!' : 'Preferences and profile saved successfully!'}</span>
            </div>
          )}

          {/* Form Fields matching Screen 6 */}
          <form id="profile-form" onSubmit={handleSave} className="space-y-5 max-w-xl">
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'hi' ? 'मूल विवरण (Basic Information)' : 'Basic Information'}
            </h3>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'hi' ? 'नाम (वैकल्पिक) / Name (Optional):' : 'Name (Optional):'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'hi' ? 'उदा. रामेश्वर यादव / आयुष्मान सिंह' : 'e.g. Rameshwar Yadav / Ayushmaan Singh'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50 focus:bg-white"
              />
            </div>

            {/* Language & State (Grid 2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'पसंदीदा भाषा (Select Language):' : 'Select Language:'}
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="English">English</option>
                  <option value="Bhojpuri">भोजपुरी (Bhojpuri - Dialect)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'राज्य (State):' : 'State:'}
                </label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Punjab">Punjab</option>
                </select>
              </div>
            </div>

            {/* District & Occupation (Grid 2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'जिला (District):' : 'District:'}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Gautam Buddha Nagar">Gautam Buddha Nagar</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Bulandshahr">Bulandshahr</option>
                  <option value="Meerut">Meerut</option>
                  <option value="Aligarh">Aligarh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'व्यवसाय (Occupation):' : 'Occupation (Optional):'}
                </label>
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Student">Student (विद्यार्थी)</option>
                  <option value="Farmer">Farmer (किसान)</option>
                  <option value="Self Help Group (SHG) Member">SHG Member (महिला स्वयं सहायता)</option>
                  <option value="Rural Artisan">Artisan / Small Business (कारीगर)</option>
                  <option value="Agricultural Laborer">Agricultural Laborer (खेतिहर मजदूर)</option>
                </select>
              </div>
            </div>

            {/* Save Changes Button matching Screen 6 */}
            <div className="pt-3">
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Save className="w-4 h-4" />
                <span>{lang === 'hi' ? 'बदलाव सुरक्षित करें (Save Changes)' : 'Save Changes'}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Footer info note */}
        <div className="pt-8 text-[11px] text-slate-400 border-t border-slate-100 mt-6 flex items-center justify-between">
          <span>GCET Greater Noida • CSE(AIML)</span>
          <span>GramSathi AI Data Protection</span>
        </div>

      </div>

    </div>
  );
}
