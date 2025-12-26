const myLibrary = [];

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

/**
 *
 * @param {String} title
 * @param {String} author
 * @param {Number} pages
 * @param {Boolean} isRead
 */
function addBookToLibrary(title, author, pages, isRead) {
	const newBook = new Book(title, author, pages, isRead);

	myLibrary.push(newBook);
	console.log(newBook.info());
	console.log(myLibrary);
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
