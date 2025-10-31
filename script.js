// === Advanced Calculator Script ===

// Get display element
const display = document.getElementById('display');

// Append a character or function to the display
function append(value) {
  display.value += value;
}

// Clear all contents of the display
function clearDisplay() {
  display.value = '';
}

// Delete the last character
function deleteChar() {
  display.value = display.value.slice(0, -1);
}

// Core function to evaluate the expression safely
function calculate() {
  let exp = display.value;

  // Replace mathematical symbols and functions with JS equivalents
  exp = exp
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/\^/g, '**'); // exponentiation

  try {
    // Evaluate expression using Function constructor (safer than eval)
    const result = Function(`"use strict"; return (${exp})`)();
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteChar();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});