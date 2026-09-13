import React, { useState } from 'react';
import { EDUCATION_SECTIONS, EducationSectionItem } from '../data/educationData';
import { speakHindiText } from '../utils/audioSynth';
import { BookOpen, GraduationCap, Trophy, Laptop, Volume2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const EducationSyllabusHub: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<EducationSectionItem>(EDUCATION_SECTIONS[0]);

  return (
    <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-indigo-200">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-100 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-700 flex items-center justify-center text-white text-xl shadow-xs">
            🎓
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              सम्पूर्ण शिक्षा केंद्र (Education Hub: School to UPSC)
            </h3>
            <p className="text-[11px] text-slate-500">
              NCERT Class 1-12 • BA/BSc/BCom • UPSC, SSC, Banking, Railway, Defence • Skills
            </p>
          </div>
        </div>
      </div>

      {/* 4 Major Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
        {EDUCATION_SECTIONS.map((sec) => {
          const isSelected = selectedItem.id === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setSelectedItem(sec)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-gradient-to-tr from-indigo-600 to-blue-600 text-white border-indigo-700 shadow-md scale-102'
                  : 'bg-indigo-50/50 hover:bg-indigo-100/60 text-slate-900 border-indigo-200'
              }`}
            >
              <span className="text-2xl block">{sec.icon}</span>
              <h4 className={`text-xs font-black mt-1 line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {sec.title.split(':')[0]}
              </h4>
              <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                {sec.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Section Details */}
      <div className="bg-slate-50/80 rounded-2xl p-4 border border-indigo-100 animate-in fade-in duration-150">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
              {selectedItem.category}
            </span>
            <h4 className="text-base font-black text-slate-900 mt-1">
              {selectedItem.title}
            </h4>
            <p className="text-xs text-slate-600">{selectedItem.subtitle}</p>
          </div>

          <button
            onClick={() => speakHindiText(`${selectedItem.title}। ${selectedItem.details.join('। ')}। ${selectedItem.sampleNotes}`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>ऑडियो सारांश सुनें</span>
          </button>
        </div>

        {/* Details List */}
        <div className="mt-3 space-y-2">
          {selectedItem.details.map((detail, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800 leading-relaxed shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>{detail}</span>
            </div>
          ))}
        </div>

        {/* Sample Notes / Cheat Sheet */}
        <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
          <p className="font-bold text-amber-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            विशेष रिवीज़न नोट्स (Revision Golden Sheet):
          </p>
          <p className="mt-1 leading-relaxed text-slate-800">{selectedItem.sampleNotes}</p>
        </div>
      </div>
    </div>
  );
};
