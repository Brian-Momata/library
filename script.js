const myLibrary = [];

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

const addBookButton = document.getElementById("add-book-button");

addBookButton.addEventListener('click', (event) => {
  addBook();
  resetForm();
  event.preventDefault(); // prevent the form from submitting
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
