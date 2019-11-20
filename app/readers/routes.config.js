const ReaderController = require('./controllers/readers');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/readers', upload.single('avatar'), ReaderController.create)

    app.get('/readers', [
        ReaderController.list
    ])

    app.get('/readers/:readerId', [
        ReaderController.read
    ])

    app.patch('/readers/:readerId', upload.single('avatar'),
        ReaderController.update
    )

    app.delete('/readers/:readerId', [
        ReaderController.delete
    ])
    
}