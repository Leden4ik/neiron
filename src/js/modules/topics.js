const root = document.querySelector(".js--topics");

if (root) {
  const tags = root.querySelectorAll("[data-topic]");
  const label = root.querySelector(".js--topic-label");
  const panels = root.querySelectorAll(".nf__topics--panel");

  const show = (id) => {
    panels.forEach((panel) => {
      panel.hidden = panel.id !== id;
      if (!panel.hidden) label.textContent = panel.dataset.label;
    });
  };

  root.addEventListener("click", (e) => {
    const tag = e.target.closest("[data-topic]");
    if (!tag) return;
    const wasActive = tag.classList.contains("is-active");

    tags.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });

    // повторный клик по активной теме возвращает пример по умолчанию
    if (wasActive) {
      show("topic-0");
      return;
    }
    tag.classList.add("is-active");
    tag.setAttribute("aria-pressed", "true");
    show(tag.dataset.topic);
  });
}
