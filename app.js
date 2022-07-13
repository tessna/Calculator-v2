const screenElmt = document.querySelector("#screen");

let previous = 0;

let affichage = "";

let operation = null;

let memoire;

let bool = "true";

window.onload = () => {
  let touches = document.querySelectorAll("button");
  for (let touche of touches) {
    touche.addEventListener("click", gererTouches);
  }
  document.addEventListener("keydown", gererTouches);
};

function gererTouches(event) {
  let touche;
  const listeTouches = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    ".",
    "Enter",
    "Escape",
  ];
  if (event.type === "keydown") {
    if (listeTouches.includes(event.key)) {
      event.preventDefault();
      touche = event.key;
    }
  } else {
    touche = this.innerText;
  }

  if (parseFloat(touche) >= 0 || touche === ".") {
    affichage =
      affichage === "" ? touche.toString() : affichage + touche.toString();
    screenElmt.innerHTML = affichage;
    bool = "true";
  } else {
    switch (touche) {
      case "RESET":
      case "Escape":
        previous = 0;
        affichage = "";
        operation = null;
        screenElmt.innerText = 0;
        break;

      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
      case "^":
        if (affichage != "") {
          previous =
            previous === 0
              ? parseFloat(affichage)
              : calculate(previous, parseFloat(affichage), operation);
          screenElmt.innerText = previous;
          operation = touche;
          affichage = "";
        } else {
          operation = touche;
          affichage = "";
        }
        break;

      case "=":
      case "Enter":
        previous =
          previous === 0
            ? parseFloat(affichage)
            : calculate(previous, parseFloat(affichage), operation);
        screenElmt.innerText = previous;
        affichage = "";
        previous = 0;
        break;

      case "DEL":
        previous += parseFloat(del(affichage));
        screenElmt.innerText = previous;
        affichage = previous;
        previous = 0;
        break;

      default:
        break;
    }
  }
}

function calculate(n1, n2, op) {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  if (op === "+") return n1 + n2;
  if (op === "-") return n1 - n2;
  if (op === "*") return n1 * n2;
  if (op === "/") return n1 / n2;
  if (op === "%") return (n2 * n1) / 100;
  if (op === "^") return n1 ** n2;
}

function del(string) {
  if (string.toString().length === 1 || string.toString().length === 0)
    return "0";
  else return string.toString().slice(0, -1);
}
