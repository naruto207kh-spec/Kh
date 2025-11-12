
import React from 'react';
import { Mode } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
  mode: Mode;
  switchMode: (newMode: Mode) => void;
  progress: number;
}

const Header: React.FC<HeaderProps> = ({ mode, switchMode, progress }) => {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-4">☀️ أذكار الصباح والمساء 🌙</h1>
        
        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={() => switchMode('morning')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              mode === 'morning'
                ? 'bg-white text-teal-600 shadow-lg scale-105'
                : 'bg-teal-700/50 text-white hover:bg-teal-700'
            }`}
          >
            <SunIcon size={20} />
            أذكار الصباح
          </button>
          <button
            onClick={() => switchMode('evening')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              mode === 'evening'
                ? 'bg-white text-teal-600 shadow-lg scale-105'
                : 'bg-teal-700/50 text-white hover:bg-teal-700'
            }`}
          >
            <MoonIcon size={20} />
            أذكار المساء
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold text-white/90">
                التقدم
            </span>
            <span className="text-sm font-bold text-white">
                {progress}%
            </span>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div
              className="bg-white h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
