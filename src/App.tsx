import React, { useState, useEffect } from 'react';
import { PremiumModal } from './components/PremiumModal';
import { BharatKhojSearch } from './components/BharatKhojSearch';
import { KidzeeSection } from './components/KidzeeSection';
import { getLanguageByCode } from './data/languages';
import {
  Sparkles,
  Crown,
  BookOpen,
  Baby,
  Maximize2,
  Moon,
  Music,
  Palette,
  Eye,
  Shapes,
  Play
} from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<string>("hi");
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem('zq_premium') === 'true';
  });
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [premiumLockReason, setPremiumLockReason] = useState<string>('');

  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return !sessionStorage.getItem('zq_splash_seen');
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('zq_splash_seen', 'true');
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Full Screen Category Mode: 'stories' | 'lori' | 'poem' | 'sketch' | 'learning' | 'puzzles' | null
  const [fullScreenCategory, setFullScreenCategory] = useState<
    'stories' | 'lori' | 'poem' | 'sketch' | 'learning' | 'puzzles' | null
  >(null);

  // Jump targets from Bharat Khoj
  const [selectedStoryId, setSelectedStoryId] = useState<number | undefined>();
  const [selectedLoriId, setSelectedLoriId] = useState<number | undefined>();
  const [selectedPoemId, setSelectedPoemId] = useState<number | undefined>();
  const [selectedSketchId, setSelectedSketchId] = useState<number | undefined>();

  const activatePremium = () => {
    setIsPremium(true);
    localStorage.setItem('zq_premium', 'true');
  };

  const handleOpenPremium = (reason?: string) => {
    setPremiumLockReason(reason || '');
    setIsPremiumModalOpen(true);
  };

  const currentLangObj = getLanguageByCode(currentLang);

  return (
    <div className="min-h-screen bg-yellow-50/60 pb-20 text-slate-800 font-sans">
      {/* ========================================================
          SPLASH SCREEN OVERLAY (Auto-dismissed or tap to enter)
         ======================================================== */}
      {showSplash && (
        <div
          onClick={() => setShowSplash(false)}
          className="fixed inset-0 z-[200] bg-gradient-to-b from-amber-400 via-orange-400 to-rose-500 flex flex-col items-center justify-center p-6 text-white text-center cursor-pointer animate-in fade-in duration-300 select-none"
        >
          {/* Animated Logo */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse" />
            <img
              src="/logo.png"
              alt="ZQ Kidzee Logo"
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-2xl border-4 border-white animate-bounce duration-1000"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute -bottom-2 -right-2 bg-yellow-300 text-slate-950 p-2 rounded-full shadow-lg text-lg">
              🤹
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md">
            ZQ 💗 KIDZEE 🤹 &amp; EDUCATION 📚
          </h1>
          <p className="text-sm sm:text-base font-bold text-amber-100 mt-2 max-w-md drop-shadow-xs">
            नन्हे बच्चों की पहली पाठशाला • बाल संसार
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-white/25 px-4 py-1.5 rounded-full text-xs font-black backdrop-blur-xs shadow-inner">
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>100% विज्ञापन-मुक्त (Ad-Free) • हाफ-प्रीमियम मॉडल</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSplash(false);
            }}
            className="mt-8 bg-white text-orange-600 font-black text-sm px-6 py-2.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>शुरू करें (Enter Kidzee)</span>
          </button>
        </div>
      )}

      {/* Main Header / Branding */}
      <header className="px-4 py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 shadow-sm border-b border-amber-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-sm border-2 border-amber-300 shrink-0 bg-white flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-2xl fallback-icon">💗</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-black text-amber-950 tracking-tight leading-none">
                ZQ 💗 KIDZEE 🤹 &amp; EDUCATION 📚
              </h1>
              <p className="text-[11px] font-bold text-amber-900 mt-0.5">
                नन्हे बच्चों की पहली पाठशाला • कहानियाँ, लोरी, कविता, स्केच, सीखो व पहेलियां
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Global Language Indicator Badge */}
            <div className="bg-white/80 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-bold text-amber-950 flex items-center gap-1 shadow-2xs">
              <span>{currentLangObj.flag}</span>
              <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
              <span className="text-[10px] uppercase text-amber-700">({currentLangObj.code})</span>
            </div>

            <button
              onClick={() => handleOpenPremium('प्रीमियम लें और सभी 100+ कहानियाँ, लोरियां व फीचर्स अनलॉक करें!')}
              className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                isPremium
                  ? 'bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-amber-900 to-slate-900 text-amber-300 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-yellow-400" />
              <span>{isPremium ? '👑 VIP ACTIVE' : '💎 NO ADS (₹49)'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-3 space-y-4">
        {/* HOME TOP BANNER */}
        <div className="rounded-3xl overflow-hidden shadow-md border-2 border-amber-300 relative group bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
          <img
            src="/banner.png"
            alt="ZQ 💗 KIDZEE 🤹 &amp; EDUCATION 📚 Banner"
            className="w-full max-h-48 sm:max-h-60 object-cover object-center"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-500/95 via-orange-500/95 to-rose-500/95 text-white flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤹</span>
              <div>
                <h2 className="text-sm sm:text-base font-black tracking-tight leading-tight">
                  ZQ 💗 KIDZEE 🤹 &amp; EDUCATION 📚
                </h2>
                <p className="text-[11px] text-amber-100 font-semibold">
                  100% विज्ञापन-मुक्त • A to Z, वर्णमाला, गिनती 1-100, पहाड़े 2-20, 100+ कहानियाँ, लोरियां, कविताएं व स्केच
                </p>
              </div>
            </div>
            {!isPremium && (
              <button
                onClick={() => handleOpenPremium('प्रीमियम लो और 100+ कहानियाँ, लोरियां, पहाड़े और पहेलियाँ सुनो!')}
                className="bg-white text-orange-600 hover:bg-amber-100 font-black text-xs px-3.5 py-1.5 rounded-full shadow-md active:scale-95 transition-transform flex items-center gap-1.5"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>VIP अनलॉक करें</span>
              </button>
            )}
          </div>
        </div>

        {/* BHARAT KHOJ + 33 LANGUAGES BAR */}
        <BharatKhojSearch
          currentLang={currentLang}
          onLangChange={setCurrentLang}
          onSelectStory={(id) => {
            setSelectedStoryId(id);
          }}
          onSelectLori={(id) => {
            setSelectedLoriId(id);
          }}
          onSelectPoem={(id) => {
            setSelectedPoemId(id);
          }}
          onSelectSketch={(id) => {
            setSelectedSketchId(id);
          }}
        />

        {/* 6 FULL SCREEN CATEGORIES QUICK LAUNCHER BAR */}
        <div className="mx-3 bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-100 p-2.5 rounded-2xl border border-amber-300 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-orange-600" />
              <span>फुल स्क्रीन व्यू (Full Screen with Back Button):</span>
            </span>
            <span className="text-[10px] text-amber-800 font-bold hidden sm:inline">
              हर श्रेणी अलग फुल स्क्रीन में बैक बटन के साथ खुलती है
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
            <button
              onClick={() => setFullScreenCategory('stories')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-orange-500 hover:text-white text-slate-800 border border-amber-200 text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-500" />
              <span>📖 कहानियाँ</span>
            </button>

            <button
              onClick={() => setFullScreenCategory('lori')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-slate-800 border border-amber-200 text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>🌙 लोरियां</span>
            </button>

            <button
              onClick={() => setFullScreenCategory('poem')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-rose-500 hover:text-white text-slate-800 border border-amber-200 text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Music className="w-3.5 h-3.5 text-rose-500" />
              <span>🎵 कविताएँ</span>
            </button>

            <button
              onClick={() => setFullScreenCategory('sketch')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-emerald-600 hover:text-white text-slate-800 border border-amber-200 text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-emerald-600" />
              <span>🎨 स्केच</span>
            </button>

            <button
              onClick={() => setFullScreenCategory('learning')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-purple-600 hover:text-white text-slate-800 border border-amber-200 text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-purple-600" />
              <span>📸 सीखें (350+)</span>
            </button>

            <button
              onClick={() => setFullScreenCategory('puzzles')}
              className="px-2 py-1.5 rounded-xl bg-white hover:bg-pink-600 hover:text-white text-slate-800 border border-amber-200 text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <Shapes className="w-3.5 h-3.5 text-pink-600" />
              <span>🧩 पहेलियाँ</span>
            </button>
          </div>
        </div>

        {/* PRIMARY KIDZEE CONTENT (Stories, Loris, Poems, Sketches, Learning, Puzzles) */}
        <KidzeeSection
          currentLanguage={currentLang}
          selectedStoryId={selectedStoryId}
          selectedLoriId={selectedLoriId}
          selectedPoemId={selectedPoemId}
          selectedSketchId={selectedSketchId}
          isPremium={isPremium}
          onOpenPremium={handleOpenPremium}
        />
      </main>

      {/* FULL SCREEN CATEGORY OVERLAY (100vw, 100vh with Back Button) */}
      {fullScreenCategory && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-white overflow-hidden animate-in fade-in duration-200">
          {/* Stories in Fullscreen */}
          {fullScreenCategory === 'stories' && (
            <KidzeeSection
              currentLanguage={currentLang}
              initialCategory="stories"
              isFullScreen={true}
              onToggleFullScreen={() => setFullScreenCategory(null)}
              isPremium={isPremium}
              onOpenPremium={handleOpenPremium}
            />
          )}

          {/* Lori in Fullscreen */}
          {fullScreenCategory === 'lori' && (
            <KidzeeSection
              currentLanguage={currentLang}
              initialCategory="lori"
              isFullScreen={true}
              onToggleFullScreen={() => setFullScreenCategory(null)}
              isPremium={isPremium}
              onOpenPremium={handleOpenPremium}
            />
          )}

          {/* Poem in Fullscreen */}
          {fullScreenCategory === 'poem' && (
            <KidzeeSection
              currentLanguage={currentLang}
              initialCategory="poem"
              isFullScreen={true}
              onToggleFullScreen={() => setFullScreenCategory(null)}
              isPremium={isPremium}
              onOpenPremium={handleOpenPremium}
            />
          )}

          {/* Sketch in Fullscreen */}
          {fullScreenCategory === 'sketch' && (
            <KidzeeSection
              currentLanguage={currentLang}
              initialCategory="sketch"
              isFullScreen={true}
              onToggleFullScreen={() => setFullScreenCategory(null)}
              isPremium={isPremium}
              onOpenPremium={handleOpenPremium}
            />
          )}

          {/* Learning in Fullscreen */}
          {fullScreenCategory === 'learning' && (
            <KidzeeSection
              currentLanguage={currentLang}
              initialCategory="learning"
              isFullScreen={true}
              onToggleFullScreen={() => setFullScreenCategory(null)}
              isPremium={isPremium}
              onOpenPremium={handleOpenPremium}
            />
          )}

          {/* Puzzles in Fullscreen */}
          {fullScreenCategory === 'puzzles' && (
            <KidzeeSection
              currentLanguage={currentLang}
              initialCategory="puzzles"
              isFullScreen={true}
              onToggleFullScreen={() => setFullScreenCategory(null)}
              isPremium={isPremium}
              onOpenPremium={handleOpenPremium}
            />
          )}
        </div>
      )}

      {/* Premium Subscription Modal */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onActivatePremium={activatePremium}
        isPremium={isPremium}
        lockReason={premiumLockReason}
      />
    </div>
  );
}
