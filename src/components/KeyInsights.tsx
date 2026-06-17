import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const INSIGHTS = [
  { front: "Leverage What You Have", back: "You do not need perfect conditions to begin. Start with what you already have and use your limitations as a platform for growth." },
  { front: "The Ivory Tower Trap", back: "Leaders become disconnected when they rely only on reports, dashboards, and spreadsheets. Great leadership begins by understanding real people and real experiences." },
  { front: "Walk The Floor", back: "Do not wait in your office for reports. Visit the places where work happens. The best leadership insights are often found on the ground." },
  { front: "People Are More Than Numbers", back: "Performance metrics matter, but they never tell the full story. Great leaders understand both the numbers and the people behind them." },
  { front: "Hire Stronger Talent", back: "Confident leaders hire people who are better than them. Strong teams are built when leaders stop protecting positions and start building capability." },
  { front: "Avoid The Bozo Explosion", back: "Organizations decline when mediocre hiring becomes the norm. Excellence grows when excellent people hire and develop other excellent people." },
  { front: "Build Your Toolbox", back: "Every new skill, responsibility, and experience becomes another tool you can use when opportunities arrive." },
  { front: "Your Career Is Not A Ladder", back: "Growth does not always happen vertically. Sometimes lateral, diagonal, or even downward moves create the strongest foundation for future leadership." },
  { front: "There Is A Time To Build", back: "Not every opportunity should be judged by immediate reward. Some seasons are designed to build capacity, skills, and readiness." },
  { front: "Generative Leaders Multiply Leaders", back: "A leader's success is not measured only by personal achievement, but also by the number of people they help grow into stronger leaders." },
  { front: "Teach What You Know", back: "Knowledge that is not shared becomes wasted potential. Great leaders transfer skills, wisdom, and opportunities to others." },
  { front: "Know Your Staff", back: "Leadership becomes more effective when you understand the people behind the job titles, reports, and responsibilities." },
  { front: "Trust Before Authority", back: "People may obey a title, but they willingly follow leaders they trust, respect, and feel connected to." },
  { front: "Ask Better Questions", back: "One of the most powerful leadership questions is: \"How can I make your life easier?\"" },
  { front: "No-Work Meetings Matter", back: "Some of the most important leadership conversations happen when work is not the topic. Relationships create trust." },
  { front: "Find Hidden Strengths", back: "Observe your people carefully. Many strengths never appear in performance reports, but show up in daily interactions." },
  { front: "Place People Correctly", back: "Sometimes poor performance is not a talent problem. It is a placement problem. Great leaders match people with the right responsibilities." },
  { front: "Appreciation Is Personal", back: "Different people feel valued in different ways. Learn how each person prefers to be recognized and appreciated." },
  { front: "Be Present", back: "Management by wandering around helps leaders stay connected to reality without becoming micromanagers." },
  { front: "Presence Creates Trust", back: "When people regularly see their leader, they feel supported, understood, and valued." },
];

function FlashCard({
  insight,
  flipped,
  onToggle,
}: {
  insight: (typeof INSIGHTS)[number];
  flipped: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `${insight.front}. Showing detail. Click to flip back.`
          : `${insight.front}. Click to reveal the lesson.`
      }
      className="group relative w-full h-[240px] md:h-[280px] text-left [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-xl motion-reduce:transition-opacity"
    >
      <div
        className={`relative w-full h-full transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-opacity motion-reduce:duration-300 ${
          flipped ? "[transform:rotateY(180deg)] motion-reduce:[transform:none]" : ""
        }`}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] rounded-xl bg-white border border-border/80 p-5 md:p-6 flex flex-col justify-between shadow-sm group-hover:shadow-lg group-hover:border-gold/30 transition-all duration-400 motion-reduce:transition-opacity ${
            flipped ? "motion-reduce:opacity-0 motion-reduce:pointer-events-none" : ""
          }`}
        >
          <div className="w-8 h-[2px] rounded-full bg-gold" aria-hidden />
          <p className="font-display text-lg md:text-xl leading-[1.2] text-navy-deep">
            {insight.front}
          </p>
          <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-navy/50">
            Click to reveal
          </p>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:[transform:none] rounded-xl bg-navy-deep text-cream p-5 md:p-6 flex flex-col justify-between shadow-lg motion-reduce:transition-opacity ${
            flipped ? "" : "motion-reduce:opacity-0 motion-reduce:pointer-events-none"
          }`}
        >
          <div className="w-8 h-[2px] rounded-full bg-gold" aria-hidden />
          <p className="text-[14px] md:text-[15px] leading-[1.55] text-cream/95 overflow-hidden">
            {insight.back}
          </p>
          <div className="pt-2.5 border-t border-cream/15">
            <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-cream/50">
              From The Weaker Arm Series
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export function KeyInsights() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setItemsPerPage(1);
      else if (w < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(INSIGHTS.length / itemsPerPage));
  const maxPage = totalPages - 1;

  const goTo = useCallback((p: number) => {
    setPage((prev) => {
      if (p < 0) return maxPage;
      if (p > maxPage) return 0;
      return p;
    });
  }, [maxPage]);

  const prev = useCallback(() => goTo(page - 1), [page, goTo]);
  const next = useCallback(() => goTo(page + 1), [page, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  const toggle = (key: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section
      id="insights"
      className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cream-soft/40 via-background to-cream-soft/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative container-x">
        {/* Header */}
        <div className="max-w-xl mb-8 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4">
            Insights
          </p>
          <h2
            data-reveal
            className="font-display text-3xl md:text-4xl lg:text-5xl text-navy-deep leading-[1.05]"
          >
            Lessons From The Series
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">
            Flip through practical leadership lessons drawn from The Weaker Arm Series and The Value of the Weaker Arm.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden rounded-xl">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${page * 100}%)`,
              }}
            >
              {INSIGHTS.map((insight) => (
                <div
                  key={insight.front}
                  className="flex-shrink-0 px-1.5 md:px-2"
                  style={{
                    width: `${100 / itemsPerPage}%`,
                  }}
                >
                  <FlashCard
                    insight={insight}
                    flipped={flipped.has(insight.front)}
                    onToggle={() => toggle(insight.front)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center justify-between mt-6 md:mt-8">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="h-10 w-10 rounded-full border border-border/80 bg-white flex items-center justify-center text-navy-deep hover:border-gold hover:text-gold hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === page ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-5 bg-gold"
                      : "w-2 bg-navy-deep/15 hover:bg-navy-deep/35"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next slide"
              className="h-10 w-10 rounded-full border border-border/80 bg-white flex items-center justify-center text-navy-deep hover:border-gold hover:text-gold hover:shadow-md transition-all duration-300"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
