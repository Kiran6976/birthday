import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Clock } from "lucide-react";
import { Reveal } from "./shared";

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export default function LoveCounterSection() {
  const startDate = new Date(2024, 8, 13, 0, 0, 0); // September 13, 2024 (Month is 0-indexed: 8 = Sept)

  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - startDate.getTime());

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeElapsed({
        days,
        hours,
        minutes,
        seconds,
        totalDays: days,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeElapsed.days },
    { label: "Hours", value: timeElapsed.hours },
    { label: "Minutes", value: timeElapsed.minutes },
    { label: "Seconds", value: timeElapsed.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff5f5] via-[#ffeef3] to-[#fffaf5] px-5 py-20 text-center">
      <Reveal>
        <div className="mx-auto max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-rose-500">
            <Clock size={15} />
            <span className="sans-font text-[10px] uppercase tracking-[0.3em] font-medium">
              Every Second With You
            </span>
            <Sparkles size={14} />
          </div>

          <h2 className="script-font mt-3 text-5xl sm:text-6xl text-rose-800">
            How Long I&apos;ve Loved You
          </h2>

          <p className="serif-font mx-auto mt-4 max-w-lg text-base leading-8 text-rose-950/70">
            Since <span className="font-semibold text-rose-700">September 13, 2024</span> — the day my favorite story began.
          </p>

          {/* Glowing Timer Blocks */}
          <div className="mx-auto mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4 max-w-2xl">
            {timeBlocks.map((block) => (
              <motion.div
                key={block.label}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl border border-rose-200/80 bg-white/80 p-5 shadow-lg shadow-rose-200/30 backdrop-blur-md"
              >
                {/* Background glow circle */}
                <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-rose-200/30 blur-xl pointer-events-none" />

                <motion.span
                  key={block.value}
                  initial={{ opacity: 0.5, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="serif-font block text-4xl sm:text-5xl font-bold text-rose-700 tabular-nums"
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>

                <span className="sans-font mt-1 block text-xs tracking-widest text-rose-900/60 uppercase font-medium">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Romantic note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-2 text-rose-600/80"
          >
            <Heart size={14} className="fill-rose-400 text-rose-400 animate-pulse" />
            <p className="serif-font italic text-sm sm:text-base">
              ...and every single second has been my favourite part of life. ♡
            </p>
            <Heart size={14} className="fill-rose-400 text-rose-400 animate-pulse" />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
