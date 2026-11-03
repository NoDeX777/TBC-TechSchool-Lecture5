const student = {
  name:     "ანა ბერიძე",
  age:      17,
  school:   "TBC Tech School",
  isActive: true
};

// 1 – შექმნა
document.getElementById("r1").textContent =
  `name: "${student.name}"\nage: ${student.age}\nschool: "${student.school}"\nisActive: ${student.isActive}`;

// 2 – წვდომა + შეცვლა
student.age  = 18;
student.city = "თბილისი";
document.getElementById("r2").textContent =
  `student.name      = "${student.name}"\nstudent["age"]    = ${student["age"]}\nstudent.city      = "${student.city}"`;

// 3 – მეთოდები
const calculator = {
  value: 0,
  add(n)      { this.value += n; return this; },
  subtract(n) { this.value -= n; return this; },
  result()    { return this.value; }
};
const calcResult = calculator.add(10).add(5).subtract(3).result();
document.getElementById("r3").textContent =
  `calculator.add(10).add(5).subtract(3).result() = ${calcResult}`;

// 4 – Destructuring
const { name, age, school } = student;
document.getElementById("r4").textContent =
  `name   = "${name}"\nage    = ${age}\nschool = "${school}"`;

// 5 – ობიექტების მასივი → cards
const team = [
  { name: "გიორგი", role: "Frontend", emoji: "💻" },
  { name: "ნინო",   role: "Backend",  emoji: "⚙️" },
  { name: "დავით",  role: "Design",   emoji: "🎨" }
];
const r5 = document.getElementById("r5");
team.forEach(member => {
  const card = document.createElement("div");
  card.className = "flex items-center gap-4 bg-slate-950 border border-slate-700 rounded-xl p-4";
  card.innerHTML = `
    <div class="w-14 h-14 rounded-full bg-sky-900 flex items-center justify-center text-3xl flex-shrink-0">
      ${member.emoji}
    </div>
    <div>
      <p class="font-semibold text-sky-300">${member.name}</p>
      <p class="text-slate-400 text-sm">${member.role}</p>
    </div>`;
  r5.appendChild(card);
});

