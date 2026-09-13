import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdBannersProps {
  isPremium: boolean;
  onOpenPremium: () => void;
}

export const TopAdBanner: React.FC<AdBannersProps> = ({ isPremium, onOpenPremium }) => {
  if (isPremium) {
    return (
      <div id="adTop" className="bg-gradient-to-r from-amber-500/10 via-yellow-400/15 to-amber-500/10 py-1.5 px-3 text-center sticky top-0 z-40 border-b border-amber-200/60 backdrop-blur-xs flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>👑 ZQ VIP Premium सक्रिय - विज्ञापन पूरी तरह बंद हैं!</span>
        </div>
      </div>
    );
  }

  return (
    <div id="adTop" className="bg-white/95 py-1.5 px-3 text-center sticky top-0 z-40 shadow-xs border-b border-slate-200 backdrop-blur-xs">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 via-indigo-50 to-pink-50 border border-blue-200 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden text-left">
          <span className="bg-blue-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded tracking-wider uppercase shrink-0">
            Ad
          </span>
          <p className="text-[11px] font-semibold text-slate-700 truncate">
            🚀 <b>BYJU&apos;S / Unacademy Top Mentors Batch</b>: NCERT & UPSC Foundation Live Classes (₹15 - ₹50)
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => alert("Redirecting to Educational Learning Partner...")}
            className="text-[10px] text-blue-700 font-bold hover:underline flex items-center gap-0.5"
          >
            Learn <ExternalLink className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={onOpenPremium}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs transition-transform active:scale-95"
            title="Remove ads with Premium"
          >
            ❌ No Ads
          </button>
        </div>
      </div>
    </div>
  );
};

export const BottomAdBanner: React.FC<AdBannersProps> = ({ isPremium, onOpenPremium }) => {
  if (isPremium) return null;

  return (
    <div id="adBottom" className="fixed bottom-0 left-0 right-0 w-full bg-white/95 border-t border-slate-200 p-2 text-center shadow-lg z-40 backdrop-blur-xs">
      <div className="max-w-3xl mx-auto bg-slate-100/90 border border-slate-300/80 rounded-xl px-3 py-2 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded uppercase">
            Sponsored
          </span>
          <span className="font-semibold text-slate-700">
            📚 NCERT + State Board Formula Books 50% Cashback Discount!
          </span>
        </div>
        <button
          onClick={onOpenPremium}
          className="text-[10px] font-bold text-purple-700 hover:text-purple-900 underline"
        >
          हटाएं (Remove Ad 💎)
        </button>
      </div>
    </div>
  );
};
