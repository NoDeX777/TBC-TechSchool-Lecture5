const API = "https://jsonplaceholder.typicode.com";
let allPosts = [];
let allTodos = [];

// ============================================================
// TAB SYSTEM
// ============================================================
function showTab(name) {
  // panels
  document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
  document.getElementById("panel-" + name).classList.remove("hidden");

  // buttons
  document.querySelectorAll(".tab-btn").forEach(btn => {
    const isActive = btn.dataset.tab === name;
    btn.className = isActive
      ? "tab-btn px-5 py-2 rounded-t-xl font-semibold text-sm transition border border-b-0 border-slate-700 bg-slate-900 text-white"
      : "tab-btn px-5 py-2 rounded-t-xl font-semibold text-sm transition border border-b-0 border-slate-700 bg-slate-800 text-slate-400";
  });
}

// ============================================================
// HELPERS
// ============================================================
function spinner(msg = "იტვირთება...") {
  return `<div class="flex items-center gap-3 text-slate-400 p-4">
    <div class="w-5 h-5 border-2 border-slate-600 border-t-sky-400 rounded-full animate-spin flex-shrink-0"></div>
    ${msg}
  </div>`;
}

function errorBox(msg) {
  return `<div class="bg-red-950 border border-red-700 rounded-xl p-4 text-red-300">❌ ${msg}</div>`;
}

function statBox(num, label, color = "text-sky-400") {
  return `<div class="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-center">
    <div class="text-2xl font-bold ${color}">${num}</div>
    <div class="text-xs text-slate-500">${label}</div>
  </div>`;
}

// ============================================================
// POSTS
// ============================================================
async function loadPosts() {
  document.getElementById("posts-container").innerHTML = spinner("100 პოსტი იტვირთება...");
  document.getElementById("posts-stats").classList.add("hidden");
  try {
    const res = await fetch(`${API}/posts`);
    allPosts  = await res.json();
    renderPosts(allPosts);
    renderPostStats(allPosts);
    buildUserFilter(allPosts);
  } catch (e) {
    document.getElementById("posts-container").innerHTML = errorBox(e.message);
  }
}

function renderPosts(posts) {
  const el = document.getElementById("posts-container");
  if (!posts.length) {
    el.innerHTML = `<p class="text-slate-500">🔍 შედეგი ვერ მოიძებნა</p>`;
    return;
  }
  el.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">` +
    posts.map(post => `
      <div onclick="openPostModal(${post.id})"
        class="bg-slate-800 border border-slate-700 hover:border-sky-500 rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-0.5">
        <p class="text-xs text-slate-500 mb-2">Post #${post.id} · User #${post.userId}</p>
        <h4 class="text-sky-300 font-semibold mb-2 capitalize text-sm leading-snug">${post.title}</h4>
        <p class="text-slate-400 text-xs leading-relaxed">${post.body.substring(0, 80)}...</p>
        <div class="flex gap-2 mt-3">
          <span class="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">👤 User ${post.userId}</span>
        </div>
      </div>`).join("") + `</div>`;
}

function renderPostStats(posts) {
  const bar   = document.getElementById("posts-stats");
  const users = new Set(posts.map(p => p.userId)).size;
  const avg   = Math.round(posts.reduce((a, p) => a + p.body.length, 0) / posts.length);
  bar.classList.remove("hidden");
  bar.innerHTML =
    statBox(posts.length, "სულ პოსტი") +
    statBox(users, "მომხმარებელი") +
    statBox(avg, "საშ. სიმბოლო");
}

function buildUserFilter(posts) {
  const sel = document.getElementById("user-filter");
  const ids = [...new Set(posts.map(p => p.userId))].sort((a, b) => a - b);
  sel.innerHTML = `<option value="0">ყველა მომხმარებელი</option>` +
    ids.map(id => `<option value="${id}">User #${id}</option>`).join("");
}

function filterPosts() {
  const q = document.getElementById("post-search").value.toLowerCase();
  const u = parseInt(document.getElementById("user-filter").value);
  let filtered = allPosts.filter(p =>
    p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q));
  if (u) filtered = filtered.filter(p => p.userId === u);
  renderPosts(filtered);
}

function filterPostsByUser(uid) {
  const q = document.getElementById("post-search").value.toLowerCase();
  let filtered = allPosts.filter(p =>
    p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q));
  if (parseInt(uid)) filtered = filtered.filter(p => p.userId === parseInt(uid));
  renderPosts(filtered);
}

