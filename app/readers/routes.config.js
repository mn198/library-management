const ReaderController = require('./controllers/readers');
const ValidationMiddleware = require('../../common/middlewares/auth.validation');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/readers', [
        ValidationMiddleware.validJWTNeeded,
        upload.single('avatar'), 
        ReaderController.create
])

    app.get('/readers', [
        ValidationMiddleware.validJWTNeeded,
        ReaderController.list
    ])

    app.get('/readers/:readerId', [
        ValidationMiddleware.validJWTNeeded,
        ReaderController.read
    ])

    app.patch('/readers/:readerId',
        ValidationMiddleware.validJWTNeeded,
        upload.single('avatar'),
        ReaderController.update
    )

    app.delete('/readers/:readerId', [
        ValidationMiddleware.validJWTNeeded,
        ReaderController.delete
    ])
    
}