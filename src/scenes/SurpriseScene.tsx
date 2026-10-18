import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Sparkles,
  ArrowRight,
  Download,
  RotateCw,
  Crown,
  Heart,
  Flower2,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

interface SurpriseSceneProps {
  onNext: () => void;
  canNavigate: boolean;
}

const COMPLIMENTS = [
  'Visual 10/10 — Hôm nay Tquin xinh xịn và rạng rỡ nhất!',
  'Thần thái ngút ngàn, chỉ cần mỉm cười là cả khung hình đều bừng sáng.',
  'Chúc Tquin luôn xinh đẹp, ví tiền lúc nào cũng đầy, vạn sự hanh thông!',
  'Slay mọi khoảnh khắc — Chúc Tquin mãi là nàng công chúa ngọt ngào và bản lĩnh.',
  'Năng lượng tích cực, ấm áp và luôn truyền cảm hứng cho mọi người.',
  'Một cô gái độc bản, thông minh, tinh tế và tràn đầy sức hút riêng biệt.',
  'Chúc Tquin có 365 ngày trọn vẹn yêu thương, chứ không chỉ riêng 20/10!',
];

const STICKERS = [
  { id: 'crown', label: 'Vương miện', icon: Crown, color: '#FFD700' },
  { id: 'bow', label: 'Nơ lụa', icon: Heart, color: '#FF1493' },
  { id: 'flower', label: 'Hoa hồng', icon: Flower2, color: '#FF69B4' },
  { id: 'sparkle', label: 'Lấp lánh', icon: Sparkles, color: '#F472B6' },
];

