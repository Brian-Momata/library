 // Get the library data from the query parameter
 const urlParams = new URLSearchParams(window.location.search);
 const libraryData = urlParams.get('library');

 // Parse the JSON string back into an array
 const myLibrary = JSON.parse(decodeURIComponent(libraryData));

 // Get the book index from the query parameter
 const bookIndex = urlParams.get('index');

 // Set the book variable
 const book = myLibrary[parseInt(bookIndex)];

 if (bookIndex !== null) {
   displayBookDetails(book);
 }

 function displayBookDetails(book){
   const bookDetailsContainer = document.getElementById('book-details');
   bookDetailsContainer.innerHTML = `
   <h2>${book.title}</h2>
   <p>Author: ${book.author}</p>
   <p>Pages: ${book.pages}</p>
   <p>${book.read ? 'Already read' : 'Not read yet'}</p>
   `;
 }

 const deleteButton = document.getElementById('delete-book');
 const toggleReadButton = document.getElementById('toggle-read');

 deleteButton.addEventListener('click', () => {
   deleteBook();
 });

 toggleReadButton.addEventListener('click', () => {
   book['read'] = !book['read'];
   displayBookDetails(book);

   // Update the URL parameters to reflect the changes
   updateURLParams();
 });

 function updateURLParams() {
   const libraryData = JSON.stringify(myLibrary);

   // Update the URL with the modified library data
   const newURL = `book_details.html?index=${bookIndex}&library=${encodeURIComponent(libraryData)}`;
   history.replaceState(null, null, newURL);
 }

 function deleteBook(){
   myLibrary.splice(bookIndex, 1);

   const libraryData = JSON.stringify(myLibrary);
   const homePage = `index.html?library=${encodeURIComponent(libraryData)}`;

   window.location.href = homePage;
 }
 