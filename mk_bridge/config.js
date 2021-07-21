"use strict";

module.exports = {

    // mqtt connection options
    mqtt: { // # see https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
        url: null,
        options: {
            clientId: "example-client",
            username: "example",
            password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0MjQzMjk1fQ.8-g4NurhJoOBnRK_dHc89nmqt2_T5d8YAQEKmES56Us",
            host: "broker",
            port: 1883,
            protocolId: "MQTT",
            protocolVersion: 4,
        }
    },

    // kafka connection options
    kafka: { // # see https://github.com/nodefluent/node-sinek/blob/master/lib/librdkafka/README.md
        logger: undefined,
        noptions: {
            //"debug": "all",
            metadata_broker_list: [process.env.KAFKA_HOST || "kafka:9092"], //172.20.0.6
            client_id: "mqtt-bridge-example-client",
            "event_cb": true,
            "compression.codec": "none",
            "retry.backoff.ms": 200,
            "message.send.max.retries": 10,
            "socket.keepalive.enable": true,
            "queue.buffering.max.messages": 100000,
            "queue.buffering.max.ms": 1000,
            "batch.num.messages": 1000000,

            //"security.protocol": "sasl_ssl",
            //"ssl.key.location": path.join(__dirname, "../certs/ca-key"),
            //"ssl.key.password": "nodesinek",
            //"ssl.certificate.location": path.join(__dirname,"../certs/ca-cert"),
            //"ssl.ca.location": path.join(__dirname,"../certs/ca-cert"),
            //"sasl.mechanisms": "PLAIN",
            //"sasl.username": "admin",
            //"sasl.password": "nodesinek",
            "api.version.request": true,
        },
        tconf: {
            "request.required.acks": 1,
        }
    },

    // declares on which target kafka topic a mqtt message should be routed to (based on the mqtt topic)
    routing: {

        //"*": "*", // from all to all (indiviudally 1:1)
        //"*": "kafka-test", // from all to single kafka-test topic
        //"mqtt-topic": "kafka-topic", // from mqtt-topic to kafka-topic only

        "*": "bpiot_telemetry"
    },

    // if routed messages should be logged to debug
    logMessages: true,

    // declares how an mqtt topic name should be split (/) to fit to the kafka topic naming conventions
    kafkaTopicDelimiter: "-",

    // gives you the option to alter mqtt messages before they are consumed (routed)
    subscribeEtl: (topic, message, packet, callback) => {
        // first param is an error, if you pass one, we will omit the message
        callback(null, {
            topic,
            message: {
                mqtt_topic: topic,
                payload: message
            },
        });
    },

    // gives you the option to alter kafka messages before they are produced
    produceEtl: (topic, message, key, callback) => {
        // first param is an error, if you pass one, we will omit the message
        callback(null, {
            topic,
            message: {
                type: "mqtt_telemetry",
                message: message
            }, // you can pass an object, will be turned into a string
            key, // default uuid.v4
            partition: null, // default null
        });
    },

    // the bridge starts an http server
    http: {
        port: 3967,
    },
};