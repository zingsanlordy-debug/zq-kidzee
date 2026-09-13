import React from 'react';
import { PoemItem } from '../../types';

interface PoemCartoonStageProps {
  poemItem?: PoemItem | null;
  currentLine: string;
  currentLineIndex: number;
}

export const PoemCartoonStage: React.FC<PoemCartoonStageProps> = ({
  poemItem,
  currentLine,
  currentLineIndex
}) => {
  const title = (poemItem?.title || '').toLowerCase();
  const text = (currentLine + ' ' + title).toLowerCase();

  const isFishPoem = title.includes('machhli') || text.includes('मछली') || text.includes('जल की रानी');
  const isHorsePoem = title.includes('lakdi') || title.includes('kaathi') || title.includes('ghoda') || text.includes('घोड़ा') || text.includes('काठी');
  const isButterflyPoem = title.includes('titli') || text.includes('तितली');
  const isTwinklePoem = title.includes('twinkle') || text.includes('star') || text.includes('तारे');
  const isPotatoPoem = title.includes('aloo') || text.includes('आलू') || text.includes('कचालू') || text.includes('बैंगन');
  const isTrainPoem = title.includes('rail') || title.includes('train') || text.includes('छुक-छुक') || text.includes('रेल');
  const isElephantPoem = title.includes('hathi') || text.includes('हाथी');
  const isMonkeyPoem = title.includes('bandar') || text.includes('बंदर');
  const isJohnyPoem = title.includes('johny') || text.includes('जॉनी') || text.includes('papa');

  return (
    <div className="w-full h-full relative overflow-hidden select-none">
      {/* ========================================================
          1. MACHHLI JAL KI RANI (LIVE UNDERWATER WORLD WITH BUBBLES)
         ======================================================== */}
      {isFishPoem && (
        <div className="w-full h-full bg-gradient-to-b from-cyan-400 via-blue-600 to-indigo-900 relative flex items-center justify-center overflow-hidden">
          {/* Animated Water Ripples on top */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_65%)] animate-water-ripples" />

          {/* Floating rising water bubbles */}
          <div className="absolute bottom-4 left-1/6 w-6 h-6 rounded-full bg-white/40 border border-white/70 animate-bubble-rise-1 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
          <div className="absolute bottom-2 left-1/3 w-8 h-8 rounded-full bg-white/30 border border-white/60 animate-bubble-rise-2 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          <div className="absolute bottom-6 right-1/4 w-5 h-5 rounded-full bg-white/45 border border-white/70 animate-bubble-rise-3 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
          <div className="absolute bottom-1 right-12 w-9 h-9 rounded-full bg-white/25 border border-white/50 animate-bubble-rise-1 shadow-[0_0_12px_rgba(255,255,255,0.4)]" style={{ animationDelay: '1.8s' }} />

          {/* Swaying seaweeds at bottom */}
          <div className="absolute bottom-0 left-6 text-6xl opacity-85 animate-leaf-sway">
            🪸
          </div>
          <div className="absolute bottom-0 left-28 text-5xl opacity-80 animate-leaf-sway" style={{ animationDelay: '0.8s' }}>
            🌿
          </div>
          <div className="absolute bottom-0 right-10 text-6xl opacity-85 animate-leaf-sway" style={{ animationDelay: '1.4s' }}>
            🪸
          </div>
          <div className="absolute bottom-0 right-36 text-5xl opacity-75 animate-leaf-sway" style={{ animationDelay: '2s' }}>
            🌱
          </div>

          {/* Queen Fish Swimming & Jumping */}
          <div className="flex flex-col items-center justify-center z-10 animate-swim">
            <div className="relative text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]">
              <span className="inline-block animate-tail-wag">🐟</span>
              {/* Crown for Jal Ki Rani */}
              <div className="absolute -top-6 left-1/3 text-4xl sm:text-5xl animate-bounce">
                👑
              </div>
            </div>
            {/* Water splash droplets */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl animate-ping">💦</span>
              <span className="bg-cyan-950/70 text-cyan-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-cyan-300/40 shadow-lg backdrop-blur-sm">
                मछली जल की रानी है • पानी में तैरती 🌊
              </span>
              <span className="text-xl animate-ping" style={{ animationDelay: '0.5s' }}>💦</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. LAKDI KI KAATHI (GALLOPING WOODEN HOBBY HORSE)
         ======================================================== */}
      {isHorsePoem && (
        <div className="w-full h-full bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 relative flex items-center justify-center overflow-hidden">
          {/* Sunny rays & rolling hills */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_60%)]" />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-emerald-600/80 rounded-t-[100px] border-t-4 border-emerald-400" />

          {/* Flying musical notes */}
          <div className="absolute top-10 left-12 text-5xl animate-bounce">🎵</div>
          <div className="absolute top-16 right-16 text-6xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎶</div>

          {/* Galloping Horse Figure */}
          <div className="flex flex-col items-center justify-center z-10 animate-gallop">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl">
              🐴
            </div>
            {/* Dust cloud under hooves */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl animate-ping">💨</span>
              <span className="bg-amber-950/70 text-amber-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-amber-300/40 shadow-lg backdrop-blur-sm">
                टक-बक टक-बक दौड़ा घोड़ा! 🐎
              </span>
              <span className="text-2xl animate-ping" style={{ animationDelay: '0.4s' }}>💨</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. TITLI UDI BUS ME CHADHI (FLAPPING BUTTERFLY & ROLLING BUS)
         ======================================================== */}
      {isButterflyPoem && (
        <div className="w-full h-full bg-gradient-to-b from-sky-400 via-pink-400 to-amber-300 relative flex items-center justify-center overflow-hidden">
          {/* Sunny sky & flower field */}
          <div className="absolute top-8 left-12 text-6xl animate-spin" style={{ animationDuration: '20s' }}>
            ☀️
          </div>
          <div className="absolute bottom-0 inset-x-0 h-24 bg-emerald-500/90 flex items-center justify-around text-4xl">
            <span>🌸</span><span>🌺</span><span>🌼</span><span>🌷</span><span>🌸</span>
          </div>

          {/* Rolling Bus on left/bottom */}
          <div className="absolute bottom-16 left-8 sm:left-16 text-6xl sm:text-7xl animate-wiggle filter drop-shadow-lg">
            🚌
          </div>

          {/* Flapping Butterfly flying center */}
          <div className="flex flex-col items-center justify-center z-10 animate-float">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl animate-butterfly-wing">
              🦋
            </div>
            <div className="mt-2 bg-pink-900/70 text-pink-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-pink-300/40 shadow-lg backdrop-blur-sm">
              तितली उड़ी बस में चढ़ी! 🌸
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. TWINKLE TWINKLE LITTLE STAR (COSMIC TWINKLING NIGHT)
         ======================================================== */}
      {isTwinklePoem && (
        <div className="w-full h-full bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 relative flex items-center justify-center overflow-hidden">
          {/* Multiple twinkling stars */}
          <div className="absolute top-10 left-12 text-3xl animate-star-twinkle-1 text-yellow-300">⭐</div>
          <div className="absolute top-20 left-1/4 text-4xl animate-star-twinkle-2 text-yellow-200">✨</div>
          <div className="absolute top-12 right-1/4 text-5xl animate-star-twinkle-3 text-amber-300">⭐</div>
          <div className="absolute top-28 right-12 text-3xl animate-star-twinkle-1 text-yellow-100">✨</div>
          <div className="absolute bottom-32 left-16 text-4xl animate-star-twinkle-2 text-yellow-300">⭐</div>
          <div className="absolute bottom-36 right-20 text-4xl animate-star-twinkle-3 text-amber-200">✨</div>

          {/* Giant Smiling Floating Golden Star */}
          <div className="flex flex-col items-center justify-center z-10 animate-float">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-[0_0_35px_#fde047] animate-cartoon-breathe">
              ⭐
            </div>
            <div className="mt-3 bg-indigo-900/80 text-yellow-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-yellow-400/40 shadow-xl backdrop-blur-sm">
              Like a diamond in the sky! 💎
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          5. ALOO KACHALOO / VEGETABLE PARTY (SPRING BOING DANCE)
         ======================================================== */}
      {isPotatoPoem && (
        <div className="w-full h-full bg-gradient-to-tr from-lime-400 via-amber-400 to-orange-400 relative flex items-center justify-center overflow-hidden">
          {/* Happy dancing vegetables */}
          <div className="absolute bottom-16 left-10 sm:left-20 text-7xl sm:text-8xl animate-spring-boing filter drop-shadow-xl" style={{ animationDelay: '0.3s' }}>
            🍆
          </div>
          <div className="absolute bottom-16 right-10 sm:right-20 text-7xl sm:text-8xl animate-spring-boing filter drop-shadow-xl" style={{ animationDelay: '0.6s' }}>
            🍅
          </div>

          <div className="flex flex-col items-center justify-center z-10 animate-spring-boing">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl">
              🥔
            </div>
            <div className="mt-2 bg-amber-950/70 text-amber-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-amber-300/40 shadow-lg backdrop-blur-sm">
              आलू कचालू बेटा नाच रहे थे! 🕺
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          6. TRAIN / CHUK CHUK RAIL
         ======================================================== */}
      {isTrainPoem && (
        <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-sky-400 to-indigo-500 relative flex items-center justify-center overflow-hidden">
          {/* Steam puffs rising */}
          <div className="absolute top-16 left-1/3 text-4xl animate-float opacity-80">💨</div>
          <div className="absolute top-8 left-1/2 text-5xl animate-float opacity-70" style={{ animationDelay: '0.7s' }}>💨</div>

          <div className="flex flex-col items-center justify-center z-10 animate-wiggle">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl">
              🚂
            </div>
            <div className="mt-2 bg-indigo-950/70 text-sky-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-sky-300/40 shadow-lg backdrop-blur-sm">
              छुक-छुक करती आई रेल! 🎫
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          7. HATHI RAJA KAHAN CHALE
         ======================================================== */}
      {isElephantPoem && (
        <div className="w-full h-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-emerald-400 relative flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center justify-center z-10 animate-gallop">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl">
              🐘
            </div>
            <div className="mt-2 bg-amber-950/70 text-amber-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-amber-300/40 shadow-lg backdrop-blur-sm">
              हाथी राजा सूंड हिलाकर चले! 👑
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          8. BANDAR MAMA PEHEN PAJAMA
         ======================================================== */}
      {isMonkeyPoem && (
        <div className="w-full h-full bg-gradient-to-b from-orange-400 via-amber-300 to-yellow-400 relative flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center justify-center z-10 animate-spring-boing">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl">
              🐒
            </div>
            <div className="mt-2 bg-amber-950/70 text-yellow-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-yellow-300/40 shadow-lg backdrop-blur-sm">
              बंदर मामा पहन पजामा दावत खाने आए! 🥟
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          9. JOHNY JOHNY YES PAPA
         ======================================================== */}
      {isJohnyPoem && (
        <div className="w-full h-full bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-300 relative flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center justify-center z-10 animate-spring-boing">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl">
              👶
            </div>
            <div className="mt-2 bg-rose-950/70 text-pink-200 font-black text-xs sm:text-sm px-4 py-1 rounded-full border border-pink-300/40 shadow-lg backdrop-blur-sm">
              Eating sugar? No, Papa! Ha! Ha! Ha! 🍬
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          10. DEFAULT POEM FALLBACK PLAYGROUND
         ======================================================== */}
      {!isFishPoem && !isHorsePoem && !isButterflyPoem && !isTwinklePoem && !isPotatoPoem && !isTrainPoem && !isElephantPoem && !isMonkeyPoem && !isJohnyPoem && (
        <div className="w-full h-full bg-gradient-to-tr from-pink-500 via-amber-400 to-sky-500 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)]" />
          <div className="absolute top-10 left-12 text-6xl animate-bounce">🌈</div>
          <div className="absolute top-12 right-16 text-5xl animate-spin" style={{ animationDuration: '15s' }}>☀️</div>
          <div className="absolute bottom-16 left-16 text-5xl animate-pulse">🎵</div>
          <div className="absolute bottom-20 right-20 text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎶</div>

          <div className="flex flex-col items-center justify-center z-10 animate-spring-boing">
            <div className="text-8xl sm:text-9xl md:text-[11rem] filter drop-shadow-2xl">
              {poemItem?.emoji || '🎵'}
            </div>
            <div className="mt-3 bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-black text-xs sm:text-sm shadow-md border border-white/40">
              {poemItem?.title || 'बाल-गीत'} • लाइव 2D कविता
            </div>
          </div>
        </div>
      )}

      {/* Dark bottom gradient scrim for lyrics readability */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
    </div>
  );
};
