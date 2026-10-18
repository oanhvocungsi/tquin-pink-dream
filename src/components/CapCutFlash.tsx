import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CapCutFlashProps {
  isFlashing: boolean;
}

export const CapCutFlash: React.FC<CapCutFlashProps> = ({ isFlashing }) => {
  return (
    <AnimatePresence>
      {isFlashing && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-tr from-pink-300/80 via-white/95 to-rose-300/80 backdrop-blur-[2px]"
        />
      )}
    </AnimatePresence>
  );
};