export const SurpriseScene: React.FC<SurpriseSceneProps> = ({ onNext, canNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [activeStickers, setActiveStickers] = useState<string[]>(['crown', 'sparkle']);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const photocardRef = useRef<HTMLDivElement | null>(null);

  const handleOpenBox = () => {
    audioEngine.playGiftFanfare();
    setIsOpen(true);

    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FFB6C1', '#FF1493', '#FFFFFF', '#FFD700'],
      disableForReducedMotion: true,
    });
  };

  const handleNextCompliment = () => {
    audioEngine.playSparkle();
    setComplimentIndex((prev) => (prev + 1) % COMPLIMENTS.length);
  };

  const toggleSticker = (id: string) => {
    audioEngine.playClickSound();
    setActiveStickers((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleDownloadCard = () => {
    audioEngine.playSparkle();
    // Generate an image via canvas
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Luxury Pink Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 800, 1000);
    bgGrad.addColorStop(0, '#FFF5F8');
    bgGrad.addColorStop(0.5, '#FFE4ED');
    bgGrad.addColorStop(1, '#FFCCD9');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 1000);

    // Decorative Hairline Border
    ctx.strokeStyle = '#F472B6';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 740, 940);

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 720, 920);

    // Header Text
    ctx.fillStyle = '#9D174D';
    ctx.font = 'bold 24px Syne, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SPECIAL DIGITAL KEEPSAKE • 20.10.2026', 400, 120);

    // TQUIN Big Typography
    ctx.fillStyle = '#240715';
    ctx.font = '900 100px Syne, sans-serif';
    ctx.fillText('TQUIN', 400, 240);

    // Subtitle
    ctx.fillStyle = '#DB2777';
    ctx.font = 'italic 34px Cormorant Garamond, serif';
    ctx.fillText('Pink Luxury Edit • Forever Radiant', 400, 300);

    // Inner Card Glass Frame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillRect(80, 350, 640, 450);
    ctx.strokeStyle = '#FFA4BD';
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 350, 640, 450);

    // Affirmation Text
    ctx.fillStyle = '#4A0E2A';
    ctx.font = 'bold 28px Outfit, sans-serif';
    ctx.fillText('LỜI CHÚC DÀNH TẶNG BẠN', 400, 430);

    ctx.fillStyle = '#7A3355';
    ctx.font = '22px Outfit, sans-serif';
    const lines = [
      'Chúc Tquin luôn ngọt ngào như kẹo dâu,',
      'kiêu hãnh như hoa hồng và mãi rực rỡ.',
      'Mỗi ngày thức dậy đều có niềm vui gõ cửa!',
    ];
    lines.forEach((line, i) => {
      ctx.fillText(line, 400, 500 + i * 40);
    });

    // Badge
    ctx.fillStyle = '#EC4899';
    ctx.font = 'bold 20px Outfit, sans-serif';
    ctx.fillText('✦ 10/10 MAIN CHARACTER ENERGY ✦', 400, 720);

    // Footer
    ctx.fillStyle = '#9D174D';
    ctx.font = '16px monospace';
    ctx.fillText('VERIFIED AUTHENTIC DIGITAL GIFT // TQUIN EDITION', 400, 920);

    // Download link trigger
    const link = document.createElement('a');
    link.download = 'TQUIN-20-10-Pink-Luxury-Card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleNext = () => {
    if (!canNavigate) return;
    audioEngine.playWhoosh();
    onNext();
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center px-4 md:px-8 py-20 max-w-5xl mx-auto">
      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 border border-pink-300/50 shadow-sm text-xs font-mono text-pink-800 uppercase tracking-widest mb-3">
          <Gift className="w-3.5 h-3.5 text-pink-500" />
          <span>ACT 04 // THE DIGITAL VAULT</span>
        </div>

        <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-pink-950 tracking-tight">
          HỘP QUÀ BÍ MẬT DÀNH RIÊNG CHO TQUIN
        </h2>
        <p className="font-editorial italic text-lg md:text-xl text-pink-600 mt-1">
          Chạm để mở khóa thiệp kỷ niệm và thông điệp may mắn
        </p>
      </motion.div>

      {/* Interactive Unboxing Experience */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Luxury Box */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <div
                onClick={handleOpenBox}
                className="group relative cursor-pointer p-8 md:p-12 rounded-3xl glass-panel hover:bg-white/90 border border-pink-300 transition-all duration-300 hover:scale-105 shadow-[0_20px_50px_rgba(236,72,153,0.2)] flex flex-col items-center text-center max-w-md w-full select-none"
              >
                {/* Glowing silk ribbon cross */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-pink-400/40 pointer-events-none" />
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 bg-pink-400/40 pointer-events-none" />

                <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-400 flex items-center justify-center text-white shadow-[0_10px_25px_rgba(219,39,119,0.4)] group-hover:rotate-12 transition-transform">
                  <Gift className="w-12 h-12 stroke-[1.5]" />
                </div>

                <div className="relative z-10 mt-6">
                  <h3 className="font-syne font-bold text-xl text-pink-950">
                    BẤM ĐỂ MỞ QUÀ
                  </h3>
                  <p className="text-xs text-pink-700/80 mt-1 font-mono uppercase tracking-wider">
                    CLICK TO UNTIE THE SILK RIBBON
                  </p>
                </div>

                <div className="relative z-10 mt-5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>Món quà số được chuẩn bị riêng</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Opened Vault Contents */
            <motion.div
              key="opened-box"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              {/* Left Column: Holographic Photocard (Spans 6 cols) */}
              <div className="md:col-span-6 glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-widest text-pink-700 uppercase font-semibold">
                    DIGITAL KEEPSAKE CARD
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">
                    LIMITED 20.10
                  </span>
                </div>

                {/* The Virtual Photocard */}
                <div
                  ref={photocardRef}
                  className="w-full max-w-[320px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-white via-pink-50 to-pink-100/90 border-2 border-pink-300 shadow-xl p-5 flex flex-col justify-between relative overflow-hidden group select-none transition-transform duration-300 hover:rotate-1"
                >
                  {/* Card Light Reflection Bar */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none opacity-60" />

                  {/* Header of Photocard */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-pink-700/80">
                    <span>✦ TQUIN SPECIAL</span>
                    <span>20.10.2026</span>
                  </div>

                  {/* Photocard Center Visual */}
                  <div className="my-auto text-center py-4 relative">
                    {/* Active Stickers Overlaid */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {activeStickers.map((sId) => {
                        const st = STICKERS.find((item) => item.id === sId);
                        if (!st) return null;
                        const Icon = st.icon;
                        return (
                          <span
                            key={sId}
                            className="p-1 rounded-full bg-white/90 shadow-sm border border-pink-200"
                            style={{ color: st.color }}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                        );
                      })}
                    </div>

                    <h4 className="font-syne font-black text-4xl text-pink-950 tracking-tight">
                      TQUIN
                    </h4>
                    <p className="font-editorial italic text-base text-pink-600 mt-1">
                      Forever Iconic & Sweet
                    </p>
                    <div className="mt-3 px-3 py-1.5 rounded-xl bg-white/80 border border-pink-200 text-xs text-pink-900 leading-relaxed font-light">
                      "Một cô gái luôn toát ra vẻ đẹp độc bản, tự do và ngập tràn tình yêu đời."
                    </div>
                  </div>

                  {/* Footer of Photocard */}
                  <div className="pt-2 border-t border-pink-200/60 flex items-center justify-between text-[9px] font-mono text-pink-600">
                    <span>PINK LUXURY EDIT</span>
                    <span className="font-bold">10/10 RATING</span>
                  </div>
                </div>

                {/* Sticker Customizer Toolbar */}
                <div className="w-full mt-4 flex items-center justify-center gap-2">
                  <span className="text-[11px] font-mono text-pink-700 mr-1">Stickers:</span>
                  {STICKERS.map((st) => {
                    const isActive = activeStickers.includes(st.id);
                    const Icon = st.icon;
                    return (
                      <button
                        key={st.id}
                        onClick={() => toggleSticker(st.id)}
                        className={`p-2 rounded-xl border text-xs transition-all flex items-center gap-1 ${
                          isActive
                            ? 'bg-pink-600 text-white border-pink-600 scale-105'
                            : 'bg-white/80 text-pink-800 border-pink-200 hover:bg-white'
                        }`}
                        title={st.label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownloadCard}
                  className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-pink-50 text-pink-900 border border-pink-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Đã lưu thiệp về máy!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-pink-600" />
                      <span>LƯU THIỆP KỶ NIỆM (TẢI ẢNH)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Compliment Generator & Player (Spans 6 cols) */}
              <div className="md:col-span-6 space-y-4">
                {/* Compliment Capsule Card */}
                <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono tracking-widest text-pink-700 uppercase font-semibold">
                        SECRET COMPLIMENT CAPSULE
                      </span>
                      <Sparkles className="w-4 h-4 text-pink-500" />
                    </div>

                    <p className="text-xs text-pink-700/80 mb-3">
                      Thông điệp may mắn ngẫu nhiên dành cho Tquin:
                    </p>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={complimentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 rounded-2xl bg-white/90 border border-pink-200 shadow-sm"
                      >
                        <p className="font-editorial italic text-xl md:text-2xl text-pink-900 leading-snug">
                          "{COMPLIMENTS[complimentIndex]}"
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-pink-200/50">
                    <span className="text-[11px] font-mono text-pink-600">
                      QUẢNG NGẪU NHIÊN 0{complimentIndex + 1} / 0{COMPLIMENTS.length}
                    </span>
                    <button
                      onClick={handleNextCompliment}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-medium transition-all hover:scale-105 active:scale-95"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-pink-600" />
                      <span>Rút thẻ khác</span>
                    </button>
                  </div>
                </div>

                {/* Cassette / Audio Feature Card */}
                <div className="glass-panel rounded-3xl p-5 flex items-center justify-between bg-gradient-to-r from-pink-50/80 via-white/80 to-pink-100/80 border border-pink-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-md animate-pulse">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-pink-950 font-syne uppercase">
                        TRACK: DREAMY POP EDIT (VIRAL)
                      </div>
                      <div className="text-[11px] font-mono text-pink-700/80">
                        LOFI CHORD ENGINE • AMBIENT PINK
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-pink-600">20:10 / 20:10</span>
                </div>

                {/* Next CTA to Finale */}
                <div className="pt-2">
                  <button
                    onClick={handleNext}
                    disabled={!canNavigate}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 text-white font-semibold text-xs md:text-sm tracking-wider uppercase shadow-[0_8px_25px_rgba(236,72,153,0.35)] hover:shadow-[0_12px_35px_rgba(236,72,153,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border border-white/40"
                  >
                    <span>TIẾN TỚI MÀN FINALE KỶ NIỆM</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
