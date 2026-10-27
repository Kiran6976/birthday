import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

/* ── Floating petals ─────────────────────── */
export function Petals({ light = false, count = 20 }: { light?: boolean; count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className={`absolute block rounded-full ${light ? "bg-rose-300/25" : "bg-rose-200/20"}`}
          style={{
            left: `${(i * 37 + 7) % 100}%`,
            top: "-5%",
            width: 6 + (i % 5) * 2,
            height: (6 + (i % 5) * 2) * 1.6,
            filter: "blur(0.5px)",
          }}
          animate={{ y: ["0vh", "110vh"], x: [0, i % 2 === 0 ? 30 : -30, 0], rotate: [0, 360], opacity: [0, 0.9, 0] }}
          transition={{ duration: 7 + (i % 7), repeat: Infinity, delay: i * 0.35, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ── Glowing orbs ────────────────────────── */
export function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { left: "15%", top: "20%", size: 300, color: "rgba(182,62,97,0.12)" },
        { left: "70%", top: "60%", size: 250, color: "rgba(233,154,176,0.10)" },
        { left: "40%", top: "80%", size: 200, color: "rgba(182,62,97,0.08)" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.left, top: orb.top,
            width: orb.size, height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            transform: "translate(-50%,-50%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
        />
      ))}
    </div>
  );
}

/* ── Twinkling star field ─────────────────── */
export function StarField() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 23.7 + 5) % 100}%`,
    top:  `${(i * 17.3 + 3) % 100}%`,
    size: 1 + (i % 3) * 0.7,
    dur:  1.5 + (i % 5) * 0.5,
    delay: (i % 8) * 0.4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-rose-100"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.4, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Scroll-reveal wrapper ───────────────── */
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading ─────────────────────── */
export function SectionHeading({
  eyebrow, title, subtitle, light = false,
}: {
  eyebrow: string; title: string; subtitle?: string; light?: boolean;
}) {
  return (
    <div className="text-center">
      <p className={`sans-font text-[10px] font-light tracking-[0.3em] ${light ? "text-rose-200" : "text-rose-600"}`}>
        {eyebrow}
      </p>
      <h2 className={`script-font mt-4 text-5xl sm:text-6xl ${light ? "text-rose-100" : "text-rose-800"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`serif-font mx-auto mt-4 max-w-lg text-base leading-8 ${light ? "text-rose-100/70" : "text-rose-950/60"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Animated envelope icon ──────────────── */
export function EnvelopeIcon({ opening }: { opening: boolean }) {
  return (
    <div className="relative mx-auto w-24 h-16 sm:w-32 sm:h-20">
      <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-rose-100 to-rose-200 shadow-2xl shadow-rose-900/40 border border-rose-200/30" />
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        animate={{ rotateX: opening ? -160 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ perspective: "500px", transformStyle: "preserve-3d" }}
      >
        <div
          className="w-full"
          style={{
            height: 0,
            borderLeft: "calc(3rem + 1px) solid transparent",
            borderRight: "calc(3rem + 1px) solid transparent",
            borderTop: "2rem solid #f9dde5",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Heart size={14} className="text-rose-500 fill-rose-500" />
        </div>
      </motion.div>
      <AnimatePresence>
        {opening && (
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -20, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -top-5 left-2 right-2 h-6 rounded-t-sm bg-rose-50 border border-rose-200/50 flex items-center justify-center"
          >
            <span className="text-[8px] text-rose-400 tracking-widest">FOR YOU ♡</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Candle ──────────────────────────────── */
export function Candle({ blown }: { blown: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence>
        {!blown ? (
          <motion.div key="flame" exit={{ scaleY: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="relative mb-0.5">
            <motion.div
              className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-200"
              animate={{ scaleX: [1, 0.85, 1.1, 0.9, 1], scaleY: [1, 1.1, 0.95, 1.05, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "bottom center" }}
            />
            <div className="absolute inset-0 rounded-full bg-amber-100/60 blur-sm" />
          </motion.div>
        ) : (
          <motion.div key="puff" initial={{ opacity: 0, y: -5 }} animate={{ opacity: [0, 1, 0], y: -15 }} transition={{ duration: 0.8 }} className="text-xs mb-1">
            💨
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-0.5 h-2 bg-gray-700 rounded" />
      <div className="w-4 h-10 rounded-sm bg-gradient-to-b from-rose-100 to-rose-200 shadow-sm border border-rose-200/50" />
    </div>
  );
}
