import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Sparkles } from "lucide-react";
import { Petals, GlowOrbs, StarField, EnvelopeIcon } from "./shared";

interface Props {
  phase: "sealed" | "opening" | "open";
  onOpen: () => void;
}

export default function OpeningScreen({ phase, onOpen }: Props) {
  return (
    <AnimatePresence>
      {phase !== "open" && (
        <motion.section
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#1a080f] px-5 py-12 text-center text-rose-50"
        >
          <StarField />
          <Petals count={25} />
          <GlowOrbs />

          {/* Ambient rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[300, 450, 600].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-rose-900/20"
                style={{ width: size, height: size }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 mx-auto max-w-lg"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="sans-font mb-6 text-[10px] uppercase tracking-[0.35em] text-rose-300/80"
            >
              A little something for you
            </motion.p>

            <motion.div
              animate={phase === "opening" ? { y: [-5, -20, -5] } : { y: [0, -8, 0] }}
              transition={{ duration: phase === "opening" ? 1 : 2.5, repeat: phase === "opening" ? 0 : Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <EnvelopeIcon opening={phase === "opening"} />
            </motion.div>

            <h1 className="script-font text-6xl leading-tight sm:text-8xl">Hey, Beautiful...</h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
              <p className="serif-font mx-auto mt-6 max-w-sm text-base leading-9 text-rose-100/75 sm:text-lg">
                I made something for you.<br />
                It&apos;s not just a birthday wish.<br />
                It&apos;s a little piece of my heart. ♡
              </p>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(233,154,176,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpen}
                disabled={phase === "opening"}
                className="mx-auto mt-10 flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 px-8 py-4 text-sm font-medium text-white shadow-2xl shadow-rose-900/50 transition-all disabled:opacity-70"
              >
                <Mail size={17} />
                {phase === "opening" ? "Opening..." : "Open Your Surprise ✨"}
                <Heart size={15} fill="currentColor" />
              </motion.button>

              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="sans-font mt-8 text-[10px] tracking-[0.3em] text-rose-200/40 uppercase"
              >
                Made with love, just for you
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
