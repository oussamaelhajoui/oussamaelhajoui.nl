import type { ReactNode } from "react";

export function SectionIntro({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="section-title mt-5 max-w-4xl">{title}</h2>
      </div>
      <p className="max-w-xl text-lg leading-8 text-ink-muted lg:justify-self-end">{text}</p>
    </div>
  );
}

export function PageHero({ kicker, title, text }: { kicker: string; title: ReactNode; text: string }) {
  return (
    <section className="page-hero page-grid">
      <div className="site-shell">
        <p className="kicker">{kicker}</p>
        <h1 className="page-title mt-6 max-w-6xl">{title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-muted md:text-xl">{text}</p>
      </div>
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="inline-flex items-center gap-3 font-semibold text-blue hover:underline" href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

export function CodeMark({ label }: { label: string }) {
  const initials = label === "Angular" ? "NG" : label === "React" ? "RE" : label === "Java" ? "JV" : "C#";
  return <span className="code-mark" aria-hidden="true">{initials}</span>;
}
