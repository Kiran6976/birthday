import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Music2, Volume2, VolumeX } from "lucide-react";
import { Reveal, StarField, Petals } from "./shared";

interface Props {
  onLetterStateChange?: (isOpen: boolean) => void;
}

export default function LetterSection({ onLetterStateChange }: Props) {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songSrc = "/PAL PAL DIL K PAAS - INSTRUMENTAL Kishore Kumar Dharmendra Unplugged (mp3cut.net).mp3";

  useEffect(() => {
    if (open) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Audio autoplay prevented, user interaction required:", err);
        });
      }
      onLetterStateChange?.(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      onLetterStateChange?.(false);
    }
  }, [open, onLetterStateChange]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <section id="letter" className="section-padding relative overflow-hidden bg-[#2c111d] text-rose-50">
      <StarField />
      <Petals count={15} />

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={songSrc}
        loop
        preload="auto"
      />

      <Reveal>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="mx-auto mb-6 w-fit">
            <Mail className="text-rose-300" size={36} />
          </motion.div>

          <p className="sans-font text-[10px] tracking-[0.3em] text-rose-300/80 uppercase">Something from my heart</p>
          <h2 className="script-font mt-5 text-5xl sm:text-7xl">A Letter for You</h2>
          <p className="serif-font mt-5 text-base leading-8 text-rose-100/60 italic">Some feelings deserve more than a text message...</p>

          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-10 overflow-hidden rounded-2xl bg-[#fff8f0] shadow-2xl shadow-rose-900/30 text-left"
              >
                {/* Header with private letter badge and music status */}
                <div className="border-b border-rose-200/50 bg-rose-50/70 px-6 sm:px-8 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-rose-400" fill="currentColor" />
                    <span className="sans-font text-[9px] tracking-[0.3em] text-rose-500 uppercase font-semibold">Private Letter</span>
                  </div>

                  {/* Music mute/unmute control */}
                  <button
                    onClick={toggleMusic}
                    className="flex items-center gap-1.5 rounded-full border border-rose-300/60 bg-white/80 p-2 sm:px-3 sm:py-1 text-xs text-rose-700 shadow-sm transition hover:bg-rose-100"
                    title={isPlaying ? "Mute music" : "Play music"}
                    aria-label={isPlaying ? "Mute music" : "Play music"}
                  >
                    <Music2 size={13} className={isPlaying ? "animate-spin text-rose-500" : "text-rose-400"} />
                    {isPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  </button>
                </div>

                <div
                  className="p-7 text-left text-[#69364a] sm:p-10"
                  style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(233,154,176,0.2) 28px)", backgroundSize: "100% 28px" }}
                >
                  <p className="script-font text-4xl text-rose-700">My Dearest Diya, ♡</p>
                  <div className="serif-font mt-7 space-y-5 text-base leading-9">
                    <p>Happy Birthday, my love. I&apos;m not sure I have the right words, but I&apos;ll try — because you deserve to hear them.</p>
                    <p>You make my life so much brighter just by being in it. The way you smile, the way you care, the way you are — it&apos;s everything. I find myself grateful for you every single day.</p>
                    <p>Thank you for the laughs, the quiet moments, and the little pieces of your world that you&apos;ve shared with me. They mean more than you know.</p>
                    <p>I hope this birthday brings you all the happiness you bring into the lives of everyone around you. I hope you feel loved today — because you are. Deeply, endlessly, completely.</p>
                    <p>Here&apos;s to you, Diya. To your happiness, your dreams, and to all the beautiful things that are waiting for you. I love you, today and always. ♡</p>
                  </div>
                  <p className="script-font mt-8 text-4xl text-rose-600">With all my love ♡</p>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="sealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(233,154,176,0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="mx-auto mt-10 block rounded-2xl border border-rose-300/30 bg-rose-200/10 px-10 py-8 text-center backdrop-blur-sm transition-all"
              >
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Heart className="mx-auto mb-4 text-rose-300" size={28} fill="currentColor" />
                </motion.div>
                <span className="script-font text-3xl">Read my letter ♡</span>
                <p className="sans-font mt-2 text-xs tracking-wider text-rose-300/60">Sealed with love</p>
              </motion.button>
            )}
          </AnimatePresence>

          {open && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setOpen(false)}
              className="serif-font mt-6 text-sm text-rose-300/60 hover:text-rose-300 transition-colors italic underline underline-offset-4"
            >
              Fold the letter
            </motion.button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
