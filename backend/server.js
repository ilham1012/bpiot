const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(bodyParser.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
// db.sequelize.sync();

db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully. ');
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});


// for development
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    initial().then(console.log("initial"));
});

// const Role = db.role;
const User = db.user;
const bcrypt = require('bcryptjs');

async function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });
   
//     Role.create({
//       id: 2,
//       name: "moderator"
//     });
   
//     Role.create({
//       id: 3,
//       name: "admin"
//     });

    await User.create({
        username: "test",
        email: "test@min.com",
        password: bcrypt.hashSync("1234", 8),
        role: db.USER_ROLES.ADMIN
    });

    
};

// simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to app." });
});

// require("./app/routes/tutorial.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
});