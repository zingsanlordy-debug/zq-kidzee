import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivatePremium: () => void;
  isPremium: boolean;
  lockReason?: string;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  onActivatePremium,
  isPremium,
  lockReason
}) => {
  const [copied, setCopied] = useState(false);
  const upiId = "zq-zingsan-studio@ybl";

  if (!isOpen) return null;

  const handlePay = (amount: number, planName: string) => {
    const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("ZQ KIDZEE")}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Premium ${planName}`)}`;
    
    // Attempt to open UPI handler on mobile
    window.location.href = upiLink;

    setTimeout(() => {
      const confirmed = window.confirm(`क्या आपने ₹${amount} (${planName}) का भुगतान कर दिया है? \n\n'OK' दबाने पर विज्ञापन तुरंत हट जाएंगे और VIP ऐक्सेस सक्रिय हो जाएगा!`);
      if (confirmed) {
        onActivatePremium();
        onClose();
      }
    }, 1000);
  };

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="prem" className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md text-center shadow-2xl border border-amber-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-20 h-20 mx-auto mb-3">
          <img
            src="/logo.png"
            alt="ZQ Kidzee Logo"
            className="w-full h-full object-cover rounded-3xl shadow-lg border-2 border-amber-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute -bottom-1 -right-1 bg-amber-400 p-1.5 rounded-full shadow-md text-slate-950">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-full border border-emerald-300 shadow-2xs mb-2">
          <span>🚫 100% NO ADS • VIP UNLOCK</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
          ZQ 💗 KIDZEE 🤹 &amp; EDUCATION 📚
        </h2>
        <p className="text-xs font-bold text-amber-700 mt-0.5">
          💎 सम्पूर्ण पोर्टल VIP अनलॉक
        </p>
        {lockReason ? (
          <div className="mt-2 p-2.5 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 text-xs font-bold">
            🔒 {lockReason}
          </div>
        ) : (
          <p className="text-xs text-slate-500 mt-1">
            प्रीमियम लो और 100+ कहानियाँ, लोरियां व बाल गीत सुनो! 100% विज्ञापन-मुक्त!
          </p>
        )}

        {isPremium ? (
          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-600" />
            <div className="text-left text-xs font-semibold">
              <p className="text-sm font-bold">बधाई! आपका VIP Premium सक्रिय है 👑</p>
              <p className="text-emerald-600">सभी विज्ञापन हटा दिए गए हैं।</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-2.5 text-left">
            {/* Plan 1 */}
            <div
              onClick={() => handlePay(49, "1 Month")}
              className="group border-2 border-orange-400 hover:border-orange-500 bg-orange-50/50 hover:bg-orange-100/50 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]"
            >
              <div>
                <span className="font-bold text-slate-800 text-sm block">₹49 / महीना (Monthly)</span>
                <span className="text-[11px] text-slate-500">छोटे बजट में विज्ञापन मुक्त पढ़ाई</span>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-md shadow-orange-300 group-hover:scale-105 transition-transform">
                PAY ₹49
              </button>
            </div>

            {/* Plan 2 */}
            <div
              onClick={() => handlePay(299, "3 Months")}
              className="group border-2 border-purple-500 hover:border-purple-600 bg-purple-50/50 hover:bg-purple-100/50 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] relative overflow-hidden"
            >
              <div className="absolute top-0 right-14 bg-purple-600 text-white text-[9px] px-2 py-0.5 rounded-b-md font-bold">
                POPULAR
              </div>
              <div>
                <span className="font-bold text-slate-800 text-sm block">₹299 / 3 महीने (Quarterly)</span>
                <span className="text-[11px] text-slate-500">एग्जाम सीजन के लिए सबसे श्रेष्ठ</span>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-md shadow-purple-300 group-hover:scale-105 transition-transform">
                PAY ₹299
              </button>
            </div>

            {/* Plan 3 */}
            <div
              onClick={() => handlePay(599, "Lifetime")}
              className="group border-2 border-amber-500 hover:border-amber-600 bg-amber-50/70 hover:bg-amber-100/60 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]"
            >
              <div>
                <span className="font-bold text-slate-900 text-sm block">₹599 आजीवन (Lifetime VIP)</span>
                <span className="text-[11px] text-amber-700 font-medium">एक बार भुगतान, हमेशा के लिए नो-ऐड्स!</span>
              </div>
              <button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-md shadow-yellow-300 group-hover:scale-105 transition-transform">
                PAY ₹599
              </button>
            </div>
          </div>
        )}

        {/* UPI Details */}
        <div className="mt-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="font-semibold">UPI ID:</span>
            <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800 font-mono text-[11px]">{upiId}</code>
          </div>
          <button
            onClick={copyUPI}
            className="flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-purple-100 px-2 py-1 rounded-md active:scale-95 transition-all"
          >
            {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>सुरक्षित UPI पेमेंट (GPay / PhonePe / Paytm / BHIM)</span>
          <button onClick={onClose} className="underline hover:text-slate-600">
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
