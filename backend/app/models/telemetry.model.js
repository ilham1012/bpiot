module.exports = (sequelize, Sequelize) => {
    const Telemetry = sequelize.define("telemetries", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        time: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DATE
        },
        string_val: Sequelize.STRING,
        long_val: Sequelize.BIGINT,
        double_val: Sequelize.DOUBLE,
        json_val: Sequelize.JSON
    },
    {
        sequelize,
        modelName: 'telemetry',
        timestamps: false,
    });
  
    return Telemetry;
  };