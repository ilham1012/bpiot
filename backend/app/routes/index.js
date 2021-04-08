module.exports = (app) => {
    require("./auth.routes")(app);
    require("./user.routes")(app);
    require("./device.routes")(app);
    require("./acl.routes")(app);
    require("./project.routes")(app);
}