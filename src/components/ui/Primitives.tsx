import type { ReactNode } from "react";
import Link from "next/link";
import { STATUS_SCHEMA, type StatusKey } from "@/data/status";

/* ---------------------------------------------------------------
   Status pill — every model/family carries its lifecycle status.
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
  /** Background the button sits on — selects the matching colour set. */
  surface?: ButtonSurface;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[0.95rem]",
    lg: "px-7 py-3.5 text-base",
  }[size];
  const onDark = {
    primary: "bg-white text-midnight hover:bg-arctic",
    secondary: "border border-white/40 text-white hover:border-white hover:bg-white/10",
    ghost: "text-white underline-offset-4 hover:underline hover:text-cyan",
    light: "bg-white text-midnight hover:bg-arctic",
  } satisfies Record<ButtonTone, string>;
  const onBrand = {
    primary: "bg-white text-midnight hover:bg-arctic",
    secondary: "border border-midnight/35 text-midnight hover:border-midnight hover:bg-white/50",
    ghost: "text-midnight underline-offset-4 hover:underline",
    light: "bg-white text-midnight hover:bg-arctic",
  } satisfies Record<ButtonTone, string>;
  const onLight = {
    primary: "bg-blue text-white hover:bg-blue-deep",
    secondary: "btn-outline",
    ghost: "text-blue hover:text-blue-deep underline-offset-4 hover:underline",
    light: "bg-white text-midnight hover:bg-arctic",
  } satisfies Record<ButtonTone, string>;
  const tones =
    surface === "dark" ? onDark : surface === "brand" ? onBrand : onLight;
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = `${base} ${sizes} ${tones[tone]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------
   Page header — eyebrow + H1 + intro (used by all inner pages)
--------------------------------------------------------------- */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
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
