import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import founderPortrait from "@/assets/founder-portrait.jpg";
import storyScholarship from "@/assets/story-scholarship.jpg";
import storyMentor from "@/assets/story-mentor.jpg";
import storyCommunity from "@/assets/story-community.jpg";
import storyDigital from "@/assets/story-digital.jpg";

type Slide = {
  kind: "founder" | "story";
  image: string;
  quote: string;
  author: string;
  role: string;
  imageSide?: "left" | "right";
};

const SLIDES: Slide[] = [
  {
    kind: "founder",
    image: founderPortrait,
    quote:
      "Education should not be a privilege determined by geography, income, or circumstance. Every learner deserves access to opportunities that can transform their future.",
    author: "Adaeze Okafor",
    role: "Founder & Executive Director",
  },
  {
    kind: "story",
    image: storyScholarship,
    quote: "Finding the right scholarship opportunity changed the direction of my life.",
    author: "Learner Story",
    role: "Scholarship Recipient",
    imageSide: "left",
  },
  {
    kind: "story",
    image: storyMentor,
    quote:
      "Many talented young people simply need guidance, encouragement, and access to the right information.",
    author: "Mentor Voice",
    role: "Education Advocate",
    imageSide: "right",
  },
  {
    kind: "story",
    image: storyCommunity,
    quote:
      "When educational opportunities become visible, entire communities begin to imagine new futures.",
    author: "Community Partner",
    role: "Local Education Leader",
    imageSide: "left",
  },
  {
    kind: "story",
    image: storyDigital,
    quote:
      "Digital access is becoming one of the most important educational equalizers of our generation.",
    author: "Platform Insight",
    role: "Learning Access Team",
    imageSide: "right",
  },
];

export function VoicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  return (
    <section className="relative bg-gradient-to-b from-navy-deep via-navy-deep/98 to-navy-deep py-16 md:py-24 lg:py-28" aria-label="Voices that inspire change">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="relative container-x">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-gold mb-5">
            Voices &amp; Stories
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
            Voices That <em className="italic text-gold-soft font-normal">Inspire Change</em>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {SLIDES.map((s, i) => (
                <div
                  key={i}
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${SLIDES.length}`}
                >
                  <AnimatePresence mode="wait">
                    {selected === i && (
                      <SlideContent key={i} slide={s} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-10 md:mt-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Slide navigation">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={selected === i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selected === i ? "w-7 bg-gold" : "w-2 bg-cream/20 hover:bg-cream/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="h-11 w-11 rounded-full bg-cream/10 text-cream border border-cream/20 flex items-center justify-center transition-all duration-300 hover:bg-cream/20 hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="h-11 w-11 rounded-full bg-cream/10 text-cream border border-cream/20 flex items-center justify-center transition-all duration-300 hover:bg-cream/20 hover:scale-105"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideContent({ slide }: { slide: Slide }) {
  if (slide.kind === "founder") {
    return (
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative flex justify-center lg:justify-start"
        >
          <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] group">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full animate-[spin_14s_linear_infinite] group-hover:[animation-play-state:paused]"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="220 295"
              />
            </svg>
            <img
              src={slide.image}
              alt={slide.author}
              loading="lazy"
              width={880}
              height={880}
              className="absolute inset-[6%] w-[88%] h-[88%] rounded-full object-cover"
            />
          </div>
        </motion.div>
        <div>
          <Quote className="h-8 w-8 md:h-10 md:w-10 text-gold mb-5" strokeWidth={2.5} />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-xl md:text-2xl lg:text-3xl text-cream leading-snug"
          >
            "{slide.quote}"
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6"
          >
            <p className="font-display text-lg md:text-xl text-cream">{slide.author}</p>
            <p className="mt-1 text-sm text-cream/60">{slide.role}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const imageLeft = slide.imageSide !== "right";
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`${imageLeft ? "lg:order-1" : "lg:order-2"} order-1 group overflow-hidden rounded-xl shadow-2xl shadow-black/30`}
      >
        <img
          src={slide.image}
          alt={slide.author}
          loading="lazy"
          width={1280}
          height={960}
          className="w-full aspect-[4/3] object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]"
        />
      </motion.div>
      <div className={`${imageLeft ? "lg:order-2" : "lg:order-1"} order-2`}>
        <Quote className="h-8 w-8 md:h-10 md:w-10 text-gold mb-5" strokeWidth={2.5} />
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-xl md:text-2xl lg:text-3xl text-cream leading-snug"
        >
          "{slide.quote}"
        </motion.blockquote>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6"
        >
          <p className="font-display text-lg md:text-xl text-cream">{slide.author}</p>
          <p className="mt-1 text-sm text-cream/60">{slide.role}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default VoicesCarousel;
