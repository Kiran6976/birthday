import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Stars, Gift, Music, Camera, X, ChevronLeft, ChevronRight, Play, Pause, Sparkles, Check, Disc, Volume2, VolumeX } from "lucide-react";
import { Reveal, StarField, Petals } from "./shared";

function fireCelebration() {
  const launch = (opts: confetti.Options) =>
    confetti({ ...opts, colors: ["#f8a5c2", "#ffffff", "#c44569", "#ffd6a5"] });
  launch({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
  setTimeout(() => launch({ particleCount: 60, spread: 100, origin: { x: 0.1, y: 0.5 } }), 300);
  setTimeout(() => launch({ particleCount: 60, spread: 100, origin: { x: 0.9, y: 0.5 } }), 500);
}

const slideshowItems = [
  { type: "image", src: "/IMG20261016212147.jpg", caption: "Sweetest smile & sweetest memories ♡" },
  { type: "image", src: "/IMG20261016200536.jpg", caption: "Every moment with you is magic ✨" },
  { type: "image", src: "/IMG20260129133609.jpg", caption: "My favourite person in the entire world 🌸" },
  { type: "image", src: "/IMG20251022121148.jpg", caption: "Unforgettable little days 💫" },
  { type: "image", src: "/IMG20251021131819.jpg", caption: "You make everything feel brighter ❤️" },
  { type: "video", src: "/VID20250724173853.mp4", caption: "Moments in motion with you 🎬" },
];

const loveCoupons = [
  {
    id: 1,
    title: "Going for a Trip",
    desc: "Pack your bags! A romantic getaway, scenic drive, or holiday wherever your heart wants to go. ✈️🌄",
    icon: "🧳",
  },
  {
    id: 2,
    title: "Kisses 💋👄",
    desc: "Redeemable anytime for endless sweet forehead kisses, cheek pecks, and tight loving hugs. 🫂❤️",
    icon: "💋",
  },
  {
    id: 3,
    title: "Successful Together",
    desc: "My lifelong promise to support your dreams, cheer for you, and celebrate every milestone as one. 🌟🏆",
    icon: "✨",
  },
  {
    id: 4,
    title: "Late-Night Ice Cream & Cuddles",
    desc: "Late-night craving or bad day? Your favourite treat and undivided attention, always on me. 🍨🤍",
    icon: "🍦",
  },
  {
    id: 5,
    title: "& Lots More ♡",
    desc: "A blank cheque for endless love, silly jokes, random adventures, and a lifetime of happiness together. 🫶🏻♾️",
    icon: "💖",
  },
];

interface Props {
  onSpecialSongStateChange?: (isPlaying: boolean) => void;
}

export default function FinalSection({ onSpecialSongStateChange }: Props) {
  const [open, setOpen] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showPromise, setShowPromise] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showSongModal, setShowSongModal] = useState(false);
  const [activeSongType, setActiveSongType] = useState<"random" | "surprise" | null>(null);
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  const [redeemedCoupons, setRedeemedCoupons] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = {
    random: {
      name: "Random Song",
      subtitle: "A sweet romantic tune just for you ♡",
      src: "/Janmodire Ki Aar Debo _ Surer Akashe _ Alka Yagnik and Shakti Thakur _ Bengali Movie Songs [lAHKocEHZxw] (mp3cut.net).mp3",
    },
    surprise: {
      name: "Surprise Song 🎁",
      subtitle: "A special message & melody from the heart ✨",
      src: "/WhatsApp Audio 2026-10-27 at 23.41.04.mp3",
    },
  };

  const playSong = (type: "random" | "surprise") => {
    if (!audioRef.current) return;

    if (activeSongType === type && isSongPlaying) {
      // Pause
      audioRef.current.pause();
      setIsSongPlaying(false);
      onSpecialSongStateChange?.(false);
    } else {
      // Switch or play
      audioRef.current.src = songs[type].src;
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setActiveSongType(type);
        setIsSongPlaying(true);
        onSpecialSongStateChange?.(true);
        fireCelebration();
      }).catch(console.error);
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsSongPlaying(false);
    setActiveSongType(null);
    onSpecialSongStateChange?.(false);
  };

  // Auto slideshow effect
  useEffect(() => {
    if (!showSlideshow || !isPlayingAuto) return;
    const currentItem = slideshowItems[currentIndex];
    if (currentItem.type === "video") return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowItems.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [showSlideshow, isPlayingAuto, currentIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slideshowItems.length) % slideshowItems.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slideshowItems.length);
  };

  const handleRedeemCoupon = (id: number) => {
    if (!redeemedCoupons.includes(id)) {
      setRedeemedCoupons([...redeemedCoupons, id]);
      fireCelebration();
    }
  };

  return (
    <>
      {/* Hidden Audio element for chosen song */}
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => {
          setIsSongPlaying(false);
          setActiveSongType(null);
          onSpecialSongStateChange?.(false);
        }}
      />

      {/* Final surprise */}
      <section id="surprise" className="relative overflow-hidden bg-gradient-to-b from-[#f9dce5] via-[#35151f] to-[#1a080f] px-5 py-28 text-center text-rose-50 sm:py-36">
        <StarField />
        <Petals count={20} />

        <Reveal>
          <div className="relative z-10">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="mx-auto mb-6 w-fit opacity-40">
              <Stars size={28} className="text-rose-200" />
            </motion.div>

            <h2 className="script-font text-6xl sm:text-8xl">One Last Thing...</h2>
            <p className="serif-font mx-auto mt-5 max-w-md text-base leading-8 text-rose-100/70 italic">
              Because one birthday wish could never hold everything I want to say to you.
            </p>

            <motion.div animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="my-12 text-9xl">
              🎁
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(249,221,229,0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setOpen(!open); if (!open) fireCelebration(); }}
              className="rounded-full bg-gradient-to-r from-rose-300 to-rose-400 px-9 py-5 text-sm font-medium text-[#431729] shadow-2xl shadow-rose-900/40 transition-all"
            >
              {open ? "Close your surprise ♡" : "Open your final surprise ✨"}
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mx-auto mt-10 max-w-lg"
                >
                  <div className="rounded-3xl border border-rose-200/20 p-8 backdrop-blur-xl sm:p-10" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <Heart className="mx-auto mb-5 text-rose-300" size={32} fill="currentColor" />
                    </motion.div>
                    <p className="script-font text-4xl">My favourite part of life...</p>
                    <p className="serif-font mt-5 text-base leading-9 text-rose-100/80">
                      ...is getting to know you. Making memories with you. Discovering new reasons to appreciate you every single day.
                      You are my favourite person, Diya, and I&apos;m so glad you exist. ♡
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {/* A song for you - Opens Options Modal */}
                      <button
                        onClick={() => setShowSongModal(true)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left transition shadow-sm cursor-pointer ${
                          isSongPlaying
                            ? "border-rose-300 bg-rose-500/40 shadow-rose-500/30"
                            : "border-rose-300/40 bg-rose-500/20 hover:bg-rose-500/35"
                        }`}
                      >
                        <span className={`text-rose-300 ${isSongPlaying ? "animate-spin" : "animate-pulse"}`}>
                          <Music size={16} />
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="sans-font text-xs tracking-wide text-rose-100 font-medium">
                            {isSongPlaying
                              ? activeSongType === "surprise"
                                ? "Surprise Song ♫"
                                : "Random Song ♫"
                              : "A song for you 🎵"}
                          </span>
                        </div>
                      </button>

                      {/* Our Photos - Interactive Slideshow Button */}
                      <button
                        onClick={() => { setShowSlideshow(true); setCurrentIndex(0); }}
                        className="flex items-center gap-2 rounded-xl border border-rose-300/40 bg-rose-500/20 p-3 text-left hover:bg-rose-500/35 transition shadow-sm hover:shadow-rose-500/20 cursor-pointer"
                      >
                        <span className="text-rose-300 animate-pulse"><Camera size={16} /></span>
                        <span className="sans-font text-xs tracking-wide text-rose-100 font-medium">Our photos ✨</span>
                      </button>

                      {/* A Little Promise - Interactive Modal Button */}
                      <button
                        onClick={() => setShowPromise(true)}
                        className="flex items-center gap-2 rounded-xl border border-rose-300/40 bg-rose-500/20 p-3 text-left hover:bg-rose-500/35 transition shadow-sm hover:shadow-rose-500/20 cursor-pointer"
                      >
                        <span className="text-rose-300 animate-pulse"><Gift size={16} /></span>
                        <span className="sans-font text-xs tracking-wide text-rose-100 font-medium">A little promise 🎁</span>
                      </button>

                      {/* More Love - Love Coupons Modal Button */}
                      <button
                        onClick={() => setShowCoupons(true)}
                        className="flex items-center gap-2 rounded-xl border border-rose-300/40 bg-rose-500/20 p-3 text-left hover:bg-rose-500/35 transition shadow-sm hover:shadow-rose-500/20 cursor-pointer"
                      >
                        <span className="text-rose-300 animate-pulse"><Heart size={16} fill="currentColor" /></span>
                        <span className="sans-font text-xs tracking-wide text-rose-100 font-medium">Love tokens 🎟️</span>
                      </button>
                    </div>
                    <p className="script-font mt-8 text-4xl text-rose-300">Happy Birthday, Diya. ♡</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      {/* 0. Modal: Choose Song (Surprise Song vs Random Song) */}
      <AnimatePresence>
        {showSongModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setShowSongModal(false)}
          >
            <div
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-rose-300/30 bg-[#240e16] p-6 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between border-b border-rose-200/20 pb-3">
                <div className="flex items-center gap-2 text-rose-200">
                  <Disc size={18} className="text-rose-400" />
                  <span className="script-font text-2xl text-rose-200">Choose a Song ♡</span>
                </div>
                <button
                  onClick={() => setShowSongModal(false)}
                  className="rounded-full bg-white/10 p-1.5 text-rose-300 transition hover:bg-rose-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="serif-font text-xs text-rose-200/70 mb-5 italic">
                Pick a melody to play for you right now ✨
              </p>

              <div className="space-y-3">
                {/* 1. Surprise Song Option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playSong("surprise");
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition cursor-pointer ${
                    activeSongType === "surprise" && isSongPlaying
                      ? "border-rose-400 bg-rose-500/30 shadow-md shadow-rose-500/20"
                      : "border-rose-300/30 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎁</span>
                    <div>
                      <h4 className="serif-font text-base font-semibold text-rose-100 flex items-center gap-1.5">
                        Surprise Song
                        {activeSongType === "surprise" && isSongPlaying && (
                          <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase">Playing</span>
                        )}
                      </h4>
                    </div>
                  </div>
                  <div className="text-rose-300">
                    {activeSongType === "surprise" && isSongPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </div>
                </motion.button>

                {/* 2. Random Song Option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playSong("random");
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition cursor-pointer ${
                    activeSongType === "random" && isSongPlaying
                      ? "border-rose-400 bg-rose-500/30 shadow-md shadow-rose-500/20"
                      : "border-rose-300/30 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎵</span>
                    <div>
                      <h4 className="serif-font text-base font-semibold text-rose-100 flex items-center gap-1.5">
                        Random Song
                        {activeSongType === "random" && isSongPlaying && (
                          <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase">Playing</span>
                        )}
                      </h4>
                    </div>
                  </div>
                  <div className="text-rose-300">
                    {activeSongType === "random" && isSongPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </div>
                </motion.button>
              </div>

              {isSongPlaying && (
                <button
                  onClick={stopSong}
                  className="mt-5 text-xs text-rose-300/70 hover:text-rose-200 transition underline underline-offset-4"
                >
                  Pause Song
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Modal: A Little Promise */}
      <AnimatePresence>
        {showPromise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setShowPromise(false)}
          >
            <div
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-rose-300/30 bg-[#290e19] p-7 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPromise(false)}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-rose-300 transition hover:bg-rose-500 hover:text-white"
              >
                <X size={18} />
              </button>

              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                <Sparkles className="mx-auto mb-3 text-rose-400" size={32} />
              </motion.div>

              <p className="sans-font text-[10px] tracking-[0.3em] text-rose-300 uppercase">A Sacred Little Promise</p>
              <h3 className="script-font mt-2 text-4xl text-rose-200">For You, Diya ♡</h3>

              <div className="serif-font mt-6 space-y-4 text-base leading-8 text-rose-100/85 text-left bg-white/5 p-5 rounded-2xl border border-rose-200/10">
                <p>
                  "I promise to always listen to you, to hold your hand through the stormy days, and to celebrate every little victory by your side."
                </p>
                <p>
                  "I promise to bring you hot food, make you laugh when you're stressed, and never let you doubt for a single second how special and deeply loved you are."
                </p>
                <p className="italic text-rose-300 font-medium">
                  "No matter what tomorrow brings, I choose you — today, always, and forever." ❤️🫶🏻
                </p>
              </div>

              <button
                onClick={() => setShowPromise(false)}
                className="mt-6 rounded-full bg-rose-400/90 px-7 py-3 text-sm font-medium text-[#35151f] shadow-md transition hover:bg-rose-300"
              >
                Kept in my heart ♡
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Modal: Love Tokens / Birthday Coupons */}
      <AnimatePresence>
        {showCoupons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setShowCoupons(false)}
          >
            <div
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl border border-rose-300/30 bg-[#240e16] p-6 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between border-b border-rose-200/20 pb-3">
                <div className="flex items-center gap-2 text-rose-200">
                  <span className="text-xl">🎟️</span>
                  <span className="script-font text-3xl text-rose-200">Birthday Love Tokens</span>
                </div>
                <button
                  onClick={() => setShowCoupons(false)}
                  className="rounded-full bg-white/10 p-1.5 text-rose-300 transition hover:bg-rose-500 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="serif-font text-sm text-rose-100/70 mb-5 italic">
                Redeemable anytime by Diya. Never expires! Tap to claim your token. ✨
              </p>

              <div className="space-y-3 text-left">
                {loveCoupons.map((coupon) => {
                  const isRedeemed = redeemedCoupons.includes(coupon.id);
                  return (
                    <div
                      key={coupon.id}
                      className={`relative overflow-hidden rounded-2xl border p-4 transition ${
                        isRedeemed
                          ? "border-emerald-400/40 bg-emerald-950/30"
                          : "border-rose-300/20 bg-white/5 hover:border-rose-400/50 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <span className="text-2xl mt-0.5">{coupon.icon}</span>
                          <div>
                            <h4 className="serif-font font-medium text-lg text-rose-100">
                              {coupon.title}
                            </h4>
                            <p className="sans-font text-xs text-rose-200/70 mt-1 leading-relaxed">
                              {coupon.desc}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRedeemCoupon(coupon.id)}
                          disabled={isRedeemed}
                          className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                            isRedeemed
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                              : "bg-rose-400 text-[#35151f] hover:bg-rose-300 shadow-sm"
                          }`}
                        >
                          {isRedeemed ? (
                            <>
                              <Check size={13} />
                              Claimed ♡
                            </>
                          ) : (
                            "Redeem ✨"
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="sans-font mt-5 text-[11px] tracking-wider text-rose-300/50 uppercase">
                Unlimited validity · Non-transferable · Just for Diya
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal: Slideshow for Our Photos */}
      <AnimatePresence>
        {showSlideshow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setShowSlideshow(false)}
          >
            <div
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-rose-300/30 bg-[#240e16] p-4 text-center shadow-2xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between border-b border-rose-200/20 pb-3">
                <div className="flex items-center gap-2 text-rose-200">
                  <Camera size={16} className="text-rose-400" />
                  <span className="script-font text-2xl text-rose-200">Our Memories ♡</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                    className="rounded-full bg-white/10 p-1.5 text-rose-300 transition hover:bg-white/20"
                    title={isPlayingAuto ? "Pause autoplay" : "Start autoplay"}
                  >
                    {isPlayingAuto ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button
                    onClick={() => setShowSlideshow(false)}
                    className="rounded-full bg-white/10 p-1.5 text-rose-300 transition hover:bg-rose-500 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Media viewer */}
              <div className="relative flex h-[340px] sm:h-[420px] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full flex items-center justify-center"
                  >
                    {slideshowItems[currentIndex].type === "image" ? (
                      <img
                        src={slideshowItems[currentIndex].src}
                        alt="Our photo"
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerText = "📸 Photo preview";
                          }
                        }}
                      />
                    ) : (
                      <video
                        src={slideshowItems[currentIndex].src}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="h-full w-full object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right navigation arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2.5 rounded-full bg-black/50 p-2 text-rose-200 backdrop-blur-sm transition hover:bg-rose-600 hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2.5 rounded-full bg-black/50 p-2 text-rose-200 backdrop-blur-sm transition hover:bg-rose-600 hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Caption & Counter */}
              <div className="mt-3.5 flex items-center justify-between text-xs text-rose-300/80">
                <p className="serif-font italic text-sm text-rose-200">
                  {slideshowItems[currentIndex].caption}
                </p>
                <span className="sans-font rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-medium text-rose-300">
                  {currentIndex + 1} / {slideshowItems.length}
                </span>
              </div>

              {/* Dots indicator */}
              <div className="mt-3 flex justify-center gap-1.5">
                {slideshowItems.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    className={`h-1.5 rounded-full transition-all ${
                      dotIdx === currentIndex ? "w-6 bg-rose-400" : "w-1.5 bg-rose-300/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[#1a080f] px-5 py-16 text-center text-rose-50">
        <StarField />
        <div className="relative z-10">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="mx-auto mb-5 w-fit">
            <Heart className="text-rose-400" size={24} fill="currentColor" />
          </motion.div>
          <p className="script-font text-4xl">Made just for you, Diya.</p>
          <p className="serif-font mt-4 text-sm leading-7 text-rose-100/50 italic">
            No matter where life takes us, you&apos;ll always have this little corner of love.
          </p>
          <p className="sans-font mt-8 text-[9px] tracking-[0.4em] text-rose-100/30 uppercase">Always & Forever ♡</p>
        </div>
      </footer>
    </>
  );
}
