import React, { useState } from 'react';
import { Bot, Send, Sparkles, Volume2, Copy, Check, User, RefreshCw } from 'lucide-react';
import { speakHindiText } from '../utils/audioSynth';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

const QUICK_PROMPTS = [
  "10वीं गणित के महत्वपूर्ण सूत्र व पाइथागोरस प्रमेय समझाइए",
  "UPSC प्रीलिम्स के लिए प्राचीन भारत के मुख्य स्रोत क्या हैं?",
  "सिंधु घाटी सभ्यता की 5 मुख्य विशेषताएं बताइए",
  "Spoken English: Daily use 10 conversation sentences with Hindi meaning",
  "बच्चों के लिए एक छोटी प्रेरक कहानी और उसकी सीख"
];

export const AiTutorChat: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m_welcome",
      sender: "ai",
      text: "नमस्ते! 🙏 मैं आपका ZQ AI शिक्षक (AI Guru) हूँ। आप मुझसे कक्षा 1 से 12 NCERT, कॉलेज, UPSC, SSC, रेलवे, बैंकिंग, व्याकरण या अंग्रेजी बोलने से संबंधित कोई भी सवाल पूछ सकते हैं।",
      time: "अभी"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputQuery;
    if (!promptToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: "u_" + Date.now(),
      sender: "user",
      text: promptToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend.trim(),
          language: currentLang
        })
      });

      const data = await response.json();
      const aiReply = data.answer || "माफ़ कीजिए, उत्तर प्राप्त करने में समस्या आई। कृपया पुनः प्रयास करें।";

      const aiMsg: Message = {
        id: "ai_" + Date.now(),
        sender: "ai",
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: "ai_err_" + Date.now(),
          sender: "ai",
          text: "नेटवर्क त्रुटि या सर्वर व्यस्त है। कृपया कुछ क्षणों बाद प्रयास करें।",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-purple-300 flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight flex items-center gap-1.5">
              ZQ 24/7 AI शिक्षक (AI Guru)
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            </h3>
            <p className="text-[11px] text-slate-500">
              NCERT, UPSC, प्रतियोगी परीक्षा व भाषा मार्गदर्शन ({currentLang})
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: "m_welcome_reset",
                sender: "ai",
                text: "नमस्ते! नई बातचीत शुरू हो गई है। पूछिए अपना सवाल!",
                time: "अभी"
              }
            ]);
          }}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          title="नया चैट"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="py-2 overflow-x-auto flex gap-1.5 scrollbar-none shrink-0 border-b border-purple-50">
        {QUICK_PROMPTS.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            disabled={isLoading}
            className="text-[10px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-full whitespace-nowrap active:scale-95 transition-all"
          >
            💡 {qp}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-xs mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed relative ${
                  isAi
                    ? 'bg-purple-50/90 text-slate-900 border border-purple-200/80 rounded-tl-xs'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                <div className={`flex items-center justify-between mt-2 pt-1 border-t text-[10px] ${
                  isAi ? 'border-purple-200/60 text-slate-400' : 'border-white/20 text-purple-200'
                }`}>
                  <span>{m.time}</span>
                  {isAi && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => speakHindiText(m.text)}
                        className="p-1 hover:text-purple-700"
                        title="सुनें (Audio)"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => copyText(m.id, m.text)}
                        className="p-1 hover:text-purple-700 flex items-center gap-0.5"
                        title="Copy"
                      >
                        {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {!isAi && (
                <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-purple-600 p-2 animate-pulse">
            <Bot className="w-4 h-4" />
            <span>AI शिक्षक सोच रहे हैं और उत्तर तैयार कर रहे हैं...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 border-t border-purple-100 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="AI गुरु से कोई भी सवाल पूछें (Ask any question)..."
          className="flex-1 border border-purple-300 rounded-full px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50/30"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white p-2 rounded-full shadow-xs active:scale-95 transition-transform"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
