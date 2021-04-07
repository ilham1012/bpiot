module.exports = (sequelize, Sequelize) => {
    const Telemetry_key = sequelize.define("telemetry_keys", {
        key: Sequelize.STRING(64)
    });
  
    return Telemetry_key;
  };