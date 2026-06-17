import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

type Video = { id: string; title: string };

const VIDEOS: Video[] = [
  { id: "G7f0sulbkuc", title: "Opening Doors to Opportunity" },
  { id: "UdO9y8LhmeA", title: "The Power of Education Access" },
  { id: "XYwRrBNKlGg", title: "Stories of Hope and Learning" },
  { id: "mXXyxGONJGg", title: "Building a Future Through Knowledge" },
  { id: "70CFlwf0MWg", title: "Why Every Learner Deserves a Chance" },
  { id: "ELqdPk8uTmw", title: "Voices from the Classroom" },
];

const CHANNEL_URL = "https://www.youtube.com/@TheWeakerArmSeries";

function Thumb({ id, className }: { id: string; className?: string }) {
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div
      className={
        "w-full h-full bg-gradient-to-br from-navy-deep via-navy to-navy-deep " + (className ?? "")
      }
    />
  ) : (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={"w-full h-full object-cover " + (className ?? "")}
      onError={() => {
        if (src.includes("maxresdefault")) {
          setSrc(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

export function VideoStories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = VIDEOS[activeIdx];
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openIdx !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIdx]);

  return (
    <section id="videos" className="py-20 md:py-24 bg-cream-soft">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-navy/60 mb-6">
            Watch & Listen
          </p>
          <h2 className="text-4xl md:text-6xl text-navy-deep leading-[1.05]">
            Stories Behind the Vision
          </h2>
          <p className="mt-6 text-lg text-navy/70">
            Conversations, films, and field stories from the people shaping education access.
          </p>
        </div>

        {/* Featured card */}
        <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] bg-navy-deep">
          <button
            onClick={() => setOpenIdx(activeIdx)}
            className="group relative block w-full text-left cursor-pointer"
            aria-label={`Play ${active.title}`}
          >
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <Thumb id={active.id} className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
              <div className="absolute inset-0 flex items-end md:items-center justify-between p-6 md:p-12 gap-6">
                <div className="max-w-2xl">
                  <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-gold mb-3 md:mb-5">
                    Featured Story
                  </p>
                  <h3 className="font-display text-2xl md:text-5xl font-semibold text-cream leading-tight">
                    {active.title}
                  </h3>
                </div>
                <span
                  className="shrink-0 flex items-center justify-center rounded-full bg-gold text-navy-deep h-16 w-16 md:h-24 md:w-24 shadow-xl transition-transform duration-300 group-hover:scale-110"
                >
                  <Play className="h-7 w-7 md:h-10 md:w-10 fill-current ml-1" />
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Thumbnail rail */}
        <div className="mt-8 md:mt-10 -mx-6 px-6 py-3 overflow-x-auto overflow-y-hidden">
          <ul className="flex gap-4 md:gap-5 snap-x snap-mandatory py-2">
            {VIDEOS.map((v, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={v.id} className="snap-start shrink-0 w-56 md:w-64">
                  <button
                    onClick={() => setActiveIdx(i)}
                    className={
                      "group block w-full text-left rounded-xl overflow-hidden transition-all duration-300 " +
                      (isActive
                        ? "ring-4 ring-gold scale-[1.02]"
                        : "ring-1 ring-navy/10 hover:ring-navy/30")
                    }
                    aria-pressed={isActive}
                  >
                    <div className="relative aspect-video bg-navy">
                      <Thumb id={v.id} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-sm font-medium text-navy-deep line-clamp-2 leading-snug">
                        {v.title}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Subscribe banner */}
        <div className="mt-14 md:mt-20 rounded-2xl bg-gold p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <p className="font-display text-2xl md:text-3xl text-navy-deep leading-snug flex-1">
            Subscribe to our YouTube channel for stories, conversations, and updates from The
            Wicker Foundation.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy-deep text-cream px-7 py-4 rounded-full text-sm font-semibold tracking-[0.15em] uppercase hover:bg-navy transition-colors"
          >
            Subscribe →
          </a>
        </div>
      </div>

      {/* Modal */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenIdx(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div ref={dialogRef} className="relative w-full max-w-5xl">
            <button
              onClick={() => setOpenIdx(null)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-10 h-11 w-11 md:h-12 md:w-12 rounded-full bg-cream text-navy-deep flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl">
              <iframe
                key={VIDEOS[openIdx].id}
                src={`https://www.youtube.com/embed/${VIDEOS[openIdx].id}?autoplay=1&rel=0`}
                title={VIDEOS[openIdx].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
