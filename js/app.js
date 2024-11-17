// Selectors
const books = document.querySelector(".books");
const bagBooks = document.querySelector(".your-bag .books");
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

      const imgSrc = book.querySelector("img").src;
      const bookAuthor = book.querySelector(".book-author").innerText;
      const bookPrice = book.querySelector(".book-price h3").innerText;

      const newBook = document.createElement("div");
      newBook.classList.add("book");
      newBook.innerHTML = `
      <button class="cancel-order"><i class="fas fa-close"></i></button>
      <div class="book-img">
      <img src="${imgSrc}" alt="book image" />
      </div>
      <div class="book-info">
      <h4 class="book-title">${bookTitle}</h4>
      <p class="book-author">${bookAuthor}</p>
      <div class="book-price">
      <p>Price:</p>
      <h3>${bookPrice}</h3>
      </div>
      <div class="book-order">
      <button><i class="fas fa-minus"></i></button>
      <p class="order-number">0</p>
      <button><i class="fas fa-plus"></i></button>
      </div>
      </div>
      `;

      bagBooks.appendChild(newBook);
      cancelBook(newBook);
    });
  });
}

// Cancel ordered book
function cancelBook(newBook) {
  const cancelOrder = newBook.querySelector(".cancel-order");
  cancelOrder.addEventListener("click", () => {
    bagBooks.removeChild(newBook);
    console.log("Canceled Order book");
  });
}
