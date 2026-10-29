import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Clock, 
  Navigation, 
  Building2, 
  Hospital, 
  GraduationCap, 
  Compass, 
  Search,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function LocationServicesPage({ lang }) {
  const [selectedCategory, setSelectedCategory] = useState('Hospitals');
  const [activePlaceId, setActivePlaceId] = useState(1);

  const categories = [
    { id: 'Hospitals', en: 'Hospitals', hi: 'अस्पताल व स्वास्थ्य केंद्र' },
    { id: 'GovtOffices', en: 'Government Offices', hi: 'सरकारी कार्यालय' },
    { id: 'CSCCenters', en: 'CSC Centers', hi: 'जन सेवा केंद्र (CSC)' },
    { id: 'Schools', en: 'Schools & Colleges', hi: 'विद्यालय व कॉलेज' },
    { id: 'Others', en: 'Others', hi: 'अन्य सेवाएं' },
  ];

  const places = [
    {
      id: 1,
      category: 'Hospitals',
      nameEn: 'District Civil Hospital Gautam Buddha Nagar',
      nameHi: 'जिला संयुक्त चिकित्सालय गौतम बुद्ध नगर',
      distance: '3.2 km',
      hoursEn: 'Open 24 hours',
      hoursHi: '24 घंटे खुला',
      addressEn: 'Sector 39, Link Road, Greater Noida Expressway',
      addressHi: 'सेक्टर 39, लिंक रोड, ग्रेटर नोएडा एक्सप्रेसवे',
      phone: '0120-2443001',
      badgeEn: 'ICU & Emergency',
      badgeHi: 'आपातकालीन व आईसीयू',
      mapCoords: { x: 42, y: 35 }
    },
    {
      id: 2,
      category: 'Hospitals',
      nameEn: 'Primary Health Center (PHC) Dankaur',
      nameHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) दनकौर',
      distance: '5.1 km',
      hoursEn: '9:00 AM - 5:00 PM',
      hoursHi: 'प्रातः 9:00 - सायं 5:00 बजे',
      addressEn: 'Near Tehsil Road, Dankaur, Greater Noida',
      addressHi: 'तहसील रोड के पास, दनकौर, ग्रेटर नोएडा',
      phone: '0120-2895412',
      badgeEn: 'Free OPD & Medicines',
      badgeHi: 'मुफ्त ओपीडी व दवाएं',
      mapCoords: { x: 68, y: 62 }
    },
    {
      id: 3,
      category: 'Hospitals',
      nameEn: 'Community Health Center (CHC) Bhangel',
      nameHi: 'सामुदायिक स्वास्थ्य केंद्र (CHC) भंगेल',
      distance: '8.4 km',
      hoursEn: '9:00 AM - 5:00 PM (Emergency 24x7)',
      hoursHi: 'प्रातः 9:00 - सायं 5:00 बजे (आपातकाल 24x7)',
      addressEn: 'Main Road, Bhangel, Greater Noida Zone',
      addressHi: 'मुख्य मार्ग, भंगेल, ग्रेटर नोएडा क्षेत्र',
      phone: '0120-2569871',
      badgeEn: 'Ayushman Desk',
      badgeHi: 'आयुष्मान मित्र काउंटर',
      mapCoords: { x: 28, y: 75 }
    },
    {
      id: 4,
      category: 'GovtOffices',
      nameEn: 'Tehsil & Sub-Divisional Magistrate (SDM) Office',
      nameHi: 'तहसील एवं उप-जिलाधिकारी (SDM) कार्यालय',
      distance: '4.2 km',
      hoursEn: '10:00 AM - 5:00 PM (Mon-Sat)',
      hoursHi: 'प्रातः 10:00 - सायं 5:00 (सोम-शनि)',
      addressEn: 'Collectorate Complex, Surajpur, Greater Noida',
      addressHi: 'कलेक्ट्रेट परिसर, सूरजपुर, ग्रेटर नोएडा',
      phone: '0120-2560044',
      badgeEn: 'Land Records & Revenue',
      badgeHi: 'भूलेख व राजस्व समाधान',
      mapCoords: { x: 55, y: 25 }
    },
    {
      id: 5,
      category: 'CSCCenters',
      nameEn: 'Digital India CSC Jan Seva Kendra',
      nameHi: 'डिजिटल इंडिया जन सेवा केंद्र (CSC)',
      distance: '1.2 km',
      hoursEn: 'Open Now (8:00 AM - 8:00 PM)',
      hoursHi: 'खुला है (प्रातः 8:00 - रात्रि 8:00)',
      addressEn: 'Near Gram Panchayat Bhawan, Greater Noida Rural',
      addressHi: 'ग्राम पंचायत भवन के पास, ग्रेटर नोएडा ग्रामीण',
      phone: '9871234567',
      badgeEn: 'Aadhaar & Scheme Apply',
      badgeHi: 'आधार व योजना ऑनलाइन आवेदन',
      mapCoords: { x: 50, y: 50 }
    },
    {
      id: 6,
      category: 'Schools',
      nameEn: 'Jawahar Navodaya Vidyalaya Gautam Buddha Nagar',
      nameHi: 'जवाहर नवोदय विद्यालय गौतम बुद्ध नगर',
      distance: '6.5 km',
      hoursEn: '8:00 AM - 2:30 PM',
      hoursHi: 'प्रातः 8:00 - दोपहर 2:30 बजे',
      addressEn: 'Dhoom Manikpur, Dadri / Greater Noida Rural',
      addressHi: 'धूम मानिकपुर, दादरी / ग्रेटर नोएडा ग्रामीण',
      phone: '0120-2673201',
      badgeEn: 'Free CBSE Boarding',
      badgeHi: 'मुफ्त आवासीय शिक्षा',
      mapCoords: { x: 78, y: 30 }
    }
  ];

  const filteredPlaces = places.filter((p) => {
    if (selectedCategory === 'Others') return true;
    return p.category === selectedCategory;
  });

  const activePlace = places.find((p) => p.id === activePlaceId) || places[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header matching Screen 5 */}
      <div className="text-center space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <MapPin className="w-8 h-8 text-emerald-700" />
          <span>{lang === 'hi' ? 'नजदीकी सेवाएं (Nearest Services)' : 'Nearest Services'}</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
          {lang === 'hi'
            ? 'अपने गाँव के आसपास अस्पताल, सरकारी कार्यालय, जन सेवा केंद्र (CSC) और स्कूल खोजें'
            : 'Find nearby hospitals, government offices, CSC centers and more'}
        </p>
      </div>

      {/* Category Filter Chips matching Screen 5 */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-700'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {lang === 'hi' ? cat.hi : cat.en}
          </button>
        ))}
      </div>

      {/* Split Layout: List on Left, Map on Right matching Screen 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Place Cards (7 cols on lg) */}
        <div className="lg:col-span-6 space-y-3">
          {filteredPlaces.map((place) => {
            const isSelected = activePlaceId === place.id;
            return (
              <div
                key={place.id}
                onClick={() => setActivePlaceId(place.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-1.5 inline-block">
                      {lang === 'hi' ? place.badgeHi : place.badgeEn}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                      {lang === 'hi' ? place.nameHi : place.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{lang === 'hi' ? place.addressHi : place.addressEn}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-emerald-700 block">
                      {place.distance}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{lang === 'hi' ? place.hoursHi : place.hoursEn}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                  <a
                    href={`tel:${place.phone}`}
                    className="text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{place.phone}</span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(place.nameEn)}`, '_blank');
                    }}
                    className="text-slate-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'hi' ? 'दिशानिर्देश (Directions)' : 'Directions'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Stylized Visual Map matching Screen 5 (5 cols on lg) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-5 sticky top-24">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'ग्रेटर नोएडा ग्रामीण जीपीएस मानचित्र' : 'Greater Noida Rural Map View'}</span>
            </span>
            <span className="text-xs font-bold text-emerald-700">
              Live Location: GCET Campus
            </span>
          </div>

          {/* Interactive Stylized Vector Map Canvas */}
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
            
            {/* SVG Background Roads, Green Parks, Rivers */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f1f5f9" />
              
              {/* Green Park / Agricultural Area */}
              <path d="M 0 0 L 150 0 L 120 180 L 0 120 Z" fill="#dcfce7" opacity="0.7" />
              <path d="M 280 200 L 450 180 L 480 350 L 250 360 Z" fill="#dcfce7" opacity="0.6" />

              {/* Water River / Canal */}
              <path d="M 0 250 Q 180 220, 240 280 T 500 240" fill="none" stroke="#bae6fd" strokeWidth="18" opacity="0.8" />

              {/* Major Expressways & Rural Arteries */}
              <line x1="0" y1="140" x2="500" y2="140" stroke="#cbd5e1" strokeWidth="12" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#ffffff" strokeWidth="6" strokeDasharray="8 6" />

              <line x1="220" y1="0" x2="220" y2="450" stroke="#cbd5e1" strokeWidth="12" />
              <line x1="220" y1="0" x2="220" y2="450" stroke="#ffffff" strokeWidth="6" strokeDasharray="8 6" />

              {/* Secondary Village Link Roads */}
              <path d="M 50 0 Q 120 100, 220 140 T 420 280" fill="none" stroke="#e2e8f0" strokeWidth="6" />
              <path d="M 220 140 Q 320 80, 480 90" fill="none" stroke="#e2e8f0" strokeWidth="6" />
            </svg>

            {/* Interactive Location Map Pins matching Screen 5 */}
            {places.map((place) => {
              const isSelected = activePlaceId === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => setActivePlaceId(place.id)}
                  style={{ left: `${place.mapCoords.x}%`, top: `${place.mapCoords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                >
                  <div className={`p-2 rounded-full transition-all shadow-md flex items-center justify-center ${
                    isSelected
                      ? 'bg-rose-600 text-white ring-4 ring-rose-200 scale-125 animate-bounce-subtle'
                      : 'bg-emerald-700 text-white hover:scale-115'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Pin Tooltip */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-slate-900/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-lg border border-slate-700 transition-all ${
                    isSelected ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100 scale-95 pointer-events-none'
                  }`}>
                    <span>{lang === 'hi' ? place.nameHi.split(' ')[0] : place.nameEn.split(' ')[0]} ({place.distance})</span>
                  </div>
                </div>
              );
            })}

            {/* User Location Pulse: GCET Greater Noida */}
            <div className="absolute left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-200 animate-ping"></span>
              <span className="bg-blue-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md mt-1">
                You Are Here (GCET)
              </span>
            </div>

          </div>

          {/* Active Place Selected Preview Box */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                {lang === 'hi' ? 'चयनित स्थान विवरण:' : 'Selected Facility:'}
              </span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">
                {lang === 'hi' ? activePlace.nameHi : activePlace.nameEn}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {lang === 'hi' ? activePlace.hoursHi : activePlace.hoursEn} • {activePlace.distance} away
              </p>
            </div>

            <a
              href={`tel:${activePlace.phone}`}
              className="p-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm flex items-center justify-center shrink-0"
              title="Call Helpline"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
