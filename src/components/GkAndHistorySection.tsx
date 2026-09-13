import React, { useState } from 'react';
import { COMPREHENSIVE_GK_LIST, GkFullItem } from '../data/gkMegaDatabase';
import { MEGA_GK_52 } from '../data/educationData';
import { speakLangText } from '../utils/audioSynth';
import { getTranslatedGk, getUiString } from '../utils/translationHelper';
import { getLanguageByCode } from '../data/languages';
import {
  Landmark, Volume2, Search, BookOpen, Award, Maximize2,
  Minimize2, ArrowLeft, Waves, Trees, MapPin, Flag, UserCheck, Clock, CheckCircle2
} from 'lucide-react';

interface GkAndHistorySectionProps {
  currentLanguage?: string;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

export const GkAndHistorySection: React.FC<GkAndHistorySectionProps> = ({
  currentLanguage = 'hi',
  isFullScreen = false,
  onToggleFullScreen
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [internalFullScreen, setInternalFullScreen] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const langInfo = getLanguageByCode(currentLanguage);

  // Combine both comprehensive expanded database and classic constitution/presidents
  const allAvailableItems: GkFullItem[] = [
    ...COMPREHENSIVE_GK_LIST,
    ...MEGA_GK_52.map(item => ({
      ...item,
      category: item.category === 'Rashtrapati' ? 'Rashtrapati' : item.category
    }))
  ];

  const categoryTabs = [
    { id: 'All', label: '🌟 सभी (All GK)', icon: Landmark },
    { id: 'Nadiyan', label: '🌊 नदियां (Rivers)', icon: Waves },
    { id: 'National Parks', label: '🐅 नेशनल पार्क', icon: Trees },
    { id: 'Rajya Rajdhani', label: '🏛️ राज्य व राजधानी', icon: MapPin },
    { id: 'Rashtriya Chinh', label: '🇮🇳 राष्ट्रीय चिन्ह', icon: Flag },
    { id: 'Mahan Vyakti', label: '🎖️ महान व्यक्तित्व', icon: UserCheck },
    { id: 'Itihaas Saal', label: '⏳ इतिहास के साल', icon: Clock },
    { id: 'Samvidhan', label: '📜 संविधान व राष्ट्र', icon: BookOpen },
    { id: 'Rashtrapati', label: '👑 राष्ट्रपति सूची', icon: Award }
  ];

  const filteredItems = allAvailableItems.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.detail.toLowerCase().includes(q) ||
      item.keyFact.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const effectiveFullScreen = isFullScreen || internalFullScreen;
  const toggleFull = () => {
    if (onToggleFullScreen) {
      onToggleFullScreen();
    } else {
      setInternalFullScreen(!internalFullScreen);
    }
  };

  const handleListen = (item: GkFullItem, trans: { title: string; detail: string; keyFact: string }) => {
    setPlayingId(item.id);
    const textToSpeak = `${trans.title}। ${trans.detail}। मुख्य बिंदु: ${trans.keyFact}`;
    speakLangText(textToSpeak, currentLanguage);
    setTimeout(() => {
      setPlayingId((curr) => (curr === item.id ? null : curr));
    }, 6000);
  };

  // Helper to split details into clean bullet points
  const formatBullets = (detail: string) => {
    if (detail.includes('|')) {
      return detail.split('|').map(s => s.trim()).filter(Boolean);
    }
    if (detail.includes('।')) {
      return detail.split('।').map(s => s.trim()).filter(Boolean);
    }
    return [detail];
  };

  const containerClasses = effectiveFullScreen
    ? "fixed inset-0 z-50 w-screen h-screen bg-amber-50/20 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex flex-col"
    : "bg-white rounded-3xl p-4 shadow-md border-2 border-amber-300";

  return (
    <div className={containerClasses}>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200 flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-2">
          {effectiveFullScreen && (
            <button
              onClick={toggleFull}
              className="mr-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{getUiString('back', currentLanguage)}</span>
            </button>
          )}

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white shadow-xs">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                भारत का संपूर्ण इतिहास व General Knowledge (100+ Points)
              </h3>
              <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full border border-red-200">
                {langInfo.flag} {langInfo.nativeName}
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              नदियां • नेशनल पार्क • राज्य-राजधानी • राष्ट्रीय प्रतीक • महान विभूतियां • 33 भाषाओं में उच्चारण
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खोजें (गंगा, काजीरंगा, गांधी, 1857)..."
              className="w-full border border-amber-300 rounded-full pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/60"
            />
            <Search className="w-3.5 h-3.5 text-amber-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Full Screen Toggle */}
          <button
            onClick={toggleFull}
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 shadow-2xs active:scale-95 transition-transform"
            title={effectiveFullScreen ? "Exit Fullscreen" : "Fullscreen (100vw, 100vh)"}
          >
            {effectiveFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-none shrink-0">
        {categoryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm scale-102'
                  : 'bg-amber-100/70 text-amber-950 hover:bg-amber-200/90'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* GK Cards Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 overflow-y-auto pr-1 mt-2 ${
        effectiveFullScreen ? 'flex-1 max-h-none' : 'max-h-[500px]'
      }`}>
        {filteredItems.map((item) => {
          const trans = getTranslatedGk(item, currentLanguage);
          const bullets = formatBullets(trans.detail);
          const isPlaying = playingId === item.id;

          return (
            <div
              key={`${item.category}-${item.id}`}
              className="bg-white hover:bg-amber-50/50 rounded-2xl p-4 border border-amber-200 flex flex-col justify-between transition-all shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header Badge & Listen Button */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 shadow-2xs">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleListen(item, trans)}
                    className={`px-2.5 py-1 rounded-xl font-bold text-xs flex items-center gap-1 transition-all active:scale-95 ${
                      isPlaying
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    }`}
                    title={`सुनें (Clear Slow Voice: ${langInfo.name})`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'बोल रहा है...' : 'सुनें (0.9x)'}</span>
                  </button>
                </div>

                {/* Card Title (English + Hindi) */}
                <h4 className="text-sm sm:text-base font-black text-slate-900 mt-2.5 leading-snug">
                  {trans.title}
                </h4>

                {/* Image if available */}
                {item.imageUrl && (
                  <div className="my-2.5 w-full h-32 rounded-xl overflow-hidden bg-amber-100/50 border border-amber-200/80">
                    <img
                      src={item.imageUrl}
                      alt={trans.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Important points in Bullets */}
                <div className="mt-2 space-y-1">
                  {bullets.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Fact Highlight */}
              <div className="mt-3 pt-2.5 border-t border-amber-200 flex flex-col gap-1 bg-amber-50/80 p-2.5 rounded-xl">
                <div className="flex items-start gap-1.5 text-xs font-bold text-red-950">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-red-700 font-extrabold">विशेष तथ्य: </strong>
                    {trans.keyFact}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-0.5 pt-1 border-t border-amber-200/60">
                  <span>भाषा: {langInfo.nativeName} ({currentLanguage})</span>
                  <span className="text-amber-800 font-bold">100% Verified GK</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
