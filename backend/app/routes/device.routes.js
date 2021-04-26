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

    // ----- API -----
    app.get("/api/v1/devices",  controller.api_findAll);
    app.get("/api/v1/devices/:id", controller.api_findById); //[authJwt.verifyToken]
    app.post("/api/v1/devices", [authJwt.verifyToken], controller.api_create);
    app.put("/api/v1/devices/:id", [authJwt.verifyToken], controller.api_update);
    app.delete("/api/v1/devices/:id", [authJwt.verifyToken], controller.api_delete);

    app.post("/api/v1/devices/token", [authJwt.verifyToken], auth.api_deviceGenerateToken);

    // ----- VIEW -----
    app.get("/projects", (req, res) => {
        res.render('pages/projects', { title: 'Projects', message: 'Hello there!' })
    });
};