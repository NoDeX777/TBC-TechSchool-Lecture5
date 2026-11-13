/**
 * ========================================================
 * 🤖 AI-Generated Project Example: Daily Inspiration Hunter
 * ========================================================
 * ეს ფაილი წარმოადგენს მაგალითს, თუ რა ტიპის პროექტის
 * დაგენერირება შეგიძლიათ AI-ს დახმარებით.
 */

// DOM ელემენტების წამოღება
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteCategory = document.getElementById("quote-category");
const newQuoteBtn = document.getElementById("new-quote-btn");
const saveQuoteBtn = document.getElementById("save-quote-btn");
const favoritesList = document.getElementById("favorites-list");
const favoritesCount = document.getElementById("favorites-count");
const emptyState = document.getElementById("empty-state");

// ლოკალური მდგომარეობა (State)
let currentQuote = {
  text: "კოდის წერა არის მაგია — შენ ქმნი რაღაცას არაფრისგან!",
  author: "TBC Tech School",
  category: "Coding"
};

let savedQuotes = [];

// სათადარიგო ციტატები იმ შემთხვევისთვის, თუ ინტერნეტი გაითიშება (Fallback Data)
const fallbackQuotes = [
  { text: "პროგრამირება არ არის მხოლოდ კომპიუტერისთვის ბრძანებების მიცემა, ეს არის პრობლემების შემოქმედებითი გადაჭრა.", author: "Steve Jobs", category: "Tech" },
  { text: "ერთადერთი გზა დიდი საქმის საკეთებლად არის ის, რომ გიყვარდეს ის, რასაც აკეთებ.", author: "Steve Jobs", category: "Inspiration" },
  { text: "მარტივი კოდი ყველაზე ჭკვიანური კოდია.", author: "Martin Fowler", category: "Coding" },
  { text: "ნუ შეგეშინდება შეცდომების (Bugs) — ყოველი შეცდომა ახალი ცოდნის დასაწყისია!", author: "Grace Hopper", category: "Learning" }
];

/**
 * 📡 ფუნქცია 1: ახალი ციტატის წამოღება საჯარო API-დან
 */
async function fetchQuote() {
  newQuoteBtn.disabled = true;
  quoteText.textContent = "იტვირთება ახალი ციტატა...";
  quoteAuthor.textContent = "⏳ გთხოვთ დაიცადოთ...";

  try {
    // ვიყენებთ DummyJSON API-ს შემთხვევითი ციტატისთვის
    const response = await fetch("https://dummyjson.com/quotes/random");
    
    if (!response.ok) {
      throw new Error("სერვერმა დააბრუნა სტატუსი: " + response.status);
    }

    const data = await response.json();

    currentQuote = {
      text: data.quote,
      author: data.author,
      category: "Inspiration"
    };

    renderCurrentQuote();
  } catch (error) {
    console.warn("API მიუწვდომელია, ვიყენებთ ლოკალურ ციტატას:", error.message);
    // თუ API-მ დააერორა, ვიღებთ ლოკალურ სიიდან შემთხვევითს
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    currentQuote = fallbackQuotes[randomIndex];
    renderCurrentQuote();
  } finally {
    newQuoteBtn.disabled = false;
  }
}

/**
 * 🎨 ფუნქცია 2: მიმდინარე ციტატის გამოსახვა DOM-ში
 */
function renderCurrentQuote() {
  quoteText.textContent = `"${currentQuote.text}"`;
  quoteAuthor.textContent = `— ${currentQuote.author}`;
  quoteCategory.textContent = currentQuote.category;

  // მცირე ანიმაციის ეფექტი
  quoteText.classList.remove("opacity-0");
  quoteText.classList.add("transition-opacity", "duration-300");
}

/**
 * ⭐ ფუნქცია 3: ციტატის შენახვა ფავორიტებში
 */
function saveToFavorites() {
  // შემოწმება: უკვე ხომ არ გვაქვს ეს ციტატა შენახული?
  const alreadySaved = savedQuotes.some(q => q.text === currentQuote.text);
  if (alreadySaved) {
    alert("⚠️ ეს ციტატა უკვე შენახულია თქვენს ფავორიტებში!");
    return;
  }

  // მასივში დამატება
  savedQuotes.push({ ...currentQuote, id: Date.now() });

  // UI-ს განახლება
  renderFavorites();
}

/**
 * 📋 ფუნქცია 4: ფავორიტების სიის გადახატვა
 */
function renderFavorites() {
  // მთვლელის განახლება
  favoritesCount.textContent = `${savedQuotes.length} ციტატა`;

  // თუ სია ცარიელია
  if (savedQuotes.length === 0) {
    emptyState.classList.remove("hidden");
    favoritesList.innerHTML = "";
    favoritesList.appendChild(emptyState);
    return;
  }

  emptyState.classList.add("hidden");
  favoritesList.innerHTML = "";

  // ყოველი ციტატისთვის ახალი <li>-ის აგება
  savedQuotes.forEach((quote) => {
    const li = document.createElement("li");
    li.className = "flex items-start justify-between gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5 hover:border-amber-500/40 transition";

    li.innerHTML = `
      <div class="flex-1">
        <p class="text-xs text-slate-200 italic mb-1">"${quote.text}"</p>
        <p class="text-[10px] text-amber-400 font-medium">— ${quote.author}</p>
      </div>
      <button class="delete-fav text-slate-500 hover:text-rose-400 p-1 rounded transition text-xs" title="წაშლა">
        ✕
      </button>
    `;

    // წაშლის ღილაკი
    li.querySelector(".delete-fav").addEventListener("click", () => {
      savedQuotes = savedQuotes.filter(q => q.id !== quote.id);
      renderFavorites();
    });

    favoritesList.appendChild(li);
  });
}

// ---------------------------------------------------------
// Event Listeners
// ---------------------------------------------------------
newQuoteBtn.addEventListener("click", fetchQuote);
saveQuoteBtn.addEventListener("click", saveToFavorites);

// პირველადი ინიციალიზაცია
renderCurrentQuote();

