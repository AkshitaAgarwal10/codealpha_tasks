const display = document.getElementById("display");

// Add a character (number or operator) to the display
function appendValue(value) {
  display.value += value;
}

// Clear the entire display
function clearDisplay() {
  display.value = "";
}

// Remove just the last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Evaluate the expression currently on the display
function calculateResult() {
  try {
    // eval() runs the math expression as JavaScript code.
    // Replace the % symbol so it works as "divide by 100" style percentage.
    let expression = display.value.replace(/%/g, "/100");
    display.value = eval(expression);
  } catch (error) {
    display.value = "Error";
  }
}

// Bonus: keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculateResult();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});
