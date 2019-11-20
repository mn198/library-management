const RackController = require('./controllers/rack_ctrl');

exports.routesConfig = (app) => {
    app.post('/racks', [
        RackController.create
    ])

    app.get('/racks', [
        RackController.read
    ])

    app.patch('/racks/:rackId', [
        RackController.update
    ])

    app.delete('/racks/:rackId', [
        RackController.delete
    ])
}