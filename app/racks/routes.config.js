const RackController = require('./controllers/rack_ctrl');
const ValidationMiddleware = require('../../common/middlewares/auth.validation');

exports.routesConfig = (app) => {
    app.post('/racks', [
        ValidationMiddleware.validJWTNeeded,        
        RackController.create
    ])

    app.get('/racks', [
        ValidationMiddleware.validJWTNeeded,        
        RackController.read
    ])

    app.patch('/racks/:rackId', [
        ValidationMiddleware.validJWTNeeded,        
        RackController.update
    ])

    app.delete('/racks/:rackId', [
        ValidationMiddleware.validJWTNeeded,        
        RackController.delete
    ])
}