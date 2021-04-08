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
db.telemetry = require("./telemetry.model.js")(sequelize, Sequelize);
db.telemetry_key = require("./telemetry_key.model.js")(sequelize, Sequelize);

// PROJECT 1--n DEVICE 
db.project.hasMany(db.device, { as: "devices" });
db.device.belongsTo(db.project, {
  foreignKey: "project_id",
  as: "project",
});


// PROJECT n--n USER 
db.project.belongsToMany(db.user, {
    as: 'users',
    through: "user_projects",
});

db.user.belongsToMany(db.project, {
    as: 'projects',
    through: "user_projects",
});

// DEVICE 1--n ACL 
db.device.hasMany(db.acl, {as: 'control_list'});
db.acl.belongsTo(db.device, {
    foreignKey: 'device_id',
    as: 'acl_device'
});


// DEVICE 1--n TELEMETRY 
db.device.hasMany(db.telemetry, {as: 'device_telemetry'});
db.telemetry.belongsTo(db.device, {
    foreignKey: 'device_id',
    as: 'telemetry_device'
});


// TELEMETRY_KEY 1--n TELEMETRY 
db.telemetry_key.hasMany(db.telemetry, {as: 'key_telemetry'});
db.telemetry.belongsTo(db.telemetry_key, {
    foreignKey: 'key_id',
    as: 'telemetry_key'
});


module.exports = db;