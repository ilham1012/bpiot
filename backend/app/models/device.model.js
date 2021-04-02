module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define("devices", {
      device_uid: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(64)
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Device;
  };