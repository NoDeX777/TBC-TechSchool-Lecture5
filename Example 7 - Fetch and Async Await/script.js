const BASE = "https://jsonplaceholder.typicode.com";

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function setLoading(id, msg = "იტვირთება...") {
  document.getElementById(id).innerHTML = `
    <div class="flex items-center gap-3 text-slate-400">
      <div class="w-5 h-5 border-2 border-slate-600 border-t-indigo-400 rounded-full animate-spin flex-shrink-0"></div>
      ${msg}
    </div>`;
}

function setStep(id, state) {
  const el = document.getElementById(id);
  if (state === "active") {
    el.className = "text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-600";
  } else if (state === "done") {
    el.className = "text-xs px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700";
  } else {
    el.className = "text-xs px-3 py-1 rounded-full bg-slate-700 text-slate-400";
  }
}

// ===== DEMO 1 – ერთი პოსტი =====
async function fetchOnePost() {
  const btn  = document.getElementById("btn1");
  const out  = document.getElementById("out1");
  const sids = ["s1-1", "s1-2", "s1-3", "s1-4"];
  btn.disabled = true;
  sids.forEach(id => setStep(id, ""));
  setLoading("out1", "მოთხოვნა იგზავნება...");

  try {
    setStep("s1-1", "active");
    const response = await fetch(`${BASE}/posts/1`);
    setStep("s1-1", "done");

    setStep("s1-2", "active");
    await delay(300);
    setStep("s1-2", "done");

    setStep("s1-3", "active");
    const data = await response.json();
    setStep("s1-3", "done");

    setStep("s1-4", "active");
    await delay(200);
    out.innerHTML = `
      <div class="border border-indigo-800 bg-indigo-950 rounded-xl p-4">
        <p class="text-xs text-slate-500 mb-2">ID: ${data.id} · userId: ${data.userId}</p>
        <h4 class="text-indigo-300 font-semibold mb-2 capitalize">📌 ${data.title}</h4>
        <p class="text-slate-400 text-sm leading-relaxed">${data.body}</p>
      </div>`;
    setStep("s1-4", "done");
  } catch (err) {
    out.innerHTML = `<div class="bg-red-950 border border-red-700 rounded-xl p-4 text-red-300">❌ ${err.message}</div>`;
  }
  btn.disabled = false;
}

// ===== DEMO 2 – 5 პოსტი =====
async function fetchPosts() {
  const btn = document.getElementById("btn2");
  btn.disabled = true;
  setLoading("out2", "5 პოსტი იტვირთება...");

  try {
    const res   = await fetch(`${BASE}/posts?_limit=5`);
    const posts = await res.json();
    document.getElementById("out2").innerHTML =
      posts.map(post => `
        <div class="border border-slate-700 rounded-xl p-4 mb-3 last:mb-0">
          <p class="text-xs text-slate-500 mb-1">Post #${post.id}</p>
          <h4 class="text-indigo-300 font-semibold mb-2 capitalize">📌 ${post.title}</h4>
          <p class="text-slate-400 text-sm leading-relaxed">${post.body}</p>
        </div>`).join("");
  } catch (err) {
    document.getElementById("out2").innerHTML =
      `<div class="bg-red-950 border border-red-700 rounded-xl p-4 text-red-300">❌ ${err.message}</div>`;
  }
  btn.disabled = false;
}

// ===== DEMO 3 – try/catch =====
async function fetchWithError() {
  const out = document.getElementById("out3");
  setLoading("out3", "მოთხოვნა...");
  await delay(600);
  try {
    await fetch("https://invalid-url-that-does-not-exist.xyz/api");
  } catch (err) {
    out.innerHTML = `
      <div class="bg-red-950 border border-red-700 rounded-xl p-4 text-red-300">
        ❌ <strong>catch-ი დაჭერა!</strong><br>
        <span class="font-mono text-sm">${err.message}</span><br>
        <em class="text-xs text-red-400 mt-2 block">try/catch-ის გარეშე გვერდი "დაიშლებოდა"!</em>
      </div>`;
  }
}

async function fetchWithSuccess() {
  const out = document.getElementById("out3");
  setLoading("out3", "მომხმარებელი იტვირთება...");
  try {
    const res  = await fetch(`${BASE}/users/1`);
    const user = await res.json();
    out.innerHTML = `
      <div class="bg-emerald-950 border border-emerald-700 rounded-xl p-4 text-emerald-300">
        <h4 class="font-semibold mb-2">✅ მომხმარებელი მიღებულია!</h4>
        <p class="text-sm">👤 <strong>${user.name}</strong></p>
        <p class="text-sm">📧 ${user.email}</p>
        <p class="text-sm">🌐 ${user.website}</p>
        <p class="text-sm">🏙️ ${user.address.city}</p>
      </div>`;
  } catch (err) {
    out.innerHTML = `<div class="bg-red-950 border border-red-700 rounded-xl p-4 text-red-300">❌ ${err.message}</div>`;
  }
}

