import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  color: string;
}

const milestoneCompliments: Record<number, string> = {
  10: "You're the prettiest girl in the whole world! 🌸",
  25: "Your smile is my favourite sight in the universe ✨",
  50: "I love you more with every single passing second ❤️",
  100: "You are the best thing that has ever happened to me 👑🫶🏻",
};

export default function FloatingLoveButton() {
  const [loveCount, setLoveCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const colors = ["#f43f5e", "#fb7185", "#fda4af", "#e11d48", "#be123c"];

  const triggerLoveShower = () => {
    const nextCount = loveCount + 1;
    setLoveCount(nextCount);

    // Spawn 3-5 floating hearts
    const newHearts: FloatingHeart[] = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * 80 - 40, // random offset
      size: 16 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setFloatingHearts((prev) => [...prev, ...newHearts]);

    // Check milestones
    if (milestoneCompliments[nextCount]) {
      setPopupMessage(milestoneCompliments[nextCount]);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.9, y: 0.85 },
        colors: ["#f43f5e", "#fda4af", "#ffd6a5"],
      });
    }

    // Clean up hearts after animation
    setTimeout(() => {
      setFloatingHearts((prev) => prev.slice(4));
    }, 1600);
  };

  return (
    <>
      {/* Floating button container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
        {/* Animated Floating Hearts */}
        <div className="relative pointer-events-none w-16 h-28 overflow-visible">
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 20, x: h.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -90, scale: 1.4 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            >
              <Heart size={h.size} fill={h.color} color={h.color} />
            </motion.div>
          ))}
        </div>

        {/* Floating Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={triggerLoveShower}
          className="relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-4 py-3 text-white shadow-xl shadow-rose-900/30 border-2 border-white/40 backdrop-blur-md cursor-pointer transition"
          aria-label="Send Diya love"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={18} fill="currentColor" />
          </motion.div>

          <span className="sans-font text-xs tracking-wider uppercase font-semibold">
            {loveCount > 0 ? `${loveCount} Loved ♡` : "Send Love ♡"}
          </span>

          <Sparkles size={14} className="text-rose-200" />
        </motion.button>
      </div>

      {/* Secret Milestone Compliment Popup */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 max-w-xs rounded-2xl border border-rose-300/40 bg-[#2d111d]/95 p-4 text-rose-50 shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={() => setPopupMessage(null)}
              className="absolute top-2 right-2 rounded-full p-1 text-rose-300 hover:text-white transition"
            >
              <X size={14} />
            </button>
            <div className="flex items-start gap-2.5 pr-4">
              <span className="text-xl">💌</span>
              <div>
                <p className="sans-font text-[9px] uppercase tracking-widest text-rose-300 font-semibold">
                  Secret Compliment Unlocked
                </p>
                <p className="serif-font mt-1 text-sm leading-relaxed text-rose-100">
                  {popupMessage}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
