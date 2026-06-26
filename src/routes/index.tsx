import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Play, Pause, Linkedin, Instagram, Youtube, Twitter, Menu, X } from "lucide-react";
import { VoicesCarousel } from "@/components/VoicesCarousel";
import { VideoStories } from "@/components/VideoStories";
import { FeaturedBook } from "@/components/FeaturedBook";
import { KeyInsights } from "@/components/KeyInsights";
import heroImg from "@/assets/hero-students.jpg";
import missionImg from "@/assets/mission-student.jpg";
import campaignImg from "@/assets/feature-campaign.jpg";
import storyScholarship from "@/assets/story-scholarship.jpg";
import storyMentor from "@/assets/story-mentor.jpg";
import storyCommunity from "@/assets/story-community.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Opening Doors to Education for Every Learner" },
      { name: "description", content: "Lumen connects young learners to scholarships, mentors, and resources — turning ambition into achievement." },
      { property: "og:title", content: "Lumen — Education Access for Every Learner" },
      { property: "og:description", content: "An education-access initiative connecting learners to opportunities, mentorship, and pathways to better futures." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function useCountUp(end: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.floor(p * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return { ref, val };
}

function Metric({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, val } = useCountUp(end);
  return (
    <div className="border-t border-cream/20 pt-8">
      <div className="flex items-baseline gap-1">
        <span ref={ref} className="font-display text-6xl md:text-7xl lg:text-8xl font-medium text-cream tabular-nums">
          {val.toLocaleString()}
        </span>
        <span className="font-display text-4xl md:text-5xl text-gold">{suffix}</span>
      </div>
      <p className="mt-4 text-cream/70 text-base md:text-lg max-w-xs leading-relaxed">{label}</p>
    </div>
  );
}

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Stories", href: "#videos" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["hero", "about", "videos", "book", "contact"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Active section highlight
  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed social rail */}
      <aside className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {[
          { Icon: Youtube, href: "#", label: "YouTube" },
          { Icon: Linkedin, href: "#", label: "LinkedIn" },
          { Icon: Instagram, href: "#", label: "Instagram" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="h-10 w-10 rounded-full bg-navy-deep/80 text-cream backdrop-blur flex items-center justify-center hover:bg-gold hover:text-navy-deep transition-colors"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </aside>

      {/* Hero + Mission wrapper — overlapping editorial flow */}
      <div className="relative">
        {/* Hero with video background + transparent nav overlay */}
        <section id="hero" className="relative h-screen min-h-[760px] md:min-h-[820px] w-full overflow-hidden bg-navy-deep">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImg}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="https://firebasestorage.googleapis.com/v0/b/weakerarm-fa8cb.firebasestorage.app/o/WeakerArmHeroVideo..mp4?alt=media&token=d7066b04-e3e3-4c5d-9d95-2c511445216f" type="video/mp4" />
            <source src="https://firebasestorage.googleapis.com/v0/b/weakerarm-fa8cb.firebasestorage.app/o/weakerArmLowRes.mp4?alt=media&token=ab1f29ec-e8d8-4913-a247-f58e2956e29d" type="video/mp4" />
          </video>
          {/* Soft overlays */}
          <div className="absolute inset-0 bg-navy-deep/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/40" />

          {/* Transparent Nav */}
          <header className={`absolute top-0 inset-x-0 z-30 transition-all duration-500 ${scrolled ? "bg-navy-deep/85 backdrop-blur-md" : "bg-transparent"}`}>
            <div className="container-x flex items-center justify-between py-6">
              <a href="#" className="font-display text-cream text-xl md:text-2xl tracking-tight">
                The Weaker Arm
              </a>
              <nav className="hidden lg:flex items-center gap-9">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative text-sm font-medium transition-colors ${isActive ? "text-cream" : "text-cream/70 hover:text-cream"}`}
                    >
                      {item.label}
                      <span
                        className={`pointer-events-none absolute left-0 -bottom-1 h-px bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                      />
                    </a>
                  );
                })}
              </nav>
              <div className="flex items-center gap-3">
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="hidden sm:inline-flex items-center gap-2 border border-cream/40 text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-cream hover:text-navy-deep transition-colors">
                  Join Us <ArrowRight className="h-4 w-4" />
                </a>
                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-cream" aria-label="Menu">
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {menuOpen && (
              <div className="lg:hidden bg-navy-deep/95 backdrop-blur-md border-t border-cream/10">
                <nav className="container-x py-4 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className={`text-base font-medium py-2 ${activeSection === item.href.slice(1) ? "text-gold" : "text-cream"}`}>{item.label}</a>
                  ))}
                </nav>
              </div>
            )}
          </header>

          {/* Hero content */}
          <div className="relative h-full container-x flex flex-col justify-center pt-24 pb-48 md:pb-56">
            <div className="max-w-3xl">
              <h1 className="font-display text-cream text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] font-medium translate-y-[clamp(-8rem,-16vh,-4.5rem)] xl:translate-y-50">
                The Weaker <br /><em className="italic text-gold-soft font-normal">Arm</em>
              </h1>
            </div>
          </div>

          {/* Pause / Play */}
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 z-20 h-14 w-14 md:h-16 md:w-16 rounded-full bg-cream/15 hover:bg-cream/30 backdrop-blur-md border border-cream/30 text-cream flex items-center justify-center transition-all"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
        </section>

        {/* Mission section — flows underneath the overlapping Who We Are card */}
        <section
          id="mission"
          className="relative bg-gradient-to-b from-cream-soft/70 via-background to-background pt-20 md:pt-24 lg:pt-28 xl:pt-[clamp(200px,22vw,300px)] pb-20 md:pb-24"
        >
          {/* Who We Are — premium editorial panel bridging hero & mission */}
          <div id="about" className="absolute left-0 right-0 bottom-full -translate-y-6 md:-translate-y-8 xl:top-25 xl:bottom-auto xl:-translate-y-1/2 z-20 container-x pointer-events-none">
            <div className="pointer-events-auto max-w-[34rem] sm:max-w-xl md:max-w-2xl bg-navy-deep text-cream p-7 sm:p-9 md:p-12 xl:p-16 border-t-[3px] border-gold shadow-[0_40px_80px_-20px_rgba(17,17,17,0.45)]">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-5 md:mb-6">Who We Are</p>
              <p className="font-display text-xl sm:text-2xl md:text-[1.85rem] leading-[1.35] text-cream">
                The Weaker Arm Series is a leadership and personal development platform dedicated to helping individuals transform limitations into opportunities for growth, impact, and leadership.
              </p>
            </div>
          </div>

          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-navy-deep">
                The mission is simple:<br />To help people strengthen their weaker arm.
              </h2>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
                <p className="text-muted-foreground leading-relaxed">
                  Founded on the belief that setbacks, weaknesses, and perceived inadequacies do not define a person's future, The Weaker Arm Series exists to empower people who have been told they are not ready, not qualified, or not capable of taking the next step in their journey.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through thought-provoking stories, practical leadership lessons, mentorship principles, and real-world experiences, the platform equips individuals with the mindset and tools needed to leverage what they already possess and prepare for the opportunities ahead.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 lg:translate-y-[-2rem] xl:translate-y-[-6rem]">
              <div className="relative lg:-mt-28 xl:-mt-36">
                <video
                  src="https://firebasestorage.googleapis.com/v0/b/weakerarm-fa8cb.firebasestorage.app/o/the_weaker_arm_original_text_animation.mp4?alt=media&token=458102ca-69a8-4eb3-990b-2cabcc868c2f"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[520px] lg:h-[680px] xl:h-[760px] object-cover rounded-sm"
                />
                <div className="absolute -bottom-6 -left-6 bg-cream border border-border px-6 py-5 max-w-xs shadow-sm">
                  <p className="font-display text-2xl text-navy-deep leading-tight">Sometimes the thing that appears to be your weakness becomes your greatest advantage.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


      {/* Featured campaign */}
      <section className="bg-navy-deep text-cream py-20 md:py-24">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-gold mb-6">Featured Campaign</p>
              <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
                Education Access Starts With <em className="italic text-gold-soft font-normal">Awareness</em>
              </h2>
              <p className="mt-8 text-cream/75 text-lg leading-relaxed max-w-lg">
                Most students don't lack ambition — they lack information. Our launch campaign is mapping the invisible barriers between learners and the opportunities already meant for them.
              </p>
              <a href="#" className="mt-10 inline-flex items-center gap-2 bg-gold text-navy-deep px-7 py-4 rounded-full font-semibold hover:bg-gold-soft transition-all hover:gap-3">
                Read the Vision <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <img src={campaignImg} alt="Students engaging with a world map in a classroom" width={1600} height={1024} loading="lazy" className="w-full h-[480px] object-cover rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      <VoicesCarousel />

      <VideoStories />



      {/* Focus areas */}
      <section id="programs" className="py-20 md:py-24">

        <div className="container-x">
          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-navy/60 mb-6">What We Do</p>
            <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-navy-deep">
              Our Big Focus Areas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { n: "01", t: "Opportunity Discovery", d: "Helping students find scholarships, programs, courses, and learning resources that match who they are and where they want to go." },
              { n: "02", t: "Guidance and Mentorship", d: "Connecting learners with advice, role models, and practical next steps from people who have walked the path." },
              { n: "03", t: "Community and Awareness", d: "Creating stories, campaigns, and tools that make education opportunities easier to find for everyone." },
            ].map((f) => (
              <div key={f.n} className="group bg-cream p-10 md:p-12 hover:bg-cream-soft transition-colors duration-500">
                <div className="flex items-start justify-between mb-12">
                  <span className="font-display text-2xl text-gold">{f.n}</span>
                  <span className="h-px w-12 bg-navy-deep/20 mt-4 group-hover:w-20 group-hover:bg-gold transition-all duration-500" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-navy-deep leading-tight mb-6">{f.t}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{f.d}</p>
                <a href="#" className="inline-flex items-center gap-2 link-underline text-navy-deep font-medium text-sm">
                  Read more <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-navy-deep text-cream py-20 md:py-24">
        <div className="container-x">
          <div className="max-w-3xl mb-16 md:mb-20">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-gold mb-6">Our Aspiration</p>
            <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              What we're building toward.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <Metric end={10000} suffix="+" label="Learners to reach in the first phase of our launch." />
            <Metric end={100} suffix="+" label="Education resources to curate, verify, and translate." />
            <Metric end={50} suffix="+" label="Partners, mentors, and contributors to engage worldwide." />
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="py-20 md:py-24">
        <div className="container-x">
          <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-navy/60 mb-6">Voices</p>
              <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-navy-deep">
                Stories Behind the Mission
              </h2>
            </div>
            <a href="#" className="link-underline text-navy-deep font-medium inline-flex items-center gap-2">
              View all stories <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { img: storyScholarship, tag: "Learner Story", title: "The night she found three scholarships she qualified for", excerpt: "How one student turned a Saturday search into a fully funded year of study.", icon: Play },
              { img: storyMentor, tag: "Mentorship", title: "What a good mentor really gives you", excerpt: "Beyond advice — the quiet confidence that comes from someone believing in you.", icon: ArrowRight },
              { img: storyCommunity, tag: "Community", title: "When a neighborhood becomes a classroom", excerpt: "An evening gathering that's quietly rewriting what local education looks like.", icon: ArrowRight },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <a href="#" key={i} className="group block">
                  <div className="relative overflow-hidden rounded-sm">
                    <img src={s.img} alt={s.title} width={1024} height={1024} loading="lazy" className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-5 left-5 bg-cream/95 px-3 py-1 text-xs font-medium uppercase tracking-wider text-navy-deep">{s.tag}</div>
                    <div className="absolute bottom-5 right-5 h-12 w-12 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <Icon className="h-5 w-5 text-navy-deep" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-navy-deep mt-6 leading-snug group-hover:text-navy transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{s.excerpt}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div id="book" className="scroll-mt-24">
        <FeaturedBook />
      </div>

      <KeyInsights />

      {/* Newsletter CTA */}
      <section id="contact" className="relative py-20 md:py-24 overflow-hidden bg-gradient-to-br from-cream-soft via-cream to-gold-soft/30 scroll-mt-20">
        <div className="container-x relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-navy/60 mb-6">Stay Connected</p>
            <h2 data-reveal className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-navy-deep">
              Get updates that <em className="italic text-gold">matter.</em>
            </h2>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Education opportunities, learner stories, resources, and launch news — sent thoughtfully, never noisy.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 bg-cream border border-border px-6 py-4 rounded-full text-base text-navy-deep placeholder:text-navy/40 focus:outline-none focus:border-navy-deep transition"
              />
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-navy-deep text-cream px-8 py-4 rounded-full font-semibold hover:bg-navy transition-all hover:gap-3">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-5 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Latest updates */}
      <section className="py-20 md:py-24 border-t border-border">
        <div className="container-x">
          <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-navy/60 mb-6">Journal</p>
              <h2 data-reveal className="font-display text-4xl md:text-5xl text-navy-deep">Latest Updates</h2>
            </div>
            <a href="#" className="link-underline text-navy-deep font-medium inline-flex items-center gap-2">
              All articles <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { date: "Jun 04, 2026", cat: "Essay", title: "Why education access begins with information", excerpt: "Information is the first scholarship — and we don't distribute it fairly." },
              { date: "May 22, 2026", cat: "Product", title: "Building a learner-first opportunity platform", excerpt: "Inside the design principles guiding what we ship and what we don't." },
              { date: "May 09, 2026", cat: "Field Notes", title: "How communities can help students find pathways", excerpt: "Three lessons from local educators rethinking the role of the neighborhood." },
            ].map((a, i) => (
              <a href="#" key={i} className="group bg-cream p-8 md:p-10 hover:bg-cream-soft transition-colors">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-navy/60 mb-8">
                  <span>{a.date}</span>
                  <span className="h-1 w-1 rounded-full bg-navy/30" />
                  <span className="text-gold font-medium">{a.cat}</span>
                </div>
                <h3 className="font-display text-2xl text-navy-deep leading-tight mb-4 group-hover:text-navy transition">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{a.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-navy-deep">
                  Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-cream pt-20 pb-10">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="h-9 w-9 rounded-full bg-cream flex items-center justify-center">
                  <span className="font-display text-navy-deep text-lg leading-none">L</span>
                </div>
                <span className="font-display text-xl">Lumen</span>
              </div>
              <p className="text-cream/70 leading-relaxed max-w-sm">
                A global education-access initiative making opportunity visible, navigable, and human — for every learner with the ambition to pursue it.
              </p>
              <div className="flex items-center gap-4 mt-8">
                {[Linkedin, Instagram, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-navy-deep transition">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">
              {[
                { h: "Resources", l: ["Scholarships", "Guides", "Blog", "FAQs"] },
                { h: "Organization", l: ["About", "Mission", "Team", "Contact"] },
                { h: "Get Involved", l: ["Partner With Us", "Volunteer", "Mentor", "Support"] },
              ].map((col) => (
                <div key={col.h}>
                  <h4 className="font-display text-gold text-base mb-5">{col.h}</h4>
                  <ul className="space-y-3">
                    {col.l.map((item) => (
                      <li key={item}>
                        <a href="#" className="text-cream/75 hover:text-cream text-sm transition">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-cream/15 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-cream/60">
            <p>© {new Date().getFullYear()} Lumen Education Access Initiative. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cream transition">Privacy</a>
              <a href="#" className="hover:text-cream transition">Terms</a>
              <a href="#" className="hover:text-cream transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
