// Import stylesheets
import './style.css';

let equal_pressed = 0;
//Refer all buttons excluding AC and DEL
let button_input = document.querySelectorAll(".input-button");
//Refer input,equal,clear and erase
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");
let toggleBtn = document.querySelector(".themeToggle");
let result = document.querySelector(".result");

// THEME TOGGLE FUNCTIONALITY//
toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  }
});

function solution(inp_val) {
  try {
    //evaluate user's input
    let solution = eval(inp_val);
    if (isNaN(solution)) {
      return (result.textContent = "Invalid Expression");
    }
    //True for natural numbers
    //false for decimals
    if (Number.isInteger(solution)) {
      result.textContent = solution;
    } else {
      result.textContent = solution.toFixed(2);
    }
  } catch (err) {
    //If user has entered invalid input
    result.textContent = "Invalid Expression";
  }
}

window.onload = () => {
  input.value = "";
};

//Access each class using forEach
button_input.forEach((button_class) => {
  button_class.addEventListener("click", () => {
    if (equal_pressed == 1) {
      input.value = "";
      equal_pressed = 0;
    }
    //display value of each button
    let value = "";
    value = button_class.value;
    if (button_class.value === "×") value = "*";
    if (button_class.value === "÷") value = "/";
    if (button_class.value === "%" && input.value) {
      equal_pressed = 1;
      value = input.value.split("").includes(button_class.value) ? "" : value;
      let percentage = input.value / 100;
      solution(percentage);
    }
    if (button_class.value === "√" && input.value) {
      equal_pressed = 1;
      value = input.value.split("").includes(button_class.value) ? "" : value;
      let squareRoot = Math.sqrt(input.value);
      solution(squareRoot);
    }
    if (
      (Number.isInteger(+button_class.value) && button_class.value != "√") ||
      "%"
    ) {
      input.value += value;
    }
  });
});

//Solve the user's input when clicked on equal sign
equal.addEventListener("click", () => {
  let inp_val = input.value;
  equal_pressed = 1;
  solution(inp_val);
});

//Clear Whole Input
clear.addEventListener("click", () => {
  input.value = result.textContent = "";
});
//Erase Single Digit
erase.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
});
