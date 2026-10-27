import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle, CheckCircle2, RotateCcw, ChevronLeft, ChevronRight, ArrowRight, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { Reveal, SectionHeading } from "./shared";

interface QuizQuestion {
  id: number;
  question: string;
  hint: string;
  options: { key: string; text: string }[];
  isMultiSelect?: boolean;
  correctKeys: string[]; // array for single or multiple
  popupTitle: string;
  popupSubtitle: string;
  popupImages: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What do I like the most?",
    hint: "(Think carefully before tapping! ♡)",
    options: [
      { key: "A", text: "Food 🍕" },
      { key: "B", text: "You ❤️" },
      { key: "C", text: "Bubus 🍼🥺" },
    ],
    correctKeys: ["C"],
    popupTitle: "Yes! Bubus Always ♡",
    popupSubtitle: "You know me better than anyone else in the world. ❤️🫶🏻",
    popupImages: ["/Student Sipping Milk on a Bus.png"],
  },
  {
    id: 2,
    question: "Who got juicy lips? 💋",
    hint: "(There's only one true answer! 🙈)",
    options: [
      { key: "A", text: "Kiran 😎" },
      { key: "B", text: "Diya 💋👄" },
    ],
    correctKeys: ["B"],
    popupTitle: "Obviously Diya! 💋👄",
    popupSubtitle: "The most irresistibly beautiful smile & sweetest lips in the whole universe. ♡",
    popupImages: [
      "/IMG20250401135946.jpg",
      "/IMG20250517121418.jpg",
      "/IMG20250627132522.jpg",
    ],
  },
  {
    id: 3,
    question: "What does Diya like the most?",
    hint: "(Tap and pick all of her favourite heroes! 🦸‍♂️✨)",
    isMultiSelect: true,
    options: [
      { key: "A", text: "Iron Man 🦾" },
      { key: "B", text: "Doraemon 🐱🔔" },
      { key: "C", text: "Harry Potter ⚡🪄" },
      { key: "D", text: "Spiderman 🕷️🕸️" },
    ],
    correctKeys: ["A", "B", "C", "D"],
    popupTitle: "All of Them! Diya's Favourites ♡",
    popupSubtitle: "Because one favourite could never be enough for our superhero! 🦸‍♀️✨",
    popupImages: [
      "/IMG20250715180259.jpg",
      "/IMG20250715180122.jpg",
      "/IMG20250715180348.jpg",
      "/IMG20250715180416.jpg",
    ],
  },
];

