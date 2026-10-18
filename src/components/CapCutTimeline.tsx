import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface CapCutTimelineProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (sceneNumber: number) => void;
  canNavigate: boolean;
}

const SCENES = [
  { id: 1, label: 'INTRO', time: '00:00' },
  { id: 2, label: 'REVEAL', time: '00:05' },
  { id: 3, label: '20/10 WISH', time: '00:10' },
  { id: 4, label: 'GIFT VAULT', time: '00:15' },
  { id: 5, label: 'FINALE', time: '00:20' },
];

export const CapCutTimeline: React.FC<CapCutTimelineProps> = ({
  currentScene,
  totalScenes,
  onSelectScene,
  canNavigate,
}) => {
  const handlePrev = () => {
    if (!canNavigate || currentScene <= 1) return;
    audioEngine.playWhoosh();
    onSelectScene(currentScene - 1);
  };

  const handleNext = () => {
    if (!canNavigate || currentScene >= totalScenes) return;
    audioEngine.playWhoosh();
    onSelectScene(currentScene + 1);
  };

  const handleKeyframeClick = (sceneId: number) => {
    if (!canNavigate || sceneId === currentScene) return;
    audioEngine.playWhoosh();
    onSelectScene(sceneId);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-3 md:px-8 py-3 pointer-events-auto backdrop-blur-md bg-white/40 border-t border-pink-200/50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 md:gap-6">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={!canNavigate || currentScene <= 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
            currentScene <= 1 || !canNavigate
              ? 'opacity-30 cursor-not-allowed bg-pink-100/50 text-pink-400'
              : 'bg-white/80 hover:bg-white text-pink-900 border border-pink-200/70 hover:scale-105 active:scale-95 shadow-sm'
          }`}
          aria-label="Previous scene"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Timeline track & Keyframes */}
        <div className="flex-1 relative flex items-center">
          {/* Background track */}
          <div className="w-full h-1.5 bg-pink-200/60 rounded-full relative overflow-hidden">
            {/* Active progress fill */}
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(236,72,153,0.5)]"
              style={{
                width: `${((currentScene - 1) / (totalScenes - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Keyframe Nodes */}
          <div className="absolute inset-x-0 flex justify-between items-center px-0.5">
            {SCENES.map((scene) => {
              const isActive = scene.id === currentScene;
              const isPast = scene.id < currentScene;

              return (
                <button
                  key={scene.id}
                  onClick={() => handleKeyframeClick(scene.id)}
                  disabled={!canNavigate}
                  className="group flex flex-col items-center focus:outline-none -translate-y-0.5"
                  title={`Go to ${scene.label}`}
                >
                  {/* Diamond Keyframe Icon */}
                  <div
                    className={`w-4 h-4 rotate-45 transition-all duration-300 flex items-center justify-center rounded-xs ${
                      isActive
                        ? 'bg-pink-600 scale-125 shadow-[0_0_12px_rgba(219,39,119,0.8)] border border-white'
                        : isPast
                        ? 'bg-pink-400 group-hover:scale-110 border border-white/80'
                        : 'bg-pink-100 border border-pink-300 group-hover:bg-pink-200'
                    }`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full ${
                        isActive ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  </div>

                  {/* Label (visible on md screens or on active) */}
                  <span
                    className={`text-[9px] md:text-[10px] font-mono tracking-wider mt-1.5 transition-all ${
                      isActive
                        ? 'text-pink-900 font-bold scale-105'
                        : 'text-pink-700/60 hidden md:inline'
                    }`}
                  >
                    {scene.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!canNavigate || currentScene >= totalScenes}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
            currentScene >= totalScenes || !canNavigate
              ? 'opacity-30 cursor-not-allowed bg-pink-100/50 text-pink-400'
              : 'bg-pink-600 hover:bg-pink-700 text-white hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(219,39,119,0.25)]'
          }`}
          aria-label="Next scene"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
