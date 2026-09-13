import React from 'react';
import { StoryItem } from '../../types';
import { Sparkles } from 'lucide-react';

interface StoryCartoonStageProps {
  storyItem?: StoryItem | null;
  currentLine: string;
  currentLineIndex: number;
  totalLines: number;
  currentScene: { prompt: string; imgUrl: string } | null;
}

export const StoryCartoonStage: React.FC<StoryCartoonStageProps> = ({
  storyItem,
  currentLine,
  currentLineIndex,
  totalLines,
  currentScene
}) => {
  const text = (currentLine + ' ' + (storyItem?.title || '')).toLowerCase();

  // Character detection for dynamic 2D cartoon actors
  const isLionPresent = text.includes('शेर') || text.includes('lion') || text.includes('केसरी') || text.includes('भासुरक');
  const isMousePresent = text.includes('चूहा') || text.includes('mouse') || text.includes('चीकू');
  const isRabbitPresent = text.includes('खरगोश') || text.includes('rabbit');
  const isTortoisePresent = text.includes('कछुआ') || text.includes('kachua') || text.includes('tortoise');
  const isMonkeyPresent = text.includes('बंदर') || text.includes('monkey');
  const isBearPresent = text.includes('भालू') || text.includes('bear');
  const isCrowPresent = text.includes('कौवा') || text.includes('crow');
  const isCatPresent = text.includes('बिल्ली') || text.includes('cat');
  const isAkbarBirbal = text.includes('अकबर') || text.includes('बीरबल') || text.includes('दरबार');

  const isLionWalking = isLionPresent && (text.includes('चला') || text.includes('पहुंचा') || text.includes('आया') || text.includes('कदम') || text.includes('घूमा'));
  const isLionRoaring = isLionPresent && (text.includes('दहाड़') || text.includes('गुस्सा') || text.includes('आंख खुली') || text.includes('क्रोध'));
  const isMouseRunning = isMousePresent && (text.includes('दौड़ा') || text.includes('भागा') || text.includes('उछल') || text.includes('पहुंचा'));

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950 select-none">
      {/* 1. LAYER: SCENE BACKGROUND IMAGE WITH SLOW 2D PAN & ZOOM (KEN BURNS) */}
      {currentScene?.imgUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={currentScene.imgUrl}
            src={currentScene.imgUrl}
            alt={currentScene.prompt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover animate-slow-pan-zoom transition-opacity duration-700 filter brightness-90 saturate-110"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* 2. LAYER: CINEMATIC CARTOON VIGNETTE & CONTRAST GRADIENT */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/60 pointer-events-none" />

      {/* 3. LAYER: PARALLAX JUNGLE / SCENE PARTICLES (Leaves, dust motes, fireflies) */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {/* Swaying foliage at top corners */}
        <div className="absolute -top-4 -left-4 text-6xl sm:text-7xl animate-leaf-sway opacity-85 filter drop-shadow-md">
          🌿
        </div>
        <div className="absolute -top-6 -right-4 text-6xl sm:text-7xl animate-leaf-sway opacity-80 filter drop-shadow-md" style={{ animationDelay: '1.2s' }}>
          🍃
        </div>
        <div className="absolute top-12 left-1/4 text-2xl animate-float opacity-75">
          🍃
        </div>
        <div className="absolute top-20 right-1/4 text-xl animate-float opacity-70" style={{ animationDelay: '1.8s' }}>
          ✨
        </div>

        {/* Floating fireflies in night or jungle */}
        <div className="absolute bottom-36 left-12 w-2 h-2 rounded-full bg-amber-300 animate-star-twinkle-1 shadow-[0_0_8px_#fde047]" />
        <div className="absolute bottom-48 right-24 w-2.5 h-2.5 rounded-full bg-yellow-300 animate-star-twinkle-2 shadow-[0_0_10px_#facc15]" />
        <div className="absolute top-32 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-200 animate-star-twinkle-3 shadow-[0_0_6px_#fde047]" />

        {/* Flying birds in sky */}
        <div className="absolute top-8 left-1/3 flex items-center gap-3 animate-breeze-drift opacity-80">
          <span className="text-xl animate-bounce" style={{ animationDuration: '2s' }}>🕊️</span>
          <span className="text-sm animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.4s' }}>🐦</span>
        </div>
      </div>

      {/* 4. LAYER: LIVE 2D ANIMATED CARTOON CHARACTERS (Hilta-Dulta 2D Scene Actors) */}
      <div className="absolute inset-0 z-3 pointer-events-none flex items-center justify-center p-4">
        {/* CHARACTER A: THE MAJESTIC LION (शेर) */}
        {isLionPresent && (
          <div
            className={`absolute bottom-20 left-4 sm:left-12 flex flex-col items-center transition-all duration-500 ${
              isLionWalking
                ? 'animate-paw-step'
                : isLionRoaring
                ? 'animate-spring-boing scale-110'
                : 'animate-cartoon-breathe'
            }`}
          >
            {/* Roar shockwave / anger aura */}
            {isLionRoaring && (
              <div className="absolute -top-12 text-3xl sm:text-4xl animate-ping text-amber-400 font-black">
                💥 ROAAAR!
              </div>
            )}

            {/* Walking heavy paw prints */}
            {isLionWalking && (
              <div className="absolute -bottom-2 -left-6 flex items-center gap-2 opacity-80">
                <span className="text-lg animate-ping">🐾</span>
                <span className="text-xs text-amber-200 font-black bg-black/40 px-2 py-0.5 rounded-full border border-amber-400/30">
                  भारी कदम...
                </span>
              </div>
            )}

            {/* 2D Lion Cartoon Figure */}
            <div className="relative filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] text-7xl sm:text-8xl md:text-9xl transform -scale-x-100">
              🦁
              {/* Blinking eyes badge */}
              <div className="absolute top-5 right-6 w-3 h-1.5 bg-amber-950 rounded-full animate-character-blink opacity-70" />
            </div>

            <div className="mt-1 bg-amber-600/90 text-white font-black text-[11px] sm:text-xs px-3 py-0.5 rounded-full shadow-lg border border-amber-300/40 backdrop-blur-sm">
              {isLionRoaring ? 'शेर दहाड़ रहा है!' : isLionWalking ? 'शेर चल रहा है 🐾' : 'केसरी शेर'}
            </div>
          </div>
        )}

        {/* CHARACTER B: THE CLEVER TINY MOUSE (चीकू चूहा) */}
        {isMousePresent && (
          <div
            className={`absolute bottom-20 right-6 sm:right-16 flex flex-col items-center transition-all duration-500 ${
              isMouseRunning ? 'animate-mouse-scurry' : 'animate-cartoon-breathe'
            }`}
          >
            {/* Cute running speed lines */}
            {isMouseRunning && (
              <div className="absolute -top-6 text-xs text-amber-200 font-bold bg-amber-900/80 px-2 py-0.5 rounded-full border border-amber-400/40 animate-pulse">
                पट-पट दौड़ रहा है! 💨
              </div>
            )}

            {/* Mouse figure with wiggling tail */}
            <div className="relative filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] text-6xl sm:text-7xl md:text-8xl">
              <span className="inline-block animate-tail-wag">🐭</span>
            </div>

            <div className="mt-1 bg-yellow-500/90 text-slate-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-yellow-300/50 backdrop-blur-sm">
              चीकू चूहा
            </div>
          </div>
        )}

        {/* CHARACTER C: RABBIT & TORTOISE (खरगोश और कछुआ) */}
        {isRabbitPresent && (
          <div className="absolute bottom-20 left-10 sm:left-24 flex flex-col items-center animate-spring-boing">
            <div className="text-7xl sm:text-8xl filter drop-shadow-xl">🐰</div>
            <div className="mt-1 bg-pink-500/90 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow border border-pink-300/40">
              तेज खरगोश 💨
            </div>
          </div>
        )}

        {isTortoisePresent && (
          <div className="absolute bottom-20 right-10 sm:right-24 flex flex-col items-center animate-cartoon-breathe">
            <div className="text-7xl sm:text-8xl filter drop-shadow-xl">🐢</div>
            <div className="mt-1 bg-emerald-600/90 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow border border-emerald-300/40">
              धीमा कछुआ 🐢
            </div>
          </div>
        )}

        {/* CHARACTER D: MONKEY (बंदर) */}
        {isMonkeyPresent && !isLionPresent && (
          <div className="absolute top-16 right-10 sm:right-20 flex flex-col items-center animate-wiggle">
            <div className="text-7xl sm:text-8xl filter drop-shadow-xl">🐒</div>
            <div className="mt-1 bg-amber-700/90 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow">
              चीकू बंदर 🍌
            </div>
          </div>
        )}

        {/* CHARACTER E: BEAR (भालू) */}
        {isBearPresent && (
          <div className="absolute bottom-20 left-12 sm:left-28 flex flex-col items-center animate-cartoon-breathe">
            <div className="text-7xl sm:text-8xl filter drop-shadow-xl">🐻</div>
            <div className="mt-1 bg-amber-800/90 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow">
              भोलू भालू 🍯
            </div>
          </div>
        )}

        {/* CHARACTER F: THIRSTY CROW (प्यासा कौवा) */}
        {isCrowPresent && (
          <div className="absolute top-20 left-1/3 flex flex-col items-center animate-float">
            <div className="text-7xl sm:text-8xl filter drop-shadow-xl">🦅</div>
            <div className="mt-1 bg-slate-800 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow border border-slate-600">
              प्यासा कौवा 🪨
            </div>
          </div>
        )}

        {/* CHARACTER G: CAT (बिल्ली) */}
        {isCatPresent && (
          <div className="absolute bottom-20 right-16 flex flex-col items-center animate-cartoon-breathe">
            <div className="text-7xl sm:text-8xl filter drop-shadow-xl">🐱</div>
            <div className="mt-1 bg-orange-500 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow">
              बिल्ली मौसी 🥛
            </div>
          </div>
        )}

        {/* CHARACTER H: AKBAR & BIRBAL (अकबर बीरबल) */}
        {isAkbarBirbal && (
          <div className="absolute bottom-20 flex items-center justify-center gap-10 sm:gap-24">
            <div className="flex flex-col items-center animate-cartoon-breathe">
              <div className="text-7xl sm:text-8xl filter drop-shadow-xl">👑</div>
              <div className="mt-1 bg-indigo-700 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow border border-indigo-400/40">
                शहंशाह अकबर
              </div>
            </div>
            <div className="flex flex-col items-center animate-cartoon-breathe" style={{ animationDelay: '0.6s' }}>
              <div className="text-7xl sm:text-8xl filter drop-shadow-xl">💡</div>
              <div className="mt-1 bg-emerald-600 text-white font-black text-[11px] px-3 py-0.5 rounded-full shadow border border-emerald-400/40">
                बीरबल
              </div>
            </div>
          </div>
        )}

        {/* DEFAULT FALLBACK HERO ANIMAL/MASCOT IF NO SPECIFIC ANIMAL */}
        {!isLionPresent && !isMousePresent && !isRabbitPresent && !isTortoisePresent && !isMonkeyPresent && !isBearPresent && !isCrowPresent && !isCatPresent && !isAkbarBirbal && (
          <div className="absolute bottom-20 flex flex-col items-center animate-cartoon-breathe">
            <div className="text-7xl sm:text-8xl md:text-9xl filter drop-shadow-2xl">
              {storyItem?.emoji || '🦊'}
            </div>
            <div className="mt-1 bg-amber-500/90 text-slate-950 font-black text-xs px-4 py-1 rounded-full shadow-lg border border-amber-300">
              {storyItem?.title || 'कहानी पात्र'}
            </div>
          </div>
        )}
      </div>

      {/* 5. TOP SCENE PROMPT BADGE */}
      <div className="absolute top-16 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1.5 opacity-90 shadow-md">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
        <span>2D लाइव दृश्य {currentLineIndex + 1}/{totalLines} : {currentScene?.prompt?.slice(0, 32) || storyItem?.title}...</span>
      </div>
    </div>
  );
};
