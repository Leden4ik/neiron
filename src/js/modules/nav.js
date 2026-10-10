const nav = document.querySelector(".js--nav");

if (nav) {
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  // тень, когда панель прилипла к верху
  const sentinel = document.createElement("div");
  nav.before(sentinel);
  new IntersectionObserver(([entry]) => nav.classList.toggle("is-stuck", !entry.isIntersecting)).observe(sentinel);

  // подсветка текущего раздела
  const setActive = (id) => {
    links.forEach((link) => {
      const on = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    {rootMargin: "-40% 0px -55% 0px"}
  );
  sections.forEach((section) => spy.observe(section));

  // якоря с поправкой на высоту липкой панели
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight + 1;
    window.scrollTo({top, behavior: "smooth"});
    history.replaceState(null, "", id);
  });
}
