const { authJwt } = require("../middleware");
const l_controller = require("../controllers/last_tele.controller");
const auth = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // ----- API -----
    app.get("/api/v1/telemetries/device/:device_uid",  l_controller.api_findAll);
    app.get("/api/v1/telemetries/:id", l_controller.api_findById);
};