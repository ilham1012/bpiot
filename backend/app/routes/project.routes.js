const { authJwt } = require("../middleware");
const controller = require("../controllers/project.controller");
const auth = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/projects",  controller.api_findAll);
    app.get("/api/v1/projects/:id", controller.api_findById); //[authJwt.verifyToken]
    app.post("/api/v1/projects",  controller.api_create);
    app.put("/api/v1/projects/:id",  controller.api_update);
    app.delete("/api/v1/projects/:id",  controller.api_delete);
};