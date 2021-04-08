const { authJwt } = require("../middleware");
const controller = require("../controllers/acl.controller");
const auth = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/acl",  controller.api_findAll);
    app.get("/api/v1/acl/:id", controller.api_findById); //[authJwt.verifyToken]
    app.post("/api/v1/acl",  controller.api_create);
    app.put("/api/v1/acl/:id",  controller.api_update);
    app.delete("/api/v1/acl/:id",  controller.api_delete);

    app.post("/api/v1/auth/mqtt", [authJwt.verifyToken], controller.mqttAuth);
};