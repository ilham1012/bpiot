const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
var helmet = require('helmet')

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(helmet());
// parse request of content-type - application/json
app.use(bodyParser.json());
// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const db = require('./app/models');

db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully. ');
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});


// for development
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    db.sequelize.query("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;");
    db.sequelize.query("SELECT create_hypertable('telemetries', 'time');");

    console.log("Drop and re-sync db.");
    initial().then(console.log("initial"));
});

// db.sequelize.sync({ alter: true }).then(() => {
//     // db.sequelize.query("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;");
//     // db.sequelize.query("SELECT create_hypertable('telemetries', 'time');");

//     // console.log("Drop and re-sync db.");
//     // initial().then(console.log("initial"));
// });

// const Role = db.role;
const User = db.user;
const ProjectController = require('./app/controllers/project.controller');
const DeviceController = require('./app/controllers/device.controller');
const ACLController = require('./app/controllers/acl.controller');
const AuthController = require('./app/controllers/auth.controller');


async function initial() {

    // Create 1st user
    await User.create({
        username: "test",
        email: "test@min.com",
        password: bcrypt.hashSync("1234", 8),
        role: db.USER_ROLES.ADMIN
    });

    // create 1st project
    await ProjectController.create({
        name: "test project",
        description: "test project desc. "
    }).then(async (newProject) => {

        // add 1st user as project 1 user
        await ProjectController.addUser(newProject.id, 1);

        // create 1st device, belong to 1st project
        await DeviceController.create(1, {
            name: "test device",
            description: "test device desc."
        }).then(async (newDevice) => {
            await ACLController.create(newDevice.id, {
                pub: true,
                pattern: "#"
            });

            await ACLController.create(newDevice.id, {
                pub: false,
                pattern: "#"
            });

            await AuthController.deviceGenerateToken(
                {
                    body: {
                        uid: newDevice.uid
                    }
                },
                {
                    status: 404
                }
            );

        });

    });
    
    // console.log(await ProjectController.findAll());


    
};

app.set('views', './app/views');
app.set('view engine', 'pug');

// simple route
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

// require("./app/routes/tutorial.routes")(app);
require("./app/routes/index")(app);


// const Listener = require('./app/listeners');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
});