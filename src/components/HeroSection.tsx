import { motion } from "framer-motion";
import { Heart, ChevronDown, Mail } from "lucide-react";
import { Petals } from "./shared";

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-16 pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffe4ee] via-[#fff5f5] to-[#f9dce5]" />
      <Petals light count={22} />

      {/* Bokeh */}
      {[
        { left: "5%",  top: "20%", size: 80,  opacity: 0.3  },
        { left: "88%", top: "15%", size: 60,  opacity: 0.25 },
        { left: "15%", top: "75%", size: 50,  opacity: 0.2  },
        { left: "80%", top: "70%", size: 70,  opacity: 0.3  },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-rose-300 pointer-events-none"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size, opacity: b.opacity, filter: "blur(20px)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [b.opacity, b.opacity * 1.5, b.opacity] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1 }}
          className="sans-font text-[10px] font-light uppercase tracking-[0.3em] text-rose-600"
        >
          Today is all about you
        </motion.p>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto mt-8 w-52 sm:w-72"
        >
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-3 rounded-t-full rounded-b-[45%] bg-rose-300/30 blur-xl"
          />
          <div className="absolute -inset-2 rounded-t-full rounded-b-[45%] border-2 border-rose-300/40" />
          <div className="relative h-64 w-full overflow-hidden rounded-t-full rounded-b-[45%] border-4 border-white shadow-2xl shadow-rose-300/60 sm:h-80">
            <img src="/her-photo.png" alt="Diya" className="h-full w-full object-cover object-top" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 shadow-lg shadow-rose-300"
          >
            <Heart size={18} className="text-white" fill="white" />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          <h1 className="script-font mt-9 text-6xl leading-tight text-rose-700 sm:text-8xl">
            Happy Birthday,<br />Diya <span className="text-rose-500">♡</span>
          </h1>
          <p className="serif-font mx-auto mt-5 max-w-xl text-lg leading-9 text-rose-950/65 sm:text-xl">
            If I could give you one thing in life, I would give you the ability to see yourself
            through my eyes. Then you&apos;d understand how truly special you are.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#memories" className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm text-white shadow-lg shadow-rose-300/50 transition hover:bg-rose-700">
              Our little journey <Heart size={15} />
            </a>
            <a href="#letter" className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-white/80 px-6 py-3 text-sm text-rose-700 shadow-sm transition hover:bg-rose-50">
              Read my letter <Mail size={15} />
            </a>
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-10 flex justify-center">
          <ChevronDown className="text-rose-400" size={26} />
        </motion.div>
      </div>
    </section>
  );
}
