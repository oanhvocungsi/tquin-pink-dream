import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuxuryCanvas } from './components/LuxuryCanvas';
import { CapCutHeader } from './components/CapCutHeader';
import { CapCutTimeline } from './components/CapCutTimeline';
import { CapCutFlash } from './components/CapCutFlash';
import { IntroScene } from './scenes/IntroScene';
import { RevealScene } from './scenes/RevealScene';
import { MessageScene } from './scenes/MessageScene';
import { SurpriseScene } from './scenes/SurpriseScene';
import { FinaleScene } from './scenes/FinaleScene';
import { audioEngine } from './utils/audioEngine';

export function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const totalScenes = 5;

  const goToScene = useCallback(
    (targetScene: number) => {
      if (isTransitioning || targetScene < 1 || targetScene > totalScenes || targetScene === currentScene) {
        return;
      }

      setIsTransitioning(true);
      setIsFlashing(true);

      // Mid-flash swap scene
      setTimeout(() => {
        setCurrentScene(targetScene);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 160);

      // End flash
      setTimeout(() => {
        setIsFlashing(false);
      }, 340);

      // Re-enable interaction
      setTimeout(() => {
        setIsTransitioning(false);
      }, 420);
    },
    [currentScene, isTransitioning, totalScenes]
  );

  const handleNext = useCallback(() => {
    if (currentScene < totalScenes) {
      goToScene(currentScene + 1);
    }
  }, [currentScene, goToScene, totalScenes]);

  const handlePrev = useCallback(() => {
    if (currentScene > 1) {
      goToScene(currentScene - 1);
    }
  }, [currentScene, goToScene]);

  const handleToggleMute = useCallback(() => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleToggleMute]);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#FFF5F8] text-[#240715] overflow-x-hidden selection:bg-[#FF69B4] selection:text-white">
      {/* Editorial Noise Grain Texture */}
      <div className="film-grain" />

      {/* Interactive Luxury Canvas (Particles, Petals, Glows) */}
      <LuxuryCanvas currentScene={currentScene} />

      {/* CapCut Header HUD */}
      <CapCutHeader
        currentScene={currentScene}
        totalScenes={totalScenes}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Scene Transitions Container */}
      <main className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.section
              key="scene-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <IntroScene onStart={() => goToScene(2)} canNavigate={!isTransitioning} />
            </motion.section>
          )}

          {currentScene === 2 && (
            <motion.section
              key="scene-2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <RevealScene onNext={() => goToScene(3)} canNavigate={!isTransitioning} />
            </motion.section>
          )}

          {currentScene === 3 && (
            <motion.section
              key="scene-3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <MessageScene onNext={() => goToScene(4)} canNavigate={!isTransitioning} />
            </motion.section>
          )}

          {currentScene === 4 && (
            <motion.section
              key="scene-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SurpriseScene onNext={() => goToScene(5)} canNavigate={!isTransitioning} />
            </motion.section>
          )}

          {currentScene === 5 && (
            <motion.section
              key="scene-5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <FinaleScene onReplay={() => goToScene(1)} canNavigate={!isTransitioning} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* CapCut Timeline Scrubber */}
      <CapCutTimeline
        currentScene={currentScene}
        totalScenes={totalScenes}
        onSelectScene={goToScene}
        canNavigate={!isTransitioning}
      />

      {/* CapCut Bloom Flash Transition */}
      <CapCutFlash isFlashing={isFlashing} />
    </div>
  );
}

export default App;
