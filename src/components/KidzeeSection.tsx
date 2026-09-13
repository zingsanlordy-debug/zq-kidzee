import React, { useState, useRef, useEffect, useCallback } from 'react';
import { STORY_VIDEOS, LORI_LIST, POEM_LIST, SKETCH_LIST } from '../data/kidzeeData';
import { StoryVideo, LoriItem, PoemItem, SketchItem } from '../types';
import { KidzeeTheaterModal } from './KidzeeTheaterModal';
import {
  playVoiceAndMusic,
  stopAllAudio,
  speakLangText
} from '../utils/audioSynth';
import {
  getTranslatedStory,
  getTranslatedLori,
  getTranslatedPoem,
  getUiString
} from '../utils/translationHelper';
import { getLanguageByCode } from '../data/languages';
import { KidsLearningSection } from './KidsLearningSection';
import { KidsPuzzleGames } from './KidsPuzzleGames';
import {
  Play,
  Square,
  Volume2,
  Sparkles,
  Download,
  RotateCcw,
  Palette,
  Heart,
  BookOpen,
  Music,
  Moon,
  Star,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Share2,
  Eraser,
  Undo2,
  ChevronLeft,
  ChevronRight,
  Lock,
  Crown,
  Eye,
  Shapes
} from 'lucide-react';

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const COLOR_CHOICES = [
  '#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff',
  '#5856d6', '#af52de', '#ff2d55', '#000000', '#8b572a', '#00c7be'
];

interface KidzeeSectionProps {
  currentLanguage?: string;
  selectedStoryId?: number;
  selectedLoriId?: number;
  selectedPoemId?: number;
  selectedSketchId?: number;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  initialCategory?: 'stories' | 'lori' | 'poem' | 'sketch' | 'learning' | 'puzzles';
  isPremium?: boolean;
  onOpenPremium?: (reason?: string) => void;
}

