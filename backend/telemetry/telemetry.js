const mqtt = require('mqtt')
const ModelTelemetry = require('../models').telemetry;

module.exports.run = function(opt){
    var client = mqtt.connect("mqtt://"+opt.broker,
    {
        clientId:"mqttjs01",
        // username:"steve",
        // password:"password",
        // clean:true
    });
    
    client.on("connect",function(){	
        console.log("connected");
    });
    
    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)
    });
    
    client.subscribe('bpiot/#',{qos:1});
    
    client.on('message',function(topic, message, packet){
        console.log("topic is "+ topic);
        console.log("message is "+ message);

        saveDB(message);
    });

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

        if (typeof(data) == "number"){
            if(isInt(data)){
                return "long_val";
            } else {
                return "double_val";
            }
        } else if (typeof(data) == "bigint"){
            return "long_val";
        } else if (typeof(data) == "string"){
            return "string_val";
        } else if (typeof(data) == "object"){
            return "json_val";
        }

    }

    function isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
    function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
       

};