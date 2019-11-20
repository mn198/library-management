const NotificationController = require('./controllers/notification');

exports.routesConfig = (app) => {
    app.get('/:userId/notifications', [
        NotificationController.read
    ])

    app.get('/notifications/:notificationId/markAsRead', [
        NotificationController.markAsRead
    ])
}