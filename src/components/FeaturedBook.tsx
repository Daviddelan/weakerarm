import { ArrowRight, Phone, Mail } from "lucide-react";
import { BookMediaGallery } from "./BookMediaGallery";

const AMAZON_URL = "https://www.amazon.com/dp/998841756X/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.qHDysqLc7i3xTzbA-Hgn8BXDJm-eN_ZrgAaX1FK1Clk.ZCyoOocQb_H_OpRQLM4kjV079Eul54BxoHox4jId-kA&qid=1773611054&sr=8-1";

function BuyButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-gold-soft transition-all hover:gap-3 shadow-lg shadow-gold/20"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SecondaryAction({
  href,
  icon: Icon,
  label,
  value,
  onClick,
}: {
  href?: string;
  icon: React.ElementType;
  label: string;
  value: string;
  onClick?: () => void;
}) {
  const className =
    "group flex items-center gap-3 text-left p-4 rounded-xl border border-border/60 bg-white hover:border-gold/40 hover:bg-cream-soft transition-all duration-300";
  const children = (
    <>
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-navy-deep/5 text-navy-deep group-hover:bg-gold/10 group-hover:text-gold transition-colors">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-navy/60">{label}</p>
        <p className="text-sm font-medium text-navy-deep">{value}</p>
      </div>
    </>
  );
  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function FeaturedBook() {
  const handlePhoneClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "tel:+2335678907";
    } else {
      navigator.clipboard?.writeText("+2335678907");
      alert("Phone number copied to clipboard: +2335678907");
    }
  };

  return (
    <section className="relative py-14 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-cream-soft/30 to-cream-soft/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative container-x">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT — Book cover */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <BookMediaGallery />
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold/25 rounded-2xl -z-10 pointer-events-none" />
            </div>
          </div>

          {/* RIGHT — Book details */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            {/* Badge */}
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">
              From The Weaker Arm Series
            </p>

            {/* Title & Author */}
            <h2 data-reveal className="font-display text-3xl md:text-4xl lg:text-5xl text-navy-deep leading-[1.05]">
              The Value of the Weaker
            </h2>
            <p className="mt-2 text-lg text-navy/70 font-medium">
              by David Nuworkpor
            </p>

            {/* Description */}
            <div className="mt-6 space-y-3 text-muted-foreground leading-relaxed max-w-xl text-[15px]">
              <p>
                This book explores themes of opportunity, resilience, personal transformation, and overcoming barriers.
              </p>
              <p>
                Full description to be inserted here.
              </p>
            </div>

            {/* Purchase actions */}
            <div className="mt-8 flex flex-col gap-4">
              {/* Primary CTA */}
              <BuyButton href={AMAZON_URL}>Buy on Amazon</BuyButton>

              {/* Secondary actions */}
              <div className="grid sm:grid-cols-2 gap-3 mt-1">
                <SecondaryAction
                  icon={Phone}
                  label="Call to Order"
                  value="+233 567 8907"
                  onClick={handlePhoneClick}
                />
                <SecondaryAction
                  href="mailto:dela@gmail.com"
                  icon={Mail}
                  label="Email to Order"
                  value="dela@gmail.com"
                />
              </div>

              {/* Helper text */}
              <p className="text-xs text-navy/50 mt-1">
                For direct orders, bulk purchases, speaking engagements, partnerships, or special requests.
              </p>
            </div>

            {/* Support card */}
            <div className="mt-8 p-5 md:p-6 rounded-xl border-l-[3px] border-gold bg-white/80 backdrop-blur-sm shadow-sm">
              <h3 className="font-display text-lg text-navy-deep mb-1.5">
                Support The Movement
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xl text-[15px]">
                Every purchase helps support The Weaker Arm Series and its mission to tell stories of resilience, opportunity, and transformation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
