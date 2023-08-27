// Define the main library array
const myLibrary = [];

// Get the container for the book list
const bookListContainer = document.getElementById('book-list');

// Get the add book form
const addBookForm = document.getElementById('add-book-form');

// Handling the dialog for adding the book
const openDialogButton = document.getElementById('open-dialog-button');
const dialog = document.getElementById('add-book-dialog');
const closeDialogButton = document.getElementById('close-dialog-button');

// Constructor function for Book objects
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages. ${this.read ? 'Already read.' : 'Not read yet.'}`;
  };
}

// Event listener for form submission
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
  resetForm();
  dialog.close();
  renderBooks();
});

// Function to add a book to the library
function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Function to reset the form
function resetForm() {
  const formElements = ['title', 'author', 'pages', 'read'];

  formElements.forEach((elementId) => {
    document.getElementById(elementId).value = '';
  });
}

// Function to render books in the book list container
const renderBooks = () => {
  bookListContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book');
    bookItem.setAttribute('data-index', index);
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
    `;

    bookItem.addEventListener('click', () => {
      navigateToBook(book);
    });

    bookListContainer.appendChild(bookItem);
  });
};

// Function to navigate to the book details page
function navigateToBook(book) {
  const libraryData = JSON.stringify(myLibrary);
  const bookPageIndex = `book_details.html?index=${myLibrary.indexOf(book)}&library=${encodeURIComponent(libraryData)}`;
  window.location.href = bookPageIndex;
}

// Function to update library based on URL parameters
function updateLibrary() {
  const currentURL = window.location.href;

  if (currentURL !== 'http://127.0.0.1:5500/index.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const newLibArray = JSON.parse(decodeURIComponent(urlParams.get('library')));

    myLibrary.splice(0, myLibrary.length, ...newLibArray);
    renderBooks();
  }
}

// Initial library update
updateLibrary();

// Event listeners for the dialog
openDialogButton.addEventListener('click', () => {
  dialog.showModal();
});

closeDialogButton.addEventListener('click', () => {
  dialog.close();
});
