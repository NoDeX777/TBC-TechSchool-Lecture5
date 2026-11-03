// ===== DEMO 1 – textContent / innerHTML =====
const textEl   = document.getElementById("demo1-text");
const original = textEl.textContent;

function changeText() {
  textEl.textContent = "✅ ტექსტი შეიცვალა JS-ით!";
}
function changeHTML() {
  textEl.innerHTML = "🔥 <strong>HTML</strong> ჩასვით <em>innerHTML</em>-ით!";
}
function resetText() {
  textEl.textContent = original;
}

// ===== DEMO 2 – style =====
const box = document.getElementById("demo2-box");

function makeRed()   { box.style.background = "#dc2626"; }
function makeRound() { box.style.borderRadius = "50%"; }
function makeBig()   {
  box.style.width    = "180px";
  box.style.height   = "180px";
  box.style.fontSize = "3.5rem";
}
function resetBox() {
  box.style.cssText = "";
  // restore Tailwind classes after style reset
  box.className = "w-28 h-28 bg-indigo-500 rounded-xl flex items-center justify-center text-4xl mb-4 transition-all duration-300";
  box.textContent = "🎨";
}

// ===== DEMO 3 – createElement / remove =====
const list  = document.getElementById("demo3-list");
const items = ["JavaScript", "HTML", "CSS", "React", "Node.js"];
let itemIndex = 0;

function addItem() {
  if (itemIndex >= items.length) {
    itemIndex = 0;
    list.innerHTML = "";
  }
  const li = document.createElement("li");
  li.className = "flex items-center justify-between bg-slate-800 border border-slate-600 rounded-lg px-4 py-2";
  li.innerHTML = `
    <span class="text-sky-300">⚡ ${items[itemIndex]}</span>
    <button onclick="this.parentElement.remove()"
      class="bg-red-900 hover:bg-red-800 text-red-300 text-xs px-2 py-1 rounded transition">🗑️ წაშლა</button>`;
  list.appendChild(li);
  itemIndex++;
}

// ===== DEMO 4 – classList.toggle =====
const card4 = document.getElementById("demo4-card");

function toggleHighlight() {
  const isOn = card4.classList.toggle("bg-yellow-900");
  card4.classList.toggle("border-yellow-500", isOn);
  card4.classList.toggle("text-yellow-100",   isOn);
  card4.classList.toggle("border-slate-600",  !isOn);
  card4.classList.toggle("bg-slate-800",      !isOn);
  card4.textContent = isOn
    ? "🌟 Highlighted! classList-ში დაემატა 'highlight'"
    : "👀 დააჭირე ღილაკს ჩემი სტილის შესაცვლელად!";
}

