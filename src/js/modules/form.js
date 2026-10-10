const form = document.querySelector(".js--form");

if (form) {
  const phone = form.querySelector(".js--phone");

  // маска +7 (___) ___-__-__
  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("8") || digits.startsWith("7")) digits = digits.slice(1);
    digits = digits.slice(0, 10);
    if (!digits) return "";
    let out = "+7 (" + digits.slice(0, 3);
    if (digits.length >= 3) out += ") " + digits.slice(3, 6);
    if (digits.length >= 6) out += "-" + digits.slice(6, 8);
    if (digits.length >= 8) out += "-" + digits.slice(8, 10);
    return out;
  };

  phone.addEventListener("input", () => {
    phone.value = formatPhone(phone.value);
  });
  phone.addEventListener("focus", () => {
    if (!phone.value) phone.value = "+7 (";
  });
  phone.addEventListener("blur", () => {
    if (phone.value === "+7 (") phone.value = "";
  });

  const checks = {
    name: (input) => input.value.trim().length > 1,
    phone: (input) => input.value.replace(/\D/g, "").length === 11,
    email: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()),
    agree: (input) => input.checked,
  };

  const validate = (input) => {
    const check = checks[input.name];
    if (!check) return true;
    const ok = check(input);
    input.closest(".nf__field, .nf__check").classList.toggle("is-invalid", !ok);
    return ok;
  };

  form.addEventListener("input", (e) => {
    const box = e.target.closest(".is-invalid");
    if (box) validate(e.target);
  });
  form.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") validate(e.target);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll("input[name]")];
    const valid = inputs.map(validate).every(Boolean);
    if (!valid) {
      const first = form.querySelector(".is-invalid input");
      if (first) first.focus();
      return;
    }
    // отправку на бэкенд подключить здесь (fetch на нужный адрес)
    form.querySelector(".nf__form--body").hidden = true;
    form.querySelector(".nf__form--done").hidden = false;
  });
}
