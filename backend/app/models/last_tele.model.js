module.exports = (sequelize, Sequelize) => {
    const LastTele = sequelize.define("last_tele", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        time: {
            allowNull: false,
            type: Sequelize.DATE
        },
        string_val: Sequelize.STRING,
        long_val: Sequelize.BIGINT,
        double_val: Sequelize.DOUBLE,
        json_val: Sequelize.JSON
    },
    {
        sequelize,
        modelName: 'last_tele',
        timestamps: false,
    });
  
    return LastTele;
  };