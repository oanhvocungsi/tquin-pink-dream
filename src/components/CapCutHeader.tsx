import React from 'react';
import { Volume2, VolumeX, Sparkles, Maximize2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface CapCutHeaderProps {
  currentScene: number;
  totalScenes: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

const SCENE_NAMES = [
  'PROLOGUE',
  'THE ICON REVEAL',
  'THE 20/10 DEDICATION',
  'THE DIGITAL VAULT',
  'THE FINALE',
];

export const CapCutHeader: React.FC<CapCutHeaderProps> = ({
  currentScene,
  totalScenes,
  isMuted,
  onToggleMute,
}) => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-white/30 border-b border-pink-200/40">
      {/* Left: CapCut Recording indicator */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-900/10 border border-pink-500/20 text-xs font-mono tracking-wider text-pink-950 font-medium">
          <span className="w-2 h-2 rounded-full bg-pink-600 animate-ping inline-block" />
          <span className="text-[11px] font-semibold text-pink-700 uppercase tracking-widest">
            REC • 20:10
          </span>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono text-pink-800/70 tracking-widest uppercase">
          TQUIN // PINK LUXURY EDIT
        </span>
      </div>

      {/* Center: Editorial Scene Title */}
      <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-pink-900/80">
        <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
        <span className="text-pink-600 font-bold">ACT 0{currentScene}</span>
        <span className="text-pink-300">/</span>
        <span>0{totalScenes}</span>
        <span className="mx-1 text-pink-300">•</span>
        <span className="text-pink-950 font-semibold">{SCENE_NAMES[currentScene - 1]}</span>
      </div>

      {/* Right: Audio Control & Visualizer & Fullscreen */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            audioEngine.playClickSound();
            onToggleMute();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-pink-900 border border-pink-200/70 transition-all shadow-sm hover:scale-105 active:scale-95"
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-pink-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-pink-600 animate-pulse" />
          )}

          {/* Mini animated equalizer bars */}
          <div className="flex items-center gap-0.5 h-3">
            <span
              className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${
                isMuted ? 'h-1 opacity-30' : 'h-3 animate-pulse'
              }`}
            />
            <span
              className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${
                isMuted ? 'h-1 opacity-30' : 'h-2 animate-bounce'
              }`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${
                isMuted ? 'h-1 opacity-30' : 'h-3.5 animate-pulse'
              }`}
              style={{ animationDelay: '300ms' }}
            />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider hidden sm:inline">
            {isMuted ? 'MUTE' : 'AUDIO ON'}
          </span>
        </button>

        <button
          onClick={() => {
            audioEngine.playClickSound();
            toggleFullscreen();
          }}
          className="p-1.5 rounded-full bg-white/70 hover:bg-white text-pink-800 border border-pink-200/70 transition-all hover:scale-105 active:scale-95 hidden sm:flex items-center justify-center"
          title="Toàn màn hình"
          aria-label="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
