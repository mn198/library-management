const BookController = require('./controllers/book_ctrl');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/books',[
        upload.single('avatar'),
        BookController.create
    ])

    app.get('/books', [
        BookController.list
    ])

    app.get('/books/:bookId/:status', [
        BookController.changeBookStatus
    ])

    app.get('/books/:bookId', [
        BookController.read
    ])

    app.patch('/books/:bookId', [
        upload.single('avatar'),
        BookController.update
    ])

    app.delete('/books/:bookId', [
        BookController.delete
    ])
}