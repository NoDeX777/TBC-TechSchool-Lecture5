/**
 * ========================================================
 * 🐛 TBC Tech School · Lecture 5 · დავალება 2 (შეცდომების გასწორება)
 * ========================================================
 * 
 * ⚠️ ყურადღება! ამ ფაილში დაშვებულია 6 შეცდომა (Bugs).
 * შენი მიზანია:
 * 1. გახსნა ბრაუზერში index.html
 * 2. დააჭირო F12 -> Console და წაიკითხო შეცდომები
 * 3. იპოვო და გაასწორო ყველა შეცდომა ამ script.js ფაილში!
 */

// ❌ BUG 1: DOM ელემენტის არასწორი მეთოდით წამოღება (ყურადღება მიაქციე დიდი/პატარა ასოებს!)
const fetchBtn = document.getElementByID("fetch-btn");

const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const postId = document.getElementById("post-id");
const tagsContainer = document.getElementById("tags-container");
const likeBtn = document.getElementById("like-btn");
const likesCountEl = document.getElementById("likes-count");
const statusText = document.getElementById("status-text");

// ❌ BUG 2: ცვლადი გამოცხადებულია ისე, რომ მისი მნიშვნელობის შეცვლა შეუძლებელია!
// (რომელი ქივორდი უნდა გამოვიყენოთ, როცა მნიშვნელობა უნდა შეიცვალოს?)
const likesCount = 0;

// პოსტის ID მთვლელი
let currentPostId = 1;

// ❌ BUG 3: ფუნქცია არის ასინქრონული, მაგრამ აკლია საჭირო ქივორდები (async / await)!
function getPostFromAPI() {
  statusText.textContent = "იტვირთება...";

  // API-ს მისამართი
  const url = "https://jsonplaceholder.typicode.com/posts/" + currentPostId;

  // მოთხოვნის გაგზავნა
  const response = fetch(url);
  const data = response.json();

  // ❌ BUG 4: JSONPlaceholder-ის პოსტს ჰქვია "title" თუ "name"?
  // (შეამოწმე ობიექტის თვისების სახელი!)
  postTitle.textContent = data.name;
  postBody.textContent = data.body;
  postId.textContent = "Post #" + data.id;

  // ტეგების დამატება
  renderTags(["javascript", "web", "api"]);

  statusText.textContent = "ჩაიტვირთა წარმატებით!";
  currentPostId++;
}

// ტეგების გამოსახვის ფუნქცია
function renderTags(tags) {
  tagsContainer.innerHTML = "";

  tags.forEach(function (tag) {
    const span = document.createElement("span");
    span.className = "bg-slate-700 text-sky-300 text-xs px-2.5 py-1 rounded-md font-mono";

    // ❌ BUG 5: მეთოდის სახელში ასოს რეგისტრი (case sensitivity) არასწორია!
    // როგორ იწერება JavaScript-ში დიდი ასოებით გარდაქმნა?
    span.textContent = "#" + tag.toUppercase();

    tagsContainer.appendChild(span);
  });
}

// ❌ BUG 6: Event Listener-ის მოვლენის სახელი არასწორია!
// addEventListener-ში იწერება "click" თუ "onclick"?
likeBtn.addEventListener("onclick", function () {
  likesCount = likesCount + 1;
  likesCountEl.textContent = likesCount;
});

// ღილაკზე დაჭერისას პოსტის წამოღება
fetchBtn.addEventListener("click", getPostFromAPI);

