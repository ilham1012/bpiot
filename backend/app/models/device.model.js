module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define("devices", {
      uid: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      token: {
        type: Sequelize.STRING
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