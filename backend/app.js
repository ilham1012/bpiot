const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const port = 5000;

app.use(express.json());

const sequelize = new Sequelize(
    'bpiot',
    process.env.POSTGRES_USER || 'postgres',
    process.env.POSTGRES_PASSWORD || 'testpass',
    {
        port: process.env.POSTGRES_PORT || 5432,
        host: 'db',
        dialect: 'postgres',
        protocol: 'postgres',
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false
        //     }
        // }
    })

const Telemetry = require('./models').telemetry;

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully. ');
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});

app.get('/', (req, res) => {
    const time = new Date().getTime();
    const message = 'test';

    // try {
    //     // insert
    //     await Telemetry.create({
    //         time: time,
    //         string_val: message 
    //     });

    //     res.send('Inserted! ');
    // } catch (e) {
    //     console.log('Error inserting data', e)
    // }
    res.send(message);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))