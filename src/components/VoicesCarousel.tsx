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
    <section className="bg-cream py-24 md:py-36" aria-label="Voices that inspire change">
      <div className="container-x">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-navy/60 mb-6">
            Voices &amp; Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy-deep leading-tight">
            Voices That <em className="italic text-gold font-normal">Inspire Change</em>
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
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3" role="tablist" aria-label="Slide navigation">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={selected === i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    selected === i ? "w-8 bg-navy-deep" : "w-2.5 bg-navy/20 hover:bg-navy/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="h-12 w-12 rounded-full bg-navy-deep text-cream flex items-center justify-center transition-all duration-300 hover:bg-navy hover:scale-110 hover:-translate-x-0.5"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="h-12 w-12 rounded-full bg-navy-deep text-cream flex items-center justify-center transition-all duration-300 hover:bg-navy hover:scale-110 hover:translate-x-0.5"
              >
                <ArrowRight className="h-5 w-5" />
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
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative flex justify-center lg:justify-start"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] group">
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
          <Quote className="h-10 w-10 md:h-12 md:w-12 text-navy-deep mb-6" strokeWidth={2.5} />
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-2xl md:text-3xl lg:text-4xl text-navy-deep leading-snug"
          >
            "{slide.quote}"
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8"
          >
            <p className="font-display text-xl md:text-2xl text-navy-deep">{slide.author}</p>
            <p className="mt-1 text-sm md:text-base text-navy/60">{slide.role}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const imageLeft = slide.imageSide !== "right";
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className={`${imageLeft ? "lg:order-1" : "lg:order-2"} order-1 group overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(20,30,60,0.25)]`}
      >
        <img
          src={slide.image}
          alt={slide.author}
          loading="lazy"
          width={1280}
          height={960}
          className="w-full aspect-[4/3] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </motion.div>
      <div className={`${imageLeft ? "lg:order-2" : "lg:order-1"} order-2`}>
        <Quote className="h-10 w-10 md:h-12 md:w-12 text-gold mb-6" strokeWidth={2.5} />
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-2xl md:text-3xl lg:text-4xl text-navy-deep leading-snug"
        >
          "{slide.quote}"
        </motion.blockquote>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8"
        >
          <p className="font-display text-xl md:text-2xl text-navy-deep">{slide.author}</p>
          <p className="mt-1 text-sm md:text-base text-navy/60">{slide.role}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default VoicesCarousel;
