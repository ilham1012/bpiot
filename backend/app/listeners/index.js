const lstnr = {};

lstnr.telemetry = require("./telemetry.listener.js");

lstnr.telemetry.run({
    brokers: [process.env.KAFKA_HOST || 'kafka:9092'],
    clientId: 'telemetry-save',
    groupId: 'backend-service',
    topic: 'mqtt-bridge-example'
});

module.exports = lstnr;
