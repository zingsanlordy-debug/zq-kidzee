import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Trophy,
  CheckCircle2,
  Volume2,
  Star,
  Gamepad2,
  Shapes,
  Eye,
  Grid,
  Lock,
  Crown
} from 'lucide-react';
import { speakLangText } from '../utils/audioSynth';

interface KidsPuzzleGamesProps {
  isPremium?: boolean;
  onOpenPremium?: (reason?: string) => void;
}

// 25 Puzzle Levels: 5 FREE, 20 PREMIUM
interface PuzzleLevelItem {
  id: number;
  title: string;
  emoji: string;
  gameType: GameType;
  isFree: boolean;
}

const PUZZLE_LEVELS: PuzzleLevelItem[] = [
  // 5 FREE Puzzles
  { id: 1, title: 'शेर जिग्सॉ', emoji: '🦁', gameType: 'jigsaw', isFree: true },
  { id: 2, title: 'पालतू जानवर छाया', emoji: '🐶', gameType: 'shadow', isFree: true },
  { id: 3, title: 'जानवर मेमोरी पेयर', emoji: '🐵', gameType: 'memory', isFree: true },
  { id: 4, title: 'आकृतियां मिलान', emoji: '⭕', gameType: 'shapes', isFree: true },
  { id: 5, title: 'हाथी जिग्सॉ', emoji: '🐘', gameType: 'jigsaw', isFree: true },
  // 20 PREMIUM Puzzles (VIP 🔒)
  { id: 6, title: 'सेब फल जिग्सॉ', emoji: '🍎', gameType: 'jigsaw', isFree: false },
  { id: 7, title: 'कार वाहन जिग्सॉ', emoji: '🚗', gameType: 'jigsaw', isFree: false },
  { id: 8, title: 'चिड़िया छाया मिलान', emoji: '🦜', gameType: 'shadow', isFree: false },
  { id: 9, title: 'जंगल सफारी मेमोरी', emoji: '🐯', gameType: 'memory', isFree: false },
  { id: 10, title: 'रंग-बिरंगे आकार', emoji: '⭐', gameType: 'shapes', isFree: false },
  { id: 11, title: 'तितली छाया', emoji: '🦋', gameType: 'shadow', isFree: false },
  { id: 12, title: 'समुद्री जीव मेमोरी', emoji: '🐬', gameType: 'memory', isFree: false },
  { id: 13, title: 'रॉकेट जिग्सॉ', emoji: '🚀', gameType: 'jigsaw', isFree: false },
  { id: 14, title: 'कछुआ छाया मिलान', emoji: '🐢', gameType: 'shadow', isFree: false },
  { id: 15, title: 'फलों की मेमोरी', emoji: '🍓', gameType: 'memory', isFree: false },
  { id: 16, title: 'त्रिभुज और वर्ग', emoji: '📐', gameType: 'shapes', isFree: false },
  { id: 17, title: 'डायनासोर जिग्सॉ', emoji: '🦖', gameType: 'jigsaw', isFree: false },
  { id: 18, title: 'पांडा छाया', emoji: '🐼', gameType: 'shadow', isFree: false },
  { id: 19, title: 'सुपर मेमोरी मास्टर', emoji: '🧠', gameType: 'memory', isFree: false },
  { id: 20, title: 'ज्यामितीय आकृति', emoji: '🔷', gameType: 'shapes', isFree: false },
  { id: 21, title: 'ट्रेन जिग्सॉ', emoji: '🚂', gameType: 'jigsaw', isFree: false },
  { id: 22, title: 'भालू छाया मिलान', emoji: '🐻', gameType: 'shadow', isFree: false },
  { id: 23, title: 'म्यूजिकल मेमोरी', emoji: '🎵', gameType: 'memory', isFree: false },
  { id: 24, title: 'षट्कोण व वृत्त', emoji: '⬡', gameType: 'shapes', isFree: false },
  { id: 25, title: 'महा पहेली ग्रैंड फाइनल', emoji: '🏆', gameType: 'jigsaw', isFree: false },
];

// Puzzle Game Types
type GameType = 'jigsaw' | 'shadow' | 'memory' | 'shapes';

interface JigsawItem {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  gridSize: 2; // 2x2 = 4 pieces
  bgGradient: string;
  parts: { id: number; label: string; correctPos: number; color: string; icon: string }[];
}

