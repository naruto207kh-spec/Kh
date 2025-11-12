import React, { useState, useCallback, useMemo } from 'react';
import { Mode, CompletedAzkar, Zikr } from './types';
import { SHARED_AZKAR, MORNING_AZKAR, EVENING_AZKAR } from './constants';
import Header from './components/Header';
import ZikrCard from './components/ZikrCard';
import { RotateCcwIcon } from './components/icons';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('morning');
  const [completedAzkar, setCompletedAzkar] = useState<CompletedAzkar>({});

  const currentAzkar = useMemo(() => {
    if (mode === 'morning') {
      return [...SHARED_AZKAR, ...MORNING_AZKAR];
    } else {
      return [...SHARED_AZKAR, ...EVENING_AZKAR];
    }
  }, [mode]);

  const progress = useMemo(() => {
    const totalRequired = currentAzkar.reduce((sum, zikr) => sum + zikr.count, 0);
    if (totalRequired === 0) return 0;

    const completed = Object.entries(completedAzkar).reduce((sum, [id, count]) => {
      const zikr = currentAzkar.find(z => z.id === parseInt(id, 10));
      // FIX: Cast `count` to `number` to resolve a TypeScript inference issue where it was being treated as `unknown`.
      return sum + Math.min(count as number, zikr?.count || 0);
    }, 0);
    
    return Math.round((completed / totalRequired) * 100);
  }, [completedAzkar, currentAzkar]);

  const handleZikrClick = useCallback((id: number, count: number) => {
    const currentCount = completedAzkar[id] || 0;
    if (currentCount < count) {
      setCompletedAzkar(prev => ({
        ...prev,
        [id]: currentCount + 1
      }));
    }
  }, [completedAzkar]);

  const resetProgress = useCallback(() => {
    setCompletedAzkar({});
  }, []);

  const switchMode = useCallback((newMode: Mode) => {
    if (newMode !== mode) {
        setMode(newMode);
        setCompletedAzkar({});
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      <Header mode={mode} switchMode={switchMode} progress={progress} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={resetProgress}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all text-teal-600 font-semibold"
          >
            <RotateCcwIcon size={18} />
            إعادة تعيين
          </button>
        </div>

        <div className="space-y-4">
          {currentAzkar.map((zikr) => {
            const currentCount = completedAzkar[zikr.id] || 0;
            const isComplete = currentCount >= zikr.count;
            return (
              <ZikrCard
                key={zikr.id}
                zikr={zikr}
                currentCount={currentCount}
                isComplete={isComplete}
                onZikrClick={handleZikrClick}
                mode={mode}
              />
            );
          })}
        </div>
        
        {progress === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">بارك الله فيك! 🌟</h2>
            <p className="text-lg">لقد أتممت جميع الأذكار</p>
          </div>
        )}
      </main>

      <footer className="bg-white/50 border-t mt-12 py-6">
        <p className="text-center text-gray-600 text-sm px-4">
          {mode === 'morning' 
            ? 'وقت أذكار الصباح من بعد صلاة الفجر حتى طلوع الشمس'
            : 'وقت أذكار المساء من بعد صلاة العصر حتى غروب الشمس'
          }
        </p>
      </footer>
    </div>
  );
};

export default App;