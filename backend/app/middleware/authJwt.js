const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token;

    if (req.headers.authorization) {    // Check in authorization header
        token = req.headers.authorization.split(' ')[1];
    } else {                            // Check in x-access-token
        token = req.headers["x-access-token"];
    }

    if (!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.role == db.USER_ROLES.ADMIN){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    });
};

isTenant = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.role <= db.USER_ROLES.TENANT){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Require Tenant or Admin Role!"
        });
        return;
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isTenant: isTenant
};

module.exports = authJwt;