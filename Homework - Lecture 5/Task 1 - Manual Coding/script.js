/**
 * ========================================================
 * 🎓 TBC Tech School · Lecture 5 · დავალება 1 (ხელით დასაწერი)
 * თემა: ცვლადები, ფუნქციები, DOM მანიპულაცია და Event Listeners
 * ========================================================
 * 
 * 🎯 მიზანი:
 * დაწერე JavaScript ლოგიკა, რომელიც:
 * 1. წაიკითხავს ინფუთში ჩაწერილ ტექსტს
 * 2. შექმნის ახალ <li> ბარათს Tailwind-ის სტილებით
 * 3. დაამატებს სიაში (#skills-list)
 * 4. გაზრდის მთვლელს (#counter)
 * 5. წაშლის კონკრეტულ ელემენტს ნაგვის ურნაზე დაჭერისას
 * 6. გაასუფთავებს მთელ სიას "ყველას გასუფთავება" ღილაკზე
 */

// ---------------------------------------------------------
// ნაბიჯი 1: HTML ელემენტების წამოღება DOM-იდან
// გამოიყენე document.getElementById(...)
// ---------------------------------------------------------
const skillInput = document.getElementById("skill-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const skillsList = document.getElementById("skills-list");
const counterEl = document.getElementById("counter");
const statusMessage = document.getElementById("status-message");
const errorMessage = document.getElementById("error-message");

// ---------------------------------------------------------
// ნაბიჯი 2: ცვლადი მთვლელისთვის
// რატომ let და არა const? (რადგან მისი მნიშვნელობა იცვლება!)
// ---------------------------------------------------------
let totalSkills = 0;

// ---------------------------------------------------------
// ნაბიჯი 3: დამხმარე ფუნქცია სტატუსის და მთვლელის განახლებისთვის
// ---------------------------------------------------------
function updateUI() {
  // მთვლელის ტექსტის განახლება
  counterEl.textContent = totalSkills;

  // თუ რაოდენობა 0-ია, სტატუსი იყოს "სია ჯერ ცარიელია",
  // თუ მეტია — "თქვენ სწავლობთ X უნარს!"
  if (totalSkills === 0) {
    statusMessage.textContent = "სია ჯერ ცარიელია";
    statusMessage.className = "text-sm text-slate-400 font-medium";
  } else {
    statusMessage.textContent = `თქვენ სწავლობთ ${totalSkills} უნარს! 🚀`;
    statusMessage.className = "text-sm text-emerald-400 font-medium";
  }
}

// ---------------------------------------------------------
// ნაბიჯი 4: ახალი უნარის დამატების ფუნქცია
// ---------------------------------------------------------
function addSkill() {
  const text = skillInput.value.trim();

  // შემოწმება: თუ ველი ცარიელია, ვაჩვენებთ ერორს
  if (text === "") {
    errorMessage.classList.remove("hidden");
    return;
  }

  // თუ ტექსტი წერია, ერორს ვმალავთ
  errorMessage.classList.add("hidden");

  // TODO 1: შექმენი ახალი <li> ელემენტი document.createElement-ით
  const li = document.createElement("li");

  // Tailwind სტილები ლამაზი ბარათისთვის
  li.className = "flex items-center justify-between bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 hover:border-sky-500/50 transition-all duration-200";

  // TODO 2: ჩაწერე li-ის შიგთავსი innerHTML-ით (ტექსტი + წაშლის ღილაკი)
  li.innerHTML = `
    <span class="text-sm text-slate-200 font-medium flex items-center gap-2">
      <span class="text-sky-400">✨</span> ${text}
    </span>
    <button class="delete-btn text-slate-400 hover:text-rose-400 p-1 rounded-lg transition" title="წაშლა">
      🗑️
    </button>
  `;

  // TODO 3: იპოვე ახლად შექმნილ li-ში წაშლის ღილაკი და დაუმატე წაშლის ლოგიკა
  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    li.remove();          // ელემენტის წაშლა DOM-იდან
    totalSkills--;        // მთვლელის შემცირება
    updateUI();           // UI-ის განახლება
  });

  // TODO 4: დაამატე შექმნილი li სიაში (skillsList.appendChild)
  skillsList.appendChild(li);

  // TODO 5: გაზარდე totalSkills 1-ით და განაახლე UI
  totalSkills++;
  updateUI();

  // ინფუთის გასუფთავება და ფოკუსის დაბრუნება
  skillInput.value = "";
  skillInput.focus();
}

// ---------------------------------------------------------
// ნაბიჯი 5: მთელი სიის გასუფთავების ფუნქცია
// ---------------------------------------------------------
function clearAll() {
  skillsList.innerHTML = "";
  totalSkills = 0;
  updateUI();
  errorMessage.classList.add("hidden");
}

// ---------------------------------------------------------
// ნაბიჯი 6: Event Listeners (მოვლენების მოსმენა)
// ---------------------------------------------------------

// ღილაკზე "დამატება" დაწკაპუნებისას
addBtn.addEventListener("click", addSkill);

// ინფუთში "Enter" ღილაკზე დაჭერისას
skillInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addSkill();
  }
});

// ღილაკზე "ყველას გასუფთავება" დაწკაპუნებისას
clearBtn.addEventListener("click", clearAll);

// საწყისი UI-ს ინიციალიზაცია
updateUI();

