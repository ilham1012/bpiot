module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      full_name: {
        type: Sequelize.STRING(64)
      },
      email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3
      }
    });
  
    return User;
  };