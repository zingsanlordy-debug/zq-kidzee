import React, { useState, useEffect } from 'react';
import { MAHA_PARIKSHA_QUESTIONS, INITIAL_LEADERBOARD } from '../data/educationData';
import confetti from 'canvas-confetti';
import { Award, Timer, CheckCircle, XCircle, RotateCcw, Trophy, Sparkles, Send } from 'lucide-react';

export const MahaPariksha500: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes = 2700s
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('zq_pariksha_leaderboard');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LEADERBOARD;
  });
  const [candidateName, setCandidateName] = useState('');
  const [candidateState, setCandidateState] = useState('');
  const [submittedScore, setSubmittedScore] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsFinished(true);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, isFinished]);

  const currentQ = MAHA_PARIKSHA_QUESTIONS[currentQIndex];
  const totalQuestions = MAHA_PARIKSHA_QUESTIONS.length;

  // Compute marks
  const totalMarks = totalQuestions * 10;
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qId, ansIdx]) => MAHA_PARIKSHA_QUESTIONS[Number(qId)].correctIndex === ansIdx
  ).length;
  const earnedMarks = correctCount * 10;
  const percentage = Math.round((earnedMarks / totalMarks) * 100);

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswers[currentQIndex] !== undefined) return; // already answered
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQIndex]: optIdx
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      finishExam();
    }
  };

  const handlePrev = () => {
    setShowExplanation(false);
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const finishExam = () => {
    setIsFinished(true);
    setIsTimerRunning(false);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const restartExam = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
    setTimeLeft(2700);
    setIsTimerRunning(true);
    setSubmittedScore(false);
  };

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) return;

    const newEntry = {
      id: "entry_" + Date.now(),
      name: `${candidateName.trim()} (${candidateState.trim() || 'India'})`,
      marks: earnedMarks,
      percentage: percentage,
      date: "Just now",
      badge: percentage >= 90 ? "🥇 Gold Top Ranker" : percentage >= 75 ? "🥈 Silver Scholar" : "⭐ Pass"
    };

    const updated = [newEntry, ...leaderboard].sort((a, b) => b.marks - a.marks);
    setLeaderboard(updated);
    localStorage.setItem('zq_pariksha_leaderboard', JSON.stringify(updated));
    setSubmittedScore(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-red-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-red-100 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-xs">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              500 MARKS MAHA PARIKSHA (अखिल भारतीय महा परीक्षा)
            </h3>
            <p className="text-[11px] text-slate-500">
              50 प्रश्न • 10 अंक प्रति प्रश्न • NCERT, इतिहास, संविधान, विज्ञान व करंट अफेयर्स
            </p>
          </div>
        </div>

        {/* Live Score & Timer */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200 text-xs font-bold">
            <Timer className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black">
            अंक: {earnedMarks} / {totalMarks}
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="mt-4 space-y-4">
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-300"
              style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-red-50/40 rounded-2xl p-4 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                प्रश्न {currentQIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs font-bold text-slate-500">
                श्रेणी: {currentQ.category} (+10 Marks)
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1 leading-snug">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="mt-4 space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQIndex] === idx;
                const isAnswered = selectedAnswers[currentQIndex] !== undefined;
                const isCorrect = currentQ.correctIndex === idx;

                let optClass = "bg-white hover:bg-red-50/80 border-slate-200 text-slate-800";
                if (isAnswered) {
                  if (isCorrect) {
                    optClass = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                  } else if (isSelected) {
                    optClass = "bg-rose-100 border-rose-500 text-rose-900 font-bold";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${optClass}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {(showExplanation || selectedAnswers[currentQIndex] !== undefined) && (
              <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 animate-in fade-in">
                <p className="font-bold flex items-center gap-1 text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  उत्तर व्याख्या (Explanation):
                </p>
                <p className="mt-1 text-slate-700">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={currentQIndex === 0}
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-100"
            >
              ← पिछला
            </button>

            <button
              onClick={finishExam}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              परीक्षा समाप्त करें (Submit)
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs active:scale-95"
            >
              {currentQIndex === totalQuestions - 1 ? "रिजल्ट देखें 🏆" : "अगला प्रश्न →"}
            </button>
          </div>
        </div>
      ) : (
        /* FINISHED / RESULTS / CERTIFICATE VIEW */
        <div className="mt-4 space-y-4 animate-in fade-in duration-200">
          {/* Certificate / Score Card */}
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-6 border-4 border-amber-400 text-center relative overflow-hidden shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full mx-auto flex items-center justify-center text-3xl shadow-md mb-2">
              🏆
            </div>
            <h3 className="text-xl font-black text-slate-900">
              महा परीक्षा परिणाम पत्र (Pariksha Certificate)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              ZQ KIDZEE &amp; EDUCATION TOP 1 ALL INDIA SCHOLAR TEST
            </p>

            <div className="my-4 grid grid-cols-3 gap-2 max-w-sm mx-auto">
              <div className="bg-white p-2.5 rounded-2xl border border-amber-200 shadow-xs">
                <span className="text-[10px] text-slate-400 font-bold block">प्राप्तांक</span>
                <span className="text-lg font-black text-red-600">{earnedMarks}</span>
                <span className="text-[9px] text-slate-400">/ 500</span>
              </div>
              <div className="bg-white p-2.5 rounded-2xl border border-amber-200 shadow-xs">
                <span className="text-[10px] text-slate-400 font-bold block">प्रतिशत</span>
                <span className="text-lg font-black text-emerald-600">{percentage}%</span>
                <span className="text-[9px] text-emerald-600 font-semibold">{percentage >= 60 ? "First Div" : "Passed"}</span>
              </div>
              <div className="bg-white p-2.5 rounded-2xl border border-amber-200 shadow-xs">
                <span className="text-[10px] text-slate-400 font-bold block">सही उत्तर</span>
                <span className="text-lg font-black text-blue-600">{correctCount}</span>
                <span className="text-[9px] text-slate-400">/ {totalQuestions}</span>
              </div>
            </div>

            {/* Leaderboard Submission Form */}
            {!submittedScore ? (
              <form onSubmit={handleSubmitScore} className="max-w-sm mx-auto mt-4 bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-300 text-left">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1 mb-2">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  अखिल भारतीय लीडरबोर्ड पर नाम दर्ज करें:
                </h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="आपका नाम (Candidate Name)"
                    className="w-full border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                  />
                  <input
                    type="text"
                    value={candidateState}
                    onChange={(e) => setCandidateState(e.target.value)}
                    placeholder="राज्य / शहर (State e.g. UP, Bihar, Rajasthan)"
                    className="w-full border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    <Send className="w-3.5 h-3.5" /> लीडरबोर्ड में शामिल करें
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-emerald-100/90 text-emerald-900 rounded-2xl text-xs font-bold max-w-sm mx-auto">
                ✅ आपका स्कोर अखिल भारतीय लीडरबोर्ड में सुरक्षित कर लिया गया है!
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={restartExam}
                className="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" /> दोबारा परीक्षा दें (Re-test)
              </button>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 mb-3">
              <Trophy className="w-4 h-4 text-amber-500" />
              All India Maha Pariksha Leaderboard (शीर्ष विद्वान):
            </h4>
            <div className="space-y-2">
              {leaderboard.slice(0, 7).map((entry, idx) => (
                <div
                  key={entry.id}
                  className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800">{entry.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{entry.badge}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-black text-red-600">{entry.marks}</span>
                    <span className="text-[10px] text-slate-500">/500 ({entry.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
