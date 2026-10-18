import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface IntroSceneProps {
  onStart: () => void;
  canNavigate: boolean;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onStart, canNavigate }) => {
  const handleStart = () => {
    if (!canNavigate) return;
    audioEngine.startMusic();
    audioEngine.playSparkle();
    onStart();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-8 py-20 text-center overflow-hidden">
      {/* Ambient pink backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[600px] h-[340px] md:h-[600px] bg-gradient-to-tr from-pink-300/30 via-rose-300/20 to-pink-100/40 rounded-full blur-3xl pointer-events-none -z-10 ambient-glow" />

      {/* Editorial Pill Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-300/40 shadow-sm mb-6 md:mb-8"
      >
        <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-[11px] md:text-xs font-mono font-medium tracking-[0.2em] uppercase text-pink-900">
          20.10 SPECIAL DIGITAL GIFT • VOL. 01
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
      </motion.div>

      {/* Main Title Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Subtle decorative script label */}
        <span className="block font-editorial italic text-2xl md:text-4xl text-pink-500/90 tracking-wide mb-1">
          Exclusive for
        </span>

        {/* Hero Name: TQUIN */}
        <h1 className="font-syne font-black text-6xl sm:text-7xl md:text-9xl lg:text-[11rem] tracking-tight leading-none text-shimmer drop-shadow-sm select-none">
          TQUIN
        </h1>

        {/* Editorial Subtitle */}
        <div className="mt-3 md:mt-5 flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 md:w-16 bg-pink-300" />
          <h2 className="font-syne font-semibold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-pink-900/80">
            PINK LUXURY EDIT • 2026
          </h2>
          <div className="h-[1px] w-8 md:w-16 bg-pink-300" />
        </div>
      </motion.div>

      {/* Editorial Description & CapCut Specs */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto mt-6 text-sm md:text-base text-pink-900/75 leading-relaxed font-light px-4"
      >
        Một tác phẩm thị giác chuyển động lấy cảm hứng từ những thước phim CapCut tinh tế nhất.
        Dành riêng để tôn vinh sự ngọt ngào, bản lĩnh và nụ cười rực rỡ của Tquin nhân ngày 20/10.
      </motion.p>

      {/* Interactive Unveil CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 md:mt-12 flex flex-col items-center gap-3"
      >
        <button
          onClick={handleStart}
          disabled={!canNavigate}
          className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-4.5 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 text-white font-medium text-sm md:text-base tracking-wider uppercase shadow-[0_12px_35px_rgba(236,72,153,0.38)] hover:shadow-[0_16px_45px_rgba(236,72,153,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] border border-white/40 overflow-hidden"
        >
          {/* Shimmer sweep animation across button */}
          <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

          <Play className="w-4 h-4 fill-white" />
          <span className="font-semibold tracking-[0.15em]">CHẠM ĐỂ BẮT ĐẦU EDIT</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-[11px] font-mono tracking-widest text-pink-700/60 flex items-center gap-1.5 uppercase">
          <Heart className="w-3 h-3 text-pink-500 fill-pink-400" />
          Nhấn để mở âm thanh & hiệu ứng chuyển cảnh
        </span>
      </motion.div>
    </div>
  );
};
