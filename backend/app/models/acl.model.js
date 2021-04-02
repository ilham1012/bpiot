module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define("acl", {
      pub: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      pattern: {
        type: Sequelize.STRING
      }
    });
  
    return Device;
  };