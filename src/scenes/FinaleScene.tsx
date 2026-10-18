import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Share2,
  Heart,
  Crown,
  Check,
  Flower2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

interface FinaleSceneProps {
  onReplay: () => void;
  canNavigate: boolean;
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({ onReplay, canNavigate }) => {
  const [copied, setCopied] = useState(false);

  const triggerCelebration = () => {
    audioEngine.playGiftFanfare();

    // Multi-angle luxurious confetti explosion
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFFFFF', '#FFD700', '#F472B6'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleShare = () => {
    audioEngine.playSparkle();
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReplayClick = () => {
    if (!canNavigate) return;
    audioEngine.playWhoosh();
    onReplay();
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center items-center px-4 md:px-8 py-20 text-center relative overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-gradient-to-tr from-pink-400/25 via-rose-300/20 to-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10 ambient-glow" />

      {/* Top CapCut Outro Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-pink-300/50 shadow-sm mb-6"
      >
        <Crown className="w-3.5 h-3.5 text-pink-600" />
        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-pink-900">
          THE FINALE // 20.10 OUTRO
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto"
      >
        <span className="block font-editorial italic text-2xl md:text-3xl text-pink-500 mb-1">
          Forever Radiant, Forever Iconic
        </span>

        <h1 className="font-syne font-black text-6xl sm:text-7xl md:text-9xl tracking-tight leading-none text-shimmer drop-shadow-sm select-none">
          TQUIN
        </h1>

        <p className="font-syne font-semibold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-pink-900/80 mt-4">
          CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10
        </p>
      </motion.div>

      {/* Editorial Credits Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 max-w-lg w-full glass-panel rounded-3xl p-6 md:p-8 text-left shadow-lg border border-pink-200/80"
      >
        <div className="flex items-center justify-between pb-3 border-b border-pink-200/50 text-xs font-mono text-pink-700">
          <span>CAPCUT PRODUCTION CREDITS</span>
          <span>SPECIAL EDIT</span>
        </div>

        <div className="mt-4 space-y-2.5 text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-pink-900/70">STARRING:</span>
            <span className="font-bold text-pink-950 font-syne text-sm">Tquin</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-pink-900/70">AESTHETIC:</span>
            <span className="text-pink-900 font-medium">Pink Luxury Minimalism</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-pink-900/70">SOUNDTRACK:</span>
            <span className="text-pink-900 font-medium">Dreamy Pop Edit (Viral)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-pink-900/70">STATUS:</span>
            <span className="text-pink-600 font-bold">100% Loved & Cherished</span>
          </div>
        </div>

        <p className="mt-5 pt-3 border-t border-pink-200/50 text-xs text-pink-900/80 leading-relaxed font-light text-center">
          "Cảm ơn Tquin vì đã luôn mang lại năng lượng ngọt ngào và rực rỡ nhất."
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={triggerCelebration}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs md:text-sm font-semibold tracking-wider uppercase transition-all shadow-[0_6px_20px_rgba(219,39,119,0.35)] hover:scale-105 active:scale-95"
        >
          <Flower2 className="w-4 h-4" />
          <span>THẢ THÊM HOA & PHÁO SÁNG</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-pink-900 border border-pink-300 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all shadow-sm hover:scale-105 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Đã sao chép link!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-pink-600" />
              <span>CHIA SẺ DIGITAL GIFT</span>
            </>
          )}
        </button>

        <button
          onClick={handleReplayClick}
          disabled={!canNavigate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-pink-700" />
          <span>XEM LẠI TỪ ĐẦU</span>
        </button>
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-1.5 text-xs font-mono text-pink-700/60 uppercase">
        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
        <span>Made with love for Tquin • 20.10.2026</span>
      </div>
    </div>
  );
};