export default function ScratchCardSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isScratched, setIsScratched] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const activeQuestion = quizQuestions[currentQIndex];

  // Initialize or reset scratch canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw shimmering rose-silver scratch coating
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#e2b3c2");
    gradient.addColorStop(0.5, "#d699ae");
    gradient.addColorStop(1, "#c07890");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.font = "italic bold 18px Georgia, serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`✨ Scratch Question #${currentQIndex + 1} ✨`, width / 2, height / 2 - 8);

    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fillText("(Scratch with finger or mouse)", width / 2, height / 2 + 18);
  };

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentQIndex]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percentage = (transparentCount / (pixels.length / 4)) * 100;
    if (percentage > 45) {
      setIsScratched(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#fda4af", "#ffd6a5"],
      });
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };
  const handleMouseUp = () => setIsDrawing(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
  };
  const handleTouchEnd = () => setIsDrawing(false);

  const handleOptionClick = (optionKey: string) => {
    if (activeQuestion.isMultiSelect) {
      // Toggle selection for multi-select
      let updated: string[];
      if (selectedOptions.includes(optionKey)) {
        updated = selectedOptions.filter((k) => k !== optionKey);
      } else {
        updated = [...selectedOptions, optionKey];
      }
      setSelectedOptions(updated);

      // Check if all correct keys are selected
      const allSelected = activeQuestion.correctKeys.every((k) => updated.includes(k));
      if (allSelected) {
        setActiveImgIndex(0);
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.5 },
          colors: ["#f43f5e", "#fda4af", "#ffd6a5", "#ffffff"],
        });
        setTimeout(() => setShowPopup(true), 450);
      }
    } else {
      // Single selection
      setSelectedOptions([optionKey]);
      if (activeQuestion.correctKeys.includes(optionKey)) {
        setActiveImgIndex(0);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#f43f5e", "#fda4af", "#ffd6a5", "#ffffff"],
        });
        setTimeout(() => setShowPopup(true), 400);
      }
    }
  };

  const goToNextQuestion = () => {
    setShowPopup(false);
    setSelectedOptions([]);
    setIsScratched(false);
    setCurrentQIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  const handleReset = () => {
    setIsScratched(false);
    setSelectedOptions([]);
    setShowPopup(false);
    setTimeout(() => initCanvas(), 50);
  };

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-[#fffaf5] via-[#ffeef4] to-[#fff5f5] text-center">
      <Reveal>
        <SectionHeading
          eyebrow="SECRET MINI GAME"
          title="Scratch & Guess"
          subtitle="Scratch the card to uncover fun little questions about us!"
        />

        {/* Progress pill indicator */}
        <div className="mx-auto mt-6 flex justify-center items-center gap-2">
          {quizQuestions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentQIndex(idx);
                setIsScratched(false);
                setSelectedOptions([]);
                setShowPopup(false);
              }}
              className={`rounded-full px-3 py-1 text-xs font-medium transition cursor-pointer ${
                idx === currentQIndex
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-rose-100 text-rose-700 hover:bg-rose-200"
              }`}
            >
              Question {idx + 1}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-md px-4">
          {/* Card container */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-rose-200/90 bg-white p-7 shadow-xl shadow-rose-200/50">
            {/* The Hidden Question Content underneath */}
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <HelpCircle size={24} />
              </div>

              <span className="sans-font text-[10px] uppercase tracking-widest text-rose-500 font-semibold">
                Question {currentQIndex + 1} of {quizQuestions.length} {activeQuestion.isMultiSelect && "· Pick all"}
              </span>

              <h3 className="serif-font mt-2 text-2xl font-semibold text-rose-900">
                {activeQuestion.question}
              </h3>

              <p className="serif-font mt-1 text-xs text-rose-700/60 italic">
                {activeQuestion.hint}
              </p>

              {/* Multi-select progress indicator if applicable */}
              {activeQuestion.isMultiSelect && (
                <div className="mt-2 text-[11px] font-medium text-rose-500">
                  Selected: {selectedOptions.length} / {activeQuestion.correctKeys.length}
                </div>
              )}

              {/* Options */}
              <div className="mt-5 w-full space-y-2.5">
                {activeQuestion.options.map((opt) => {
                  const isSelected = selectedOptions.includes(opt.key);
                  const isRight = activeQuestion.isMultiSelect
                    ? isSelected // in multi-select, selected turns green with check
                    : isSelected && activeQuestion.correctKeys.includes(opt.key);
                  const isWrong = !activeQuestion.isMultiSelect && isSelected && !activeQuestion.correctKeys.includes(opt.key);

                  return (
                    <motion.button
                      key={opt.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick(opt.key)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition cursor-pointer ${
                        isRight
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm"
                          : isWrong
                          ? "border-rose-400 bg-rose-50 text-rose-800"
                          : "border-rose-200/70 bg-rose-50/40 text-rose-900 hover:border-rose-300 hover:bg-rose-100/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shadow-xs border ${
                          isSelected
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-white text-rose-700 border-rose-200"
                        }`}>
                          {isSelected && activeQuestion.isMultiSelect ? <Check size={12} /> : opt.key}
                        </span>
                        <span className="serif-font text-base">{opt.text}</span>
                      </span>

                      {isRight && <CheckCircle2 size={18} className="text-emerald-600" />}
                      {isWrong && <span className="text-xs text-rose-500 italic">Try again 🙈</span>}
                    </motion.button>
                  );
                })}
              </div>

              {/* Reset scratch button */}
              {isScratched && (
                <div className="mt-5 flex items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-600 transition underline underline-offset-4"
                  >
                    <RotateCcw size={12} />
                    Scratch again
                  </button>

                  <button
                    onClick={goToNextQuestion}
                    className="flex items-center gap-1 text-xs text-rose-600 font-semibold hover:text-rose-800 transition"
                  >
                    Next Question <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* The Scratchable Canvas Layer */}
            {!isScratched && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="absolute inset-0 h-full w-full cursor-pointer touch-none rounded-3xl"
              />
            )}
          </div>
        </div>
      </Reveal>

      {/* Pop-up modal when question is completed */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-rose-300/40 bg-[#2b101c] p-6 text-center text-rose-50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-1.5 text-rose-300 mb-2">
                <Sparkles size={16} />
                <span className="sans-font text-[10px] uppercase tracking-widest font-bold">
                  Awesome! All Selected! 🥳
                </span>
                <Sparkles size={16} />
              </div>

              <h3 className="script-font text-4xl text-rose-100">
                {activeQuestion.popupTitle}
              </h3>

              {/* Photo Display / Gallery */}
              <div className="relative mt-4 overflow-hidden rounded-2xl border-2 border-rose-300/30 bg-black/30 shadow-inner">
                <img
                  src={activeQuestion.popupImages[activeImgIndex]}
                  alt="Reward image"
                  className="h-64 w-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.classList.add("p-8", "text-center");
                      target.parentElement.innerText = `📸 ${activeQuestion.popupImages[activeImgIndex]}`;
                    }
                  }}
                />

                {/* Gallery navigation if multiple images */}
                {activeQuestion.popupImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) =>
                          (prev - 1 + activeQuestion.popupImages.length) % activeQuestion.popupImages.length
                        );
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white hover:bg-rose-600 transition"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) =>
                          (prev + 1) % activeQuestion.popupImages.length
                        );
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white hover:bg-rose-600 transition"
                    >
                      <ChevronRight size={18} />
                    </button>
                    {/* Dots indicator */}
                    <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                      {activeQuestion.popupImages.map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className={`h-1.5 rounded-full transition-all ${
                            dotIdx === activeImgIndex ? "w-4 bg-rose-400" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <p className="serif-font mt-4 text-sm leading-relaxed text-rose-200/90 italic">
                {activeQuestion.popupSubtitle}
              </p>

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="rounded-full bg-white/10 px-5 py-2 text-xs font-semibold text-rose-200 hover:bg-white/20 transition"
                >
                  Close ♡
                </button>

                {currentQIndex < quizQuestions.length - 1 ? (
                  <button
                    onClick={goToNextQuestion}
                    className="rounded-full bg-rose-400 px-5 py-2 text-xs font-semibold text-[#35151f] shadow-md transition hover:bg-rose-300"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setCurrentQIndex(0);
                      setIsScratched(false);
                      setSelectedOptions([]);
                    }}
                    className="rounded-full bg-rose-400 px-5 py-2 text-xs font-semibold text-[#35151f] shadow-md transition hover:bg-rose-300"
                  >
                    Play from Start ↺
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
