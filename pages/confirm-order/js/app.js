// Selectors
const inputDate = document.querySelector("#date");
const radios = document.querySelectorAll("input[type='radio']");
const radioCash = document.querySelector(".cash");
const radioCard = document.querySelector(".card");
const closeBtn = document.querySelector(".close-btn");
const completeBtn = document.querySelector("form .btn");
const formInputs = document.querySelectorAll("input");

// Event Listeners
closeBtn.addEventListener("click", close);
radioCash.addEventListener("click", (e) => {
  removeChecked();
  if (e.target === "input") {
    e.target.checked = "true";
  } else {
    const input = e.target.closest(".cash").querySelector("input");
    input.checked = "true";
  }
});
radioCard.addEventListener("click", (e) => {
  removeChecked();
  if (e.target === "input") {
    e.target.checked = "true";
  } else {
    const input = e.target.closest(".card").querySelector("input");
    input.checked = "true";
  }
});

completeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("active")) {
  }
});

// Get date
const today = new Date();

// Get today date
today.setDate(today.getDate() + 1);

// Formatted to ISO (yyyy-mm-dd)
const nextDay = today.toISOString().split("T")[0];
inputDate.value = nextDay;

function removeChecked() {
  radios.forEach((radio) => {
    radio.checked = false;
  });
}

function close() {
  window.location.pathname = "index.html";
}

// Complete button add and remove active
function checkFormComplete() {
  let allFilled = true;

  formInputs.forEach((input) => {
    if (input.value.trim() === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    completeBtn.classList.add("active");
    console.log("value bor");
  } else {
    completeBtn.classList.remove("active");
    console.log("value bo'sh");
  }
}

formInputs.forEach((input) => {
  input.addEventListener("input", checkFormComplete);
});
