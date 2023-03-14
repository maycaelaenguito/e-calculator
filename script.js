const displayOutput = document.querySelector(".output");
const displayResult = document.querySelector(".result");
// variables that hold references to HTML elements that display the output and result of the calculator.
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
//hold references to HTML elements that represent the number and operation buttons.
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
// hold references to HTML elements that represent the equal, clear all, and clear last buttons respectively. 
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;
//used to keep track of the calculator's state.
numbersEl.forEach((number) => { // loop listens for a click event on each number button and updates the dis2Num variable and the display accordingly.
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    displayResult.innerText = dis2Num;
  });
});

operationEl.forEach((operation) => { // loop listens for a click event on each operation button and updates the dis1Num, lastOperation, and result variables accordingly, and then clears the dis2Num variable and updates the display.
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation(); 
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName); 
    lastOperation = operationName;
    console.log(result);
  });
});
function clearVar(name = "") { //is called by the operationEl.forEach() loop to update the dis1Num variable and the display with the current equation.
  dis1Num += dis2Num + " " + name + " ";
  displayOutput.innerText = dis1Num;
  displayResult.innerText = "";
  dis2Num = "";
}

function mathOperation() { ////performs the actual mathematical operation based on the current state of the calculator.
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

equalEl.addEventListener("click", () => { // listens for a click event on the equal button, calls mathOperation() to calculate the result, and updates the dis2Num, dis1Num, and display accordingly.
  if (!dis2Num || !dis1Num) return; 
  haveDot = false;
  mathOperation();
  clearVar();
  displayResult.innerText = result;
  dis2Num = result;
  dis1Num = "";
});

clearAllEl.addEventListener("click", () => { //listens for a click event on the clear all button and resets all calculator state and display.
  dis1Num = "";
  dis2Num = "";
  displayOutput.innerText = "";
  displayResult.innerText = "";
  result = "";
});

clearLastEl.addEventListener("click", () => { // listens for a click event on the clear last button and removes the last digit entered from the display and the dis2Num variable.
  let currentValue = displayResult.innerText;
  displayResult.innerText = currentValue.slice(0, -1);
  dis2Num = displayResult.innerText;
});

window.addEventListener("keydown", (e) => { // listens for keydown events and calls the appropriate function based on the key pressed.
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
    // console.log(e.key)
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
    // console.log(e.key)
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
  // console.log(e.key)
});
function clickButtonEl(key) { //takes a key argument and loops through each button in the numbersEl array. If the button's text content matches the key, it triggers a click event on that button.
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) { //loops through each button in the operationEl array
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() { //triggers a click event on the equalEl button when called.
  equalEl.click();
}
