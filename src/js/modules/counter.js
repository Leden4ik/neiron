// Цифры смены "набегают" при появлении блока
const counters = document.querySelectorAll(".js--counter");

if (counters.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const format = (n) => n.toLocaleString("ru-RU");

  const animate = (el) => {
    const target = Number(el.dataset.value);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target);
      });
    },
    {threshold: 0.6}
  );

  counters.forEach((el) => {
    el.textContent = format(0);
    observer.observe(el);
  });
}
