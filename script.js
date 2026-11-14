(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        nav.classList.remove("is-open");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Temporary Christmas season skin.
     Rollback after holidays: set force to false.
     Set force to null to rely on start/end dates instead. */
  const CHRISTMAS_SEASON = {
    force: true,
    start: "2026-11-05",
    end: "2027-01-02",
  };

  const thisScript = document.currentScript;

  const isChristmasSeason = () => {
    if (CHRISTMAS_SEASON.force === false) return false;
    if (CHRISTMAS_SEASON.force === true) return true;
    const now = new Date();
    const start = new Date(`${CHRISTMAS_SEASON.start}T00:00:00`);
    const end = new Date(`${CHRISTMAS_SEASON.end}T23:59:59`);
    return now >= start && now <= end;
  };

  const resolveSeasonBase = () => {
    const scriptSrc =
      (thisScript && thisScript.src) ||
      Array.from(document.scripts)
        .map((s) => s.src)
        .find((src) => /(?:^|\/)script\.js(?:\?|$)/.test(src)) ||
      "";
    return scriptSrc ? scriptSrc.replace(/[^/]+$/, "") : "/";
  };

  const mountSeasonSnow = () => {
    if (document.querySelector(".season-snow")) return;

    const layer = document.createElement("div");
    layer.className = "season-snow";
    layer.setAttribute("aria-hidden", "true");

    const dense = document.body.classList.contains("christmas-page");
    const count = dense ? 28 : 48;

    for (let i = 0; i < count; i += 1) {
      const flake = document.createElement("span");
      flake.className = "season-snow-flake";
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const duration = 9 + Math.random() * 14;
      const delay = Math.random() * -20;
      const drift = `${Math.round((Math.random() - 0.5) * 120)}px`;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left = `${left}%`;
      flake.style.setProperty("--drift", drift);
      flake.style.setProperty("--fall-duration", `${duration}s`);
      flake.style.animationDuration = `${duration}s`;
      flake.style.animationDelay = `${delay}s`;
      flake.style.opacity = String(0.35 + Math.random() * 0.55);
      layer.appendChild(flake);
    }

    document.body.appendChild(layer);
  };

  const mountHeroDecor = (base) => {
    const hosts = document.querySelectorAll(".hero-media, .hub-hero-media");
    if (!hosts.length) return;

    const asset = (name) => `${base}img/season/${name}`;

    hosts.forEach((host) => {
      if (host.querySelector(".season-hero-decor")) return;

      const decor = document.createElement("div");
      decor.className = "season-hero-decor";
      decor.setAttribute("aria-hidden", "true");
      decor.innerHTML = `
        <div class="season-hero-frost"></div>
        <div class="season-hero-bokeh"></div>
        <img class="season-hero-garland" src="${asset("garland.svg")}" alt="" />
        <img class="season-hero-ornament season-hero-ornament-a" src="${asset("ornament-red.svg")}" alt="" />
        <img class="season-hero-ornament season-hero-ornament-b" src="${asset("ornament-gold.svg")}" alt="" />
        <img class="season-hero-ornament season-hero-ornament-c" src="${asset("ornament-green.svg")}" alt="" />
        <img class="season-hero-ornament season-hero-ornament-d" src="${asset("ornament-red.svg")}" alt="" />
        <img class="season-hero-pine season-hero-pine-left" src="${asset("pine.svg")}" alt="" />
        <img class="season-hero-pine season-hero-pine-right" src="${asset("pine.svg")}" alt="" />
        <img class="season-hero-present season-hero-present-a" src="${asset("present-red.svg")}" alt="" />
        <img class="season-hero-present season-hero-present-b" src="${asset("present-green.svg")}" alt="" />
        <img class="season-hero-present season-hero-present-c" src="${asset("present-gold.svg")}" alt="" />
        <div class="season-hero-lights"></div>
      `;
      host.appendChild(decor);
    });
  };

  const enableChristmasSeason = () => {
    if (!isChristmasSeason()) return;

    document.body.classList.add("season-christmas");

    const base = resolveSeasonBase();

    if (!document.querySelector("link[data-christmas-theme]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${base}christmas-theme.css`;
      link.setAttribute("data-christmas-theme", "true");
      document.head.appendChild(link);
    }

    const kicker = document.querySelector(".hero-kicker");
    if (kicker && !kicker.dataset.seasonKicker) {
      kicker.dataset.seasonKicker = kicker.textContent || "";
      kicker.textContent = "Tech · Movies · Games · Holidays";
    }

    mountHeroDecor(base);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion) {
      mountSeasonSnow();
    }
  };

  enableChristmasSeason();
})();

function ml_webform_success_45600943() {
  const formRoot = document.querySelector(".ml-subscribe-form-45600943");
  if (!formRoot) return;
  const success = formRoot.querySelector(".row-success");
  const formRow = formRoot.querySelector(".row-form");
  if (success) success.style.display = "block";
  if (formRow) formRow.style.display = "none";
}
