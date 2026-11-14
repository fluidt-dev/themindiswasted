(() => {
  const cells = document.querySelectorAll("[data-christmas-day]");
  if (!cells.length) return;

  const CHALLENGE_YEAR = 2026;

  const isRevealed = (day) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed; December = 11
    const date = now.getDate();

    if (year > CHALLENGE_YEAR) return true;
    if (year < CHALLENGE_YEAR) return false;
    if (month > 11) return true;
    if (month < 11) return false;
    return date >= day;
  };

  const isToday = (day) => {
    const now = new Date();
    return (
      now.getFullYear() === CHALLENGE_YEAR &&
      now.getMonth() === 11 &&
      now.getDate() === day
    );
  };

  cells.forEach((cell) => {
    const day = Number(cell.getAttribute("data-christmas-day"));
    const title = cell.getAttribute("data-title") || `Day ${day}`;
    const unlocked = isRevealed(day);
    const today = isToday(day);

    cell.classList.toggle("is-locked", !unlocked);
    cell.classList.toggle("is-revealed", unlocked);
    cell.classList.toggle("is-today", today);

    if (unlocked) {
      cell.setAttribute("aria-label", `December ${day}: ${title}`);

      const poster = cell.querySelector(".christmas-poster");
      if (poster) {
        const src = poster.getAttribute("data-src");
        if (src && poster.getAttribute("src") !== src) {
          poster.setAttribute("src", src);
        }
      }

      const status = cell.querySelector(".christmas-status");
      if (status) {
        const reviewed = cell.hasAttribute("data-review");
        if (today) {
          status.textContent = reviewed ? "Today · Reviewed" : "Today";
        } else if (reviewed) {
          status.textContent = "Reviewed";
        }
      }
    } else {
      cell.setAttribute("aria-label", `December ${day} — locked`);
    }
  });
})();