export const KidzeeSection: React.FC<KidzeeSectionProps> = ({
  currentLanguage = 'hi',
  selectedStoryId,
  selectedLoriId,
  selectedPoemId,
  selectedSketchId,
  isFullScreen = false,
  onToggleFullScreen,
  initialCategory = 'stories',
  isPremium = false,
  onOpenPremium
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'stories' | 'lori' | 'poem' | 'sketch' | 'learning' | 'puzzles'>(initialCategory);
  const [internalFullScreen, setInternalFullScreen] = useState(false);

  // Theater Cinema Modal State
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);
  const [theaterMode, setTheaterMode] = useState<'story' | 'lori' | 'poem'>('story');

  const openTheater = (mode: 'story' | 'lori' | 'poem') => {
    stopAllAudio();
    setIsStoryPlaying(false);
    setIsLoriPlaying(false);
    setIsPoemPlaying(false);
    setTheaterMode(mode);
    setIsTheaterOpen(true);
  };

  // Story state
  const [currentStory, setCurrentStory] = useState<StoryVideo>(STORY_VIDEOS[0]);
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);

  // Lori state
  const [currentLori, setCurrentLori] = useState<LoriItem>(LORI_LIST[0]);
  const [isLoriPlaying, setIsLoriPlaying] = useState(false);

  // Poem state
  const [currentPoem, setCurrentPoem] = useState<PoemItem>(POEM_LIST[0]);
  const [isPoemPlaying, setIsPoemPlaying] = useState(false);

  // Sketch Canvas state
  const [currentSketch, setCurrentSketch] = useState<SketchItem>(SKETCH_LIST[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [brushColor, setBrushColor] = useState('#ff3b30');
  const [brushSize, setBrushSize] = useState(15);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sketchFilter, setSketchFilter] = useState('All');
  const [currentAlphabetIndex, setCurrentAlphabetIndex] = useState(0);
  const [tracingMode, setTracingMode] = useState<'alphabet' | 'sketch'>('alphabet');
  const [undoStack, setUndoStack] = useState<string[]>([]);

  const langInfo = getLanguageByCode(currentLanguage);

  // Prop triggers
  useEffect(() => {
    if (selectedStoryId) {
      const found = STORY_VIDEOS.find(s => s.id === selectedStoryId);
      if (found) {
        setCurrentStory(found);
        setActiveSubTab('stories');
      }
    }
  }, [selectedStoryId]);

  useEffect(() => {
    if (selectedLoriId) {
      const found = LORI_LIST.find(l => l.id === selectedLoriId);
      if (found) {
        setCurrentLori(found);
        setActiveSubTab('lori');
      }
    }
  }, [selectedLoriId]);

  useEffect(() => {
    if (selectedPoemId) {
      const found = POEM_LIST.find(p => p.id === selectedPoemId);
      if (found) {
        setCurrentPoem(found);
        setActiveSubTab('poem');
      }
    }
  }, [selectedPoemId]);

  useEffect(() => {
    if (selectedSketchId) {
      const found = SKETCH_LIST.find(k => k.id === selectedSketchId);
      if (found) {
        setCurrentSketch(found);
        setActiveSubTab('sketch');
      }
    }
  }, [selectedSketchId]);

  // Clean up audio on unmount or tab switch
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  // Stop sound when switching tabs
  const handleTabChange = (tab: 'stories' | 'lori' | 'poem' | 'sketch' | 'learning' | 'puzzles') => {
    stopAllAudio();
    setIsStoryPlaying(false);
    setIsLoriPlaying(false);
    setIsPoemPlaying(false);
    setActiveSubTab(tab);
  };

  const effectiveFullScreen = isFullScreen || internalFullScreen;
  const toggleFull = () => {
    if (onToggleFullScreen) {
      onToggleFullScreen();
    } else {
      setInternalFullScreen(!internalFullScreen);
    }
  };

  // ==========================================
  // Accurate Canvas Scaling & Coordinate Tracking
  // ==========================================
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    // Save previous drawing
    const prevData = canvas.toDataURL();

    // Canvas scale fix: match offset width and height
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Restore drawing
    const img = new Image();
    img.src = prevData;
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(img, 0, 0);
    };
  }, []);

  useEffect(() => {
    if (activeSubTab === 'sketch') {
      const timer = setTimeout(resizeCanvas, 50);
      window.addEventListener('resize', resizeCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [activeSubTab, resizeCanvas, effectiveFullScreen]);

  // Finger & Mouse exact coordinate without drift
  const getCanvasCoords = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return { x, y };
  }, []);

  const saveUndoSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setUndoStack(prev => [...prev.slice(-20), canvas.toDataURL()]);
  };

  const undoLastStroke = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previous = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));

    const img = new Image();
    img.src = previous;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e) {
      e.stopPropagation();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveUndoSnapshot();
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if ('touches' in e) {
      e.stopPropagation();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);

    if (isEraser) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = brushSize * 1.6;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    saveUndoSnapshot();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    const name = tracingMode === 'alphabet' ? `Letter_${ALPHABETS[currentAlphabetIndex]}` : currentSketch.name;
    link.download = `ZQ_Kidzee_${name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const nextAlphabet = () => {
    saveUndoSnapshot();
    setCurrentAlphabetIndex((i) => (i < 25 ? i + 1 : 0));
    clearCanvas();
  };

  const prevAlphabet = () => {
    saveUndoSnapshot();
    setCurrentAlphabetIndex((i) => (i > 0 ? i - 1 : 25));
    clearCanvas();
  };

  // ==========================================
  // Audio Playback: Slow Voice (0.9) + Looping Background Music (0.2 volume)
  // ==========================================
  const togglePlayStory = (story: StoryVideo) => {
    if (isStoryPlaying) {
      stopAllAudio();
      setIsStoryPlaying(false);
    } else {
      stopAllAudio();
      setIsLoriPlaying(false);
      setIsPoemPlaying(false);
      setIsStoryPlaying(true);

      const trans = getTranslatedStory(story, currentLanguage);
      const narrationText = `${trans.title}। ${trans.summary}। नैतिक शिक्षा: ${trans.moral}`;

      playVoiceAndMusic({
        text: narrationText,
        langCode: currentLanguage,
        mode: 'story',
        onEnd: () => setIsStoryPlaying(false)
      });
    }
  };

  const togglePlayLori = (lori: LoriItem) => {
    if (isLoriPlaying) {
      stopAllAudio();
      setIsLoriPlaying(false);
    } else {
      stopAllAudio();
      setIsStoryPlaying(false);
      setIsPoemPlaying(false);
      setIsLoriPlaying(true);

      const trans = getTranslatedLori(lori, currentLanguage);
      const narrationText = `${trans.title}। ${trans.lyrics}`;

      playVoiceAndMusic({
        text: narrationText,
        langCode: currentLanguage,
        mode: 'lori',
        onEnd: () => setIsLoriPlaying(false)
      });
    }
  };

  const togglePlayPoem = (poem: PoemItem) => {
    if (isPoemPlaying) {
      stopAllAudio();
      setIsPoemPlaying(false);
    } else {
      stopAllAudio();
      setIsStoryPlaying(false);
      setIsLoriPlaying(false);
      setIsPoemPlaying(true);

      const trans = getTranslatedPoem(poem, currentLanguage);
      const narrationText = `${trans.title}। ${trans.lyrics}`;

      playVoiceAndMusic({
        text: narrationText,
        langCode: currentLanguage,
        mode: 'poem',
        onEnd: () => setIsPoemPlaying(false)
      });
    }
  };

  // Filtered sketches
  const filteredSketches = sketchFilter === 'All'
    ? SKETCH_LIST
    : SKETCH_LIST.filter(k => k.category === sketchFilter);

  const containerClasses = effectiveFullScreen
    ? "fixed inset-0 z-50 w-screen h-screen bg-yellow-50/95 overflow-y-auto p-3 sm:p-6"
    : "bg-white/90 rounded-3xl p-3 sm:p-5 shadow-lg border-2 border-orange-300";

  return (
    <div className={containerClasses}>
      {/* Category Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-orange-200 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {effectiveFullScreen && (
            <button
              onClick={toggleFull}
              className="mr-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{getUiString('back', currentLanguage)}</span>
            </button>
          )}

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white text-xl shadow-xs">
            🧸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-amber-950">
                KIDZEE TOP 1 (बाल संसार)
              </h2>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                {langInfo.flag} {langInfo.nativeName}
              </span>
            </div>
            <p className="text-[11px] font-bold text-amber-800">
              Clear Slow Voice (0.9x) + Sweet Looping Music (0.2 Vol) • 33 Languages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Sub Tab Buttons */}
          <div className="flex bg-orange-100/70 p-1 rounded-2xl border border-orange-200">
            <button
              onClick={() => handleTabChange('stories')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeSubTab === 'stories'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-orange-200/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>कहानियाँ</span>
            </button>

            <button
              onClick={() => handleTabChange('lori')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeSubTab === 'lori'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-950 hover:bg-indigo-100'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>लोरियां</span>
            </button>

            <button
              onClick={() => handleTabChange('poem')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeSubTab === 'poem'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-rose-950 hover:bg-rose-100'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>कविताएँ</span>
            </button>

            <button
              onClick={() => handleTabChange('sketch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeSubTab === 'sketch'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-950 hover:bg-emerald-100'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>स्केच &amp; रंग</span>
            </button>

            <button
              onClick={() => handleTabChange('learning')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeSubTab === 'learning'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>📸 सीखें</span>
            </button>

            <button
              onClick={() => handleTabChange('puzzles')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeSubTab === 'puzzles'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-950 hover:bg-purple-100'
              }`}
            >
              <Shapes className="w-3.5 h-3.5" />
              <span>🧩 पहेलियाँ</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFull}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-2xs active:scale-95 transition-transform"
            title={effectiveFullScreen ? "Exit Fullscreen" : "Fullscreen (100vw, 100vh)"}
          >
            {effectiveFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ========================================================
          SUB-TAB 1: KAHANIYAN (STORIES)
         ======================================================== */}
      {activeSubTab === 'stories' && (
        <div className="mt-4 space-y-4">
          {/* Active Story Featured Card */}
          {(() => {
            const transStory = getTranslatedStory(currentStory, currentLanguage);
            return (
              <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-3xl">{currentStory.emoji}</span>
                    <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
                      {currentStory.category}
                    </span>
                    <span className="text-xs font-semibold bg-black/20 px-2.5 py-1 rounded-full">
                      भाषा: {langInfo.nativeName} ({langInfo.name})
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mt-2 leading-tight">
                    {transStory.title}
                  </h3>

                  <p className="text-sm text-amber-50 mt-2 leading-relaxed font-medium">
                    {transStory.summary}
                  </p>

                  <div className="mt-3 p-3 bg-white/15 rounded-2xl border border-white/20">
                    <p className="text-xs font-bold text-yellow-200">
                      💡 {getUiString('moral', currentLanguage)}: {transStory.moral}
                    </p>
                  </div>

                  {/* Play Voice + Background Music Button */}
                  <div className="mt-4 flex items-center gap-2 sm:gap-3 flex-wrap">
                    <button
                      onClick={() => {
                        setCurrentStory(currentStory);
                        openTheater('story');
                      }}
                      className="px-5 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 active:scale-95 transition-all ring-2 ring-yellow-200"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>🎬 थियेटर में देखें (32px सबटाइटल + साउंड FX + 2 सवाल)</span>
                    </button>

                    <button
                      onClick={() => togglePlayStory(currentStory)}
                      className={`px-4 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all ${
                        isStoryPlaying
                          ? 'bg-slate-950 text-yellow-300 ring-2 ring-yellow-400 animate-pulse'
                          : 'bg-white/90 text-orange-950 hover:bg-white'
                      }`}
                    >
                      {isStoryPlaying ? (
                        <>
                          <Square className="w-4 h-4 fill-yellow-300" />
                          <span>{getUiString('stop', currentLanguage)}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-orange-900" />
                          <span>ऑडियो सुनें</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Stories Grid */}
          <div className="space-y-2">
            <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
              <span>📚 सभी बाल कहानियाँ (Stories in 33 Languages)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {STORY_VIDEOS.map((story, storyIdx) => {
                const isLocked = storyIdx >= 10 && !isPremium;
                const trans = getTranslatedStory(story, currentLanguage);
                const isSelected = currentStory.id === story.id;
                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      if (isLocked) {
                        if (onOpenPremium) onOpenPremium('प्रीमियम लो और 100+ कहानियाँ सुनो!');
                        return;
                      }
                      setCurrentStory(story);
                      if (isStoryPlaying) {
                        stopAllAudio();
                        setIsStoryPlaying(false);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-amber-100/90 border-orange-500 shadow-md ring-2 ring-orange-400'
                        : isLocked
                        ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-orange-300 shadow-2xs hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{story.emoji}</span>
                        <div className="flex items-center gap-1">
                          {isLocked ? (
                            <span className="text-[10px] font-black text-amber-800 bg-amber-200/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5 text-amber-700" />
                              <span>VIP लॉक</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                              {story.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <h4 className="text-sm font-black text-slate-900 mt-2 leading-snug">
                        {trans.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {trans.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-700">
                        शिक्षा: {trans.moral.slice(0, 24)}...
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isLocked ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenPremium) onOpenPremium('प्रीमियम लो और 100+ कहानियाँ सुनो!');
                            }}
                            className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-[10px] shadow-xs active:scale-95 flex items-center gap-1"
                          >
                            <Crown className="w-3 h-3 text-amber-950" />
                            <span>प्रीमियम लॉक</span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentStory(story);
                                openTheater('story');
                              }}
                              className="px-2 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] shadow-xs active:scale-95 flex items-center gap-1"
                              title="थियेटर में देखें"
                            >
                              <span>🎬 थियेटर</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentStory(story);
                                togglePlayStory(story);
                              }}
                              className="p-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xs active:scale-95"
                              title="ऑडियो प्ले करें"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: LORIYAN (LULLABIES)
         ======================================================== */}
      {activeSubTab === 'lori' && (
        <div className="mt-4 space-y-4">
          {/* Featured Active Lori */}
          {(() => {
            const transLori = getTranslatedLori(currentLori, currentLanguage);
            return (
              <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                      🌙 मीठी लोरी (Lullaby)
                    </span>
                    <span className="text-xs text-purple-200">
                      {langInfo.flag} {langInfo.nativeName}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mt-2 text-yellow-300">
                    {transLori.title}
                  </h3>

                  <div className="mt-3 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xs">
                    <p className="text-sm sm:text-base font-bold text-purple-100 leading-loose whitespace-pre-line">
                      "{transLori.lyrics}"
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 sm:gap-3 flex-wrap">
                    <button
                      onClick={() => {
                        setCurrentLori(currentLori);
                        openTheater('lori');
                      }}
                      className="px-5 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg bg-yellow-400 hover:bg-yellow-300 text-indigo-950 active:scale-95 transition-all ring-2 ring-yellow-200"
                    >
                      <Moon className="w-4 h-4 fill-indigo-950" />
                      <span>🌙 लोरी थियेटर (60 BPM + ममता आवाज + असीमित लूप)</span>
                    </button>

                    <button
                      onClick={() => togglePlayLori(currentLori)}
                      className={`px-4 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all ${
                        isLoriPlaying
                          ? 'bg-yellow-400 text-indigo-950 animate-pulse'
                          : 'bg-white text-indigo-950 hover:bg-purple-100'
                      }`}
                    >
                      {isLoriPlaying ? (
                        <>
                          <Square className="w-4 h-4 fill-indigo-950" />
                          <span>{getUiString('stop', currentLanguage)}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-indigo-950" />
                          <span>ऑडियो सुनें</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Lori List Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {LORI_LIST.map((lori, loriIdx) => {
              const isLocked = loriIdx >= 10 && !isPremium;
              const trans = getTranslatedLori(lori, currentLanguage);
              const isSelected = currentLori.id === lori.id;
              return (
                <div
                  key={lori.id}
                  onClick={() => {
                    if (isLocked) {
                      if (onOpenPremium) onOpenPremium('प्रीमियम लो और सभी 100+ लोरियां सुनो!');
                      return;
                    }
                    setCurrentLori(lori);
                    if (isLoriPlaying) {
                      stopAllAudio();
                      setIsLoriPlaying(false);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 shadow-md ring-2 ring-indigo-400'
                      : isLocked
                      ? 'bg-indigo-50/50 border-indigo-200 hover:border-amber-400 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                          #{lori.id} {lori.tag}
                        </span>
                        {isLocked && (
                          <span className="text-[10px] font-black text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-amber-700" />
                            <span>VIP</span>
                          </span>
                        )}
                      </div>
                      <Moon className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900 mt-2">
                      {trans.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {trans.lyrics}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-indigo-700 font-bold">
                      {langInfo.nativeName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isLocked ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenPremium) onOpenPremium('प्रीमियम लो और सभी 100+ लोरियां सुनो!');
                          }}
                          className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 font-black text-[10px] shadow-xs active:scale-95 flex items-center gap-1"
                        >
                          <Crown className="w-3 h-3 text-amber-950" />
                          <span>प्रीमियम लॉक</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentLori(lori);
                              openTheater('lori');
                            }}
                            className="px-2 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-[10px] shadow-xs active:scale-95 flex items-center gap-1"
                            title="थियेटर में सुनें"
                          >
                            <span>🌙 थियेटर</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentLori(lori);
                              togglePlayLori(lori);
                            }}
                            className="p-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs active:scale-95"
                            title="ऑडियो प्ले करें"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: POEMS (KAVITA / NURSERY RHYMES)
         ======================================================== */}
      {activeSubTab === 'poem' && (
        <div className="mt-4 space-y-4">
          {/* Active Poem Card */}
          {(() => {
            const transPoem = getTranslatedPoem(currentPoem, currentLanguage);
            return (
              <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 rounded-3xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{currentPoem.emoji}</span>
                    <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                      {currentPoem.theme}
                    </span>
                    <span className="text-xs text-pink-100">
                      {langInfo.flag} {langInfo.nativeName}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mt-2 text-yellow-200">
                    {transPoem.title}
                  </h3>

                  <div className="mt-3 p-4 bg-white/15 rounded-2xl border border-white/20 backdrop-blur-xs">
                    <p className="text-sm sm:text-base font-black leading-relaxed whitespace-pre-line text-rose-50">
                      {transPoem.lyrics}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 sm:gap-3 flex-wrap">
                    <button
                      onClick={() => {
                        setCurrentPoem(currentPoem);
                        openTheater('poem');
                      }}
                      className="px-5 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg bg-yellow-300 hover:bg-yellow-200 text-rose-950 active:scale-95 transition-all ring-2 ring-yellow-100"
                    >
                      <Sparkles className="w-4 h-4 text-rose-950" />
                      <span>🎵 कविता थियेटर (16 पंक्तियाँ + बच्ची की आवाज + ढोलक-पियानो)</span>
                    </button>

                    <button
                      onClick={() => togglePlayPoem(currentPoem)}
                      className={`px-4 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all ${
                        isPoemPlaying
                          ? 'bg-slate-900 text-yellow-300 animate-pulse'
                          : 'bg-white text-rose-900 hover:bg-yellow-100'
                      }`}
                    >
                      {isPoemPlaying ? (
                        <>
                          <Square className="w-4 h-4 fill-yellow-300" />
                          <span>{getUiString('stop', currentLanguage)}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-rose-900" />
                          <span>ऑडियो सुनें</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Poem List Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {POEM_LIST.map((poem, poemIdx) => {
              const isLocked = poemIdx >= 10 && !isPremium;
              const trans = getTranslatedPoem(poem, currentLanguage);
              const isSelected = currentPoem.id === poem.id;
              return (
                <div
                  key={poem.id}
                  onClick={() => {
                    if (isLocked) {
                      if (onOpenPremium) onOpenPremium('प्रीमियम लो और सभी 100+ बाल गीत सुनो!');
                      return;
                    }
                    setCurrentPoem(poem);
                    if (isPoemPlaying) {
                      stopAllAudio();
                      setIsPoemPlaying(false);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-rose-50 border-rose-500 shadow-md ring-2 ring-rose-400'
                      : isLocked
                      ? 'bg-rose-50/50 border-rose-200 hover:border-amber-400 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{poem.emoji}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                          {poem.theme}
                        </span>
                        {isLocked && (
                          <span className="text-[10px] font-black text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-amber-700" />
                            <span>VIP</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 mt-2">
                      {trans.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {trans.lyrics}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-rose-600">
                      {langInfo.nativeName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isLocked ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenPremium) onOpenPremium('प्रीमियम लो और सभी 100+ बाल गीत सुनो!');
                          }}
                          className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-950 font-black text-[10px] shadow-xs active:scale-95 flex items-center gap-1"
                        >
                          <Crown className="w-3 h-3 text-amber-950" />
                          <span>प्रीमियम लॉक</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentPoem(poem);
                              openTheater('poem');
                            }}
                            className="px-2 py-1 rounded-full bg-yellow-300 hover:bg-yellow-200 text-rose-950 font-black text-[10px] shadow-xs active:scale-95 flex items-center gap-1"
                            title="कविता थियेटर"
                          >
                            <span>🎵 थियेटर</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentPoem(poem);
                              togglePlayPoem(poem);
                            }}
                            className="p-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-xs active:scale-95"
                            title="ऑडियो प्ले करें"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: SKETCH & DRAW CANVAS (100vw, 70vh, A-Z Tracing, 45px Circles)
         ======================================================== */}
      {activeSubTab === 'sketch' && (
        <div className="mt-4 space-y-3">
          <div className="bg-white rounded-3xl p-3 sm:p-5 shadow-sm border border-emerald-200 flex flex-col gap-3">
            {/* Top Toolbar: Tracing Mode, Letter Selector, Tools */}
            <div className="w-full flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-emerald-100">
              {/* Left: Mode Toggle & Alphabet / Sketch Title */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center bg-emerald-100 p-1 rounded-2xl">
                  <button
                    onClick={() => setTracingMode('alphabet')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      tracingMode === 'alphabet'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-950 hover:bg-emerald-200/60'
                    }`}
                  >
                    🔤 A-Z अक्षर ट्रेसिंग
                  </button>
                  <button
                    onClick={() => setTracingMode('sketch')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      tracingMode === 'sketch'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-950 hover:bg-emerald-200/60'
                    }`}
                  >
                    🎨 चित्र रूपरेखा (Sketches)
                  </button>
                </div>

                {tracingMode === 'alphabet' ? (
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-2xl border border-amber-200">
                    <button
                      onClick={prevAlphabet}
                      className="p-1 rounded-lg bg-white hover:bg-amber-100 text-slate-800 shadow-2xs active:scale-90"
                      title="पिछला अक्षर (Prev Letter)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-base font-black text-amber-950 px-1">
                      अक्षर: {ALPHABETS[currentAlphabetIndex]}
                    </span>
                    <button
                      onClick={nextAlphabet}
                      className="p-1 rounded-lg bg-white hover:bg-amber-100 text-slate-800 shadow-2xs active:scale-90"
                      title="अगला अक्षर (Next Letter)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
                    <span className="text-xl">{currentSketch.emoji}</span>
                    <span className="text-xs font-black text-slate-800">{currentSketch.name}</span>
                  </div>
                )}
              </div>

              {/* Right: Undo, Eraser, Clear, Download */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Undo Button */}
                <button
                  onClick={undoLastStroke}
                  disabled={undoStack.length === 0}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                  title="पूर्ववत करें (Undo)"
                >
                  <Undo2 className="w-4 h-4" />
                  <span>Undo</span>
                </button>

                {/* Eraser Button */}
                <button
                  onClick={() => setIsEraser(!isEraser)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all active:scale-95 ${
                    isEraser
                      ? 'bg-amber-500 text-white ring-2 ring-amber-600 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="रबर (Eraser)"
                >
                  <Eraser className="w-4 h-4" />
                  <span>{isEraser ? 'रबर सक्रिय' : 'रबर (Eraser)'}</span>
                </button>

                {/* Clear Canvas */}
                <button
                  onClick={clearCanvas}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>साफ करें</span>
                </button>

                {/* Download */}
                <button
                  onClick={downloadCanvas}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>डाउनलोड</span>
                </button>
              </div>
            </div>

            {/* Canvas Full Screen Container: 100vw, 70vh */}
            <div className="relative w-full h-[70vh] min-h-[460px] bg-white rounded-3xl shadow-inner border-2 border-dashed border-emerald-300 overflow-hidden touch-none flex items-center justify-center">
              {/* Background Guideline: A-Z 400px Font, 3x Bold Outline, 0.25 Opacity */}
              {tracingMode === 'alphabet' ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <span
                    className="font-black text-slate-500 select-none tracking-tighter"
                    style={{
                      fontSize: 'min(400px, 50vh)',
                      opacity: 0.25,
                      WebkitTextStroke: '6px #64748b',
                      color: 'transparent',
                      lineHeight: 1
                    }}
                  >
                    {ALPHABETS[currentAlphabetIndex]}
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-25 select-none z-0">
                  <span className="text-9xl">{currentSketch.emoji}</span>
                  <span className="text-base font-black text-slate-800 mt-2">
                    रूपरेखा: {currentSketch.name}
                  </span>
                </div>
              )}

              {/* Drawing Canvas Element */}
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair relative z-10"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>

            {/* Bottom Controls: 45px Color Circles & 5px-40px Brush Slider (Default 15px) */}
            <div className="w-full flex items-center justify-between gap-3 flex-wrap bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200">
              {/* 45px Color Circles */}
              <div className="flex items-center gap-2 flex-wrap">
                {COLOR_CHOICES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setBrushColor(c);
                      setIsEraser(false);
                    }}
                    style={{ backgroundColor: c }}
                    className={`w-[45px] h-[45px] rounded-full transition-all shrink-0 shadow-xs active:scale-95 ${
                      !isEraser && brushColor === c
                        ? 'scale-115 ring-4 ring-emerald-500 ring-offset-2 shadow-md'
                        : 'hover:scale-105 border-2 border-white'
                    }`}
                    title={c}
                  />
                ))}
              </div>

              {/* Brush Slider: 5px to 40px, default 15px */}
              <div className="flex items-center gap-3 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-xs font-black text-slate-700">ब्रश मोटाई:</span>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-28 sm:w-36 accent-emerald-600 cursor-pointer"
                />
                <span className="text-xs font-mono font-black text-emerald-800 w-10 text-right">
                  {brushSize}px
                </span>
              </div>
            </div>

            {/* Optional Sketch Gallery when in Sketch mode */}
            {tracingMode === 'sketch' && (
              <div className="pt-2 border-t border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-800">स्केच सूची में से चुनें:</span>
                  <select
                    value={sketchFilter}
                    onChange={(e) => setSketchFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 font-bold text-slate-800"
                  >
                    <option value="All">सभी श्रेणियां</option>
                    <option value="Fal & Sabzi">फल &amp; सब्जियां</option>
                    <option value="Prakriti">प्रकृति</option>
                    <option value="Ghar & Shahar">घर &amp; शहर</option>
                    <option value="Moortiyan">मूर्तियां</option>
                    <option value="Vahan & Khilone">वाहन &amp; खिलौने</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-36 overflow-y-auto pr-1">
                  {filteredSketches.map((sk, skIdx) => {
                    const isLocked = skIdx >= 10 && !isPremium;
                    return (
                      <button
                        key={sk.id}
                        onClick={() => {
                          if (isLocked) {
                            if (onOpenPremium) onOpenPremium('प्रीमियम लो और सभी 100+ स्केच खोलो!');
                            return;
                          }
                          setCurrentSketch(sk);
                          clearCanvas();
                        }}
                        className={`p-2 rounded-xl border text-center transition-all relative ${
                          currentSketch.id === sk.id
                            ? 'bg-emerald-100 border-emerald-500 shadow-xs'
                            : isLocked
                            ? 'bg-slate-100/80 border-amber-300 text-slate-500'
                            : 'bg-slate-50 hover:bg-emerald-50 border-slate-200'
                        }`}
                      >
                        {isLocked && (
                          <span className="absolute top-1 right-1 p-0.5 rounded-full bg-amber-400 text-slate-900">
                            <Lock className="w-2 h-2" />
                          </span>
                        )}
                        <div className="text-xl">{sk.emoji}</div>
                        <div className="text-[10px] font-black text-slate-900 mt-0.5 truncate">
                          {sk.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 5: KIDS LEARNING CATEGORIES (350+ Photos)
         ======================================================== */}
      {activeSubTab === 'learning' && (
        <div className="mt-4">
          <KidsLearningSection
            isPremium={isPremium}
            onOpenPremium={onOpenPremium}
          />
        </div>
      )}

      {/* ========================================================
          SUB-TAB 6: KIDS PUZZLE GAMES (Jigsaw, Shadow, Memory, Shapes)
         ======================================================== */}
      {activeSubTab === 'puzzles' && (
        <div className="mt-4">
          <KidsPuzzleGames
            isPremium={isPremium}
            onOpenPremium={onOpenPremium}
          />
        </div>
      )}

      {/* ========================================================
          KIDZEE THEATER CINEMA MODAL
          (Line-by-line subtitles 32px bold, sound fx, animated background, infinite loop)
         ======================================================== */}
      <KidzeeTheaterModal
        isOpen={isTheaterOpen}
        mode={theaterMode}
        storyItem={currentStory}
        poemItem={currentPoem}
        loriItem={currentLori}
        currentLanguage={currentLanguage}
        onClose={() => setIsTheaterOpen(false)}
      />
    </div>
  );
};
