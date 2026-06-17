import { ArrowRight, Phone, Mail } from "lucide-react";
import { BookMediaGallery } from "./BookMediaGallery";

const AMAZON_URL = "https://www.amazon.com/dp/998841756X/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.qHDysqLc7i3xTzbA-Hgn8BXDJm-eN_ZrgAaX1FK1Clk.ZCyoOocQb_H_OpRQLM4kjV079Eul54BxoHox4jId-kA&qid=1773611054&sr=8-1";

function BuyButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-gold-soft transition-all hover:gap-3"
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
    "group flex items-center gap-3 text-left p-4 rounded-xl border border-border bg-cream hover:bg-cream-soft transition-colors";
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
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-cream-soft/40 to-cream-soft/60">
      <div className="container-x">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — Book cover */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative max-w-md mx-auto lg:mx-0 overflow-visible">
              <BookMediaGallery />
              {/* Decorative accent — hidden on mobile to avoid overflow */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 rounded-2xl -z-10 pointer-events-none hidden sm:block" />
            </div>
          </div>

          {/* RIGHT — Book details */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            {/* Badge */}
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-5">
              From The Weaker Arm Series
            </p>

            {/* Title & Author */}
            <h2 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl text-navy-deep leading-[1.05]">
              The Value of the Weaker
            </h2>
            <p className="mt-3 text-lg text-navy/70 font-medium">
              by David Nuworkpor
            </p>

            {/* Description */}
            <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                This book explores themes of opportunity, resilience, personal transformation, and overcoming barriers.
              </p>
              <p>
                Full description to be inserted here.
              </p>
            </div>

            {/* Purchase actions */}
            <div className="mt-10 flex flex-col gap-4">
              {/* Primary CTA */}
              <BuyButton href={AMAZON_URL}>Buy on Amazon</BuyButton>

              {/* Secondary actions */}
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
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
            <div className="mt-10 p-6 md:p-8 rounded-2xl border-l-4 border-gold bg-cream-soft/60">
              <h3 className="font-display text-xl text-navy-deep mb-2">
                Support The Movement
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Every purchase helps support The Weaker Arm Series and its mission to tell stories of resilience, opportunity, and transformation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
