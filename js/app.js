// Selectors
const books = document.querySelector(".books");
const bagBooks = document.querySelector(".your-bag .books");
const totalPrice = document.querySelector(".total-price .price");
const confirmBtn = document.querySelector(".book-buttons .btn");
let slideIndex = 0;
let numbers = [];
let total = 0;
let scrollPosition = 0;
let inputValue = "";
let fetchData;

function fetchApi(path, getData) {
  fetch(path) //path to the file with json data
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchData = data;
      getData(fetchData);
    });
}

fetchApi("../books.json", getData);

function getData(data) {
  books.innerHTML = "";

  data.forEach((bookData) => {
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = `
    <div class="book-img">
    <img src="${bookData.imageLink}" alt="book image" />
    </div>
    <div class="book-info">
    <h4 class="book-title">${bookData.title}</h4>
    <p class="book-author">${bookData.author}</p>
    <div class="book-rating">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    </div>
    <div class="book-price"><p>Price:</p> <h3>$${bookData.price}</h3></div>
    <div class="book-buttons">
    <button class="btn add-to-bag">Add to bag</button>
    <button class="outline show-more">Show more</button>
    </div>
    </div>
    `;
    books.appendChild(book);
  });

  // Call addBook after all books are rendered
  addBook();
  showMore(data);
  searchBooks(data);
}

function addBook() {
  const addToBags = document.querySelectorAll(".add-to-bag");
  addToBags.forEach((addToBag) => {
    addToBag.addEventListener("click", (e) => {
      const book = e.target.closest(".book");
      const bookTitle = book.querySelector(".book-title").innerText;

      // Check if the book already in the bag
      const existingBook = Array.from(
        bagBooks.querySelectorAll(".book-title")
      ).find((title) => title.innerText === bookTitle);

      if (existingBook) {
        console.log("Book is already in the bag");
        return;
      }

      // Get book info
      const imgSrc = book.querySelector("img").src;
      const bookAuthor = book.querySelector(".book-author").innerText;
      const bookPrice = book.querySelector(".book-price h3").innerText;
      const price = parseFloat(bookPrice.replace("$", ""));

      // Create new book elements
      const newBook = document.createElement("div");
      newBook.classList.add("book");
      newBook.innerHTML = `       
      <button class="close-btn"><i class="fas fa-close"></i></button>
      <div class="book-img">
      <img src="${imgSrc}" alt="book image" />
      </div>
      <div class="book-info">
      <h4 class="book-title">${bookTitle}</h4>
      <p class="book-author">${bookAuthor}</p>
      <div class="book-price">
      <p>Price:</p>
      <h3 class="price">$${price}</h3>
      </div>
      <div class="book-order">
      <button class="minus-btn"><i class="fas fa-minus"></i></button>
      <p class="order-number">0</p>
      <button class="plus-btn"><i class="fas fa-plus"></i></button>
      </div>
      </div>
      `;

      // const booksInBag = bagBooks.querySelectorAll(".book");
      bagBooks.appendChild(newBook);

      slider(); //for sliders
      cancelBook(newBook, price); //for remove book
      orderNumber(); //for control - and + buttons
    });
  });
}

// Cancel ordered book
function cancelBook(newBook, price) {
  let booksInBag = bagBooks.querySelectorAll(".book");
  const index = Array.from(booksInBag).indexOf(newBook);
  // console.log(index);
  const cancelOrder = newBook.querySelector(".close-btn");
  cancelOrder.addEventListener("click", () => {
    const orderNumber = newBook.querySelector(".order-number").innerText;
    // console.log(orderNumber);

    total -= parseFloat(orderNumber * price);
    totalPrice.innerText = total;

    bagBooks.removeChild(newBook);
    // console.log(total);

    numbers[index] = 0;

    // Refresh slides
    let booksInBag = bagBooks.querySelectorAll(".book");
    console.log(booksInBag.length);
    if (slideIndex === 0) {
      slideIndex = 0;
      bagBooks.style.transform = `translateX(-${slideIndex}00%)`;
    } else {
      slideIndex = booksInBag.length - 1;
      bagBooks.style.transform = `translateX(-${slideIndex}00%)`;
    }

    console.log("Canceled Order book");

    // Check if the bag is empty
    if (bagBooks.querySelectorAll(".book").length === 0) {
      const sliders = document.querySelectorAll(".slider");
      sliders.forEach((slider) => {
        slider.classList.remove("active");
      });
      console.log("Removed active class from sliders");
    }
    slider();
  });
}

