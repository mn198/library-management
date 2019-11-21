const LendingModel = require('../bookLending/controllers/bookLending_ctrl');
const ValidationMiddleware = require('../../common/middlewares/auth.validation');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/lendings', [
        ValidationMiddleware.validJWTNeeded,
        upload.single('avatar'),
        LendingModel.create
    ])

    app.get('/lendings', [
        ValidationMiddleware.validJWTNeeded,
        LendingModel.list
    ])

    app.get('/lendings/:lendingId/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        LendingModel.returnBook
    ])

    app.patch('/lendings/:lendingId', [
        ValidationMiddleware.validJWTNeeded,
        upload.single('avatar'),
        LendingModel.update
    ])

    app.delete('/lendings/:lendingId', [
        ValidationMiddleware.validJWTNeeded,
        LendingModel.delete
    ])
}