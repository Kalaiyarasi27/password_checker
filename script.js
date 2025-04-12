// Placeholder JS
console.log("Password Pro is ready to go! 🚀");
// Get elements
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const strengthBar = document.getElementById("strength-bar");
const generateBtn = document.getElementById("generate");

// Character sets
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const symbols = "!@#$%^&*()_+-={}[]|:;<>,.?/~";

// 🟢 Update slider value live
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// 🔐 Generate password
generateBtn.addEventListener("click", () => {
  const len = +lengthSlider.value;
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNums = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  let charPool = "";
  if (useUpper) charPool += upper;
  if (useLower) charPool += lower;
  if (useNums) charPool += nums;
  if (useSymbols) charPool += symbols;

  if (charPool === "") {
    output.value = "Select at least one option!";
    strengthBar.style.width = "0%";
    strengthBar.className = "progress-bar bg-danger";
    strengthBar.textContent = "Invalid";
    return;
  }

  let password = "";
  for (let i = 0; i < len; i++) {
    const randIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randIndex];
  }

  output.value = password;
  updateStrength(password);
});

// 📋 Copy password to clipboard
copyBtn.addEventListener("click", () => {
  if (output.value && output.value !== "Select at least one option!") {
    navigator.clipboard.writeText(output.value);
    copyBtn.innerHTML = `<i class="bi bi-check-lg"></i>`;
    setTimeout(() => {
      copyBtn.innerHTML = `<i class="bi bi-clipboard"></i>`;
    }, 1500);
  }
});

// 📊 Check password strength
function updateStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  let percentage = (strength / 5) * 100;
  let label = "Weak";
  let color = "bg-danger";

  if (strength >= 4) {
    label = "Strong";
    color = "bg-success";
  } else if (strength >= 3) {
    label = "Moderate";
    color = "bg-warning text-dark";
  }

  strengthBar.style.width = `${percentage}%`;
  strengthBar.className = `progress-bar ${color}`;
  strengthBar.textContent = label;
}

