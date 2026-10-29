import type { ReactNode } from "react";
import Link from "next/link";
import { STATUS_SCHEMA, type StatusKey } from "@/data/status";

/* ---------------------------------------------------------------
   Status pill, every model/family carries its lifecycle status.
--------------------------------------------------------------- */
export function StatusPill({
  status,
  size = "md",
}: {
  status: StatusKey;
  size?: "sm" | "md";
}) {
  const def = STATUS_SCHEMA[status];
  const tones: Record<string, string> = {
    concept: "bg-cyan/15 text-[#0b5c8f] border-cyan/40",
    progress: "bg-blue/10 text-blue-deep border-blue/35",
    verified: "bg-emerald-50 text-emerald-800 border-emerald-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium uppercase tracking-[0.12em] ${
        size === "sm" ? "px-2.5 py-0.5 text-[0.62rem]" : "px-3 py-1 text-[0.68rem]"
      } ${tones[def.tone]}`}
      title={def.meaning}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {def.label}
    </span>
  );
}

/* ---------------------------------------------------------------
   Research concept label, used on every CARE SENTINEL slide,
   image, card and section. Distinct from the standard lifecycle
   pill because this programme is a research concept, not a
   product that can be ordered or deployed.
--------------------------------------------------------------- */
export function ResearchConceptBadge({
  size = "md",
  surface = "light",
  className = "",
}: {
  size?: "sm" | "md";
  /** `overlay` is a solid pill for placing directly on top of artwork. */
  surface?: "light" | "dark" | "overlay";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium uppercase tracking-[0.12em] ${
        size === "sm" ? "px-2.5 py-0.5 text-[0.62rem]" : "px-3 py-1 text-[0.68rem]"
      } ${
        surface === "dark"
          ? "border-cyan/50 bg-cyan/15 text-cyan"
          : surface === "overlay"
            ? "border-cyan/45 bg-white/95 text-[#0b5c8f] shadow-sm backdrop-blur"
            : "border-cyan/45 bg-cyan/12 text-[#0b5c8f]"
      } ${className}`}
      title="Proposed research concept. Not a manufactured or clinically validated product."
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      Research concept
    </span>
  );
}

/* ---------------------------------------------------------------
   Buttons / CTA links

   Tone × surface matrix (used consistently across the site):

     surface="light"  (white / arctic backgrounds)
       primary   blue solid      secondary  .btn-outline (see globals.css)
       ghost     blue text link  light      white solid (rare)

     surface="brand" (the #46BFEE → #3887C8 gradient band)
       primary   white solid     secondary  midnight outline
       ghost     midnight text link

     surface="dark"  (midnight backgrounds)
       primary   white solid     secondary  white outline
       ghost     white text link

   White is the primary action on dark so the CTA keeps maximum
   contrast; blue-on-midnight only reaches 3.5:1.

   Every tone additionally picks up the four motions from the "Button
   effects" block in globals.css, shine sweep, lift with glow, the
   gradient slide on primary or the gradient wipe on secondary, and a
   chevron, selected by the btn-* marker in each string below.
--------------------------------------------------------------- */
type ButtonTone = "primary" | "secondary" | "ghost" | "light";
type ButtonSurface = "light" | "brand" | "dark";

export function ButtonLink({
  href,
  children,
  tone = "primary",
  surface = "light",
  className = "",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  /** Background the button sits on, selects the matching colour set. */
  surface?: ButtonSurface;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  /* btn-fx carries the shine, the chevron and every transition; btn-lift the
     rise and the glow. Both are declared in globals.css, see "Button
     effects". transition-colors is deliberately absent: it would override
     the shorthand in .btn-fx and drop transform and box-shadow. */
  const base =
    "btn-fx btn-lift inline-flex items-center justify-center gap-2 rounded-full font-semibold focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[0.95rem]",
    lg: "px-7 py-3.5 text-base",
  }[size];
  const onDark = {
    primary: "btn-fill btn-glow-cyan bg-white text-midnight",
    secondary: "btn-fill btn-glow-cyan border border-white/40 text-white",
    ghost: "btn-ghost text-white underline-offset-4 hover:underline hover:text-cyan",
    light: "btn-fill btn-glow-cyan bg-white text-midnight",
  } satisfies Record<ButtonTone, string>;
  const onBrand = {
    primary: "btn-fill btn-glow-cyan bg-white text-midnight",
    secondary: "btn-fill btn-glow-cyan border border-midnight/35 text-midnight",
    ghost: "btn-ghost text-midnight underline-offset-4 hover:underline",
    light: "btn-fill btn-glow-cyan bg-white text-midnight",
  } satisfies Record<ButtonTone, string>;
  const onLight = {
    primary: "btn-grad btn-glow-blue bg-blue text-white",
    secondary: "btn-outline",
    ghost: "btn-ghost text-blue hover:text-blue-deep underline-offset-4 hover:underline",
    light: "bg-white text-midnight hover:bg-arctic",
  } satisfies Record<ButtonTone, string>;
  const tones =
    surface === "dark" ? onDark : surface === "brand" ? onBrand : onLight;
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = `${base} ${sizes} ${tones[tone]} ${className}`;

  /* The chevron is absolute in the right padding, so hovering never reflows
     the label. size="sm" has only 16px of padding there and a 12px glyph
     would reach into the text, so it goes without one. */
  const content = (
    <>
      {children}
      {size !== "sm" ? (
        <svg
          className="btn-arrow"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4.3 2.4 7.9 6l-3.6 3.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/* ---------------------------------------------------------------
   Page header, eyebrow + H1 + intro (used by all inner pages)
--------------------------------------------------------------- */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <header
      className={`section border-b ${
        dark ? "surface-midnight border-white/10" : "border-line bg-arctic/60"
      }`}
    >
      <div className="mx-auto w-full max-w-[min(93vw,1800px)] px-5 sm:px-8">
        {eyebrow ? (
          <p className={`eyebrow ${dark ? "text-cyan!" : ""}`}>{eyebrow}</p>
        ) : null}
        <h1 className="display-xl mt-3 max-w-4xl">{title}</h1>
        {intro ? (
          <div className={`lede mt-5 max-w-3xl ${dark ? "text-[#b7c6d8]!" : ""}`}>
            {intro}
          </div>
        ) : null}
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------
   Section heading
--------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
  gradientAccent = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
  /** Render the eyebrow label with the brand blue→cyan gradient text clip. */
  gradientAccent?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        gradientAccent ? (
          <>
            <span
              aria-hidden="true"
              className="mb-4 block h-1 w-24 rounded-full bg-[linear-gradient(90deg,#46BFEE_0%,#3887C8_100%)]"
            />
            <p className="eyebrow bg-gradient-to-r from-[#46BFEE] to-[#3887C8] bg-clip-text text-transparent">
              {eyebrow}
            </p>
          </>
        ) : (
          <p className="eyebrow">{eyebrow}</p>
        )
      ) : null}
      <h2 id={id} className="display-lg mt-3">
        {title}
      </h2>
      {intro ? <p className="lede mt-4">{intro}</p> : null}
    </div>
  );
}
