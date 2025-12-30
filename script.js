const myLibrary = [];
const addBookDialog = document.querySelector("#add-book");
const addBookButton = document.querySelector("#add-book-button");
const addBookCancelButton = document.querySelector("#cancel");
/**
 *
 * @param {Book} book
 */
function BookUI(book) {
	if (!new.target) {
		throw new Error("You should use 'new' keyword to create Book instance");
	}

	this.book = document.createElement("div");
	this.book.addEventListener("click", (e) => {
		const target = e.target;
		if (!target.classList.contains("button")) return;

		const bookToDel = target.parentElement;
		const idBookToDel = bookToDel.dataset.id;
		myLibrary.splice(
			myLibrary.findIndex((book) => book.id == idBookToDel),
			1
		);
		bookToDel.remove();
		console.log(myLibrary);
	});

	const bookInsideElements = [];
	bookInsideElements.push(document.createElement("h2"));
	bookInsideElements.push(document.createElement("p"));
	bookInsideElements.push(document.createElement("p"));
	bookInsideElements.push(document.createElement("p"));
	bookInsideElements.push(document.createElement("button"));

	this.book.className = "book";
	this.book.dataset.id = book.id;

	bookInsideElements[0].textContent = book.title;
	bookInsideElements[1].textContent = book.author;
	bookInsideElements[2].textContent = book.pages;
	bookInsideElements[3].textContent = book.isRead ? "Is read" : "Not read";
	bookInsideElements[4].textContent = "Delete";
	bookInsideElements[4].classList.add("button", "box-button");

	bookInsideElements.forEach((el) => {
		this.book.appendChild(el);
	});
}

/**
 *
 * @param {String} title
 * @param {String} author
 * @param {Number} pages
 * @param {Boolean} isRead
 */
function Book(title, author, pages, isRead = false) {
	if (!new.target) {
		throw new Error("You should use 'new' keyword to create Book instance");
	}

	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

Book.prototype.info = function () {
	return `${this.title} by ${this.author}, ${this.pages} pages, ${
		this.isRead ? "is read" : "not read yet"
	}, ${this.id}`;
};

Book.prototype.changeReadStatus = function () {
	return;
};

/**
 *
 * @param {String} title
 * @param {String} author
 * @param {Number} pages
 * @param {Boolean} isRead
 * @returns {Book}
 */
function addBookToLibrary(title, author, pages, isRead) {
	const newBook = new Book(title, author, pages, isRead);

	myLibrary.push(newBook);
	console.log(newBook.info());
	console.log(myLibrary);

	return newBook;
}

function displayBooks() {
	myLibrary.forEach((el) => {
		displayBook(el);
	});
}

/**
 *
 * @param {Book} bookEl
 */
function displayBook(bookEl) {
	const book = new BookUI(bookEl);
	const booksContainer = document.querySelector(".books");

	booksContainer.appendChild(book.book);
}

addBookButton.addEventListener("click", () => {
	addBookDialog.showModal();
});

addBookCancelButton.addEventListener("click", () => {
	addBookDialog.close();
});

addBookDialog.addEventListener("submit", (e) => {
	e.preventDefault();

	const target = e.target;
	const title = target.title.value;
	const author = target.author.value;
	const pages = target.pages.value;
	const isRead = target.isRead.value == "read" ? true : false;

	const newBook = addBookToLibrary(title, author, pages, isRead);
	displayBook(newBook);

	addBookDialog.close();
});

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("IT", "Charlie Chaplin", 512, true);
addBookToLibrary("West front", "Ryan Gosling", 302, true);

displayBooks();
