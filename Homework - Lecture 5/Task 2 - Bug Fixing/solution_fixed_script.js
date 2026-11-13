/**
 * ========================================================
 * ✅ დავალება 2 – სრული გასწორებული ვერსია (Solution Reference)
 * ========================================================
 * 
 * აქ მოცემულია ყველა 6 შეცდომის სწორი ვარიანტი და განმარტება:
 */

// ✅ FIX 1: document.getElementById (პატარა d ბოლოში)
const fetchBtn = document.getElementById("fetch-btn");

const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const postId = document.getElementById("post-id");
const tagsContainer = document.getElementById("tags-container");
const likeBtn = document.getElementById("like-btn");
const likesCountEl = document.getElementById("likes-count");
const statusText = document.getElementById("status-text");

// ✅ FIX 2: let ნაცვლად const-ისა, რადგან likesCount-ის მნიშვნელობა იცვლება
let likesCount = 0;

let currentPostId = 1;

// ✅ FIX 3: დაემატა async და await fetch / json გამოძახებებზე
async function getPostFromAPI() {
  statusText.textContent = "იტვირთება...";

  try {
    const url = "https://jsonplaceholder.typicode.com/posts/" + currentPostId;

    const response = await fetch(url);
    const data = await response.json();

    // ✅ FIX 4: data.title ნაცვლად data.name-ისა
    postTitle.textContent = data.title;
    postBody.textContent = data.body;
    postId.textContent = "Post #" + data.id;

    renderTags(["javascript", "web", "api"]);

    statusText.textContent = "ჩაიტვირთა წარმატებით!";
    currentPostId++;
    if (currentPostId > 100) currentPostId = 1; // ციკლი
  } catch (error) {
    statusText.textContent = "შეცდომა ჩატვირთვისას!";
    console.error("Fetch Error:", error);
  }
}

// ტეგების გამოსახვის ფუნქცია
function renderTags(tags) {
  tagsContainer.innerHTML = "";

  tags.forEach(function (tag) {
    const span = document.createElement("span");
    span.className = "bg-slate-700 text-sky-300 text-xs px-2.5 py-1 rounded-md font-mono";

    // ✅ FIX 5: tag.toUpperCase() (დიდი C)
    span.textContent = "#" + tag.toUpperCase();

    tagsContainer.appendChild(span);
  });
}

// ✅ FIX 6: "click" ნაცვლად "onclick"-ისა addEventListener-ში
likeBtn.addEventListener("click", function () {
  likesCount = likesCount + 1;
  likesCountEl.textContent = likesCount;
});

fetchBtn.addEventListener("click", getPostFromAPI);

