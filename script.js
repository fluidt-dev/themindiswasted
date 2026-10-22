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

  /**
   * Seasonal Halloween accents (sitewide).
   * Gate: local calendar October only — visible Oct 1–31, gone starting Nov 1.
   * Same pattern as Movies/31_Nights_of_Halloween date checks (local timezone).
   */
  const isHalloweenSeason = (now = new Date()) => now.getMonth() === 9;

  const mountHalloweenDecor = () => {
    if (!isHalloweenSeason() || document.querySelector(".halloween-decor")) return;

    document.documentElement.classList.add("halloween-season");

    const layer = document.createElement("div");
    layer.className = "halloween-decor";
    layer.setAttribute("aria-hidden", "true");
    const bat = (cls) =>
      `<svg class="halloween-bat ${cls}" viewBox="0 0 64 32" width="40" height="20" focusable="false">
        <path fill="currentColor" d="M32 14c-2 0-3.5 1.2-4 2.8-.5-1.6-2-2.8-4-2.8-3.5 0-6 3.2-8.5 6.2C12 16.5 7 12 2 11c3 4 6.5 8.5 11 11 2.2 1.2 4.8.4 6.5-1.2 1.2 2.2 3.2 4.2 5.5 4.2h6c2.3 0 4.3-2 5.5-4.2 1.7 1.6 4.3 2.4 6.5 1.2 4.5-2.5 8-7 11-11-5 1-10 5.5-13.5 9.2C42 17.2 39.5 14 36 14z"/>
      </svg>`;

    layer.innerHTML = `
      <svg class="halloween-web halloween-web-tr" viewBox="0 0 120 120" width="120" height="120" focusable="false">
        <path d="M120 0 L0 0 L0 8 M120 0 L8 112 M120 0 L40 120 M120 0 L90 120 M120 0 L120 40 M100 0 Q60 40 0 60 M110 0 Q70 55 20 100 M120 20 Q80 60 50 120" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>
      <svg class="halloween-web halloween-web-bl" viewBox="0 0 90 90" width="90" height="90" focusable="false">
        <path d="M0 90 L90 90 L90 82 M0 90 L82 8 M0 90 L50 0 M0 90 L10 0 M0 90 L0 50 M10 90 Q40 55 90 40 M5 90 Q35 50 70 10" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>
      ${bat("halloween-bat-1")}
      ${bat("halloween-bat-2")}
      ${bat("halloween-bat-3")}
    `;
    document.body.appendChild(layer);
  };

  mountHalloweenDecor();
})();

function ml_webform_success_45600943() {
  const formRoot = document.querySelector(".ml-subscribe-form-45600943");
  if (!formRoot) return;
  const success = formRoot.querySelector(".row-success");
  const formRow = formRoot.querySelector(".row-form");
  if (success) success.style.display = "block";
  if (formRow) formRow.style.display = "none";
}
