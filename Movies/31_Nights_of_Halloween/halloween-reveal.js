(() => {
  const cells = document.querySelectorAll("[data-halloween-day]");
  if (!cells.length) return;

  const CHALLENGE_YEAR = 2026;

  const isRevealed = (day) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed; October = 9
    const date = now.getDate();

    if (year > CHALLENGE_YEAR) return true;
    if (year < CHALLENGE_YEAR) return false;
    if (month > 9) return true;
    if (month < 9) return false;
    return date >= day;
  };

  const isToday = (day) => {
    const now = new Date();
    return (
      now.getFullYear() === CHALLENGE_YEAR &&
      now.getMonth() === 9 &&
      now.getDate() === day
    );
  };

  cells.forEach((cell) => {
    const day = Number(cell.getAttribute("data-halloween-day"));
    const title = cell.getAttribute("data-title") || `Night ${day}`;
    const unlocked = isRevealed(day);
    const today = isToday(day);

    cell.classList.toggle("is-locked", !unlocked);
    cell.classList.toggle("is-revealed", unlocked);
    cell.classList.toggle("is-today", today);

    if (unlocked) {
      cell.setAttribute("aria-label", `October ${day}: ${title}`);

      const poster = cell.querySelector(".halloween-poster");
      if (poster) {
        const src = poster.getAttribute("data-src");
        if (src && poster.getAttribute("src") !== src) {
          poster.setAttribute("src", src);
        }
      }

      const status = cell.querySelector(".halloween-status");
      if (status && today) {
        status.textContent = "Tonight";
      }
    } else {
      cell.setAttribute("aria-label", `October ${day} — locked`);
    }
  });
})();
