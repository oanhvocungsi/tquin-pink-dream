import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Flame, Heart, Crown, Music } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface RevealSceneProps {
  onNext: () => void;
  canNavigate: boolean;
}

const PALETTE = [
  { name: 'Baby Pink', hex: '#FFD6E5', mood: 'Dịu dàng & Ngọt ngào' },
  { name: 'Rose Petal', hex: '#FFA6C9', mood: 'Thanh lịch & Duyên dáng' },
  { name: 'Electric Fuchsia', hex: '#EC4899', mood: 'Bản lĩnh & Quyến rũ' },
  { name: 'Pearl Ivory', hex: '#FFF5F8', mood: 'Tinh khôi & Tỏa sáng' },
];

export const RevealScene: React.FC<RevealSceneProps> = ({ onNext, canNavigate }) => {
  const [activeColor, setActiveColor] = useState(PALETTE[2]);

  const handleNext = () => {
    if (!canNavigate) return;
    audioEngine.playWhoosh();
    onNext();
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center px-4 md:px-8 py-20 max-w-6xl mx-auto">
      {/* Top Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-pink-600">
            ACT 02 // VISUAL IDENTITY
          </span>
          <span className="h-[1px] w-12 bg-pink-300" />
        </div>
        <span className="text-xs font-mono text-pink-700/60 tracking-wider">
          FILTER: CINEMATIC ROSE
        </span>
      </motion.div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {/* Large Hero Card (Spans 8 columns on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-8 glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-between group"
        >
          {/* Subtle Pink Ambient Halo */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl transition-colors duration-700 opacity-40 pointer-events-none"
            style={{ backgroundColor: activeColor.hex }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-300/50 text-[11px] font-mono text-pink-800 tracking-wider uppercase mb-4">
              <Crown className="w-3.5 h-3.5 text-pink-600" />
              <span>MAIN CHARACTER ENERGY</span>
            </div>

            <h2 className="font-syne font-black text-4xl sm:text-5xl md:text-6xl text-pink-950 tracking-tight leading-none mb-3">
              TQUIN
            </h2>

            <p className="font-editorial italic text-xl md:text-2xl text-pink-600 font-medium mb-4">
              "Ngọt ngào như kẹo dâu, kiêu hãnh như hoa hồng, và luôn tỏa sáng theo cách độc bản."
            </p>

            <p className="text-sm md:text-base text-pink-900/80 leading-relaxed font-light max-w-xl">
              Không cần gượng ép theo bất kỳ khuôn mẫu nào. Thần thái của Tquin cuốn hút ở chính nét tự nhiên, sự chân thành và nụ cười rạng ngời luôn khiến người đối diện cảm thấy ấm áp.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-5 border-t border-pink-200/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-pink-800/80">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-pink-600" />
              <span>CHARISMA: 100% UNSTOPPABLE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>GLOW RATIO: INFINITE</span>
            </div>
          </div>
        </motion.div>

        {/* Bento Card 2: Interactive Luxury Palette (Spans 4 columns) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 glass-panel rounded-3xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-widest text-pink-700 uppercase font-semibold">
                PALETTE DE LUXE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">
                INTERACTIVE
              </span>
            </div>

            <p className="text-xs text-pink-900/70 mb-4 leading-relaxed">
              Chạm vào từng gam màu để đổi sắc thái cảm xúc:
            </p>

            {/* Color Swatch Tiles */}
            <div className="space-y-2.5">
              {PALETTE.map((item) => {
                const isSelected = activeColor.name === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      audioEngine.playClickSound();
                      setActiveColor(item);
                    }}
                    className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-white shadow-md border border-pink-300 scale-[1.02]'
                        : 'bg-white/40 hover:bg-white/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full shadow-inner border border-white"
                        style={{ backgroundColor: item.hex }}
                      />
                      <div className="text-left">
                        <div className="text-xs font-medium text-pink-950 font-sans">
                          {item.name}
                        </div>
                        <div className="text-[10px] font-mono text-pink-600/80">
                          {item.mood}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-pink-200/50 text-[11px] font-mono text-pink-700 text-center">
            SELECTED: <span className="font-bold text-pink-900">{activeColor.name}</span>
          </div>
        </motion.div>

        {/* Bento Card 3: CapCut Timeline Track (Spans 5 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 glass-panel rounded-3xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono tracking-widest text-pink-700 uppercase font-semibold">
                TIMELINE KEYFRAMES
              </span>
              <Music className="w-3.5 h-3.5 text-pink-600" />
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-pink-100/50 border border-pink-200/50">
                <span className="text-xs font-mono font-bold text-pink-600">00:01</span>
                <span className="text-xs text-pink-900 font-medium">Lướt qua với thần thái cuốn hút</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-pink-100/50 border border-pink-200/50">
                <span className="text-xs font-mono font-bold text-pink-600">00:05</span>
                <span className="text-xs text-pink-900 font-medium">Nụ cười làm bừng sáng cả khung hình</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-pink-100/50 border border-pink-200/50">
                <span className="text-xs font-mono font-bold text-pink-600">00:10</span>
                <span className="text-xs text-pink-900 font-medium">Tquin — Tỏa sáng bất chấp thời gian</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-pink-800">
            <span>CAPCUT PRO RENDER</span>
            <span className="text-pink-600 font-semibold">100% COMPLETE</span>
          </div>
        </motion.div>

        {/* Bento Card 4: Editorial Statement (Spans 7 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-white/70 via-pink-50/50 to-pink-100/60"
        >
          <div>
            <span className="text-xs font-mono tracking-widest text-pink-700 uppercase font-semibold">
              EDITORIAL REMARK
            </span>
            <h3 className="font-editorial italic text-2xl md:text-3xl text-pink-950 mt-3 leading-snug">
              "Phong cách là cách bạn nói lên bạn là ai mà không cần phải cất lời."
            </h3>
            <p className="text-sm text-pink-900/80 mt-3 font-light leading-relaxed">
              Chúc Tquin luôn giữ trọn ngọn lửa đam mê, sự tự do trong tâm hồn và luôn là nguồn cảm hứng ngọt ngào cho những người xung quanh.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!canNavigate}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs md:text-sm font-semibold tracking-wider uppercase transition-all shadow-[0_8px_25px_rgba(236,72,153,0.35)] hover:scale-105 active:scale-95"
            >
              <span>XEM LỜI CHÚC 20/10</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
