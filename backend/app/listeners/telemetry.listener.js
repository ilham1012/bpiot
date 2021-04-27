const { Kafka } = require('kafkajs');
const db = require("../models");

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
            kafka_key = message.key.toString();
            kafka_msg = JSON.parse(message.value.toString());

            console.log("=== TELEMETRY LISTENER ===");
            console.log({
                key: kafka_key,
                value: kafka_msg,
                headers: message.headers,
            });


            const saveSuccess = await saveDB(kafka_msg.message.payload);

            if (saveSuccess){
                console.log("SaveDB SUCCESS");
            } else {
                console.log("SaveDB FAILED");
            }
        },
    });
    
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

    // });

    const saveDB = async(payload) => {
        // message = JSON.parse(message);
        console.log("SaveDB");
        console.log(payload);
        // const device_id = message.device_id;
        // const time = message.time;


        // data = {
        //     "temperature": 17,
        //     "humidity": 79,
        // };
        

        var data = [];
        
        // only if no time provided
        var time = Date.now();
        
        var keys = Object.keys(payload.data);
        
        for (i=0; i < keys.length; i++){
            var row = {};
            row.time = time;
            // insert device, but it needs to be the device_id
            // make a query to devices, get the id
            const device = await db.device.findOne({ where: { uid: payload.device_uid } });

            if (!device){
                return false;                
            }

            row.telemetryDeviceId = device.id;
            
            // insert key, but it needs to be the key_id
            // make a query to telemetry_key or create new if not exist
            const [telemetry_key, created] = await db.telemetry_key.findOrCreate({ where: { key: keys[i] } });
            row.telemetryKeyId = telemetry_key.id;

            const value = payload.data[keys[i]];
            row[checkType(value)] = value;
            data.push(row);
        }


        // insert value

        console.log(data);

        try {
            // insert
            const rows = await db.telemetry.bulkCreate(data);
            
            if (rows.length == data.length){
                return true;
            }

        } catch (e) {
            console.log('Error inserting data', e)
        }
        
        return false

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

