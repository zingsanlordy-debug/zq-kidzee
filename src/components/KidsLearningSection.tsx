import React, { useState } from 'react';
import { LEARNING_ITEMS, LearningItem } from '../data/kidsLearningData';
import {
  ABCD_DATA,
  AbcdItem,
  VARNAMALA_DATA,
  VarnamalaItem,
  NUMBERS_100_DATA,
  NumberItem,
  TABLES_2_TO_20_DATA,
  TableItem
} from '../data/kidsEducationData';
import {
  Volume2,
  Sparkles,
  Search,
  Lock,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  X,
  Crown,
  Globe
} from 'lucide-react';
import { speakLangText } from '../utils/audioSynth';

interface KidsLearningSectionProps {
  isPremium?: boolean;
  onOpenPremium?: (reason?: string) => void;
}

type LearningTab =
  | 'abcd'
  | 'varnamala'
  | 'numbers'
  | 'tables'
  | 'animals'
  | 'birds'
  | 'flowers'
  | 'fruits'
  | 'vegetables'
  | 'vehicles';

interface TabMeta {
  id: LearningTab;
  title: string;
  hindiTitle: string;
  emoji: string;
  freeDesc: string;
  color: string;
}

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'zh', label: '中文 (Chinese)' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'ru', label: 'Русский (Russian)' },
  { code: 'pt', label: 'Português (Portuguese)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'ko', label: '한국어 (Korean)' },
  { code: 'it', label: 'Italiano (Italian)' },
  { code: 'tr', label: 'Türkçe (Turkish)' },
  { code: 'nl', label: 'Nederlands (Dutch)' },
  { code: 'pl', label: 'Polski (Polish)' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu (Malay)' },
  { code: 'sw', label: 'Kiswahili (Swahili)' },
  { code: 'th', label: 'ไทย (Thai)' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'fa', label: 'فارسی (Persian)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'ur', label: 'اردو (Urdu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', label: 'অসমীয়া (Assamese)' },
  { code: 'ne', label: 'नेपाली (Nepali)' },
  { code: 'si', label: 'සිංහල (Sinhala)' },
  { code: 'sa', label: 'संस्कृतम् (Sanskrit)' },
];

const TABS: TabMeta[] = [
  { id: 'abcd', title: 'A B C D', hindiTitle: 'ए बी सी डी', emoji: '🔤', freeDesc: 'A to M FREE • N to Z VIP', color: 'from-pink-500 to-rose-600' },
  { id: 'varnamala', title: 'वर्णमाला', hindiTitle: 'क ख ग घ', emoji: '🕉️', freeDesc: 'क to ण FREE • त to ज्ञ VIP', color: 'from-amber-500 to-orange-600' },
  { id: 'numbers', title: 'गिनती (1-100)', hindiTitle: 'Numbers', emoji: '🔢', freeDesc: '1 to 50 FREE • 51 to 100 VIP', color: 'from-emerald-500 to-teal-600' },
  { id: 'tables', title: 'पहाड़े (2-20)', hindiTitle: 'Math Tables', emoji: '✖️', freeDesc: 'Table 2-10 FREE • 11-20 VIP', color: 'from-blue-500 to-indigo-600' },
  { id: 'animals', title: 'जानवर (Animals)', hindiTitle: '20 Animals', emoji: '🦁', freeDesc: '10 FREE • 10 VIP', color: 'from-amber-600 to-orange-700' },
  { id: 'birds', title: 'पक्षी (Birds)', hindiTitle: '20 Birds', emoji: '🦜', freeDesc: '10 FREE • 10 VIP', color: 'from-sky-500 to-blue-600' },
  { id: 'flowers', title: 'फूल (Flowers)', hindiTitle: '20 Flowers', emoji: '🌸', freeDesc: '10 FREE • 10 VIP', color: 'from-rose-500 to-pink-600' },
  { id: 'fruits', title: 'फल (Fruits)', hindiTitle: '20 Fruits', emoji: '🍎', freeDesc: '10 FREE • 10 VIP', color: 'from-red-500 to-amber-500' },
  { id: 'vegetables', title: 'सब्जियां (Veggies)', hindiTitle: '20 Vegetables', emoji: '🥦', freeDesc: '10 FREE • 10 VIP', color: 'from-green-500 to-emerald-700' },
  { id: 'vehicles', title: 'वाहन (Vehicles)', hindiTitle: '20 Vehicles', emoji: '🚗', freeDesc: '10 FREE • 10 VIP', color: 'from-indigo-500 to-violet-600' },
];

export const KidsLearningSection: React.FC<KidsLearningSectionProps> = ({
  isPremium = false,
  onOpenPremium
}) => {
  const [activeTab, setActiveTab] = useState<LearningTab>('abcd');
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Selected Table state (for Tables 2 to 20)
  const [selectedTableNum, setSelectedTableNum] = useState<number>(2);
  const [activeTableLineIdx, setActiveTableLineIdx] = useState<number | null>(null);

  // Selected Zoom Modal for Photo Card
  const [activePhotoItem, setActivePhotoItem] = useState<LearningItem | null>(null);

  const currentTabMeta = TABS.find(t => t.id === activeTab) || TABS[0];

  const handleSpeak = (text: string, id: string, lang: 'en' | 'hi' = 'hi', rate: number = 0.85) => {
    setSpeakingId(id);
    speakLangText(text, lang, rate, () => {
      setSpeakingId(null);
    });
    setTimeout(() => {
      setSpeakingId(null);
    }, 2800);
  };

  const triggerLocked = (reason: string) => {
    if (onOpenPremium) {
      onOpenPremium(reason);
    }
  };

  // Full reading of a Table (2 to 20)
  const playWholeTable = (table: TableItem) => {
    let idx = 0;
    const playNext = () => {
      if (idx >= table.lines.length) {
        setActiveTableLineIdx(null);
        return;
      }
      setActiveTableLineIdx(idx);
      const line = table.lines[idx];
      const chant = `${line.hindiChant}। ${line.englishChant}।`;
      speakLangText(chant, 'hi', 0.85, () => {
        idx++;
        setTimeout(playNext, 400);
      });
    };
    playNext();
  };

  // 50 Items filtered for categories
  const currentCategoryItems = LEARNING_ITEMS.filter(item => item.category === activeTab);
  const filteredCategoryItems = currentCategoryItems.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.hindiName.includes(q);
  });

  return (
    <div className="space-y-4">
      {/* Top Banner with Name & Half Premium Info */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner shrink-0">
            {currentTabMeta.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-xs">
                {currentTabMeta.title}
              </h2>
              <span className="bg-white/30 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                {currentTabMeta.freeDesc}
              </span>
              {isPremium && (
                <span className="bg-emerald-800/80 text-amber-200 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-300" /> VIP UNLOCKED
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-medium text-white/95 mt-0.5">
              टैप करें और बोलती आवाज़ सुनें • 100% शुद्ध उच्चारण व चित्र
            </p>
          </div>
        </div>

        {/* Search for Photo items */}
        {['animals', 'birds', 'fruits', 'vegetables', 'vehicles'].includes(activeTab) && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="नाम खोजें (Search)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/20 placeholder-white/70 text-white font-semibold text-xs rounded-2xl pl-9 pr-3 py-2 border border-white/30 focus:outline-hidden focus:bg-white/30"
            />
          </div>
        )}
      </div>

      {/* 10 Navigation Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-md scale-102 ring-2 ring-orange-300'
                  : 'bg-white hover:bg-orange-50 text-slate-700 border border-slate-200'
              }`}
            >
              <span className="text-base">{tab.emoji}</span>
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SECTION 1: ABCD (A to Z) - A to M FREE, N to Z PREMIUM
         ========================================================================= */}
      {activeTab === 'abcd' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>🔤 A से M तक मुफ्त (FREE) • N से Z तक प्रीमियम (VIP 🔒)</span>
            <span className="text-amber-700">टैप करें और सुनें: &quot;A for Apple...&quot;</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ABCD_DATA.map((item) => {
              const isLocked = !item.isFree && !isPremium;
              const isSpeaking = speakingId === `abcd-${item.id}`;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isLocked) {
                      triggerLocked('प्रीमियम लें और N से Z तक पूरे Alphabets खोलें!');
                      return;
                    }
                    handleSpeak(item.speakText, `abcd-${item.id}`, 'en', 0.85);
                  }}
                  className={`relative rounded-3xl p-3 sm:p-4 text-center cursor-pointer transition-all border-2 shadow-xs hover:shadow-lg active:scale-95 ${
                    isLocked
                      ? 'bg-slate-100 border-amber-300/80 text-slate-500'
                      : isSpeaking
                      ? 'bg-gradient-to-tr ' + item.color + ' text-white border-amber-400 scale-105 shadow-xl ring-4 ring-amber-300'
                      : 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-800'
                  }`}
                >
                  {/* VIP Lock Badge */}
                  {isLocked && (
                    <div className="absolute top-2 right-2 bg-amber-400 text-slate-900 p-1.5 rounded-full shadow-md flex items-center gap-1 text-[10px] font-black">
                      <Lock className="w-3 h-3" />
                      <span className="hidden sm:inline">VIP</span>
                    </div>
                  )}

                  <div className={`text-4xl sm:text-5xl font-black tracking-tight mb-1 ${isSpeaking ? 'text-white' : 'text-slate-900'}`}>
                    {item.letter}
                  </div>

                  <div className="text-3xl sm:text-4xl my-1 animate-float">
                    {item.emoji}
                  </div>

                  <div className="mt-2">
                    <div className={`text-sm sm:text-base font-black ${isSpeaking ? 'text-white' : 'text-slate-900'}`}>
                      {item.letter} for {item.word}
                    </div>
                    <div className={`text-xs font-bold ${isSpeaking ? 'text-white/90' : 'text-amber-700'}`}>
                      {item.hindiWord}
                    </div>
                  </div>

                  {!isLocked && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold opacity-75">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>बोलें</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: VARNAMALA (क to ज्ञ) - क to ण FREE, त to ज्ञ PREMIUM
         ========================================================================= */}
      {activeTab === 'varnamala' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>🕉️ क से ण तक मुफ्त (FREE) • त से ज्ञ तक प्रीमियम (VIP 🔒)</span>
            <span className="text-amber-700">टैप करें और सुनें: &quot;क से कबूतर...&quot;</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {VARNAMALA_DATA.map((item) => {
              const isLocked = !item.isFree && !isPremium;
              const isSpeaking = speakingId === `var-${item.id}`;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isLocked) {
                      triggerLocked('प्रीमियम लें और त से ज्ञ तक सम्पूर्ण वर्णमाला अनलॉक करें!');
                      return;
                    }
                    handleSpeak(item.speakText, `var-${item.id}`, 'hi', 0.85);
                  }}
                  className={`relative rounded-3xl p-3 sm:p-4 text-center cursor-pointer transition-all border-2 shadow-xs hover:shadow-lg active:scale-95 ${
                    isLocked
                      ? 'bg-slate-100 border-amber-300/80 text-slate-500'
                      : isSpeaking
                      ? 'bg-gradient-to-tr ' + item.color + ' text-white border-amber-400 scale-105 shadow-xl ring-4 ring-amber-300'
                      : 'bg-white hover:bg-orange-50/50 border-slate-200 text-slate-800'
                  }`}
                >
                  {isLocked && (
                    <div className="absolute top-2 right-2 bg-amber-400 text-slate-900 p-1.5 rounded-full shadow-md flex items-center gap-1 text-[10px] font-black">
                      <Lock className="w-3 h-3" />
                      <span className="hidden sm:inline">VIP</span>
                    </div>
                  )}

                  <div className={`text-4xl sm:text-5xl font-black mb-1 ${isSpeaking ? 'text-white' : 'text-slate-900'}`}>
                    {item.letter}
                  </div>

                  <div className="text-3xl sm:text-4xl my-1">
                    {item.emoji}
                  </div>

                  <div className="mt-2">
                    <div className={`text-base font-black ${isSpeaking ? 'text-white' : 'text-slate-900'}`}>
                      {item.letter} से {item.word}
                    </div>
                    <div className={`text-xs font-bold ${isSpeaking ? 'text-white/90' : 'text-amber-700'}`}>
                      {item.englishMeaning}
                    </div>
                  </div>

                  {!isLocked && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold opacity-75">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>सुनें</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: NUMBERS 1 TO 100 - 1 to 50 FREE, 51 to 100 PREMIUM
         ========================================================================= */}
      {activeTab === 'numbers' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>🔢 1 से 50 तक मुफ्त (FREE) • 51 से 100 तक प्रीमियम (VIP 🔒)</span>
            <span className="text-emerald-700">टैप करें और सुनें: &quot;One, एक...&quot;</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
            {NUMBERS_100_DATA.map((item) => {
              const isLocked = !item.isFree && !isPremium;
              const isSpeaking = speakingId === `num-${item.num}`;

              return (
                <div
                  key={item.num}
                  onClick={() => {
                    if (isLocked) {
                      triggerLocked('प्रीमियम लें और 51 से 100 तक सम्पूर्ण गिनती खोलें!');
                      return;
                    }
                    const text = `${item.english}। ${item.hindi}।`;
                    handleSpeak(text, `num-${item.num}`, 'hi', 0.9);
                  }}
                  className={`relative rounded-2xl p-2.5 text-center cursor-pointer transition-all border-2 shadow-xs hover:shadow-md active:scale-95 ${
                    isLocked
                      ? 'bg-slate-100 border-amber-300 text-slate-400'
                      : isSpeaking
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white border-emerald-400 scale-110 shadow-lg ring-4 ring-emerald-200'
                      : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {isLocked && (
                    <span className="absolute top-1 right-1 p-0.5 rounded-full bg-amber-400 text-slate-900">
                      <Lock className="w-2.5 h-2.5" />
                    </span>
                  )}

                  <div className="text-xl sm:text-2xl font-black">
                    {item.num}
                  </div>
                  <div className={`text-[10px] font-black truncate ${isSpeaking ? 'text-white' : 'text-emerald-700'}`}>
                    {item.english}
                  </div>
                  <div className={`text-[10px] font-bold truncate ${isSpeaking ? 'text-white/90' : 'text-slate-500'}`}>
                    {item.hindi}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: TABLES 2 TO 20 - Table 2 to 10 FREE, 11 to 20 PREMIUM
         ========================================================================= */}
      {activeTab === 'tables' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>✖️ 2 से 10 तक पहाड़े मुफ्त (FREE) • 11 से 20 तक प्रीमियम (VIP 🔒)</span>
            <span className="text-blue-700">पहाड़े चुनें और पूरी लयबद्ध आवाज सुनें</span>
          </div>

          {/* Table Selector Buttons (2 to 20) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TABLES_2_TO_20_DATA.map((t) => {
              const isLocked = !t.isFree && !isPremium;
              const isSelected = selectedTableNum === t.tableNumber;

              return (
                <button
                  key={t.tableNumber}
                  onClick={() => {
                    if (isLocked) {
                      triggerLocked(`प्रीमियम लें और टेबल ${t.tableNumber} से 20 तक के पहाड़े अनलॉक करें!`);
                      return;
                    }
                    setSelectedTableNum(t.tableNumber);
                    setActiveTableLineIdx(null);
                  }}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-xs shrink-0 transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                      : isLocked
                      ? 'bg-slate-100 border border-amber-300 text-slate-400'
                      : 'bg-white hover:bg-blue-50 border border-slate-200 text-slate-800'
                  }`}
                >
                  {isLocked && <Lock className="w-3 h-3 text-amber-500" />}
                  <span>{t.tableNumber} का पहाड़ा</span>
                </button>
              );
            })}
          </div>

          {/* Active Table Details */}
          {(() => {
            const table = TABLES_2_TO_20_DATA.find(t => t.tableNumber === selectedTableNum) || TABLES_2_TO_20_DATA[0];
            return (
              <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-blue-200 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-blue-100 pb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {table.hindiTitle} ({table.title})
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      प्रत्येक पंक्ति पर टैप करके आवाज सुनें या पूरा पहाड़ा एक साथ सुनें
                    </p>
                  </div>

                  <button
                    onClick={() => playWholeTable(table)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>पूरा पहाड़ा बोलकर सुनाओ (Play All)</span>
                  </button>
                </div>

                {/* Table Lines Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2.5">
                  {table.lines.map((line, idx) => {
                    const isActive = activeTableLineIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setActiveTableLineIdx(idx);
                          const chant = `${line.hindiChant}। ${line.englishChant}।`;
                          speakLangText(chant, 'hi', 0.85);
                        }}
                        className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all active:scale-95 ${
                          isActive
                            ? 'bg-blue-600 text-white border-blue-600 scale-102 shadow-md'
                            : 'bg-blue-50/50 hover:bg-blue-100/60 border-blue-100 text-slate-800'
                        }`}
                      >
                        <div className="text-base sm:text-lg font-black tracking-tight">
                          {table.tableNumber} × {line.multiplier} = {line.result}
                        </div>
                        <div className={`text-xs font-bold mt-1 ${isActive ? 'text-white/90' : 'text-blue-700'}`}>
                          {line.hindiChant}
                        </div>
                        <div className={`text-[10px] font-semibold ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                          {line.englishChant}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          SECTIONS: 20 ITEMS EACH (Animals, Birds, Flowers, Fruits, Veggies, Vehicles)
          10 FREE (id 1-10), 10 PREMIUM (id 11-20)
         ========================================================================= */}
      {['animals', 'birds', 'flowers', 'fruits', 'vegetables', 'vehicles'].includes(activeTab) && (
        <div className="space-y-3">
          {/* Top Bar: Free/VIP info & Language Selector */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                📸 1-10 FREE • 11-20 VIP 🔒
              </span>
            </div>

            {/* Language Selector (35 Languages) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <Globe className="w-3.5 h-3.5 text-orange-500" />
                <span>भाषा (Language):</span>
              </div>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="text-xs font-bold bg-amber-50 text-amber-950 border border-amber-300 rounded-xl px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label} ({lang.code})
                  </option>
                ))}
              </select>
              {selectedLang !== 'en' && (
                <button
                  onClick={() => setSelectedLang('en')}
                  className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                >
                  English
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredCategoryItems.map((item, idx) => {
              const isLocked = (item.premium || idx >= 10) && !isPremium;
              const isSpeaking = speakingId === `cat-${item.id}`;
              const displayName = selectedLang === 'en'
                ? item.name
                : (item.translations?.[selectedLang] || item.name);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isLocked) {
                      triggerLocked("Unlock Premium to open!");
                      return;
                    }
                    setActivePhotoItem(item);
                    handleSpeak(`${displayName}। ${item.name}।`, `cat-${item.id}`, selectedLang === 'hi' ? 'hi' : 'en', 0.85);
                  }}
                  className={`group bg-white rounded-2xl p-2.5 sm:p-3 border-2 transition-all cursor-pointer shadow-xs hover:shadow-lg relative flex flex-col justify-between ${
                    isLocked
                      ? 'bg-slate-100/90 border-amber-300/80 text-slate-500'
                      : isSpeaking
                      ? 'border-amber-500 ring-4 ring-amber-200 bg-amber-50/40'
                      : 'border-slate-100 hover:border-orange-300'
                  }`}
                >
                  {/* VIP Lock Badge */}
                  {isLocked && (
                    <div className="absolute top-2 right-2 z-10 bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 text-[10px] font-black">
                      <Lock className="w-3 h-3" />
                      <span>VIP 🔒</span>
                    </div>
                  )}

                  {/* Photo Container */}
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 relative mb-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isLocked ? 'grayscale opacity-75' : 'group-hover:scale-105'
                      }`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.emoji-fallback')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'emoji-fallback text-5xl flex items-center justify-center w-full h-full bg-gradient-to-tr from-amber-100 to-yellow-100';
                          fallback.innerText = item.emoji || '✨';
                          parent.appendChild(fallback);
                        }
                      }}
                    />

                    {!isLocked && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(`${displayName}। ${item.name}।`, `cat-${item.id}`, selectedLang === 'hi' ? 'hi' : 'en', 0.85);
                        }}
                        aria-label="Pronounce"
                        className={`absolute bottom-2 right-2 p-2 rounded-full backdrop-blur-xs transition-transform active:scale-90 shadow-md ${
                          isSpeaking
                            ? 'bg-amber-500 text-white scale-110 animate-bounce'
                            : 'bg-white/90 hover:bg-white text-slate-800'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Name Label: English by default, or translated name when language selected */}
                  <div className="text-center pt-1.5 pb-0.5">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
                      {displayName}
                    </h3>
                    {selectedLang !== 'en' && (
                      <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                        {item.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCategoryItems.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6">
              <p className="text-4xl mb-2">🔍</p>
              <h4 className="text-base font-bold text-slate-700">कोई आइटम नहीं मिला</h4>
              <p className="text-xs text-slate-500 mt-1">कृपया दूसरा नाम खोजें।</p>
            </div>
          )}
        </div>
      )}

      {/* Large Flashcard Preview Modal */}
      {activePhotoItem && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhotoItem(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-amber-300 relative text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhotoItem(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-md relative">
              <img
                src={activePhotoItem.image}
                alt={activePhotoItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.opacity = '0.5';
                }}
              />
              <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xl shadow-xs">
                {activePhotoItem.emoji}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {selectedLang === 'en'
                  ? activePhotoItem.name
                  : (activePhotoItem.translations?.[selectedLang] || activePhotoItem.name)}
              </h2>
              {selectedLang !== 'en' && (
                <p className="text-sm font-bold text-slate-400 mt-0.5">
                  {activePhotoItem.name}
                </p>
              )}
              <p className="text-xl font-bold text-amber-600 mt-0.5">
                {activePhotoItem.hindiName}
              </p>
              <p className="text-xs text-slate-500 mt-2 italic">
                &ldquo;{activePhotoItem.soundPhrase}&rdquo;
              </p>
            </div>

            <button
              onClick={() =>
                handleSpeak(
                  `${activePhotoItem.name}। ${activePhotoItem.hindiName}। ${activePhotoItem.soundPhrase}`,
                  `cat-${activePhotoItem.id}`,
                  'en',
                  0.85
                )
              }
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-lg shadow-orange-300 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Volume2 className="w-5 h-5" />
              <span>दोबारा सुनें (Listen Again)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
