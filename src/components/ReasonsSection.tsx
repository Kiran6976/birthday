import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";

interface ReasonItem {
  icon: string;
  title: string;
  message: string;
  image?: string;
  video?: string;
}

const reasons: ReasonItem[] = [
  {
    icon: "✨",
    title: "Your smile",
    image: "/IMG20250719130046.jpg",
    message: "Your smile has a way of making even the most ordinary day feel like the most beautiful thing that ever happened. It's my favourite sight in the whole world.",
  },
  {
    icon: "💫",
    title: "Your kind heart",
    image: "/IMG20250724182240.jpg",
    message: "I love how genuinely you care — about people, about little things, about the world. Your kindness is one of the most beautiful things about you.",
  },
  {
    icon: "🌙",
    title: "The little things",
    image: "/IMG20250806162150.jpg",
    message: "The way you laugh, the little things you do without thinking — they're the moments I keep replaying in my head because they make me fall for you all over again.",
  },
  {
    icon: "🌸",
    title: "Simply you",
    image: "/IMG20251022120357.jpg",
    message: "You don't have to do anything special or be anything other than yourself. You, simply as you are, are already everything I could ever want.",
  },
  {
    icon: "⭐",
    title: "Your strength",
    video: "/VID20260129130525.mp4",
    message: "I admire how resilient and strong you are, even when things are hard. Watching you navigate life with such grace makes me proud to know you.",
  },
  {
    icon: "🦋",
    title: "How you make me feel",
    video: "/VID20260929130405.mp4",
    message: "With you, everything feels lighter. The world feels bigger and more beautiful. You make me want to be a better person every single day.",
  },
];

export default function ReasonsSection() {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggle = (i: number) =>
    setRevealed((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <section id="reasons" className="section-padding bg-gradient-to-b from-rose-100/60 to-[#fff5f5]">
      <Reveal>
        <SectionHeading
          eyebrow="A LITTLE REMINDER"
          title="Reasons I Love You"
          subtitle="A few of the countless reasons you mean the world to me. Tap each card to reveal."
        />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => {
          const isRevealed = revealed.includes(index);

          return (
            <Reveal key={reason.title} delay={index * 0.08}>
              <motion.button
                layout
                onClick={() => toggle(index)}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(182,62,97,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className={`flex min-h-56 w-full flex-col items-center justify-center rounded-3xl border p-6 text-center shadow-sm transition-all overflow-hidden ${
                  isRevealed ? "border-rose-200 bg-gradient-to-b from-rose-50 to-white" : "border-white/80 bg-white/70"
                }`}
              >
                {/* Photo if provided and revealed */}
                {reason.image && isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-4 h-48 w-full overflow-hidden rounded-2xl shadow-sm border border-rose-200/50"
                  >
                    <img
                      src={reason.image}
                      alt={reason.title}
                      className="h-full w-full object-cover object-[center_15%]"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </motion.div>
                )}

                {/* Video if provided and revealed */}
                {reason.video && isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-4 h-56 w-full overflow-hidden rounded-2xl shadow-sm border border-rose-200/50 bg-black/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <video
                      src={reason.video}
                      controls
                      autoPlay
                      muted
                      playsInline
                      loop
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </motion.div>
                )}

                <span className="mb-2 text-3xl">{reason.icon}</span>
                <Heart className="mb-2 text-rose-400" fill={isRevealed ? "currentColor" : "none"} size={20} />
                <h3 className="script-font text-3xl text-rose-800">{reason.title}</h3>
                
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.p
                      key="msg"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="serif-font mt-3 text-sm leading-7 text-rose-950/65"
                    >
                      {reason.message}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="sans-font mt-3 text-xs tracking-widest text-rose-400/70 uppercase"
                    >
                      Tap to reveal ✨
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
