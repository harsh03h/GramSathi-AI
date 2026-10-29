import React, { useState } from 'react';
import { 
  CloudSun, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Bug, 
  Wheat, 
  Calculator, 
  AlertCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Droplets,
  Wind
} from 'lucide-react';
import { mandiData } from '../data/mandiData';

export default function MandiWeatherWidget({ lang }) {
  const [activeTab, setActiveTab] = useState('mandi'); // 'mandi', 'weather', 'pest', 'calculator'
  
  // Fertilizer Calculator State
  const [calcCrop, setCalcCrop] = useState('wheat');
  const [calcAcres, setCalcAcres] = useState(2);

  // Fertilizer recommendations per acre
  const fertilizerRules = {
    wheat: { urea: 2.5, dap: 1.0, mop: 0.5 },
    paddy: { urea: 2.2, dap: 1.0, mop: 0.6 },
    mustard: { urea: 1.5, dap: 0.8, mop: 0.3 }
  };

  const currentDose = fertilizerRules[calcCrop];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
              <Wheat className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'कृषि मार्गदर्शन एवं मंडी भाव' : 'Agriculture & Mandi Intelligence'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'hi' ? 'मंडी भाव, मौसम व फसल सुरक्षा' : 'Live Mandi Prices, Weather & Crop Health'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-xl">
              {lang === 'hi' 
                ? 'ग्रेटर नोएडा व पश्चिमी उत्तर प्रदेश की मंडियों के आज के ताज़ा भाव, 5-दिवसीय मौसम पूर्वानुमान और फसल रोग निवारण।' 
                : 'Real-time market rates from Greater Noida & Western UP APMC mandis, localized 5-day agro-meteorological advisories.'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/25 backdrop-blur-sm p-2 rounded-2xl border border-white/10 text-xs">
            <MapPin className="w-4 h-4 text-amber-400" />
            <div>
              <span className="font-bold block">{mandiData.currentMandi}</span>
              <span className="text-amber-200/80 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" /> {mandiData.lastUpdated}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'mandi', labelEn: 'Mandi Rates', labelHi: 'मंडी भाव' },
            { id: 'weather', labelEn: 'Weather Advisory', labelHi: 'मौसम सलाह' },
            { id: 'pest', labelEn: 'Crop Doctor (Pests)', labelHi: 'कीट व रोग निवारण' },
            { id: 'calculator', labelEn: 'Fertilizer Calculator', labelHi: 'खाद (उर्वरक) कैलकुलेटर' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-md ring-2 ring-white/30'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {lang === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Mandi Rates */}
      {activeTab === 'mandi' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'hi' ? 'दैनिक कृषि उत्पाद मंडी भाव' : 'Daily APMC Commodity Prices'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'hi' ? 'सभी दरें प्रति क्विंटल (100 किग्रा) में हैं' : 'All rates are stated per Quintal (100 kg)'}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-center">
              ● {lang === 'hi' ? 'लाइव मंडी सत्र सक्रिय' : 'Live Trading Active'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-bold">
                  <th className="py-3 px-4">{lang === 'hi' ? 'फसल / किस्म' : 'Crop / Variety'}</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'मॉडल भाव (औसत)' : 'Modal Price'}</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'न्यूनतम - अधिकतम' : 'Min - Max Range'}</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'सरकारी MSP' : 'Govt MSP'}</th>
                  <th className="py-3 px-3 text-right">{lang === 'hi' ? 'दैनिक रुझान' : 'Trend'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {mandiData.commodities.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{item.name}</span>
                      <span className="text-[11px] text-slate-500">{item.variety}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-base font-extrabold text-emerald-700">₹{item.modalPrice}</span>
                      <span className="text-[11px] text-slate-500 block">/{item.unit}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold text-slate-800">
                        ₹{item.msp}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {item.trend === 'up' && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-xs">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {item.change}
                        </span>
                      )}
                      {item.trend === 'down' && (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-full text-xs">
                          <TrendingDown className="w-3.5 h-3.5" />
                          {item.change}
                        </span>
                      )}
                      {item.trend === 'stable' && (
                        <span className="inline-flex items-center gap-1 text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded-full text-xs">
                          <Minus className="w-3.5 h-3.5" />
                          {item.change}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Weather & Agricultural Advisory */}
      {activeTab === 'weather' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100">
            <div>
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">
                {mandiData.weatherForecast.location}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-4xl font-black text-slate-900">{mandiData.weatherForecast.temp}</span>
                <div>
                  <span className="font-bold text-slate-800 block">{mandiData.weatherForecast.condition}</span>
                  <span className="text-xs text-slate-500">
                    {lang === 'hi' ? 'हवा में नमी:' : 'Humidity:'} {mandiData.weatherForecast.humidity}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>{lang === 'hi' ? 'बारिश की संभावना:' : 'Rain:'} <strong>{mandiData.weatherForecast.rainChance}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                <Wind className="w-4 h-4 text-teal-600" />
                <span>{lang === 'hi' ? 'हवा:' : 'Wind:'} <strong>{mandiData.weatherForecast.windSpeed}</strong></span>
              </div>
            </div>
          </div>

          {/* Farming Advisory Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                {lang === 'hi' ? 'कृषि मौसम विज्ञानी सलाह (Agromet Advisory):' : 'Agromet Advisory for Farmers:'}
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium mt-1 leading-relaxed">
                {lang === 'hi' ? mandiData.weatherForecast.hindiAdvisory : mandiData.weatherForecast.advisory}
              </p>
            </div>
          </div>

          {/* 5-Day Outlook */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'hi' ? 'आगामी 5 दिनों का मौसम' : '5-Day Agro Forecast'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {mandiData.weatherForecast.days.map((day, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-700 block">{day.day}</span>
                  <CloudSun className="w-6 h-6 text-amber-500 mx-auto my-2" />
                  <span className="text-xs font-extrabold text-slate-900 block">{day.temp}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{day.condition}</span>
                  <span className="text-[10px] text-sky-700 font-semibold block mt-1">💧 {day.rain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Crop Doctor (Pests & Solutions) */}
      {activeTab === 'pest' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'hi' ? 'फसल सुरक्षा एवं कीट-रोग निवारण' : 'Crop Doctor & Pest Management'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'hi' 
                ? 'लक्षण पहचानें और कृषि वैज्ञानिकों द्वारा अनुशंसित उपाय अपनाएं।' 
                : 'Identify crop symptoms and apply certified organic or chemical treatments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {mandiData.pestAdvisory.map((pest) => (
              <div key={pest.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {pest.crop}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2.5 mb-1.5 flex items-center gap-1.5">
                    <Bug className="w-4 h-4 text-rose-600" />
                    <span>{pest.symptom}</span>
                  </h4>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <span className="font-bold text-amber-900 block mb-1">
                    {lang === 'hi' ? 'अनुशंसित उपचार:' : 'Recommended Treatment:'}
                  </span>
                  <p className="text-slate-800 leading-relaxed">
                    {lang === 'hi' ? pest.hindiSolution : pest.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Fertilizer Calculator */}
      {activeTab === 'calculator' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'hi' ? 'खेत के आकार अनुसार खाद कैलकुलेटर' : 'Acre-Wise Fertilizer Dosage Calculator'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'hi' 
                ? 'फसल और एकड़ दर्ज करें, GramSathi AI यूरिया, डीएपी (DAP) और पोटाश (MOP) की सटीक बोरियों की संख्या बताएगा।' 
                : 'Calculates the scientific dosage of Urea, DAP, and Potash (MOP) required for your farm.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'hi' ? 'फसल चुनें:' : 'Select Crop:'}
              </label>
              <select
                value={calcCrop}
                onChange={(e) => setCalcCrop(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="wheat">{lang === 'hi' ? 'गेहूं (Wheat)' : 'Wheat'}</option>
                <option value="paddy">{lang === 'hi' ? 'धान (Paddy/Rice)' : 'Paddy'}</option>
                <option value="mustard">{lang === 'hi' ? 'सरसों (Mustard)' : 'Mustard'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'hi' ? 'खेत का क्षेत्रफल (एकड़ में):' : 'Land Area (in Acres):'}
              </label>
              <input
                type="number"
                min="0.5"
                max="50"
                step="0.5"
                value={calcAcres}
                onChange={(e) => setCalcAcres(parseFloat(e.target.value) || 1)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Urea (यूरिया - 45kg Bag)
              </span>
              <span className="text-3xl font-black text-emerald-700 block my-1">
                {(currentDose.urea * calcAcres).toFixed(1)} <span className="text-sm font-normal">Bags</span>
              </span>
              <span className="text-[11px] text-emerald-900 font-medium">
                {lang === 'hi' ? 'बुवाई व सिंचाई के समय 2 बार में दें' : 'Split in 2 top-dressings'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                DAP (डीएपी - 50kg Bag)
              </span>
              <span className="text-3xl font-black text-amber-700 block my-1">
                {(currentDose.dap * calcAcres).toFixed(1)} <span className="text-sm font-normal">Bags</span>
              </span>
              <span className="text-[11px] text-amber-900 font-medium">
                {lang === 'hi' ? 'बुवाई के समय आखिरी जुताई में दें' : 'Apply as basal dose at sowing'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">
                MOP (पोटाश - 50kg Bag)
              </span>
              <span className="text-3xl font-black text-sky-700 block my-1">
                {(currentDose.mop * calcAcres).toFixed(1)} <span className="text-sm font-normal">Bags</span>
              </span>
              <span className="text-[11px] text-sky-900 font-medium">
                {lang === 'hi' ? 'दाने भरने व चमक के लिए उपयोगी' : 'Improves grain weight & resilience'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
