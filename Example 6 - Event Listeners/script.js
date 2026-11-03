// ===== DEMO 1 – click =====
const clickBtn = document.getElementById("click-btn");
const clickLog = document.getElementById("click-log");
let clickCount = 0;

clickBtn.addEventListener("click", function () {
  clickCount++;
  clickBtn.textContent = `🖱️ დამაჭირე! (${clickCount} ჯერ)`;
  clickLog.textContent = `✅ click event! სულ: ${clickCount} ჯერ`;
  if (clickCount >= 5) {
    clickLog.textContent += "\n🎉 ბრავო! 5-ჯერ დააჭირე!";
    clickBtn.classList.replace("bg-yellow-500", "bg-emerald-500");
    clickBtn.classList.replace("hover:bg-yellow-600", "hover:bg-emerald-600");
  }
});

// ===== DEMO 2 – keyboard =====
const keyInput = document.getElementById("key-input");
const keyLog   = document.getElementById("key-log");

keyInput.addEventListener("keydown", function (event) {
  keyLog.textContent =
    `⬇️ keydown: "${event.key}" (cod: ${event.code})\n` +
    `Shift: ${event.shiftKey} | Ctrl: ${event.ctrlKey} | Alt: ${event.altKey}\n` +
    `\nჩაწერილია: "${keyInput.value}"`;
});

keyInput.addEventListener("keyup", function (event) {
  keyLog.textContent += `\n⬆️ keyup: "${event.key}"`;
});

// ===== DEMO 3 – mouse =====
const hoverBox = document.getElementById("hover-box");
const mouseLog = document.getElementById("mouse-log");

function addMouseLog(msg) {
  const lines = mouseLog.textContent.split("\n");
  if (lines.length > 8) lines.pop();
  mouseLog.textContent = msg + "\n" + lines.join("\n");
}

hoverBox.addEventListener("mouseover",  () => { hoverBox.style.transform = "scale(1.06)"; addMouseLog("🟡 mouseover — მაუსი შემოვიდა"); });
hoverBox.addEventListener("mouseout",   () => { hoverBox.style.transform = "scale(1)";    addMouseLog("⚪ mouseout — მაუსი გავიდა"); });
hoverBox.addEventListener("mousedown",  () => { hoverBox.style.background = "#7f1d1d";    hoverBox.textContent = "👊"; addMouseLog("🔴 mousedown — დაიჭირეს"); });
hoverBox.addEventListener("mouseup",    () => { hoverBox.style.background = "#14532d";    hoverBox.textContent = "✅"; addMouseLog("🟢 mouseup — გაუშვეს"); });
hoverBox.addEventListener("dblclick",   () => { hoverBox.textContent = "🎉";               addMouseLog("⭐ dblclick — ორჯერ!"); });

// ===== DEMO 4 – form submit =====
const form    = document.getElementById("reg-form");
const formOut = document.getElementById("form-output");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // გვერდი არ გადაიტვირთება!

  const name  = document.getElementById("f-name").value;
  const email = document.getElementById("f-email").value;

  formOut.classList.remove("hidden");
  formOut.innerHTML =
    `🎉 <strong>რეგისტრაცია წარმატებულია!</strong><br>
     სახელი: ${name}<br>
     ელ-ფოსტა: ${email}<br>
     <em class="text-slate-500 text-xs">* გვერდი არ გადაიტვირთა — event.preventDefault()!</em>`;
  form.reset();
});

