import React from 'react';
import { LoriItem } from '../../types';
import { Heart } from 'lucide-react';

interface LoriCartoonStageProps {
  loriItem?: LoriItem | null;
  currentLine: string;
  currentLineIndex: number;
}

export const LoriCartoonStage: React.FC<LoriCartoonStageProps> = ({
  loriItem,
  currentLine,
  currentLineIndex
}) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-950 via-indigo-950 to-blue-950 relative flex items-center justify-center overflow-hidden select-none">
      {/* 1. LAYER: CELESTIAL STARRY NIGHT SKY WITH TWINKLING STARS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Softly swaying smiling Crescent Moon with celestial golden halo */}
        <div className="absolute top-8 right-8 sm:right-16 text-7xl sm:text-8xl md:text-9xl filter drop-shadow-[0_0_35px_#fde047] animate-moon-sway">
          🌙
          {/* Gentle sleepy eyes detail */}
          <div className="absolute top-10 left-6 text-xs text-amber-900/60 font-mono">
            💤
          </div>
        </div>

        {/* Twinkling stars slowly pulsing */}
        <div className="absolute top-10 left-12 text-3xl sm:text-4xl text-yellow-300 animate-star-twinkle-1">
          ⭐
        </div>
        <div className="absolute top-28 left-1/4 text-2xl sm:text-3xl text-amber-200 animate-star-twinkle-2">
          ✨
        </div>
        <div className="absolute top-16 right-1/3 text-4xl text-yellow-200 animate-star-twinkle-3">
          ⭐
        </div>
        <div className="absolute top-36 right-20 text-2xl text-amber-300 animate-star-twinkle-1">
          ✨
        </div>
        <div className="absolute bottom-40 left-16 text-3xl text-yellow-300 animate-star-twinkle-2">
          ⭐
        </div>
        <div className="absolute bottom-48 right-1/4 text-2xl text-amber-100 animate-star-twinkle-3">
          ✨
        </div>

        {/* Soft night clouds slowly drifting across */}
        <div className="absolute top-24 left-10 text-6xl sm:text-7xl opacity-35 animate-breeze-drift filter blur-[0.5px]">
          ☁️
        </div>
        <div className="absolute top-36 right-24 text-7xl sm:text-8xl opacity-30 animate-breeze-drift filter blur-[0.5px]" style={{ animationDelay: '4s' }}>
          ☁️
        </div>

        {/* Floating dream fireflies */}
        <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 rounded-full bg-amber-300 animate-star-twinkle-1 shadow-[0_0_10px_#fde047]" />
        <div className="absolute bottom-44 right-1/3 w-2 h-2 rounded-full bg-yellow-200 animate-star-twinkle-2 shadow-[0_0_8px_#facc15]" />
      </div>

      {/* 2. LAYER: COZY ROCKING CRADLE WITH SLEEPING BABY (60 BPM TRANQUIL) */}
      <div className="flex flex-col items-center justify-center z-10 animate-cradle">
        {/* Soft dreamy halo behind baby */}
        <div className="absolute w-44 h-44 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

        {/* Baby in Cradle with gentle breathing */}
        <div className="relative text-8xl sm:text-9xl md:text-[10rem] filter drop-shadow-[0_12px_28px_rgba(255,255,255,0.35)] animate-cartoon-breathe">
          👶
          {/* Cradle bedding emoji */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl opacity-90">
            🛏️
          </div>
        </div>

        {/* Mother's lullaby badge */}
        <div className="mt-5 bg-indigo-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-indigo-200 font-black text-xs sm:text-sm border border-indigo-400/40 shadow-xl flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          <span>माँ की मीठी लोरी • 60 BPM शांत निद्रा</span>
        </div>
      </div>

      {/* 3. LAYER: DARK GRADIENT SCRIM FOR HIGH-CONTRAST CAPTIONS */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
    </div>
  );
};
