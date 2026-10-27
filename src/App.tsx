import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

import OpeningScreen  from "./components/OpeningScreen";
import HeroSection    from "./components/HeroSection";
import MemoriesSection from "./components/MemoriesSection";
import ReasonsSection  from "./components/ReasonsSection";
import LetterSection   from "./components/LetterSection";
import CakeSection     from "./components/CakeSection";
import FinalSection    from "./components/FinalSection";
import "./index.css";

export default function App() {
  const [phase, setPhase]     = useState<"sealed" | "opening" | "open">("sealed");
  const [musicOn, setMusicOn] = useState(false);
  const [isLetterPlaying, setIsLetterPlaying] = useState(false);
  const [isSpecialSongPlaying, setIsSpecialSongPlaying] = useState(false);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicSrc = "/TUM HI HO Aashiqui 2 Arijit Singh Instrumental with Lyrics (HD) Heart Touching.mp3";

  // Handle opening surprise click
  const handleOpen = () => {
    setPhase("opening");

    // Start background music as user has interacted with the page
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.volume = 0.6;
      bgMusicRef.current.play().then(() => {
        setMusicOn(true);
      }).catch((err) => {
        console.log("Background music autoplay prevented:", err);
      });
    }

    setTimeout(() => {
      setPhase("open");
      setTimeout(() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }), 200);
    }, 1200);
  };

  // Toggle background music manually from navbar
  const toggleBgMusic = () => {
    if (!bgMusicRef.current) return;
    if (musicOn) {
      bgMusicRef.current.pause();
      setMusicOn(false);
    } else {
      bgMusicRef.current.play().then(() => {
        setMusicOn(true);
      }).catch(console.error);
    }
  };

  // When letter opens, duck/pause background music so Pal Pal Dil Ke Paas takes over
  const handleLetterStateChange = (isOpen: boolean) => {
    setIsLetterPlaying(isOpen);
    if (!bgMusicRef.current) return;
    if (isOpen) {
      bgMusicRef.current.pause();
    } else {
      // Resume background music when letter is closed if music was previously enabled and special song is not playing
      if (musicOn && !isSpecialSongPlaying) {
        bgMusicRef.current.play().catch(console.error);
      }
    }
  };

  // When "A song for you" plays, pause background music so both don't clash
  const handleSpecialSongStateChange = (isPlaying: boolean) => {
    setIsSpecialSongPlaying(isPlaying);
    if (!bgMusicRef.current) return;
    if (isPlaying) {
      bgMusicRef.current.pause();
    } else {
      // Resume background music when song is paused/ended if music was previously enabled and letter is not open
      if (musicOn && !isLetterPlaying) {
        bgMusicRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff5f5] text-[#55263b]">
      {/* Background Music Audio Element */}
      <audio
        ref={bgMusicRef}
        src={bgMusicSrc}
        loop
        preload="auto"
      />

      <OpeningScreen phase={phase} onOpen={handleOpen} />

      {phase === "open" && (
        <>
          {/* NAV */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-rose-200/40 bg-white/75 px-5 py-3 backdrop-blur-xl sm:px-10"
          >
            <a href="#home" className="script-font text-2xl text-rose-700 hover:text-rose-500 transition-colors">
              For Diya ♡
            </a>
            <div className="flex items-center gap-3">
              {["Our Story", "Reasons", "Letter", "Cake"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(" ", "")}`}
                  className="sans-font hidden text-xs tracking-widest text-rose-700/70 hover:text-rose-700 transition-colors sm:block uppercase"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={toggleBgMusic}
                className="ml-2 rounded-full border border-rose-200 bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition-colors"
                aria-label={musicOn ? "Mute background music" : "Play background music"}
                title={musicOn ? "Mute background music" : "Play background music"}
              >
                {musicOn && !isLetterPlaying && !isSpecialSongPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </motion.nav>

          <HeroSection />
          <MemoriesSection />
          <ReasonsSection />
          <LetterSection onLetterStateChange={handleLetterStateChange} />
          <CakeSection />
          <FinalSection onSpecialSongStateChange={handleSpecialSongStateChange} />
        </>
      )}
    </main>
  );
}
