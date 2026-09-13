import React, { useState, useMemo } from 'react';
import { ALL_33_DICTIONARY_WORDS, getWordOfTheDay, Dict33Word } from '../data/dictionary33Data';
import { GRAMMAR_10_POINTS } from '../data/educationData';
import { speakLangText, stopAllAudio } from '../utils/audioSynth';
import { SUPPORTED_33_LANGUAGES, getLanguageByCode } from '../data/languages';
import {
  Search,
  Volume2,
  BookA,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Globe,
  Star
} from 'lucide-react';

interface DictionaryAndGrammarProps {
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const DictionaryAndGrammar: React.FC<DictionaryAndGrammarProps> = ({
  currentLanguage = 'hi',
  onLanguageChange,
  isFullScreen = false,
  onToggleFullScreen
}) => {
  const [activeTab, setActiveTab] = useState<'dictionary' | 'grammar'>('dictionary');
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [localLang, setLocalLang] = useState<string>(currentLanguage);
  const [internalFullScreen, setInternalFullScreen] = useState(false);

  // Sync prop changes
  const activeLangCode = currentLanguage || localLang;
  const activeLangInfo = getLanguageByCode(activeLangCode);

  const wordOfTheDay = useMemo(() => getWordOfTheDay(), []);

  // Filter words: either by letter, or across whole dictionary if searching
  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      return ALL_33_DICTIONARY_WORDS.filter(w => {
        const meaningInLang = (w.meanings as any)[activeLangCode] || w.meanings.hi || '';
        return (
          w.word.toLowerCase().includes(q) ||
          meaningInLang.toLowerCase().includes(q) ||
          w.meanings.hi.toLowerCase().includes(q)
        );
      });
    }
    return ALL_33_DICTIONARY_WORDS.filter(w => w.letter === selectedLetter);
  }, [selectedLetter, searchQuery, activeLangCode]);

  const itemsPerPage = 24;
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentWords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWords.slice(start, start + itemsPerPage);
  }, [filteredWords, currentPage]);

  const handleLetterSelect = (ltr: string) => {
    setSelectedLetter(ltr);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleLangSelect = (code: string) => {
    setLocalLang(code);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  const effectiveFullScreen = isFullScreen || internalFullScreen;
  const toggleFull = () => {
    if (onToggleFullScreen) {
      onToggleFullScreen();
    } else {
      setInternalFullScreen(!internalFullScreen);
    }
  };

  const containerClasses = effectiveFullScreen
    ? "fixed inset-0 z-50 w-screen h-screen bg-white overflow-y-auto p-4 sm:p-6"
    : "bg-white rounded-3xl p-4 shadow-md border-2 border-emerald-200";

  return (
    <div className={containerClasses}>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-100 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {effectiveFullScreen && (
            <button
              onClick={toggleFull}
              className="mr-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>वापस जाएं (Back)</span>
            </button>
          )}

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs">
            <BookA className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                33 भाषा शब्दकोश (2,600+ A-Z Words) &amp; व्याकरण
              </h3>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                100+ Words / Letter
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              चयनित भाषा: <b className="text-emerald-700">{activeLangInfo.nativeName} ({activeLangInfo.name})</b> • D अक्षर सहित A से Z तक
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* 33 Languages Dropdown */}
          <div className="relative">
            <select
              value={activeLangCode}
              onChange={(e) => handleLangSelect(e.target.value)}
              className="appearance-none bg-emerald-50 border border-emerald-300 rounded-full pl-7 pr-4 py-1.5 text-xs font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {SUPPORTED_33_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-emerald-700 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Full Screen Toggle */}
          <button
            onClick={toggleFull}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-transform"
            title={effectiveFullScreen ? "Exit Fullscreen" : "Fullscreen (100vw, 100vh)"}
          >
            {effectiveFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-emerald-50 p-1 rounded-2xl border border-emerald-200">
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dictionary'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              📖 A-Z शब्दकोश
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'grammar'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-teal-900 hover:bg-teal-100'
              }`}
            >
              📝 10 व्याकरण बिंदु
            </button>
          </div>
        </div>
      </div>

      {/* DICTIONARY TAB CONTENT */}
      {activeTab === 'dictionary' && (
        <div className="mt-3 space-y-3">
          {/* Word of the Day Banner */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-3 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="p-2 bg-white/20 rounded-xl">
                <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                    आज का शब्द (Word of the Day)
                  </span>
                  <span className="text-xs bg-emerald-950/40 px-2 py-0.5 rounded-md text-emerald-200">
                    Letter {wordOfTheDay.letter}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <h4 className="text-lg font-black">{wordOfTheDay.word}</h4>
                  <span className="text-sm font-bold text-yellow-200">
                    = {(wordOfTheDay.meanings as any)[activeLangCode] || wordOfTheDay.meanings.hi}
                  </span>
                  <span className="text-[11px] opacity-80 italic">({wordOfTheDay.partOfSpeech})</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const meaning = (wordOfTheDay.meanings as any)[activeLangCode] || wordOfTheDay.meanings.hi;
                speakLangText(`${wordOfTheDay.word} means ${meaning}`, activeLangCode);
              }}
              className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-yellow-100 active:scale-95 transition-all shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>उच्चारण सुनें (Pronounce)</span>
            </button>
          </div>

          {/* Search Box & Summary Bar */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={`शब्द या अर्थ खोजें (जैसे: Danger, Apple, Cat, नमस्ते, 33 भाषा में)...`}
                className="w-full border border-emerald-300 rounded-full pl-9 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 font-medium"
              />
              <Search className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-2 rounded-full whitespace-nowrap">
                कुल शब्द: {filteredWords.length}
              </span>
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-full whitespace-nowrap">
                अक्षर '{selectedLetter}': {ALL_33_DICTIONARY_WORDS.filter(w => w.letter === selectedLetter).length} शब्द
              </span>
            </div>
          </div>

          {/* A to Z Quick Selector Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-y border-slate-100">
            {ALPHABETS.map((ltr) => {
              const count = ALL_33_DICTIONARY_WORDS.filter(w => w.letter === ltr).length;
              const isSelected = selectedLetter === ltr && !searchQuery;
              return (
                <button
                  key={ltr}
                  onClick={() => handleLetterSelect(ltr)}
                  className={`min-w-[34px] h-[36px] rounded-xl text-xs font-black flex flex-col items-center justify-center transition-all shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs scale-105 ring-2 ring-emerald-300'
                      : 'bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  title={`Letter ${ltr}: ${count} Words`}
                >
                  <span className="leading-none">{ltr}</span>
                  <span className="text-[8px] opacity-70 leading-none mt-0.5">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Words Grid Display */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 overflow-y-auto pr-1 ${
            effectiveFullScreen ? 'max-h-[calc(100vh-320px)]' : 'max-h-[420px]'
          }`}>
            {currentWords.map((word) => {
              const currentMeaning = (word.meanings as any)[activeLangCode] || word.meanings.hi || word.meanings.en;
              const hindiMeaning = word.meanings.hi;
              return (
                <div
                  key={word.id}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50/90 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex items-start justify-between gap-2 shadow-2xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] text-slate-400 font-mono">#{word.id}</span>
                      <h4 className="text-sm font-black text-slate-900">{word.word}</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                        {word.partOfSpeech}
                      </span>
                    </div>

                    {/* Selected 33 Language Meaning */}
                    <div className="mt-1">
                      <p className="text-xs font-bold text-emerald-950 flex items-baseline gap-1">
                        <span className="text-[10px] text-emerald-700 uppercase font-mono font-normal">
                          [{activeLangCode}]:
                        </span>
                        <span>{currentMeaning}</span>
                      </p>
                      {activeLangCode !== 'hi' && (
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          हिन्दी: {hindiMeaning}
                        </p>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-500 mt-1 italic line-clamp-1">
                      {word.example}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      speakLangText(`${word.word}। ${currentMeaning}`, activeLangCode);
                    }}
                    className="p-2 text-emerald-700 hover:text-white bg-emerald-100 hover:bg-emerald-600 rounded-xl transition-colors active:scale-95 shrink-0"
                    title={`Pronounce in ${activeLangInfo.name}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
            <span>
              पेज <b>{currentPage}</b> of <b>{totalPages || 1}</b> (कुल {filteredWords.length} शब्द)
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-100 flex items-center gap-1 font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>पिछला</span>
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-100 flex items-center gap-1 font-bold"
              >
                <span>अगला</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRAMMAR TAB CONTENT */}
      {activeTab === 'grammar' && (
        <div className="mt-3 space-y-2.5 animate-in fade-in duration-150">
          <div className="bg-teal-50 p-2.5 rounded-2xl border border-teal-200 flex items-center gap-2 text-xs text-teal-900 font-semibold">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              हिंदी व्याकरण के 10 मुख्य बिंदु (Education Section remains Hindi + English as required):
            </span>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto pr-1 ${
            effectiveFullScreen ? 'max-h-[calc(100vh-220px)]' : 'max-h-[420px]'
          }`}>
            {GRAMMAR_10_POINTS.map((item) => (
              <div
                key={item.no}
                className="p-3 bg-white rounded-2xl border border-teal-200 shadow-xs hover:border-teal-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                    बिंदु {item.no}
                  </span>
                  <button
                    onClick={() => speakLangText(`${item.title}। ${item.rule}। ${item.types}`, 'hi')}
                    className="text-teal-600 hover:text-teal-800 p-1"
                    title="सुनें"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-sm font-black text-slate-900 mt-1.5">{item.title}</h4>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  <b>परिभाषा:</b> {item.rule}
                </p>
                <p className="text-[11px] text-teal-700 mt-1.5 bg-teal-50/70 p-2 rounded-xl border border-teal-100">
                  {item.types}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
