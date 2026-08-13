import type { TrackingContent } from "@/lib/strapi";

function hasTrackingId(tracking: TrackingContent) {
  return Boolean(
    tracking.googleTagManagerId ||
    tracking.googleTagId ||
    tracking.metaPixelId ||
    tracking.tiktokPixelId ||
    tracking.snapPixelId,
  );
}

export function TrackingConsent({ tracking }: { tracking: TrackingContent }) {
  if (!tracking.enabled || !hasTrackingId(tracking)) return null;

  return (
    <>
      <aside
        className="consent-panel"
        data-tracking-consent
        data-gtm-id={tracking.googleTagManagerId || undefined}
        data-google-tag-id={tracking.googleTagId || undefined}
        data-meta-pixel-id={tracking.metaPixelId || undefined}
        data-tiktok-pixel-id={tracking.tiktokPixelId || undefined}
        data-snap-pixel-id={tracking.snapPixelId || undefined}
        aria-labelledby="consent-title"
        hidden
      >
        <div>
          <p className="kicker">Privacyvoorkeur</p>
          <h2 className="mt-3 text-xl font-semibold" id="consent-title">{tracking.consentTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted">{tracking.consentText}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="button button-ghost min-h-[44px]" data-consent-reject type="button">Alleen noodzakelijk</button>
          <button className="button button-primary min-h-[44px]" data-consent-accept type="button">Alles accepteren</button>
        </div>
      </aside>
      <script data-keep-script src="/tracking.js" defer />
    </>
  );
}
