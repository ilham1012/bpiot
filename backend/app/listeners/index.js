const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

const lstnr = {};

lstnr.telemetry = require("./telemetry.listener.js");

// console.log("listener index");

lstnr.telemetry.run({
    brokers: [process.env.KAFKA_HOST || 'kafka:9092'],
    clientId: 'telemetry-save',
    groupId: 'backend-service',
    topic: 'bpiot_telemetry'
}).catch(e => console.error(`[example/consumer] ${e.message}`, e));

module.exports = lstnr;


errorTypes.map(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})
