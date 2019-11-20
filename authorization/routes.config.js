const VerifyUserMiddleware = require('./verify_user');
const AuthorizationController = require('./authorization_controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation')

exports.routesConfig = function(app){
  app.post('/auth', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
  ])

}
