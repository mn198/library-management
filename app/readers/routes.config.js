const ReaderController = require('./controllers/readers');
const ValidationMiddleware = require('../../common/middlewares/auth.validation');
const PermissionMiddleware = require('../../common/middlewares/auth.permission');
const config = require('../../common/config/env.config');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/readers', [
        upload.single('avatar'),
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADD_READER),
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
        PermissionMiddleware.minimumPermissionLevelRequired(config.EDIT_READER),
        upload.single('avatar'),
        ReaderController.update
    )

    app.delete('/readers/:readerId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.DELETE_READER),
        ReaderController.delete
    ])
    
}