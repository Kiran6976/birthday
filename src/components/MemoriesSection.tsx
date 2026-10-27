import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Camera } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";

interface MemoryItem {
  date: string;
  title: string;
  subtitleHeader?: string;
  description: string;
  icon: string;
  image?: string | null;
  images?: string[];
  fullStory?: string[] | null;
}

const memories: MemoryItem[] = [
  {
    date: "THE BEGINNING",
    title: "Where our story began",
    subtitleHeader: "From where it all began ❤️",
    description: "Some people enter your life quietly and change everything. That's exactly what you did — you came in and made every moment feel extraordinary.",
    icon: "🚌",
    image: "/IMG_20250224_162324_220.jpg",
    fullStory: [
      "I hope you still remember that day when we first sat together on the college bus, just to share a Spotify Mod app. 🥹❤️ Who would have thought that something so small and ordinary would become the beginning of something so special?",
      "And then, after that day, you changed your bus just for me. Maybe back then, neither of us knew what those little moments would turn into, but looking back now, I realize that was where our story truly began.",
      "From sharing an app to sharing conversations, from those little moments on the bus to becoming such an important part of each other's lives… everything happened so naturally, one little moment at a time.",
      "It's funny how the most beautiful stories don't always begin with something extraordinary. Sometimes, they begin with something as simple as sitting beside someone on a bus, with no idea that one day, that person would mean so much to you.",
      "And if I could go back to that day, knowing everything I know now, I would still choose that same seat beside you, a thousand times over. Because that ordinary day gave me something I never knew would become so precious to me — the beginning of us. ❤️🫶🏻",
    ],
  },
  {
    date: "A FAVOURITE MEMORY",
    title: "Moments I keep close",
    subtitleHeader: "Precious Snapshots of Us 📸❤️",
    description: "There are little snapshots of time with you that I hold onto. The random laughs, the quiet moments, the silly ones — they all mean the world to me.",
    icon: "📸",
    images: [
      "/IMG20250401131724.jpg",
      "/IMG_20250719_135555.jpg",
      "/IMG-20250707-WA0194.jpg",
    ],
    fullStory: [
      "Every picture here holds a piece of my favourite days with you.",
      "From goofy smiles to candid glances, every second spent by your side turns into a timeless memory I cherish deeply.",
      "Looking back at these photos reminds me of just how effortlessly happy you make me feel every single day. Here is to a thousand more memories waiting to be made! ✨",
    ],
  },
  {
    date: "TODAY & ALWAYS",
    title: "More chapters to come",
    subtitleHeader: "To Our Tomorrow & Forever ♡",
    description: "Our story is still being written, and every new page with you is one I look forward to. Here's to all the beautiful moments still ahead of us.",
    icon: "♡",
    image: "/IMG20250709132928.jpg",
    fullStory: [
      "No matter how many days pass, what never changes is how grateful I am to have you in my life.",
      "Here is to writing endless new memories, going on more adventures, laughing at our silly jokes, and standing beside each other through everything.",
      "Happy Birthday, Diya. You are my today, my tomorrow, and my always. ❤️✨",
    ],
  },
];

export default function MemoriesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="memories" className="section-padding bg-[#fffaf5]">
      <Reveal>
        <SectionHeading
          eyebrow="CHAPTERS OF US"
          title="Our Beautiful Journey"
          subtitle="A few little moments that deserve a place in our story."
        />
      </Reveal>

      <div className="mx-auto mt-16 max-w-3xl">
        {memories.map((memory, index) => {
          const isExpandable = Boolean(memory.fullStory || (memory.images && memory.images.length > 0));
          const isExpanded = expanded === index;

          return (
            <Reveal key={memory.title} delay={index * 0.15}>
              <div className="relative mb-10 grid grid-cols-[56px_1fr] gap-5 sm:grid-cols-[80px_1fr] sm:gap-8">
                {/* Timeline line */}
                {index < memories.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-0 w-px bg-gradient-to-b from-rose-200 to-transparent sm:left-10" />
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-rose-200 bg-rose-50 text-xl shadow-sm sm:h-20 sm:w-20 sm:text-2xl"
                >
                  {memory.icon}
                </motion.div>

                {/* Card */}
                <motion.div
                  layout
                  onClick={() => isExpandable && setExpanded(isExpanded ? null : index)}
                  className={`rounded-2xl border border-rose-100 bg-white shadow-sm overflow-hidden ${isExpandable ? "cursor-pointer" : ""}`}
                  whileHover={isExpandable ? { boxShadow: "0 12px 40px rgba(182,62,97,0.14)" } : { y: -3 }}
                  transition={{ layout: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
                >
                  {/* Single image header if present */}
                  {memory.image && (
                    <motion.div
                      layout
                      className="overflow-hidden"
                      animate={{ height: isExpanded ? 320 : 180 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </motion.div>
                  )}

                  {/* Collage / Preview for multiple images */}
                  {memory.images && memory.images.length > 0 && (
                    <motion.div
                      layout
                      className="overflow-hidden p-2.5 bg-rose-50/40"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        {memory.images.map((imgSrc, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative overflow-hidden rounded-xl bg-rose-100 shadow-sm border border-rose-200/50"
                            style={{ height: isExpanded ? "200px" : "120px" }}
                          >
                            <img
                              src={imgSrc}
                              alt={`Memory ${imgIdx + 1}`}
                              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = "none";
                                if (target.parentElement) {
                                  target.parentElement.classList.add("flex", "items-center", "justify-center", "text-rose-400", "text-xs");
                                  target.parentElement.innerText = "📸 Photo";
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="p-6 sm:p-8">
                    <p className="sans-font text-[9px] font-light tracking-[0.3em] text-rose-500 uppercase">{memory.date}</p>
                    <h3 className="serif-font mt-3 text-2xl font-medium text-rose-900 sm:text-3xl">{memory.title}</h3>
                    <p className="serif-font mt-3 text-base leading-8 text-rose-950/60">{memory.description}</p>

                    {/* Expandable story */}
                    <AnimatePresence>
                      {memory.fullStory && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 border-t border-rose-100 pt-5">
                            {memory.subtitleHeader && (
                              <p className="script-font mb-4 text-2xl text-rose-600">{memory.subtitleHeader}</p>
                            )}
                            <div className="serif-font space-y-4 text-sm leading-8 text-rose-950/70">
                              {memory.fullStory.map((para, i) => (
                                <p key={i}>{para}</p>
                              ))}
                            </div>
                            <p className="script-font mt-5 text-xl text-rose-500">— forever in my heart ♡</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer hint */}
                    {isExpandable ? (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-4 flex items-center gap-2"
                      >
                        <Heart size={13} className="text-rose-400" fill={isExpanded ? "currentColor" : "none"} />
                        <span className="sans-font text-xs tracking-wide text-rose-400">
                          {isExpanded ? "Tap to close" : "Tap to open moments & story ✨"}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="mt-4 flex items-center gap-2">
                        <Camera size={13} className="text-rose-300" />
                        <span className="sans-font text-xs tracking-wide text-rose-400/60">Add a photo for this memory</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
