import React, { useState } from 'react';
import { Search, Globe, X, BookOpen, Music, Palette, Sparkles, ArrowRight } from 'lucide-react';
import { STORY_VIDEOS, LORI_LIST, POEM_LIST, SKETCH_LIST } from '../data/kidzeeData';
import { LEARNING_ITEMS } from '../data/kidsLearningData';
import { SUPPORTED_33_LANGUAGES } from '../data/languages';

interface BharatKhojSearchProps {
  currentLang: string;
  onLangChange: (langCode: string) => void;
  onSelectStory?: (id: number) => void;
  onSelectLori?: (id: number) => void;
  onSelectPoem?: (id: number) => void;
  onSelectSketch?: (id: number) => void;
}

export const BharatKhojSearch: React.FC<BharatKhojSearchProps> = ({
  currentLang,
  onLangChange,
  onSelectStory,
  onSelectLori,
  onSelectPoem,
  onSelectSketch,
}) => {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const trimmed = query.trim().toLowerCase();

  const matchedStories = trimmed ? STORY_VIDEOS.filter(s => s.title.toLowerCase().includes(trimmed) || s.summary.toLowerCase().includes(trimmed)) : [];
  const matchedLoris = trimmed ? LORI_LIST.filter(l => l.title.toLowerCase().includes(trimmed) || l.hindiLyrics.toLowerCase().includes(trimmed)) : [];
  const matchedPoems = trimmed ? POEM_LIST.filter(p => p.title.toLowerCase().includes(trimmed) || p.lyrics.toLowerCase().includes(trimmed)) : [];
  const matchedSketches = trimmed ? SKETCH_LIST.filter(k => k.name.toLowerCase().includes(trimmed) || k.category.toLowerCase().includes(trimmed)) : [];
  const matchedLearning = trimmed ? LEARNING_ITEMS.filter(c => c.name.toLowerCase().includes(trimmed) || c.hindiName.toLowerCase().includes(trimmed)) : [];

  const totalResults = matchedStories.length + matchedLoris.length + matchedPoems.length + matchedSketches.length + matchedLearning.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(true);
    }
  };

  return (
    <div className="relative z-30">
      {/* Search Bar Bar Container */}
      <div className="m-3 bg-white rounded-2xl p-2.5 shadow-md border border-amber-200/80 flex items-center gap-2">
        <div className="relative shrink-0">
          <select
            id="lang"
            value={currentLang}
            onChange={(e) => onLangChange(e.target.value)}
            className="appearance-none bg-amber-50/90 border border-amber-300 rounded-full pl-7 pr-3 py-1.5 text-[11px] font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            {SUPPORTED_33_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
          <Globe className="w-3.5 h-3.5 text-amber-700 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-1">
          <input
            id="bSearch"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim().length > 1) {
                setIsSearchOpen(true);
              }
            }}
            onFocus={() => {
              if (query.trim().length > 0) setIsSearchOpen(true);
            }}
            placeholder="Bharat Khoj - Google Jaisa (Search NCERT, Kahani, GK, Dictionary...)"
            className="w-full border border-slate-300 rounded-full px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsSearchOpen(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 shrink-0 transition-transform"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">खोजें</span>
          </button>
        </form>
      </div>

      {/* Instant Search Results Dropdown Modal */}
      {isSearchOpen && trimmed && (
        <div className="mx-3 bg-white rounded-2xl shadow-xl border border-purple-200 p-4 mb-3 max-h-[420px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                🔍 Bharat Khoj
              </span>
              <span className="text-xs text-slate-500">
                &ldquo;{query}&rdquo; के लिए <b>{totalResults}</b> परिणाम मिले:
              </span>
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-0.5"
            >
              <X className="w-3.5 h-3.5" /> बंद करें
            </button>
          </div>

          {totalResults === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              <p>कोई सीधा परिणाम नहीं मिला। कृपया दूसरा शब्द खोजें या AI गुरु से पूछें!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Stories */}
              {matchedStories.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> कहानियाँ (Kidzee Stories)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {matchedStories.slice(0, 4).map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          if (onSelectStory) onSelectStory(s.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-2 bg-orange-50/70 hover:bg-orange-100 rounded-xl cursor-pointer border border-orange-200 flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span>{s.emoji}</span> {s.title}
                        </span>
                        <ArrowRight className="w-3 h-3 text-orange-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lori */}
              {matchedLoris.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Music className="w-3.5 h-3.5" /> लोरियां (Lori)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {matchedLoris.slice(0, 4).map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          if (onSelectLori) onSelectLori(l.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-2 bg-pink-50/70 hover:bg-pink-100 rounded-xl cursor-pointer border border-pink-200 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-slate-800">🌙 {l.title}</span>
                        <ArrowRight className="w-3 h-3 text-pink-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Poems */}
              {matchedPoems.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Music className="w-3.5 h-3.5" /> बाल कविताएँ (Poem)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {matchedPoems.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          if (onSelectPoem) onSelectPoem(p.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-2 bg-purple-50/70 hover:bg-purple-100 rounded-xl cursor-pointer border border-purple-200 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-slate-800">{p.emoji} {p.title}</span>
                        <ArrowRight className="w-3 h-3 text-purple-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sketches */}
              {matchedSketches.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Palette className="w-3.5 h-3.5" /> स्केच व ड्राइंग (Sketches)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {matchedSketches.slice(0, 6).map((k) => (
                      <div
                        key={k.id}
                        onClick={() => {
                          if (onSelectSketch) onSelectSketch(k.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-1.5 bg-emerald-50/70 hover:bg-emerald-100 rounded-xl cursor-pointer border border-emerald-200 text-center text-[11px]"
                      >
                        <span className="text-base block">{k.emoji}</span>
                        <span className="font-bold text-slate-800 truncate block">{k.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning / Sikho Items */}
              {matchedLearning.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> सीखें व ज्ञान (Sikho)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {matchedLearning.slice(0, 6).map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          const el = document.getElementById('kidzee-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-1.5 bg-amber-50/80 hover:bg-amber-100 rounded-xl cursor-pointer border border-amber-200 text-center text-[11px]"
                      >
                        <span className="text-base block">{cat.emoji}</span>
                        <span className="font-bold text-slate-800 truncate block">{cat.hindiName} ({cat.name})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
