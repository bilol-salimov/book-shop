// Selectors
const inputDate = document.querySelector("#date");
const radios = document.querySelectorAll("input[type='radio']");
const closeBtn = document.querySelector(".close-btn");
const completeBtn = document.querySelector("form .btn");

// Event Listeners
closeBtn.addEventListener("click", close);

// Get date
const today = new Date();

// Get today date
today.setDate(today.getDate() + 1);

// Formatted to ISO (yyyy-mm-dd)
const nextDay = today.toISOString().split("T")[0];
inputDate.value = nextDay;

// Input radio checks
function addChecked() {
  radios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      removeChecked();
      e.target.checked = "true";
    });
  });
}

addChecked();

function removeChecked() {
  radios.forEach((radio) => {
    radio.checked = false;
  });
}

function complete() {
  completeBtn.addEventListener("click", () => {});
}

function close() {
  window.location.pathname = "index.html";
}
