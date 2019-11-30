const LendingModel = require('../bookLending/controllers/bookLending_ctrl');
const ValidationMiddleware = require('../../common/middlewares/auth.validation');
const PermissionMiddleware = require('../../common/middlewares/auth.permission');
const config = require('../../common/config/env.config');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

exports.routesConfig = (app) => {
    app.post('/lendings', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.ADD_LENDING),
        upload.single('avatar'),
        LendingModel.create
    ])

    app.get('/lendings', [
        ValidationMiddleware.validJWTNeeded,
        LendingModel.list
    ])

    app.get('/lendings/isDeleted', [
        ValidationMiddleware.validJWTNeeded,
        LendingModel.isDeletedList
    ])

    app.get('/lendings/:lendingId/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.EDIT_LENDING),
        LendingModel.returnBook
    ])

    app.patch('/lendings/:lendingId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.EDIT_LENDING),
        upload.single('avatar'),
        LendingModel.update
    ])

    app.delete('/lendings/:lendingId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(config.DELETE_LENDING),
        LendingModel.delete
    ])
}