async function openPostModal(postId) {
  document.getElementById("modal-content").innerHTML = spinner();
  document.getElementById("modal").classList.remove("hidden");
  try {
    const [post, comments] = await Promise.all([
      fetch(`${API}/posts/${postId}`).then(r => r.json()),
      fetch(`${API}/posts/${postId}/comments`).then(r => r.json())
    ]);
    document.getElementById("modal-content").innerHTML = `
      <h3 class="text-sky-300 font-bold text-lg mb-3 capitalize">${post.title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed mb-4">${post.body}</p>
      <div class="flex gap-2 mb-5">
        <span class="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full">👤 User #${post.userId}</span>
        <span class="bg-indigo-900 text-indigo-300 text-xs px-3 py-1 rounded-full">💬 ${comments.length} კომენტარი</span>
      </div>
      <hr class="border-slate-700 mb-5" />
      <h4 class="text-indigo-300 font-semibold mb-4">💬 კომენტარები</h4>` +
      comments.map(c => `
        <div class="border-l-4 border-indigo-700 bg-slate-900 rounded-r-xl p-4 mb-3">
          <p class="text-indigo-300 font-semibold text-sm">${c.name}</p>
          <p class="text-slate-500 text-xs mb-2">📧 ${c.email}</p>
          <p class="text-slate-400 text-sm leading-relaxed">${c.body}</p>
        </div>`).join("");
  } catch (e) {
    document.getElementById("modal-content").innerHTML = errorBox(e.message);
  }
}

// ============================================================
// USERS
// ============================================================
async function loadUsers() {
  document.getElementById("users-container").innerHTML = spinner("მომხმარებლები იტვირთება...");
  try {
    const res   = await fetch(`${API}/users`);
    const users = await res.json();
    document.getElementById("users-container").innerHTML =
      `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">` +
      users.map(u => `
        <div onclick="openUserModal(${u.id})"
          class="bg-slate-800 border border-slate-700 hover:border-violet-500 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-0.5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-full bg-violet-900 flex items-center justify-center text-2xl flex-shrink-0">👤</div>
            <div>
              <h4 class="text-violet-300 font-semibold">${u.name}</h4>
              <p class="text-slate-500 text-xs">@${u.username}</p>
            </div>
          </div>
          <p class="text-slate-400 text-sm">📧 ${u.email}</p>
          <p class="text-slate-400 text-sm">🌐 ${u.website}</p>
          <p class="text-slate-400 text-sm">🏢 ${u.company.name}</p>
          <span class="inline-block mt-3 bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">🏙️ ${u.address.city}</span>
        </div>`).join("") + `</div>`;
  } catch (e) {
    document.getElementById("users-container").innerHTML = errorBox(e.message);
  }
}

async function openUserModal(userId) {
  document.getElementById("modal-content").innerHTML = spinner();
  document.getElementById("modal").classList.remove("hidden");
  try {
    const [user, posts, todos] = await Promise.all([
      fetch(`${API}/users/${userId}`).then(r => r.json()),
      fetch(`${API}/users/${userId}/posts`).then(r => r.json()),
      fetch(`${API}/users/${userId}/todos`).then(r => r.json())
    ]);
    const done = todos.filter(t => t.completed).length;
    document.getElementById("modal-content").innerHTML = `
      <h3 class="text-violet-300 font-bold text-xl mb-4">👤 ${user.name}</h3>
      <div class="space-y-2 text-sm mb-5">
        <p><span class="text-slate-500">Username:</span> <span class="text-white">@${user.username}</span></p>
        <p><span class="text-slate-500">Email:</span> ${user.email}</p>
        <p><span class="text-slate-500">Phone:</span> ${user.phone}</p>
        <p><span class="text-slate-500">Website:</span> ${user.website}</p>
        <p><span class="text-slate-500">Company:</span> ${user.company.name}</p>
        <p><span class="text-slate-500">Address:</span> ${user.address.street}, ${user.address.city}</p>
      </div>
      <hr class="border-slate-700 mb-5" />
      <div class="flex gap-3">
        ${statBox(posts.length, "პოსტი")}
        ${statBox(`${done}/${todos.length}`, "Todos", "text-emerald-400")}
      </div>`;
  } catch (e) {
    document.getElementById("modal-content").innerHTML = errorBox(e.message);
  }
}

