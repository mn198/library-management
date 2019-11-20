const LendingModel = require('../bookLending/controllers/bookLending_ctrl');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/lendings', [
        upload.single('avatar'),
        LendingModel.create
    ])

    app.get('/lendings', [
        LendingModel.list
    ])

    app.get('/lendings/:lendingId/:bookId', [
        LendingModel.returnBook
    ])

    app.patch('/lendings/:lendingId', [
        upload.single('avatar'),
        LendingModel.update
    ])

    app.delete('/lendings/:lendingId', [
        LendingModel.delete
    ])
}