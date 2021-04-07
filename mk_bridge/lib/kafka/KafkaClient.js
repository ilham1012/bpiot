"use strict";

const EventEmitter = require("events");
const Promise = require("bluebird");
const debug = require("debug")("mqtttokafka:kafka");
// const { NProducer } = require("sinek");
const uuid = require("uuid");
const { Kafka } = require('kafkajs');
// const config = require("../../../mqtt_kafka/config");

class KafkaClient extends EventEmitter {

    constructor(config = {}, etl = null) {
        super();
        
        this.config = config;
        this.etl = etl;
        this.kafka = null;
        this.producer = null;
    }

    async connect(){
        // debug("Connecting..");

        // this.producer = new NProducer(this.config, "auto");
        // this.producer.on("error", (error) => {
        //     this.emit("error", error);
        // });

        // await this.producer.connect();
        // debug("Connected.");
        console.log("kafka broker: ", this.config.noptions.metadata_broker_list);

        this.kafka = new Kafka({
            clientId: this.config.noptions.client_id,
            brokers: this.config.noptions.metadata_broker_list // ['kafka1:9092', 'kafka2:9092']
        });

        this.producer = this.kafka.producer();

        await this.producer.connect();
        
    }

    produce(_topic, _message){

        const _key = uuid.v4();

        console.log("KafkaClient");

        if(!this.etl){

            if(typeof _message !== "string"){
                _message = JSON.stringify(_message);
            }

            // return this.producer.send(_topic, _message, null, _key);
            return this.producer.send({ topic: _topic, messages: [{ key: key, value: _message }]});
        }

        return new Promise((resolve, reject) => {
            
            this.etl(_topic, _message, _key, (error, result) => {
                
                if(error){
                    return debug("Skipping message of", _topic, "as etl returned error.");
                }

                let {
                    topic,
                    message,
                    key,
                    partition = null,
                } = result;

                if(typeof message !== "string"){
                    message = JSON.stringify(message);
                }

                console.log("k_t: ", topic);
                console.log("k_m: ", message);
                // this.producer.send(topic, message, partition, key).then(resolve).catch(reject);
                this.producer.send({ topic: topic, messages: [{ key: key, value: message }]}).then(resolve).catch(reject);
            });
        });
    }

    getStats(){
        return 1; //this.producer.getStats();
    }

    close(){

        if(this.producer){
            // this.producer.close();
            this.producer.disconnect();
        }
    }
}

module.exports = KafkaClient;