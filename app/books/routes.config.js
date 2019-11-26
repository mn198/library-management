const BookController = require('./controllers/book_ctrl');
const ValidationMiddleware = require('../../common/middlewares/auth.validation');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/books',[
        ValidationMiddleware.validJWTNeeded,
        upload.single('book_image'),
        BookController.create
    ])

    app.get('/books', [
        ValidationMiddleware.validJWTNeeded,
        BookController.list
    ])

    app.get('/books/:bookId/:status', [
        ValidationMiddleware.validJWTNeeded,
        BookController.changeBookStatus
    ])

    app.get('/books/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        BookController.read
    ])

    app.patch('/books/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        upload.single('book_image'),
        BookController.update
    ])

    app.delete('/books/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        BookController.delete
    ])
}