// ============================================================
// TODOS
// ============================================================
async function loadTodos(filter) {
  document.getElementById("todos-container").innerHTML = spinner("200 დავალება იტვირთება...");
  document.getElementById("todos-stats").classList.add("hidden");
  try {
    const res = await fetch(`${API}/todos`);
    allTodos  = await res.json();

    let filtered = allTodos;
    if (filter === "done")    filtered = allTodos.filter(t => t.completed);
    if (filter === "pending") filtered = allTodos.filter(t => !t.completed);

    const done    = allTodos.filter(t => t.completed).length;
    const pending = allTodos.length - done;
    const bar     = document.getElementById("todos-stats");
    bar.classList.remove("hidden");
    bar.innerHTML =
      statBox(allTodos.length, "სულ") +
      statBox(done, "შესრულებული", "text-emerald-400") +
      statBox(pending, "მიმდინარე", "text-rose-400");

    const shown = filtered.slice(0, 30);
    document.getElementById("todos-container").innerHTML =
      `<div class="space-y-2">` +
      shown.map(t => `
        <div class="flex items-center gap-3 ${t.completed ? "bg-emerald-950 border-emerald-800" : "bg-slate-800 border-slate-700"} border rounded-xl px-4 py-3">
          <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${t.completed ? "bg-emerald-600 border-emerald-600 text-white text-xs" : "border-slate-500"}">
            ${t.completed ? "✓" : ""}
          </div>
          <span class="flex-1 text-sm ${t.completed ? "line-through text-slate-500" : "text-slate-200"}">${t.title}</span>
          <span class="text-xs ${t.completed ? "bg-emerald-800 text-emerald-300" : "bg-rose-900 text-rose-300"} px-2 py-0.5 rounded-full flex-shrink-0">
            ${t.completed ? "✅" : "⏳"}
          </span>
        </div>`).join("") +
      (filtered.length > 30 ? `<p class="text-slate-500 text-center text-sm mt-2">... და კიდევ ${filtered.length - 30} დავალება</p>` : "") +
      `</div>`;
  } catch (e) {
    document.getElementById("todos-container").innerHTML = errorBox(e.message);
  }
}

// ============================================================
// COMMENTS
// ============================================================
async function loadComments() {
  const id = document.getElementById("post-id-input").value || 1;
  document.getElementById("comments-container").innerHTML = spinner(`Post #${id}-ის კომენტარები...`);
  try {
    const res      = await fetch(`${API}/posts/${id}/comments`);
    const comments = await res.json();
    document.getElementById("comments-container").innerHTML =
      `<p class="text-slate-500 text-sm mb-4">📮 Post #${id} — ${comments.length} კომენტარი:</p>` +
      comments.map(c => `
        <div class="border-l-4 border-yellow-700 bg-slate-800 rounded-r-xl p-4 mb-3">
          <p class="text-yellow-300 font-semibold text-sm">💬 ${c.name}</p>
          <p class="text-slate-500 text-xs mb-2">📧 ${c.email}</p>
          <p class="text-slate-400 text-sm leading-relaxed">${c.body}</p>
        </div>`).join("");
  } catch (e) {
    document.getElementById("comments-container").innerHTML = errorBox(e.message);
  }
}

// ============================================================
// PHOTOS
// ============================================================
async function loadPhotos() {
  const id = document.getElementById("album-id-input").value || 1;
  document.getElementById("photos-container").innerHTML = spinner(`Album #${id}-ის ფოტოები...`);
  try {
    const res    = await fetch(`${API}/albums/${id}/photos`);
    const photos = await res.json();
    document.getElementById("photos-container").innerHTML =
      `<p class="text-slate-500 text-sm mb-4">🖼️ Album #${id} — ${photos.length} ფოტო (ნაჩვენებია 24):</p>
       <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">` +
      photos.slice(0, 24).map(photo => `
        <div class="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-pink-500 transition group">
          <img src="${photo.thumbnailUrl}" alt="${photo.title}" loading="lazy"
            class="w-full h-32 object-cover block group-hover:scale-105 transition-transform duration-200"
            onerror="this.src='https://placehold.co/150x150/1e293b/6366f1?text=📷'" />
          <p class="text-slate-500 text-xs p-2 truncate">${photo.title}</p>
        </div>`).join("") + `</div>`;
  } catch (e) {
    document.getElementById("photos-container").innerHTML = errorBox(e.message);
  }
}

// ============================================================
// MODAL
// ============================================================
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function handleModalClick(event) {
  if (event.target === document.getElementById("modal")) closeModal();
}

