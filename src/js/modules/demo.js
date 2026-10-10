// Демо: вопрос печатается, отправляется, потом ответ
const app = document.querySelector(".js--demo");

if (app) {
  const typed = app.querySelector(".js--demo-typed");
  const send = app.querySelector(".js--demo-send");
  const restart = app.querySelector(".js--demo-restart");
  const feed = app.querySelector(".nf__app--feed");
  const text = typed.dataset.text;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let timers = [];
  const wait = (ms) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)));
  const stop = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };

  const setState = (state) => {
    app.dataset.state = state;
  };

  let run = 0;
  const play = async () => {
    stop();
    const id = ++run;
    const alive = () => id === run;

    setState("empty");
    typed.textContent = "";
    feed.scrollTop = 0;

    if (reduced) {
      setState("answer");
      return;
    }

    await wait(900);
    if (!alive()) return;
    setState("typing");
    typed.classList.add("is-typing");

    // печатаем по паре символов, чтобы длинный вопрос не тянулся вечность
    for (let i = 0; i <= text.length; i += 2) {
      typed.textContent = text.slice(0, i);
      await wait(22);
      if (!alive()) return;
    }
    typed.textContent = text;
    typed.classList.remove("is-typing");

    await wait(500);
    if (!alive()) return;
    send.classList.add("is-pressed");
    await wait(180);
    send.classList.remove("is-pressed");
    if (!alive()) return;

    setState("loading");
    await wait(2600);
    if (!alive()) return;
    setState("answer");
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      play();
    },
    {threshold: 0.4}
  );
  observer.observe(app);

  restart.addEventListener("click", play);
}
