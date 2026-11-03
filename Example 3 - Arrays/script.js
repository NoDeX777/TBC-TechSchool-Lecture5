const fruits = ["ვაშლი", "ბანანი", "მანდარინი", "ყურძენი"];

// 1 – BASICS
document.getElementById("r1").textContent =
  `fruits[0] = "${fruits[0]}"\nfruits[2] = "${fruits[2]}"\nfruits.length = ${fruits.length}`;

// 2 – METHODS
fruits.push("ნარინჯი");
const removed = fruits.pop();
document.getElementById("r2").textContent =
  `push("ნარინჯი") → [${fruits.concat("ნარინჯი")}]\npop() → removed: "${removed}" → [${fruits}]`;

// 3 – forEach
const numbers = [1, 2, 3, 4, 5];
let forEachOutput = "";
numbers.forEach(num => {
  forEachOutput += `რიცხვი: ${num}\n`;
});
document.getElementById("r3").textContent = forEachOutput.trim();

// 4 – map
const doubled = numbers.map(n => n * 2);
document.getElementById("r4").textContent =
  `[${numbers}].map(n => n*2)\n→ [${doubled}]`;

// 5 – filter
const scores = [45, 82, 60, 91, 38, 75];
const passed = scores.filter(s => s >= 60);
document.getElementById("r5").textContent =
  `ქულები:       [${scores}]\nჩაბარებული (≥60): [${passed}]`;

// 6 – find / includes / indexOf
const students = ["ანა", "გიორგი", "ნინო", "დავით"];
document.getElementById("r6").textContent =
  `includes("ნინო")              = ${students.includes("ნინო")}\n` +
  `indexOf("გიორგი")            = ${students.indexOf("გიორგი")}\n` +
  `find(s => s.startsWith("დ")) = "${students.find(s => s.startsWith("დ"))}"`;

