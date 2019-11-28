const jwt = require('jsonwebtoken');
const secret = require('../config/env.config').jwt_secret;

const ADMIN_PERMISSION = 2048;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permissionLevel)
        console.log(req.jwt);
        if(user_permission_level & required_permission_level){
            return next();
        } else {
            return res.status(402).send();
        }
    }
}

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;

    if(req.params && req.params.userId && userId === req.params.userId){
        console.log('pass onlySameUserOrAdminCanDoThisAction')
        return next();
    } else {
        if(user_permission_level & ADMIN_PERMISSION){
            console.log('pass onlySameUserOrAdminCanDoThisAction')
            return next();
        } else {
            return res.status(403).send();
        }
    }
}

exports.sameUserCanDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if(req.params.userId === userId){
        return next();
    } else {
        return res.status(400).send();
    }
}