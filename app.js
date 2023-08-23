const myLibrary = [];

const bookListContainer = document.getElementById('book-list');

function Book(title, author, pages, read = false) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = () => {
    return "" + this.title + " by " + this.author +
    ", " + this.pages + " pages." +
    (this.read ? " Already read." : " Not read yet.");
  }
}

const addBookForm = document.getElementById("add-book-form");

addBookForm.addEventListener('submit', (event) => {
  addBook();
  resetForm();
  event.preventDefault();
  renderBooks();
});


function addBook(){
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function resetForm(){
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const read = document.getElementById('read');

  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

const renderBooks = () => {
  bookListContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book');
    bookItem.setAttribute('data-index', index); // Set data-index attribute
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
    `;

    bookItem.addEventListener('click', () => {
      navigateToBook(book);
    });

    bookListContainer.appendChild(bookItem);
  });
}

function navigateToBook(book){
  // Convert the myLibrary array to a JSON string
  const libraryData = JSON.stringify(myLibrary);
  
  // Construct the URL with the book index and library data as query parameters
  const bookPageIndex = `book_details.html?index=${myLibrary.indexOf(book)}&library=${encodeURIComponent(libraryData)}`;

  // Navigate to the book details page
  window.location.href = bookPageIndex;
}

// Check whether the url has changed and update myLibrary

function updateLibray(){
  const currentURL = window.location.href;

  if (currentURL !== 'http://127.0.0.1:5500/index.html'){
    const urlParams = new URLSearchParams(window.location.search);
    const newLibArray = JSON.parse(decodeURIComponent(urlParams.get('library')));

    // Update the library using the library params in URL
    myLibrary.splice(0, myLibrary.length, ...newLibArray);
    renderBooks();
  }
}
updateLibray();
