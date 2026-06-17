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
    <section id="videos" className="relative py-14 md:py-20 lg:py-24 bg-gradient-to-b from-background via-cream-soft/30 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="relative container-x">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-navy/60 mb-5">
            Watch & Listen
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy-deep leading-[1.05]">
            Stories Behind the Vision
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-lg mx-auto">
            Conversations, films, and field stories from the people shaping education access.
          </p>
        </div>

        {/* Featured card */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-navy-deep/20 bg-navy-deep">
          <button
            onClick={() => setOpenIdx(activeIdx)}
            className="group relative block w-full text-left cursor-pointer"
            aria-label={`Play ${active.title}`}
          >
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <Thumb id={active.id} className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
              <div className="absolute inset-0 flex items-end md:items-center justify-between p-5 md:p-10 gap-5">
                <div className="max-w-xl">
                  <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-gold mb-2 md:mb-3">
                    Featured Story
                  </p>
                  <h3 className="font-display text-xl md:text-3xl lg:text-4xl font-semibold text-cream leading-tight">
                    {active.title}
                  </h3>
                </div>
                <span
                  className="shrink-0 flex items-center justify-center rounded-full bg-gold text-navy-deep h-14 w-14 md:h-20 md:w-20 shadow-xl transition-transform duration-300 group-hover:scale-110"
                >
                  <Play className="h-6 w-6 md:h-8 md:w-8 fill-current ml-0.5" />
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Thumbnail rail */}
        <div className="mt-6 md:mt-8 -mx-4 px-4 py-2 overflow-x-auto overflow-y-hidden">
          <ul className="flex gap-3 md:gap-4 snap-x snap-mandatory">
            {VIDEOS.map((v, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={v.id} className="snap-start shrink-0 w-48 md:w-56">
                  <button
                    onClick={() => setActiveIdx(i)}
                    className={
                      "group block w-full text-left rounded-xl overflow-hidden transition-all duration-300 " +
                      (isActive
                        ? "ring-2 ring-gold shadow-lg shadow-gold/20"
                        : "ring-1 ring-border hover:border-gold/40 hover:shadow-md")
                    }
                    aria-pressed={isActive}
                  >
                    <div className="relative aspect-video bg-navy-deep">
                      <Thumb id={v.id} />
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
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
        <div className="mt-10 md:mt-14 rounded-xl bg-gradient-to-r from-gold/90 to-gold p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 shadow-lg shadow-gold/20">
          <p className="font-display text-xl md:text-2xl text-navy-deep leading-snug flex-1">
            Subscribe to our YouTube channel for stories, conversations, and updates from The
            Wicker Foundation.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy-deep text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-navy transition-colors shadow-md"
          >
            Subscribe <span className="ml-1">→</span>
          </a>
        </div>
      </div>

      {/* Modal */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenIdx(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div ref={dialogRef} className="relative w-full max-w-5xl">
            <button
              onClick={() => setOpenIdx(null)}
              className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-10 h-10 w-10 md:h-11 md:w-11 rounded-full bg-cream text-navy-deep flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              aria-label="Close video"
            >
              <X className="h-4 w-4" />
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
