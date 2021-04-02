const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        port: dbConfig.PORT,
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        protocol: dbConfig.PROTOCOL
    });

const db = {};

db.USER_ROLES = {};
db.USER_ROLES.ADMIN = 1;
db.USER_ROLES.TENANT = 2;
db.USER_ROLES.USER = 3;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.device = require("./device.model.js")(sequelize, Sequelize);
db.acl = require("./acl.model.js")(sequelize, Sequelize);

db.project.hasMany(db.device, { as: "devices" });

db.device.belongsTo(db.project, {
  foreignKey: "projectId",
  as: "project",
});

db.project.belongsToMany(db.user, {
    as: 'users',
    through: "user_projects",
    // foreignKey: "projectId",
    // otherKey: "userId"
});

db.user.belongsToMany(db.project, {
    as: 'projects',
    through: "user_projects",
    // foreignKey: "userId",
    // otherKey: "projectId"
});

db.device.hasMany(db.acl, {as: 'control_list'});
db.acl.belongsTo(db.device, {
    foreignKey: 'deviceId',
    as: 'acl_device'
});



module.exports = db;