// Get the library data from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const libraryData = urlParams.get('library');

// Parse the JSON string back into an array
const myLibrary = JSON.parse(decodeURIComponent(libraryData));

// Get the book index from the query parameter
const bookIndex = urlParams.get('index');

// Set the book variable
const book = myLibrary[parseInt(bookIndex)];

// Get the book details container
const bookDetailsContainer = document.getElementById('book-details');
const deleteButton = document.getElementById('delete-book');
const toggleReadButton = document.getElementById('toggle-read');

// Event listener for delete button
deleteButton.addEventListener('click', () => {
  deleteBook();
});

// Event listener for toggle read button
toggleReadButton.addEventListener('click', () => {
  book['read'] = !book['read'];
  displayBookDetails(book);
  updateURLParams();
});

// Function to display book details
function displayBookDetails(book) {
  bookDetailsContainer.innerHTML = `
    <h2>${book.title}</h2>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>${book.read ? 'Already read' : 'Not read yet'}</p>
  `;
}

// Function to update URL parameters to reflect changes to book's read status
function updateURLParams() {
  const libraryData = JSON.stringify(myLibrary);
  const newURL = `book_details.html?index=${bookIndex}&library=${encodeURIComponent(libraryData)}`;
  history.replaceState(null, null, newURL);
}

// Function to delete a book
function deleteBook() {
  myLibrary.splice(bookIndex, 1);
  const libraryData = JSON.stringify(myLibrary);
  const homePage = `index.html?library=${encodeURIComponent(libraryData)}`;
  window.location.href = homePage;
}

// Check if book index is not null and display book details
if (bookIndex !== null) {
  displayBookDetails(book);
}
