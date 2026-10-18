import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Star, Sun, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

interface MessageSceneProps {
  onNext: () => void;
  canNavigate: boolean;
}

const MESSAGES = [
  {
    id: 1,
    tag: '01 // RADIANCE',
    icon: Sun,
    title: 'Vẻ Đẹp Độc Bản & Ngọt Ngào',
    body: 'Chúc Tquin một ngày 20/10 ngọt ngào tựa như gam màu hồng pastel nhưng kiêu hãnh và rực rỡ như sắc Hot Pink. Mong rằng nụ cười của Tquin sẽ luôn là điều bừng sáng nhất trong mọi khung hình cuộc sống.',
    accent: 'from-pink-400 to-rose-400',
  },
  {
    id: 2,
    tag: '02 // EMPOWERMENT',
    icon: Star,
    title: 'Tự Do, Bản Lĩnh & Tỏa Sáng',
    body: 'Không cần phải chạy theo bất kỳ chuẩn mực của ai, bởi phiên bản Tquin tự tin, yêu đời và luôn kiên định theo đuổi những điều mình yêu thích đã là một tác phẩm nghệ thuật trọn vẹn và cuốn hút nhất.',
    accent: 'from-rose-500 to-pink-600',
  },
  {
    id: 3,
    tag: '03 // SERENITY',
    icon: Heart,
    title: 'Bình Yên & Hạnh Phúc Vẹn Tròn',
    body: 'Chúc mỗi bước đi của Tquin đều trải hoa thơm, mỗi ngày thức dậy đều ngập tràn niềm vui gõ cửa. Mong thế giới này luôn dành cho Tquin sự dịu dàng, nâng niu và những điều tuyệt vời nhất.',
    accent: 'from-pink-500 to-fuchsia-600',
  },
];

export const MessageScene: React.FC<MessageSceneProps> = ({ onNext, canNavigate }) => {
  const [celebratedId, setCelebratedId] = useState<number | null>(null);

  const handleCardClick = (id: number, event: React.MouseEvent<HTMLDivElement>) => {
    audioEngine.playSparkle();
    setCelebratedId(id);

    // Mini localized confetti burst from card click
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFFFFF'],
      disableForReducedMotion: true,
    });
  };

  const handleNext = () => {
    if (!canNavigate) return;
    audioEngine.playWhoosh();
    onNext();
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center px-4 md:px-8 py-20 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 border border-pink-300/50 shadow-sm text-xs font-mono text-pink-800 uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>ACT 03 // 20.10 DEDICATION</span>
        </div>

        <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-6xl text-pink-950 tracking-tight">
          GỬI TẶNG TQUIN
        </h2>

        <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-pink-600 mt-2">
          Những điều dịu dàng nhất nhân ngày Phụ nữ Việt Nam 20/10
        </p>
      </motion.div>

      {/* 3 Staggered Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {MESSAGES.map((msg, index) => {
          const Icon = msg.icon;
          const isCelebrated = celebratedId === msg.id;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => handleCardClick(msg.id, e)}
              className={`glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 relative group select-none ${
                isCelebrated ? 'ring-2 ring-pink-400 bg-white/90 shadow-xl' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-pink-700 uppercase font-semibold">
                    {msg.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-syne font-bold text-lg md:text-xl text-pink-950 mb-3 leading-snug">
                  {msg.title}
                </h3>

                <p className="text-xs sm:text-sm text-pink-900/80 font-light leading-relaxed">
                  {msg.body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-pink-200/50 flex items-center justify-between text-[11px] font-mono text-pink-700/80">
                <span>CHẠM ĐỂ THẢ TIM</span>
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${
                    isCelebrated ? 'text-pink-600 fill-pink-500 scale-125' : 'text-pink-400 group-hover:text-pink-600'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Step Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-10 md:mt-12 flex justify-center"
      >
        <button
          onClick={handleNext}
          disabled={!canNavigate}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 text-white font-medium text-xs md:text-sm tracking-wider uppercase shadow-[0_10px_30px_rgba(236,72,153,0.35)] hover:shadow-[0_14px_40px_rgba(236,72,153,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/40"
        >
          <Gift className="w-4 h-4" />
          <span className="font-semibold tracking-[0.15em]">MỞ HỘP QUÀ KỸ THUẬT SỐ</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
