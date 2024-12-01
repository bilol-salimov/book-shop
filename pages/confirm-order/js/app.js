// Selectors
const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("form");
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
    const name = document.querySelector("#name").value;
    const lastName = document.querySelector("#lastName").value;
    const date = document.querySelector("#date").value;
    const street = document.querySelector("#street").value;
    const houseNumber = document.querySelector("#houseNumber").value;
    const flat = document.querySelector("#flat").value;
    const cash = document.querySelector("#cash");
    const card = document.querySelector("#card");
    const gift1 = document.querySelector("#gift1").value;
    const gift2 = document.querySelector("#gift2").value;
    const newElement = document.createElement("div");
    // console.log(gift1);
    // console.log(gift2);

    let payment = "";
    if (cash.checked) {
      payment = "Cash";
    }
    if (card.checked) {
      payment = "Card";
    }

    let gifts = "";
    if (gift1 === "none" && gift2 === "none") {
      gifts = "No gifts";
    } else if (gift1 === "none" && gift2 !== "none") {
      gifts = gift2;
    } else if (gift2 === "none" && gift1 !== "none") {
      gifts = gift1;
    } else {
      gifts = `${gift1}, ${gift2}`;
    }

    newElement.innerHTML = `
        <h3 class="title">Congratulations! Order has been completed</h3>
  
        <div class="user-info">
          <div><span>Customer</span><h4>${name + " " + lastName}</h4></div>
          <div><span>Delivery address</span><h4>${
            street + ", house " + houseNumber + ", flat " + flat
          }</h4></div>
          <div><span>Delivery date</span><h4>${date}</h4></div>
          <div><span>Payment</span><h4>${payment}</h4></div>
          <div><span>Gifts</span><h4>${gifts}</h4></div>
          <button class="btn btn-fill active">Back to Shop</button>
        </div>
    `;
    formWrapper.replaceChild(newElement, form);
  }

  const backShopBtn = document.querySelector(".user-info .btn");
  backShopBtn.addEventListener("click", backToShop);
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
  } else {
    completeBtn.classList.remove("active");
  }
}

formInputs.forEach((input) => {
  input.addEventListener("input", checkFormComplete);
});

// Back to shop
function backToShop() {
  window.location.pathname = "index.html";
}
