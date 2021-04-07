const { Kafka } = require('kafkajs');
const Telemetry = require('../models/telemetry.model');
const Telemetry_key = require('../models/telemetry_key.model');

module.exports.run = async function(opt){
    const kafka = new Kafka({
        clientId: opt.clientId,
        brokers: opt.brokers
    });

    const consumer = kafka.consumer({ groupId: opt.groupId })

    await consumer.connect()

    await consumer.subscribe({ topic: opt.topic })


    // var client = mqtt.connect("mqtt://"+opt.broker,
    // {
    //     clientId:"mqttjs01",
    //     // username:"steve",
    //     // password:"password",
    //     // clean:true
    // });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("=== TELE LISTERNER ===")
            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })
        },
    })
    
    // client.on("connect",function(){	
    //     console.log("connected");
    // });
    
    // client.on("error",function(error){
    //     console.log("Can't connect" + error);
    //     process.exit(1)
    // });
    
    // client.subscribe('bpiot/#',{qos:1});
    
    // client.on('message',function(topic, message, packet){
    //     console.log("topic is "+ topic);
    //     console.log("message is "+ message);

    //     saveDB(message);
    // });

    const saveDB = async(message) => {
        message = JSON.parse(message);
        // const device_id = message.device_id;
        // const time = message.time;


        // data = {
        //     "temperature": 17,
        //     "humidity": 79,
        // };
        

        var data = {}
        // only if no time provided
        data.time = new Date().getTime();

        // insert device, but it needs to be the device_id
        // TODO: find how to get device ID from Device Token
        // make a query to devices
        data.device = 2;
        
        // insert key, but it needs to be the key_id
        // make a query to telemetry_key or create new if not exist
        // data.key = Object.keys(message)[0];
        data.key = 2;

        // key = Object.keys(message)[0];
        // val = Object.values(message)[0];

        // console.log("key " + key);
        // console.log("val " + message.temperature);

        // insert value
        data[checkType(Object.values(message)[0])] = Object.values(message)[0];

        console.log(data);

        try {
            // insert
            // await Telemetry.bulkCreate({
            await ModelTelemetry.create(data);

            res.send('Inserted! ');
        } catch (e) {
            console.log('Error inserting data', e)
        }

    }

    function checkType(data){
        console.log("Check ------");
        console.log(data);

        if (typeof(data) == "bigint"){
            return "long_val";
        } else if (typeof(data) == "number"){
            return "double_val";
        } else if (typeof(data) == "string"){
            return "string_val";
        } else if (typeof(data) == "object"){
            return "json_val";
        }

    }

    function isBigInt(n){
        return Object.prototype.toString.call(n).slice(8, -1).toLowerCase();
    }
    
    function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
       

};