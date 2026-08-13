import type { CallToActionContent } from "@/lib/strapi";

export function CtaBand({ content }: { content: CallToActionContent }) {
  return (
    <section className="overflow-hidden bg-blue py-20 text-white sm:py-24">
      <div className="site-shell relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="kicker text-white">{content.kicker}</p>
          <h2 className="section-title mt-5 max-w-4xl text-white">{content.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">{content.text}</p>
        </div>
        <a className="button button-light lg:mb-2" href="/contact/">{content.buttonLabel} <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
