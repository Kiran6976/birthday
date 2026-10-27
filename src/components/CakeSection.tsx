import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Cake, Sparkles } from "lucide-react";
import { Reveal, SectionHeading, Candle } from "./shared";

function fireCelebration() {
  const launch = (opts: confetti.Options) =>
    confetti({ ...opts, colors: ["#f8a5c2", "#ffffff", "#c44569", "#ffd6a5", "#E99AB0", "#B63E61"] });
  launch({ particleCount: 80, spread: 70, origin: { y: 0.65 } });
  setTimeout(() => launch({ particleCount: 60, spread: 100, origin: { x: 0.1, y: 0.6 } }), 300);
  setTimeout(() => launch({ particleCount: 60, spread: 100, origin: { x: 0.9, y: 0.6 } }), 500);
}

export default function CakeSection() {
  const [blown, setBlown] = useState(false);
  const cheerAudioRef = useRef<HTMLAudioElement | null>(null);

  const cheerSoundSrc = "/Children Yay Sound Effect (HD).mp3";

  const handleBlowCandles = () => {
    setBlown(true);
    fireCelebration();

    // Play celebration cheer sound once
    if (cheerAudioRef.current) {
      cheerAudioRef.current.currentTime = 0;
      cheerAudioRef.current.play().catch((err) => {
        console.log("Cheer audio playback issue:", err);
      });
    }
  };

  return (
    <section id="cake" className="section-padding bg-[#fff5f5] text-center">
      {/* Hidden sound effect element */}
      <audio
        ref={cheerAudioRef}
        src={cheerSoundSrc}
        preload="auto"
      />

      <Reveal>
        <div className="flex justify-center mb-6">
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <Cake className="text-rose-500" size={40} />
          </motion.div>
        </div>

        <SectionHeading
          eyebrow="YOUR SPECIAL MOMENT"
          title="Make a Wish"
          subtitle="Close your eyes, hold a wish in your heart, and blow out the candles."
        />

        {/* Cake card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-14 max-w-xs"
        >
          <div className="relative rounded-3xl border border-rose-100 bg-white p-10 shadow-xl shadow-rose-200/40">
            {blown && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0.2] }} transition={{ duration: 1 }} className="absolute inset-0 rounded-3xl bg-rose-100/40" />
            )}
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2].map((i) => <Candle key={i} blown={blown} />)}
            </div>
            <motion.div animate={blown ? {} : { y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-8xl">🎂</motion.div>
            <p className="script-font mt-4 text-4xl text-rose-700">{blown ? "Wish granted! ♡" : "Happy Birthday!"}</p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleBlowCandles}
          className="mt-8 rounded-full bg-rose-600 px-8 py-4 text-sm text-white shadow-lg shadow-rose-200/60 transition hover:bg-rose-700"
        >
          {blown ? "🎉 Celebrate again!" : "✨ Blow out the candles"}
        </motion.button>

        <AnimatePresence>
          {blown && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-8 max-w-md rounded-2xl border border-rose-100 bg-white/80 px-8 py-6 shadow-sm"
            >
              <Sparkles className="mx-auto mb-3 text-rose-400" size={20} />
              <p className="serif-font text-base leading-8 text-rose-900/70 italic">
                May this new year of your life bring you more happiness than you can imagine,
                beautiful opportunities, and dreams that quietly become reality. ♡
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
