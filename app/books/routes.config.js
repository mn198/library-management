const BookController = require('./controllers/book_ctrl');
const ValidationMiddleware = require('../../common/middlewares/auth.validation');
const PermissionMiddleware = require('../../common/middlewares/auth.permission');
const config = require('../../common/config/env.config');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/books',[
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADD_BOOK),
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
        PermissionMiddleware.minimumPermissionLevelRequired(config.EDIT_BOOK),
        upload.single('book_image'),
        BookController.update
    ])

    app.delete('/books/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.delete),
        BookController.delete
    ])
}