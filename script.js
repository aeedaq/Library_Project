let titles = document.querySelector('#title');
let authors = document.querySelector('#author');
let ifRead = document.querySelector('#isRead');
let pages = document.querySelector('#page');

const add_button = document.querySelector('#add_button');
add_button.addEventListener('click', addBook);

function main() {
  defaultBook1 = new Book("Emotional Intelligence", "Daniel Goleman", 46, false);
  defaultBook2 = new Book("JavaScript: The Definitive Guide", "David Flanagan", 409, true);

  if (localStorage.getItem('book') === null) {
    let array = [];
    array.push(defaultBook1);
    array.push(defaultBook2);
    localStorage.setItem('book', JSON.stringify(array));
  }
  displayBook();
}

class Book {
  constructor(title, author, page, isRead) {

    this.titles = title;
    this.authors = author;
    this.pages = page;
    this.ifRead = isRead;

  }
}

function addBook() {
  console.log(titles.value);
  if(titles.value === '' || authors.value === '' || pages.value === ''){
    alert('please fill all the inputs');
  }
  else{
  newBook = new Book(titles.value, authors.value, pages.value, ifRead.checked);
  updateLS(newBook);
  displayBook();
  }
}

function updateLS(book) {
  let bookList = JSON.parse(localStorage.getItem('book'));
  bookList.push(book);
  localStorage.setItem('book', JSON.stringify(bookList));
}

function displayBook() {

  let book = JSON.parse(localStorage.getItem('book'));
  document.getElementById('list').innerHTML = "";

  book.forEach(newBook => {
    
    let bookListing = document.createElement("div");
    bookListing.setAttribute('id', 'book_listing');
    result = Object.assign(newBook, Book);

    let bookTitle = document.createElement('div');
    bookTitle.setAttribute('id', 'bookTitleDiv')
    let title = document.createElement('h3');
    title.setAttribute('id', 'bookTitle');
    title.innerHTML = result.titles;

    let bookAuthor = document.createElement('div');
    bookAuthor.setAttribute('id', 'bookAuthorDiv')
    let author = document.createElement('p');
    author.setAttribute('id', 'bookAuthor');
    author.innerHTML = result.authors;

    let bookPages = document.createElement('div');
    bookPages.setAttribute('id', 'bookPagesDiv')
    let pages = document.createElement('p');
    pages.setAttribute('id', 'bookPages');
    pages.innerHTML = "Pages: " + result.pages;

    let bookDeleteBtn = document.createElement('div');
    bookDeleteBtn.setAttribute('id', 'bookDeleteDiv');
    deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete_button ' + result.titles);

    let bookRead = document.createElement('div');
    bookRead.setAttribute('id', 'bookReadDiv');
    editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'edit_button ' + result.titles);

    if (result.ifRead === true) {
      editBtn.innerHTML = "Read";
      editBtn.style.color = 'green';
      bookListing.style.border = "2px solid green";
    }

    else {
      editBtn.innerHTML = "Not Read";
      editBtn.style.color = ' rgb(255, 215, 36)';
      bookListing.style.border = "2px solid rgb(255, 215, 36)";
    }

    deleteBtn.innerHTML = "delete";

    bookListing.appendChild(bookTitle);
    bookListing.appendChild(bookAuthor);
    bookListing.appendChild(bookPages);
    bookListing.appendChild(bookDeleteBtn);
    bookListing.appendChild(bookRead);

    bookTitle.appendChild(title);
    bookAuthor.appendChild(author);
    bookPages.appendChild(pages);
    bookRead.appendChild(editBtn);
    bookDeleteBtn.appendChild(deleteBtn);

    document.getElementById('list').appendChild(bookListing);

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('page').value = "";
    
  });
}

document.addEventListener("click", someListener);

function someListener(event) {
  var element = event.target;

  //to DELETE the book from the array
  if (element.classList.contains("delete_button")) {
    let bookList = JSON.parse(localStorage.getItem('book'));

    let count = 0;
    let index = 0;

    

    bookList.forEach(elem => {
      book = Object.assign(elem, Book);
      let stringArray = book.titles.split(" ");

      if (stringArray[0] === element.classList[1]) {
        index = count;
      }
      count++;
    });

    bookList.splice(index, 1);

    localStorage.setItem('book', JSON.stringify(bookList));
    displayBook();
  }

  //to CHANGE the reading status
  if (element.classList.contains("edit_button")) {
    let bookList = JSON.parse(localStorage.getItem('book'));

    bookList.forEach(elem => {
      book = Object.assign(elem, Book);
      let stringArray = book.titles.split(" ");


      if (stringArray[0] === element.classList[1]) {
        if (book.ifRead)
          book.ifRead = false;
        else
          book.ifRead = true;
      }

    });

    localStorage.setItem('book', JSON.stringify(bookList));
    displayBook();
  }

}