const JIGSAW_PRESETS: JigsawItem[] = [
  {
    id: 'lion',
    name: 'Lion',
    hindiName: 'शेर',
    emoji: '🦁',
    gridSize: 2,
    bgGradient: 'from-amber-400 to-orange-500',
    parts: [
      { id: 1, label: 'कान और माथा (Head)', correctPos: 0, color: 'bg-amber-300', icon: '👂' },
      { id: 2, label: 'आंख और नाक (Face)', correctPos: 1, color: 'bg-amber-400', icon: '🦁' },
      { id: 3, label: 'पंजा (Paw)', correctPos: 2, color: 'bg-orange-300', icon: '🐾' },
      { id: 4, label: 'पूंछ (Tail)', correctPos: 3, color: 'bg-orange-400', icon: '✨' },
    ]
  },
  {
    id: 'elephant',
    name: 'Elephant',
    hindiName: 'हाथी',
    emoji: '🐘',
    gridSize: 2,
    bgGradient: 'from-sky-400 to-indigo-500',
    parts: [
      { id: 1, label: 'बड़ा कान (Big Ear)', correctPos: 0, color: 'bg-sky-300', icon: '👂' },
      { id: 2, label: 'लंबी सूंड (Trunk)', correctPos: 1, color: 'bg-sky-400', icon: '🐘' },
      { id: 3, label: 'मजबूत पैर (Legs)', correctPos: 2, color: 'bg-indigo-300', icon: '🦶' },
      { id: 4, label: 'छोटी पूंछ (Tail)', correctPos: 3, color: 'bg-indigo-400', icon: '⭐' },
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    hindiName: 'सेब',
    emoji: '🍎',
    gridSize: 2,
    bgGradient: 'from-red-400 to-rose-600',
    parts: [
      { id: 1, label: 'हरी पत्ती (Leaf)', correctPos: 0, color: 'bg-emerald-300', icon: '🍃' },
      { id: 2, label: 'ऊपरी भाग (Top)', correctPos: 1, color: 'bg-red-400', icon: '🍎' },
      { id: 3, label: 'बायां हिस्सा (Left)', correctPos: 2, color: 'bg-red-500', icon: '✨' },
      { id: 4, label: 'निचला हिस्सा (Bottom)', correctPos: 3, color: 'bg-rose-600', icon: '❤️' },
    ]
  },
  {
    id: 'car',
    name: 'Car',
    hindiName: 'गाड़ी',
    emoji: '🚗',
    gridSize: 2,
    bgGradient: 'from-blue-400 to-cyan-500',
    parts: [
      { id: 1, label: 'छत और कांच (Roof)', correctPos: 0, color: 'bg-cyan-300', icon: '🪟' },
      { id: 2, label: 'हॉर्न और लाइट (Lights)', correctPos: 1, color: 'bg-cyan-400', icon: '🚗' },
      { id: 3, label: 'पहिया 1 (Wheel 1)', correctPos: 2, color: 'bg-blue-400', icon: '🛞' },
      { id: 4, label: 'पहिया 2 (Wheel 2)', correctPos: 3, color: 'bg-blue-500', icon: '🛞' },
    ]
  }
];

// Shadow Match Items
interface ShadowItem {
  id: string;
  name: string;
  emoji: string;
}
const SHADOW_ITEMS: ShadowItem[] = [
  { id: 'dog', name: 'कुत्ता (Dog)', emoji: '🐶' },
  { id: 'cat', name: 'बिल्ली (Cat)', emoji: '🐱' },
  { id: 'rabbit', name: 'खरगोश (Rabbit)', emoji: '🐰' },
  { id: 'panda', name: 'पांडा (Panda)', emoji: '🐼' },
];

// Memory Cards
const MEMORY_SYMBOLS = ['🦁', '🐯', '🐵', '🐘', '🍓', '🍌'];

export const KidsPuzzleGames: React.FC<KidsPuzzleGamesProps> = ({
  isPremium = false,
  onOpenPremium
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('jigsaw');
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);

  // ==========================================
  // 1. JIGSAW STATE
  // ==========================================
  const [selectedJigsaw, setSelectedJigsaw] = useState<JigsawItem>(JIGSAW_PRESETS[0]);
  const [placedParts, setPlacedParts] = useState<(number | null)[]>([null, null, null, null]);
  const [selectedTrayPart, setSelectedTrayPart] = useState<number | null>(null);
  const [jigsawWon, setJigsawWon] = useState(false);

  // Initialize/Reset Jigsaw
  const resetJigsaw = (item: JigsawItem = selectedJigsaw) => {
    setSelectedJigsaw(item);
    setPlacedParts([null, null, null, null]);
    setSelectedTrayPart(null);
    setJigsawWon(false);
  };

  const handleTrayPartClick = (partId: number) => {
    setSelectedTrayPart(partId);
  };

  const handleSlotClick = (slotIndex: number) => {
    if (selectedTrayPart === null) return;
    const part = selectedJigsaw.parts.find(p => p.id === selectedTrayPart);
    if (!part) return;

    if (part.correctPos === slotIndex) {
      // Correct placement
      const newPlaced = [...placedParts];
      newPlaced[slotIndex] = part.id;
      setPlacedParts(newPlaced);
      setSelectedTrayPart(null);

      speakLangText('बहुत बढ़िया!', 'hi', 1.0);

      // Check win
      if (newPlaced.every((p, idx) => p === selectedJigsaw.parts[idx].id)) {
        setJigsawWon(true);
        speakLangText(`शाबाश! आपने ${selectedJigsaw.hindiName} की पहेली पूरी कर ली!`, 'hi', 0.9);
      }
    } else {
      // Incorrect slot
      speakLangText('दोबारा कोशिश करो!', 'hi', 1.0);
    }
  };

  // ==========================================
  // 2. SHADOW MATCH STATE
  // ==========================================
  const [selectedOriginal, setSelectedOriginal] = useState<string | null>(null);
  const [shadowMatches, setShadowMatches] = useState<Record<string, boolean>>({});
  const [shadowOrder, setShadowOrder] = useState<ShadowItem[]>([]);

  useEffect(() => {
    // Shuffle shadows on mount
    setShadowOrder([...SHADOW_ITEMS].sort(() => Math.random() - 0.5));
    setShadowMatches({});
  }, []);

  const handleOriginalClick = (id: string) => {
    if (shadowMatches[id]) return;
    setSelectedOriginal(id);
  };

  const handleShadowClick = (id: string) => {
    if (selectedOriginal === null) return;
    if (selectedOriginal === id) {
      // Match!
      setShadowMatches(prev => {
        const next = { ...prev, [id]: true };
        if (Object.keys(next).length === SHADOW_ITEMS.length) {
          speakLangText('वाह! आपने सभी छाया पहचान लीं!', 'hi', 0.9);
        } else {
          speakLangText('शाबाश! सही छाया!', 'hi', 1.0);
        }
        return next;
      });
      setSelectedOriginal(null);
    } else {
      speakLangText('यह सही छाया नहीं है, फिर से देखो!', 'hi', 1.0);
    }
  };

  const resetShadows = () => {
    setShadowMatches({});
    setSelectedOriginal(null);
    setShadowOrder([...SHADOW_ITEMS].sort(() => Math.random() - 0.5));
  };

  // ==========================================
  // 3. MEMORY CARD STATE
  // ==========================================
  const [memoryDeck, setMemoryDeck] = useState<{ id: number; symbol: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initMemoryGame = () => {
    const symbols = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS];
    const shuffled = symbols
      .sort(() => Math.random() - 0.5)
      .map((sym, i) => ({
        id: i,
        symbol: sym,
        flipped: false,
        matched: false
      }));
    setMemoryDeck(shuffled);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardFlip = (index: number) => {
    if (flippedCards.length >= 2) return;
    if (memoryDeck[index].flipped || memoryDeck[index].matched) return;

    const newDeck = [...memoryDeck];
    newDeck[index].flipped = true;
    setMemoryDeck(newDeck);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (newDeck[first].symbol === newDeck[second].symbol) {
        // Matched!
        setTimeout(() => {
          setMemoryDeck(d => {
            const updated = [...d];
            updated[first].matched = true;
            updated[second].matched = true;
            return updated;
          });
          setFlippedCards([]);
          speakLangText('जोड़ी मिल गई!', 'hi', 1.0);
        }, 400);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setMemoryDeck(d => {
            const updated = [...d];
            updated[first].flipped = false;
            updated[second].flipped = false;
            return updated;
          });
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  // ==========================================
  // 4. SHAPES & COLOR MATCH
  // ==========================================
  const SHAPES_LIST = [
    { id: 'circle', name: 'लाल गोला (Red Circle)', shape: '🔴', color: 'text-red-500', target: '⭕' },
    { id: 'square', name: 'नीला चौकोर (Blue Square)', shape: '🟦', color: 'text-blue-500', target: '⏹️' },
    { id: 'star', name: 'पीला तारा (Yellow Star)', shape: '⭐', color: 'text-yellow-400', target: '⭐' },
    { id: 'triangle', name: 'हरा त्रिकोण (Green Triangle)', shape: '🔺', color: 'text-green-500', target: '🔺' },
    { id: 'heart', name: 'गुलाबी दिल (Pink Heart)', shape: '💖', color: 'text-pink-500', target: '🤍' },
  ];
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [matchedShapes, setMatchedShapes] = useState<Record<string, boolean>>({});

  const handleShapeClick = (id: string) => {
    if (matchedShapes[id]) return;
    setSelectedShape(id);
  };

  const handleTargetClick = (id: string) => {
    if (selectedShape === null) return;
    if (selectedShape === id) {
      setMatchedShapes(prev => {
        const next = { ...prev, [id]: true };
        speakLangText('शाबाश! बिल्कुल सही आकार!', 'hi', 1.0);
        return next;
      });
      setSelectedShape(null);
    } else {
      speakLangText('यह आकार अलग है, ध्यान से देखो!', 'hi', 1.0);
    }
  };

  const resetShapes = () => {
    setMatchedShapes({});
    setSelectedShape(null);
  };

  return (
    <div className="space-y-4">
      {/* Game Selector Sub-Tabs */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-3xl p-4 sm:p-5 text-white shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
            🧩
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              बच्चों के पहेली खेल (Kids Puzzle Games)
            </h2>
            <p className="text-xs text-white/90">
              सोचने और सीखने वाले 4 मजेदार खेल (Interactive Brain Games)
            </p>
          </div>
        </div>

        {/* 4 Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-white/20 p-1 rounded-2xl backdrop-blur-xs border border-white/20 flex-wrap">
          <button
            onClick={() => setActiveGame('jigsaw')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeGame === 'jigsaw'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>जिग्सॉ (Jigsaw)</span>
          </button>

          <button
            onClick={() => setActiveGame('shadow')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeGame === 'shadow'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>छाया मिलान (Shadow)</span>
          </button>

          <button
            onClick={() => setActiveGame('memory')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeGame === 'memory'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>मेमोरी (Memory)</span>
          </button>

          <button
            onClick={() => setActiveGame('shapes')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              activeGame === 'shapes'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Shapes className="w-3.5 h-3.5" />
            <span>रंग और आकार</span>
          </button>
        </div>
      </div>

      {/* 25 Puzzle Levels Bar (5 Free, 20 Premium) */}
      <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
          <span className="flex items-center gap-1.5">
            <span>🎯</span>
            <span>लेवल 1-5 बिल्कुल मुफ्त (FREE) • लेवल 6-25 प्रीमियम (VIP 🔒)</span>
          </span>
          {isPremium ? (
            <span className="text-emerald-600 flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>सभी 25 पहेलियां खुली हैं</span>
            </span>
          ) : (
            <span className="text-amber-700">20+ वीआईपी पहेलियाँ</span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PUZZLE_LEVELS.map((lvl) => {
            const isLocked = !lvl.isFree && !isPremium;
            const isCurrent = selectedLevelId === lvl.id;

            return (
              <button
                key={lvl.id}
                onClick={() => {
                  if (isLocked) {
                    if (onOpenPremium) {
                      onOpenPremium(`प्रीमियम लें और लेवल ${lvl.id} (${lvl.title}) समेत सभी 25+ पहेलियाँ अनलॉक करें!`);
                    }
                    return;
                  }
                  setSelectedLevelId(lvl.id);
                  setActiveGame(lvl.gameType);
                  if (lvl.gameType === 'jigsaw') {
                    const preset = JIGSAW_PRESETS[(lvl.id - 1) % JIGSAW_PRESETS.length];
                    resetJigsaw(preset);
                  }
                }}
                className={`relative px-3 py-2 rounded-xl text-xs font-black shrink-0 flex items-center gap-1.5 transition-all active:scale-95 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105'
                    : isLocked
                    ? 'bg-slate-100 text-slate-400 border border-amber-200'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                }`}
              >
                <span>{lvl.emoji}</span>
                <span>L{lvl.id}. {lvl.title}</span>
                {isLocked && <Lock className="w-3 h-3 text-amber-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          1. JIGSAW PUZZLE SECTION
      ======================================================== */}
      {activeGame === 'jigsaw' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-orange-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedJigsaw.emoji}</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {selectedJigsaw.name} ({selectedJigsaw.hindiName}) पहेली
              </h3>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5">
              {JIGSAW_PRESETS.map((preset, pIdx) => {
                const isPresetLocked = pIdx >= 2 && !isPremium;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      if (isPresetLocked) {
                        if (onOpenPremium) {
                          onOpenPremium(`प्रीमियम लें और ${preset.hindiName} पहेली अनलॉक करें!`);
                        }
                        return;
                      }
                      resetJigsaw(preset);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                      selectedJigsaw.id === preset.id
                        ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                        : isPresetLocked
                        ? 'bg-slate-100 text-slate-400 border-amber-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{preset.emoji} {preset.hindiName}</span>
                    {isPresetLocked && <Lock className="w-2.5 h-2.5 text-amber-500" />}
                  </button>
                );
              })}

              <button
                onClick={() => resetJigsaw()}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
                title="Reset Puzzle"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Target Puzzle Board (2x2 Grid) */}
            <div className="bg-amber-50/60 rounded-3xl p-4 border-2 border-dashed border-amber-300 flex flex-col items-center">
              <h4 className="text-xs font-bold text-amber-900 mb-3 flex items-center gap-1">
                <Grid className="w-3.5 h-3.5 text-amber-600" />
                <span>पहेली बोर्ड (यहाँ टुकड़े सेट करें):</span>
              </h4>

              <div className="w-64 h-64 grid grid-cols-2 grid-rows-2 gap-2 bg-white p-2 rounded-2xl shadow-inner border border-amber-200">
                {[0, 1, 2, 3].map(slotIdx => {
                  const placedId = placedParts[slotIdx];
                  const placedPart = selectedJigsaw.parts.find(p => p.id === placedId);

                  return (
                    <div
                      key={slotIdx}
                      onClick={() => handleSlotClick(slotIdx)}
                      className={`w-full h-full rounded-xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${
                        placedPart
                          ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-amber-50 shadow-xs'
                          : selectedTrayPart !== null
                          ? 'border-amber-400 border-dashed bg-amber-100/50 animate-pulse'
                          : 'border-slate-200 border-dashed bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {placedPart ? (
                        <div className="text-center animate-in zoom-in-50 duration-200">
                          <span className="text-3xl block">{placedPart.icon}</span>
                          <span className="text-[10px] font-bold text-emerald-800 line-clamp-1">
                            {placedPart.label}
                          </span>
                        </div>
                      ) : (
                        <div className="text-center text-slate-400 text-xs font-bold">
                          <span>भाग {slotIdx + 1}</span>
                          <span className="block text-[9px]">टैप करें</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {jigsawWon && (
                <div className="mt-3 p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2 animate-bounce">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>शानदार! पहेली पूरी हो गई! ⭐⭐⭐</span>
                </div>
              )}
            </div>

            {/* Pieces Tray */}
            <div className="bg-slate-50 rounded-3xl p-4 border border-slate-200 flex flex-col items-center">
              <h4 className="text-xs font-bold text-slate-700 mb-3">
                टुकड़े चुनें (Select a piece to place):
              </h4>

              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {selectedJigsaw.parts.map(part => {
                  const isPlaced = placedParts.includes(part.id);
                  const isSelected = selectedTrayPart === part.id;

                  return (
                    <button
                      key={part.id}
                      disabled={isPlaced}
                      onClick={() => handleTrayPartClick(part.id)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                        isPlaced
                          ? 'opacity-30 border-slate-200 bg-slate-100 cursor-not-allowed'
                          : isSelected
                          ? 'border-orange-500 ring-4 ring-orange-200 bg-orange-50 scale-105 shadow-md'
                          : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-xs active:scale-95'
                      }`}
                    >
                      <span className="text-3xl mb-1">{part.icon}</span>
                      <span className="text-xs font-black text-slate-800">{part.label}</span>
                      <span className="text-[10px] text-slate-500">
                        {isPlaced ? '✓ सेट है' : 'चुनें'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-500 mt-3 text-center">
                👉 पहले यहाँ से टुकड़ा चुनें, फिर बाईं ओर खाली बॉक्स पर टैप करें!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. SHADOW MATCH SECTION
      ======================================================== */}
      {activeGame === 'shadow' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-indigo-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                छाया मिलान खेल (Animal Shadow Matching)
              </h3>
              <p className="text-xs text-slate-500">
                बाईं ओर जानवर चुनें, फिर दाईं ओर उसकी सही छाया पहचानें!
              </p>
            </div>
            <button
              onClick={resetShadows}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>दोबारा खेलें</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-lg mx-auto pt-2">
            {/* Originals Column */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-600 block text-center">
                1. असली जानवर (Animals)
              </span>
              {SHADOW_ITEMS.map(item => {
                const isMatched = shadowMatches[item.id];
                const isSelected = selectedOriginal === item.id;

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleOriginalClick(item.id)}
                    className={`w-full p-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 opacity-60 text-emerald-800'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 ring-4 ring-amber-200 scale-102 shadow-md'
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
                    }`}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="font-black text-xs sm:text-sm text-slate-800">{item.name}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />}
                  </button>
                );
              })}
            </div>

            {/* Shadows Column (Shuffled) */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-600 block text-center">
                2. छाया पहचानें (Shadows)
              </span>
              {shadowOrder.map(item => {
                const isMatched = shadowMatches[item.id];

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleShadowClick(item.id)}
                    className={`w-full p-3 rounded-2xl border-2 flex items-center justify-center transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 opacity-60'
                        : selectedOriginal !== null
                        ? 'bg-slate-100 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer animate-pulse'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {/* Dark silhouette filter on emoji */}
                    <span
                      className={`text-3xl transition-transform ${
                        isMatched ? 'opacity-100' : 'brightness-0 contrast-200 opacity-80'
                      }`}
                    >
                      {item.emoji}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MEMORY CARD GAME
      ======================================================== */}
      {activeGame === 'memory' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-pink-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                याददाश्त खेल (Memory Card Match)
              </h3>
              <p className="text-xs text-slate-500">
                पत्ते पलटें और एक जैसे दो जानवर या फल खोजें! (चालें: {moves})
              </p>
            </div>
            <button
              onClick={initMemoryGame}
              className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs rounded-xl flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>नया खेल</span>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-xl mx-auto pt-2">
            {memoryDeck.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardFlip(idx)}
                className={`aspect-square rounded-2xl border-2 text-3xl sm:text-4xl flex items-center justify-center transition-all duration-300 active:scale-95 ${
                  card.matched
                    ? 'bg-emerald-100 border-emerald-400 scale-95 shadow-inner'
                    : card.flipped
                    ? 'bg-white border-pink-400 shadow-md rotate-y-180'
                    : 'bg-gradient-to-tr from-pink-400 to-rose-500 border-pink-500 shadow-xs hover:scale-102 cursor-pointer text-white font-bold'
                }`}
              >
                {card.flipped || card.matched ? card.symbol : '⭐'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          4. SHAPES & COLOR MATCH
      ======================================================== */}
      {activeGame === 'shapes' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-emerald-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                रंग और आकार पहचान (Shapes &amp; Colors)
              </h3>
              <p className="text-xs text-slate-500">
                रंगीन आकार को उसके खाली फ्रेम में रखें!
              </p>
            </div>
            <button
              onClick={resetShapes}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट करें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto pt-2">
            {/* Shape Items */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-600 block text-center">
                1. आकार चुनें (Pick Shape)
              </span>
              {SHAPES_LIST.map(item => {
                const isMatched = matchedShapes[item.id];
                const isSelected = selectedShape === item.id;

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleShapeClick(item.id)}
                    className={`w-full p-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 opacity-50'
                        : isSelected
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-200 scale-102 shadow-md'
                        : 'bg-white border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-3xl">{item.shape}</span>
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Target Outlines */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-600 block text-center">
                2. सही जगह रखें (Target Slot)
              </span>
              {SHAPES_LIST.map(item => {
                const isMatched = matchedShapes[item.id];

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleTargetClick(item.id)}
                    className={`w-full p-3 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
                      isMatched
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                        : selectedShape !== null
                        ? 'bg-slate-100 border-emerald-400 animate-pulse cursor-pointer'
                        : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <span className="text-3xl">{isMatched ? item.shape : item.target}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
