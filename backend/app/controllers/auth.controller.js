const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Device = db.device;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    console.log("===== verify Sign Up =====");
    console.log(req.body);
    // Save User to db
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role,
        full_name: req.body.full_name
    })
        .then(() => { res.send({ message: "User was registered successfully!" }); })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passwordIsValid){
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.role,
                accessToken: token
            });            
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.deviceGenerateToken = async (req) => {
    console.log("find: ", req.body.uid);
    let device = await Device.findOne({
        where: {
            uid: req.body.uid
        }
    });

    if (!device) {
        console.log("404");
        return {status: 404, message: "Device not found."}; // res.status(404).send({ message: "Device not found." });
    }

    var token = jwt.sign({ id: device.id }, config.secret, {
        // expiresIn: 86400*365 // 1 year
    });

    return device.update({
        token: token
    }).then(()=>{
        console.log("200");
        return {status: 200, message: {
            uid: device.uid,
            name: device.name,
            accessToken: token
        }};
    })
    .catch(err => {
        console.log("500");
        return {status: 500, message: err.message};
    });
};

exports.api_deviceGenerateToken = (req, res) => {
    console.log("API_DEVICEGENTOKEN");
    console.log(req);
    this.deviceGenerateToken(req)
            .then(result => { 
                console.log(result);
 
                if (result.status == 200){
                    return res.status(result.status).send(result.message);
                }
            
                return res.status(result.status).send({message: result.message});
            });

}
// module.exports = {
//     signup,
//     signin
// }