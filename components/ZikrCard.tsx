
import React from 'react';
import { Zikr, Mode } from '../types';
import { CheckIcon } from './icons';

interface ZikrCardProps {
  zikr: Zikr;
  currentCount: number;
  isComplete: boolean;
  onZikrClick: (id: number, count: number) => void;
  mode: Mode;
}

const ZikrCard: React.FC<ZikrCardProps> = ({ zikr, currentCount, isComplete, onZikrClick, mode }) => {
  const zikrText = mode === 'morning' 
    ? zikr.morningText || zikr.text 
    : zikr.eveningText || zikr.text;

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-2 ${
        isComplete ? 'border-green-400 opacity-80' : 'border-transparent'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-teal-800">{zikr.title}</h3>
        {zikr.type === 'morning' && (
          <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-semibold">
            صباح فقط
          </span>
        )}
        {zikr.type === 'evening' && (
          <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-semibold">
            مساء فقط
          </span>
        )}
      </div>

      <p className="text-gray-800 text-lg leading-relaxed mb-4 whitespace-pre-wrap">
        {zikrText}
      </p>

      <div className="flex items-center justify-between">
        <button
          onClick={() => onZikrClick(zikr.id, zikr.count)}
          disabled={isComplete}
          className={`flex items-center justify-center w-32 gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform ${
            isComplete
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow hover:shadow-md'
          }`}
        >
          {isComplete ? (
            <>
              <CheckIcon size={18} />
              مكتمل
            </>
          ) : (
            'ذكرت'
          )}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-teal-600 tabular-nums">
            {currentCount} / {zikr.count}
          </span>
          {zikr.count > 1 && zikr.count <= 10 && (
            <div className="flex gap-1" dir="ltr">
              {Array.from({ length: zikr.count }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx < currentCount ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZikrCard;
