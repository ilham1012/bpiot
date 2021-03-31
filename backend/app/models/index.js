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

db.user = require("../models/user.model.js")(sequelize, Sequelize);
// db.project = require("../models/project.model.js")(sequelize, Sequelize);
// db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);

// db.project.belongsToMany(db.user, {
//     through: "user_projects",
//     foreignKey: "projectId",
//     otherKey: "userId"
// });

// db.user.belongsToMany(db.project, {
//     through: "user_projects",
//     foreignKey: "userId",
//     otherKey: "projectId"
// });




module.exports = db;