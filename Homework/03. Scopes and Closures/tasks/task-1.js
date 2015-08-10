/* Task Description */
/* 
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	Author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */
function solve() {
    var library = (function () {
        var books = [];
        var categories = [];

        function listBooks(param) {

            var booksCopy = books.slice();
            if (param) {
                for (var prop in param) {
                    booksCopy = booksCopy.filter(function (item) {
                        return item[prop] === param[prop]
                    });
                }

            }
            return booksCopy.sort(function (a, b) {
                return a.ID - b.ID;
            })
        }

        function validateBook(book) {
            if (books.every(function (item) {
                    return (item.isbn !== book.isbn) && (item.title !== book.title);
                })) {
                if ((book.isbn.length === 10 || book.isbn.length === 13) && ( book.title.length > 2 && book.title.length < 100) && book.author.length > 0) {
                    if (book.category.length > 2 && book.category.length < 100) {
                        if (!categories.some(function (item) {
                                return item.name === book.category;
                            })) {

                            var category = {ID: categories.length + 1, name: book.category};
                            categories.push(category);
                        }
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;

        }

        function addBook(book) {
            if (validateBook(book)) {
                book.ID = books.length + 1;
                books.push(book);
                return book;
            } else {
                throw  new Error();
            }
        }

        function listCategories() {
            if (categories.length === 0)
                return categories;
            if (categories.length === 1) {
                return categories.map(function (x) {
                    return x.name;
                });
            }
            return categories.sort(function (a, b) {
                return a.ID - b.ID
            }).map(function (x) {
                return x.name;
            });

        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());
    return library;
}

var lib = solve();

lib.books.add({title: "dfkjshsjk", category: 'haha', author: 'jas', isbn: '1234567890'});
lib.books.add({title: "dfkjshsdsadas", category: 'haha', author: 'jas', isbn: '2234567890'});
var k = lib.categories.list();
console.log(k);

module.exports = solve;
