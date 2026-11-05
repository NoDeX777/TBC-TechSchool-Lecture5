// 1. Function Declaration
function greet(name) {
  return "გამარჯობა, " + name + "!";
}
document.getElementById("r1").textContent = greet("გიორგი");

// 2. Function Expression
const add = function (a, b) {
  return a + b;
};
document.getElementById("r2").textContent = "5 + 7 = " + add(5, 7);

// 3. Arrow Functions
const multiply = (a, b) => a * b;
const square = n => n * n;
document.getElementById("r3").textContent =
  `4 × 6 = ${multiply(4, 6)}  |  5² = ${square(5)}`;

// 4. Default Parameters
function welcome(name = "სტუმარი") {
  return "მოგესალმებით, " + name + "!";
}
document.getElementById("r4").textContent =
  welcome() + "\n" + welcome("ანა");

// 5. Callback
function doMath(a, b, operation) {
  return operation(a, b);
}
document.getElementById("r5").textContent =
  "doMath(10, 5, add) = " + doMath(10, 5, add);

// 6. Template Literals
const personName = "ნინო";
const personAge = 17;
document.getElementById("r6").textContent =
  `სახელი: ${personName}, ასაკი: ${personAge}`;
function nameAndAge(name, age) {
  document.getElementById("r6").textContent =
    `სახელი: ${name}, ასაკი: ${age}`;
}
nameAndAge(document.getElementById("name_input").value, 20);
