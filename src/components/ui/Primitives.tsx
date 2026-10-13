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
--------------------------------------------------------------- */
type ButtonTone = "primary" | "secondary" | "ghost" | "light";

export function ButtonLink({
  href,
  children,
  tone = "primary",
  className = "",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
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
  const tones: Record<ButtonTone, string> = {
    primary: "bg-blue text-white hover:bg-blue-deep",
    secondary:
      "border border-line bg-white text-midnight hover:border-blue hover:text-blue",
    ghost: "text-blue hover:text-blue-deep underline-offset-4 hover:underline",
    light: "bg-white text-midnight hover:bg-arctic",
  };
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
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  breadcrumbs?: Array<{ label: string; href?: string }>;
}) {
  const dark = tone === "dark";
  return (
    <header
      className={`section border-b ${
        dark ? "surface-midnight border-white/10" : "border-line bg-arctic/60"
      }`}
    >
      <div className="mx-auto w-full max-w-[min(93vw,1800px)] px-5 sm:px-8">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} tone={tone} /> : null}
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
   Breadcrumbs (SEO + orientation)
--------------------------------------------------------------- */
export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: Array<{ label: string; href?: string }>;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.1em]">
        <li>
          <Link href="/" className={dark ? "text-[#8fa4bb] hover:text-white" : "text-muted hover:text-blue"}>
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true" className={dark ? "text-[#5c7089]" : "text-line"}>
              /
            </span>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className={dark ? "text-[#8fa4bb] hover:text-white" : "text-muted hover:text-blue"}>
                {item.label}
              </Link>
            ) : (
              <span className={dark ? "text-white" : "text-midnight"} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
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
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="display-lg mt-3">
        {title}
      </h2>
      {intro ? <p className="lede mt-4">{intro}</p> : null}
    </div>
  );
}