function slider() {
  const booksInBag = bagBooks.querySelectorAll(".book");
  const sliders = document.querySelectorAll(".slider");

  // If don't more than 1 book, turn off slider
  if (booksInBag.length > 1) {
    sliders.forEach((slider) => slider.classList.add("active"));
    // console.log(booksInBag.length);
  } else {
    sliders.forEach((slider) => slider.classList.remove("active"));
    slideIndex = 0;
    bagBooks.style.transform = "translateX(0)";
    // console.log(booksInBag.length);
    return;
  }

  // Left slider
  sliders[0].onclick = () => {
    if (slideIndex === 0) {
      slideIndex = booksInBag.length - 1;
    } else {
      slideIndex--;
    }
    bagBooks.style.transform = `translateX(-${slideIndex * 100}%)`;
  };

  // Right slider
  sliders[1].onclick = () => {
    if (slideIndex === booksInBag.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    bagBooks.style.transform = `translateX(-${slideIndex * 100}%)`;
  };
}

// Order book
function orderNumber() {
  const booksInBag = bagBooks.querySelectorAll(".book");

  booksInBag.forEach((book, index) => {
    if (numbers[index] === undefined) {
      numbers[index] = 0;
    }

    const plusBtn = book.querySelector(".plus-btn");
    const minusBtn = book.querySelector(".minus-btn");
    const orderNumber = book.querySelector(".order-number");
    let price = book.querySelector(".price").innerText;
    price = parseFloat(price.replace("$", ""));

    plusBtn.onclick = () => {
      minusBtn.style.backgroundColor = "#ffb800";
      numbers[index]++;
      orderNumber.innerText = numbers[index];
      total += price;
      totalPrice.innerText = total;
    };

    minusBtn.onclick = () => {
      if (numbers[index] > 0) {
        numbers[index]--;
        orderNumber.innerText = numbers[index];
        total -= price;
        totalPrice.innerText = total;
      }
      if (numbers[index] === 0) {
        minusBtn.style.backgroundColor = "#dddddd";
      }
    };
  });
}

// show more button
function showMore(data) {
  const modal = document.querySelector(".modal");
  const modalContent = modal.querySelector(".modal-content");
  const books = document.querySelectorAll(".books .book");
  books.forEach((book, index) => {
    const showMoreBtn = book.querySelector(".show-more");
    showMoreBtn.addEventListener("click", () => {
      const bookTitle = book.querySelector(".book-title").innerText;
      const bookDescription = data[index].description;

      modal.style.display = "flex";
      setTimeout(() => {
        modalContent.classList.add("active");
      });
      const modalTitle = modal.querySelector(".book-title");
      const modalDescription = modal.querySelector(".book-description");

      modalTitle.innerText = bookTitle;
      modalDescription.innerText = bookDescription;

      // freeze scrollY
      scrollPosition = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
    });
  });

  // close modal
  closeModal(modal);
}

// close modal
function closeModal(modal) {
  const modalContent = modal.querySelector(".modal-content");
  const closeModal = modal.querySelector(".close-btn");
  closeModal.addEventListener("click", () => {
    modalContent.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";

      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition);
    }, 200);
  });
}

// search books
function searchBooks(data) {
  const form = document.querySelector("#search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  form.addEventListener("input", (e) => {
    inputValue = e.target.value.toLowerCase();
    inputValue = inputValue.trim();

    if (inputValue) {
      books.innerHTML = "";

      const filteredData = data.filter((bookData) => {
        return bookData.title.toLowerCase().includes(inputValue);
      });
      console.log(filteredData);

      filteredData.forEach((book) => {
        const newBook = document.createElement("div");
        newBook.classList.add("book");
        newBook.innerHTML = `
        <div class="book-img">
        <img src="${book.imageLink}" alt="book image" />
        </div>
        <div class="book-info">
        <h4 class="book-title">${book.title}</h4>
        <p class="book-author">${book.author}</p>
        <div class="book-rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        </div>
        <div class="book-price"><p>Price:</p> <h3>$${book.price}</h3></div>
        <div class="book-buttons">
        <button class="btn add-to-bag">Add to bag</button>
        <button class="outline show-more">Show more</button>
        </div>
        </div>
        `;
        books.appendChild(newBook);
      });
    } else {
      getData(data);
    }
  });
}

confirmBtn.addEventListener("click", () => {
  if (bagBooks.hasChildNodes(".book")) {
    window.location.pathname = "pages/confirm-order/index.html";
  }
});
