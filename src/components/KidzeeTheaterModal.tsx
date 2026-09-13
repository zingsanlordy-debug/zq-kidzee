import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StoryItem, LoriItem, PoemItem } from '../types';
import {
  kidzeeAudio,
  stopAllAudio,
  SoundFxType
} from '../utils/audioSynth';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  ChevronLeft,
  Repeat,
  HelpCircle,
  Award
} from 'lucide-react';
import { getStorySceneForLine } from '../data/storyScenesData';
import { StoryCartoonStage } from './theater/StoryCartoonStage';
import { PoemCartoonStage } from './theater/PoemCartoonStage';
import { LoriCartoonStage } from './theater/LoriCartoonStage';
import {
  getTranslatedStory,
  getTranslatedLori,
  getTranslatedPoem,
  getUiString
} from '../utils/translationHelper';

interface KidzeeTheaterModalProps {
  isOpen: boolean;
  mode: 'story' | 'lori' | 'poem';
  storyItem?: StoryItem | null;
  poemItem?: PoemItem | null;
  loriItem?: LoriItem | null;
  currentLanguage?: string;
  onClose: () => void;
}

export const KidzeeTheaterModal: React.FC<KidzeeTheaterModalProps> = ({
  isOpen,
  mode,
  storyItem,
  poemItem,
  loriItem,
  currentLanguage = 'hi',
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [bgVolume, setBgVolume] = useState(0.15); // 15% soft background volume for clear voice narration
  const [isInfiniteLoop, setIsInfiniteLoop] = useState(mode === 'lori');
  const [activeStoryPart, setActiveStoryPart] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showCelebration, setShowCelebration] = useState(false);

  const timerRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;

  const currentLineIndexRef = useRef(currentLineIndex);
  currentLineIndexRef.current = currentLineIndex;

  // Translated item objects
  const transStory = storyItem ? getTranslatedStory(storyItem, currentLanguage) : null;
  const transPoem = poemItem ? getTranslatedPoem(poemItem, currentLanguage) : null;
  const transLori = loriItem ? getTranslatedLori(loriItem, currentLanguage) : null;

  const activeTitle =
    mode === 'story'
      ? transStory?.title || storyItem?.title || ''
      : mode === 'poem'
      ? transPoem?.title || poemItem?.title || ''
      : transLori?.title || loriItem?.title || '';

  const activeMoral = transStory?.moral || storyItem?.moral || '';
  const activeQuestions = transStory?.questions || storyItem?.questions;

  const linesRef = useRef(lines);
  linesRef.current = lines;

  // Prepare lines array depending on active item and selected language
  useEffect(() => {
    if (!isOpen) {
      stopAllAudio();
      setIsPlaying(false);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      return;
    }

    let preparedLines: string[] = [];

    if (mode === 'story' && transStory) {
      if (transStory.lines && transStory.lines.length > 0) {
        preparedLines = transStory.lines;
      } else if (storyItem?.lines && storyItem.lines.length > 0) {
        preparedLines = storyItem.lines;
      } else {
        const full = `${transStory.title}। ${transStory.summary}। ${storyItem?.fullStory || ''}। ${getUiString('moral', currentLanguage)}: ${transStory.moral}`;
        preparedLines = full
          .split(/[।!?\n]+/)
          .map(s => s.trim())
          .filter(s => s.length > 2);
      }
    } else if (mode === 'poem' && transPoem) {
      if (transPoem.lines && transPoem.lines.length > 0) {
        preparedLines = transPoem.lines;
      } else if (poemItem?.lines16 && poemItem.lines16.length > 0) {
        preparedLines = poemItem.lines16;
      } else {
        preparedLines = (transPoem.lyrics || poemItem?.lyrics || '')
          .split(/[\n!।]+/)
          .map(s => s.trim())
          .filter(s => s.length > 2);
      }
    } else if (mode === 'lori' && transLori) {
      if (transLori.lines && transLori.lines.length > 0) {
        preparedLines = transLori.lines;
      } else if (loriItem?.paragraphs && loriItem.paragraphs.length > 0) {
        preparedLines = loriItem.paragraphs;
      } else {
        preparedLines = (transLori.lyrics || loriItem?.hindiLyrics || '')
          .split(/[\n!।]+/)
          .map(s => s.trim())
          .filter(s => s.length > 2);
      }
    }

    setLines(preparedLines);
    setCurrentLineIndex(0);
    setSelectedAnswers({});
    setShowCelebration(false);
    setActiveStoryPart('part1');
  }, [isOpen, mode, storyItem, poemItem, loriItem, currentLanguage]);

  // Clean up on unmount or close
  useEffect(() => {
    return () => {
      stopAllAudio();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  // Determine character voice profile for story line
  const getStoryVoiceProfile = (line: string) => {
    const lower = line.toLowerCase();
    if (lower.includes('शेर') || lower.includes('sher')) {
      return { speaker: '🦁 शेर', rate: 0.7, pitch: 0.75, color: 'bg-amber-600' };
    }
    if (lower.includes('चूहा') || lower.includes('chuha') || lower.includes('चूहे')) {
      return { speaker: '🐭 चूहा', rate: 0.85, pitch: 1.35, color: 'bg-yellow-500' };
    }
    if (lower.includes('अकबर') || lower.includes('बादशाह')) {
      return { speaker: '👑 शहंशाह अकबर', rate: 0.72, pitch: 0.8, color: 'bg-indigo-600' };
    }
    if (lower.includes('बीरबल') || lower.includes('birbal')) {
      return { speaker: '💡 बीरबल', rate: 0.82, pitch: 1.05, color: 'bg-emerald-600' };
    }
    if (lower.includes('खरगोश') || lower.includes('rabbit')) {
      return { speaker: '🐰 नटखट खरगोश', rate: 1.05, pitch: 1.15, color: 'bg-pink-500' };
    }
    if (lower.includes('कछुआ') || lower.includes('kachua') || lower.includes('tortoise')) {
      return { speaker: '🐢 धीमा कछुआ', rate: 0.65, pitch: 0.85, color: 'bg-teal-600' };
    }
    if (lower.includes('बिल्ली') || lower.includes('cat')) {
      return { speaker: '🐱 बिल्ली मौसी', rate: 0.85, pitch: 1.25, color: 'bg-orange-500' };
    }
    return { speaker: '👵 दादी अम्मा', rate: 0.75, pitch: 0.95, color: 'bg-rose-600' };
  };

  // Speak a single line
  const speakCurrentLine = useCallback((index: number) => {
    const allLines = linesRef.current;
    if (index >= allLines.length) {
      // Reached the end
      if (mode === 'lori' && isInfiniteLoop) {
        // Infinite loop for Lori as requested
        setCurrentLineIndex(0);
        speakCurrentLine(0);
      } else {
        setIsPlaying(false);
        stopAllAudio();
      }
      return;
    }

    const rawLine = allLines[index];

    let rate = 0.75;
    let pitch = 0.95;

    if (mode === 'story') {
      const voiceInfo = getStoryVoiceProfile(rawLine);
      rate = voiceInfo.rate;
      pitch = voiceInfo.pitch;
    } else if (mode === 'poem') {
      // Sweet singing mother's voice in proper lay/tal/sur
      const poemScale = [1.16, 1.28, 1.22, 1.10];
      rate = 0.86;
      pitch = poemScale[index % poemScale.length];
    } else if (mode === 'lori') {
      // Mother's very soft, calm, sleepy "sula dene wali awaaz"
      const loriScale = [0.84, 0.88, 0.82, 0.86];
      rate = 0.62;
      pitch = loriScale[index % loriScale.length];
    }

    // Trigger scene-based sound effect immediately with 0ms delay at line start
    const currentTitle = mode === 'story' ? storyItem?.title : mode === 'poem' ? poemItem?.title : loriItem?.title;
    kidzeeAudio.playSceneSfxForLine(rawLine, mode, currentTitle || '');

    kidzeeAudio.speakLine({
      text: rawLine,
      langCode: currentLanguage,
      mode,
      lineIndex: index,
      rate,
      pitch,
      onEnd: () => {
        if (!isPlayingRef.current) return;
        // Immediate zero-delay transition to next line
        const nextIdx = index + 1;
        setCurrentLineIndex(nextIdx);
        speakCurrentLine(nextIdx);
      }
    });
  }, [mode, currentLanguage, isInfiniteLoop, storyItem, poemItem, loriItem]);

  // Play / Pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      stopAllAudio();
      setIsPlaying(false);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    } else {
      setIsPlaying(true);
      // Start background sound fx
      let soundType: SoundFxType = 'birds';
      if (mode === 'story') {
        soundType = storyItem?.soundFx || 'birds';
      } else if (mode === 'poem') {
        soundType = poemItem?.soundType || 'dholak_piano';
      } else if (mode === 'lori') {
        soundType = 'lori_sleep';
      }

      kidzeeAudio.startThemeSoundFx(soundType, bgVolume);
      speakCurrentLine(currentLineIndex);
    }
  };

  const handleNextLine = () => {
    if (currentLineIndex < lines.length - 1) {
      const nextIdx = currentLineIndex + 1;
      setCurrentLineIndex(nextIdx);
      if (isPlaying) {
        window.speechSynthesis.cancel();
        if (timerRef.current) window.clearTimeout(timerRef.current);
        speakCurrentLine(nextIdx);
      }
    }
  };

  const handlePrevLine = () => {
    if (currentLineIndex > 0) {
      const prevIdx = currentLineIndex - 1;
      setCurrentLineIndex(prevIdx);
      if (isPlaying) {
        window.speechSynthesis.cancel();
        if (timerRef.current) window.clearTimeout(timerRef.current);
        speakCurrentLine(prevIdx);
      }
    }
  };

  const handleRestart = () => {
    setCurrentLineIndex(0);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      if (timerRef.current) window.clearTimeout(timerRef.current);
      speakCurrentLine(0);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setBgVolume(newVol);
    kidzeeAudio.setVolume(newVol);
  };

  // Answer selection for Story 2 Sawal
  const handleAnswerSelect = (qIndex: number, optIndex: number, correctIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    if (optIndex === correctIndex) {
      kidzeeAudio.playClapSound();
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  if (!isOpen) return null;

  const currentLine = lines[currentLineIndex] || '';
  const currentVoice = mode === 'story' ? getStoryVoiceProfile(currentLine) : null;
  const currentScene = mode === 'story'
    ? getStorySceneForLine(storyItem?.id || '', currentLine, currentLineIndex)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[820px] rounded-3xl overflow-hidden shadow-2xl flex flex-col border-2 border-white/20 bg-slate-950">
        {/* ===================================================
            ANIMATED BACKGROUND CANVAS / LIVE 2D CARTOON STAGE
           =================================================== */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* 1. STORY MODE: Live 2D Animated Cartoon Stage */}
          {mode === 'story' && (
            <StoryCartoonStage
              storyItem={storyItem}
              currentLine={currentLine}
              currentLineIndex={currentLineIndex}
              totalLines={lines.length}
              currentScene={currentScene}
            />
          )}

          {/* 2. POEM MODE: Rhythmic 2D Animated Playground */}
          {mode === 'poem' && (
            <PoemCartoonStage
              poemItem={poemItem}
              currentLine={currentLine}
              currentLineIndex={currentLineIndex}
            />
          )}

          {/* 3. LORI MODE: Soft Sleepy Mother's Night Stage (60 BPM) */}
          {mode === 'lori' && (
            <LoriCartoonStage
              loriItem={loriItem}
              currentLine={currentLine}
              currentLineIndex={currentLineIndex}
            />
          )}
        </div>

        {/* ===================================================
            TOP CONTROL BAR
           =================================================== */}
        <div className="relative z-10 flex items-center justify-between p-3 sm:p-4 bg-black/40 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">
              {mode === 'story' ? storyItem?.emoji || '📖' : mode === 'poem' ? poemItem?.emoji || '🎵' : '🌙'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-white truncate max-w-[200px] sm:max-w-md">
                  {mode === 'story' ? storyItem?.title : mode === 'poem' ? poemItem?.title : loriItem?.title}
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 border border-amber-500/40">
                  {mode === 'story' ? storyItem?.category : mode === 'poem' ? poemItem?.theme : loriItem?.tag}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                {mode === 'story'
                  ? 'दादी स्टाइल धीमी आवाज (0.75x) + 3-पार्ट ड्रामा + 2 सवाल'
                  : mode === 'poem'
                  ? 'माँ की मीठी आवाज में बालगीत (लय/ताल/सुर) + खुशियों भरा संगीत'
                  : 'माँ की सुला देने वाली शांत आवाज (धीमी लोरी) + 60 BPM शांत संगीत'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Background Volume Slider */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              {bgVolume === 0 ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgVolume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-20 accent-amber-400 cursor-pointer"
                title="संगीत वॉल्यूम"
              />
              <span className="text-[10px] font-mono text-amber-200">
                {Math.round(bgVolume * 100)}%
              </span>
            </div>

            {/* Infinite Loop button for Lori */}
            {mode === 'lori' && (
              <button
                onClick={() => setIsInfiniteLoop(!isInfiniteLoop)}
                className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                  isInfiniteLoop
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                title="असीमित लूप (Infinite Sleep Loop)"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>असीमित लूप {isInfiniteLoop ? 'चालू' : 'बंद'}</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                stopAllAudio();
                setIsPlaying(false);
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ===================================================
            STORY PART SWITCHER (PART 1, PART 2, PART 3)
           =================================================== */}
        {mode === 'story' && storyItem?.parts && (
          <div className="relative z-10 flex items-center justify-center gap-2 px-4 py-2 bg-black/30 border-b border-white/10">
            <button
              onClick={() => setActiveStoryPart('part1')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeStoryPart === 'part1'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              1. शुरुआत (100 शब्द)
            </button>
            <button
              onClick={() => setActiveStoryPart('part2')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeStoryPart === 'part2'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              2. ड्रामा &amp; क्लाइमेक्स (300 शब्द)
            </button>
            <button
              onClick={() => setActiveStoryPart('part3')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeStoryPart === 'part3'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              3. सीख व 2 सवाल (150 शब्द)
            </button>
          </div>
        )}

        {/* ===================================================
            MAIN STAGE: CENTER ANIMATIONS & LINE-BY-LINE CAPTION
           =================================================== */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-4 sm:p-8 overflow-y-auto">
          {/* Top Speaker Indicator */}
          <div className="flex items-center justify-between">
            {currentVoice ? (
              <div className={`px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-black shadow-md flex items-center gap-2 ${currentVoice.color}`}>
                <span>{currentVoice.speaker} बोल रहे हैं</span>
              </div>
            ) : (
              <div className="px-4 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold">
                लाइन {currentLineIndex + 1} / {lines.length}
              </div>
            )}

            {/* Story Moral Preview */}
            {storyItem?.moral && mode === 'story' && (
              <div className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/30 font-bold hidden sm:block">
                💡 सीख: {storyItem.moral}
              </div>
            )}
          </div>

          {/* ===================================================
              LINE-BY-LINE CAPTION (MOST IMPORTANT USER REQUIREMENT):
              32px, White Bold, Text-Shadow, 1 line at a time
             =================================================== */}
          <div className="my-auto py-8 text-center px-4">
            {currentLine ? (
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide leading-snug transition-all duration-300 transform scale-100"
                style={{
                  textShadow: '2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000'
                }}
              >
                "{currentLine}"
              </div>
            ) : (
              <div className="text-xl sm:text-2xl font-black text-amber-200">
                नीचे दिए गए 'प्ले' बटन को दबाकर प्रारंभ करें
              </div>
            )}

            {/* Sub-line hint */}
            {isPlaying && (
              <p className="mt-4 text-xs sm:text-sm text-yellow-300 font-bold animate-pulse">
                🎙️ लाइन समाप्त होने पर 1 सेकंड के अंतराल के बाद अगली पंक्ति आएगी...
              </p>
            )}
          </div>

          {/* ===================================================
              INTERACTIVE 2 QUESTIONS (If in Part 3 or Story Finished)
             =================================================== */}
          {mode === 'story' && storyItem?.questions && (activeStoryPart === 'part3' || currentLineIndex >= lines.length - 2) && (
            <div className="mt-4 p-4 bg-black/60 rounded-2xl border border-amber-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-300 font-black text-sm mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>कहानी से 2 मजेदार सवाल (उत्तर चुनें):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {storyItem.questions.map((q, qIdx) => {
                  const userChoice = selectedAnswers[qIdx];
                  const isAnswered = userChoice !== undefined;
                  const isCorrect = userChoice === q.correctAnswer;

                  return (
                    <div key={qIdx} className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xs font-bold text-white mb-2">
                        {qIdx + 1}. {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = userChoice === optIdx;
                          let btnStyle = 'bg-white/10 text-white hover:bg-white/20';
                          if (isOptionSelected) {
                            btnStyle = isCorrect ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' : 'bg-rose-600 text-white';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerSelect(qIdx, optIdx, q.correctAnswer)}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {isAnswered && (
                        <div className={`mt-2 text-[11px] font-bold ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isCorrect ? '🎉 शाबाश! सही उत्तर!' : '💡 सही उत्तर: ' + q.options[q.correctAnswer]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Celebration banner */}
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
              <div className="bg-amber-400 text-slate-950 px-6 py-4 rounded-3xl shadow-2xl font-black text-xl flex items-center gap-3 animate-bounce border-4 border-white">
                <Award className="w-8 h-8 text-amber-900" />
                <span>अद्भुत! सही उत्तर! 👏 तालियाँ!</span>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
            BOTTOM TIMELINE & PLAYBACK CONTROLS
           =================================================== */}
        <div className="relative z-10 p-3 sm:p-4 bg-black/60 border-t border-white/10 backdrop-blur-md flex flex-col gap-2">
          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-rose-500 h-full transition-all duration-300 rounded-full"
              style={{
                width: `${lines.length > 0 ? ((currentLineIndex + 1) / lines.length) * 100 : 0}%`
              }}
            />
          </div>

          {/* Controller Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevLine}
                disabled={currentLineIndex === 0}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white active:scale-95 transition-all"
                title="पिछली पंक्ति"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className={`px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all ${
                  isPlaying
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 animate-pulse'
                    : 'bg-white text-slate-950 hover:bg-amber-100'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-slate-950" />
                    <span>रोकें (Pause)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>शुरू करें (Play)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextLine}
                disabled={currentLineIndex >= lines.length - 1}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white active:scale-95 transition-all"
                title="अगली पंक्ति"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleRestart}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all"
                title="शुरुआत से चलाएं"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right text-xs text-slate-300 font-mono">
              पंक्ति {currentLineIndex + 1} / {lines.length} • {Math.round(lines.length > 0 ? ((currentLineIndex + 1) / lines.length) * 100 : 0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
