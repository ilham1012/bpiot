const { authJwt } = require("../middleware");
const controller = require("../controllers/device.controller");
const auth = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/device",  controller.api_findAll);
    app.get("/api/v1/device/:id", controller.api_findById); //[authJwt.verifyToken]
    app.post("/api/v1/device",  controller.api_create);
    app.post("/api/v1/device/token", [authJwt.verifyToken], auth.api_deviceGenerateToken);
};