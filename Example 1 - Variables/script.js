// ✅ var – function-scoped, ძველი სტილი
var cityName = "თბილისი";

// ✅ let – block-scoped, მნიშვნელობა იცვლება
let playerScore = 0;
playerScore = 100;

// ✅ const – block-scoped, არ იცვლება
const appName = "TBC Tech School";

// ❌ ეს გამოიწვევს შეცდომას:
// appName = "სხვა"; // TypeError!

// 📌 მონაცემთა ტიპები
const myString  = "გამარჯობა, სამყარო!"; // String
const myNumber  = 42;                      // Number
const myBoolean = true;                    // Boolean
const nothing   = null;                    // Null
let   notDefined;                          // Undefined

// გამოვიტანოთ ეკრანზე
const output = document.getElementById("output");

function log(label, value) {
  const div = document.createElement("div");
  div.innerHTML =
    `<span class="text-sky-400">${label}:</span> ` +
    `<span class="text-emerald-400">${value}</span> ` +
    `<em class="text-slate-500">(${typeof value})</em>`;
  output.appendChild(div);
}

log("cityName",    cityName);
log("playerScore", playerScore);
log("appName",     appName);
log("myString",    myString);
log("myNumber",    myNumber);
log("myBoolean",   myBoolean);
log("nothing",     nothing);
log("notDefined",  notDefined);

