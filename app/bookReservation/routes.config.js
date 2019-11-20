const BookReservationController = require('./controllers/bookReservation');

exports.routesConfig = (app) => {
    app.post('/bookReservations', [
        BookReservationController.create
    ])

    app.get('/bookReservations', [
        BookReservationController.read
    ])

    app.patch('/bookReservations/:bookReservationId', [
        BookReservationController.update
    ])

    app.delete('/bookReservations/:bookReservationId', [
        BookReservationController.delete
    ])
}