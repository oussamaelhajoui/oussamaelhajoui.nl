(() => {
  "use strict";

  const panel = document.querySelector("[data-tracking-consent]");
  if (!panel) return;

  const storageKey = "oussama_tracking_consent_v1";
  const valid = {
    gtm: /^GTM-[A-Z0-9]+$/,
    google: /^(G|GT|AW|DC)-[A-Z0-9-]+$/,
    meta: /^\d{5,30}$/,
    tiktok: /^[A-Z0-9]{8,40}$/i,
    snap: /^[a-f0-9-]{8,64}$/i,
  };
  let loaded = false;

  const injectScript = (src) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  };

  const trackLead = () => {
    if (!location.pathname.startsWith("/bedankt")) return;
    window.dataLayer?.push({ event: "generate_lead" });
    if (window.gtag) window.gtag("event", "generate_lead");
    if (window.fbq) window.fbq("track", "Lead");
    if (window.ttq?.track) window.ttq.track("SubmitForm");
    if (window.snaptr) window.snaptr("track", "SIGN_UP");
  };

  const loadGoogle = (gtmId, googleTagId) => {
    window.dataLayer = window.dataLayer || [];

    if (valid.gtm.test(gtmId)) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
    }

    if (valid.google.test(googleTagId)) {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", googleTagId);
      injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`);
    }
  };

  const loadMeta = (pixelId) => {
    if (!valid.meta.test(pixelId)) return;
    const fbq = window.fbq = window.fbq || function () {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
      else fbq.queue.push(arguments);
    };
    if (!fbq.loaded) {
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      injectScript("https://connect.facebook.net/en_US/fbevents.js");
    }
    fbq("init", pixelId);
    fbq("track", "PageView");
  };

  const loadTikTok = (pixelId) => {
    if (!valid.tiktok.test(pixelId)) return;
    window.TiktokAnalyticsObject = "ttq";
    const ttq = window.ttq = window.ttq || [];
    const methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    ttq.setAndDefer = (target, method) => { target[method] = function () { target.push([method].concat([].slice.call(arguments))); }; };
    methods.forEach((method) => ttq.setAndDefer(ttq, method));
    ttq.load = (id) => injectScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(id)}&lib=ttq`);
    ttq.load(pixelId);
    ttq.page();
  };

  const loadSnap = (pixelId) => {
    if (!valid.snap.test(pixelId)) return;
    const snaptr = window.snaptr = window.snaptr || function () {
      if (snaptr.handleRequest) snaptr.handleRequest.apply(snaptr, arguments);
      else snaptr.queue.push(arguments);
    };
    snaptr.queue = snaptr.queue || [];
    injectScript("https://sc-static.net/scevent.min.js");
    snaptr("init", pixelId, {});
    snaptr("track", "PAGE_VIEW");
  };

  const loadTracking = () => {
    if (loaded) return;
    loaded = true;
    loadGoogle(panel.dataset.gtmId || "", panel.dataset.googleTagId || "");
    loadMeta(panel.dataset.metaPixelId || "");
    loadTikTok(panel.dataset.tiktokPixelId || "");
    loadSnap(panel.dataset.snapPixelId || "");
    setTimeout(trackLead, 500);
  };

  const setChoice = (choice) => {
    const trackingWasLoaded = loaded;
    localStorage.setItem(storageKey, choice);
    panel.hidden = true;
    if (choice === "accepted") loadTracking();
    else if (trackingWasLoaded) location.reload();
  };

  panel.querySelector("[data-consent-accept]")?.addEventListener("click", () => setChoice("accepted"));
  panel.querySelector("[data-consent-reject]")?.addEventListener("click", () => setChoice("rejected"));
  document.querySelectorAll("[data-consent-settings]").forEach((button) => {
    button.addEventListener("click", () => {
      panel.hidden = false;
      panel.querySelector("[data-consent-accept]")?.focus();
    });
  });

  const choice = localStorage.getItem(storageKey);
  if (choice === "accepted") loadTracking();
  else if (choice !== "rejected") panel.hidden = false;
})();
