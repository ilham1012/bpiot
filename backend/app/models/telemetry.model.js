module.exports = (sequelize, Sequelize) => {
    const Telemetry = sequelize.define("telemetries", {
        time: Sequelize.DATE,
        // device: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //     model: device,
        //     key: 'id',
        //     // deferrable: Deferrable.INITIALLY_IMMEDIATE
        //     }
        // },
        // key: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //     model: telemetry_key,
        //     key: 'id',
        //     // deferrable: Deferrable.INITIALLY_IMMEDIATE
        //     }
        // },
        string_val: Sequelize.STRING,
        long_val: Sequelize.BIGINT,
        double_val: Sequelize.DOUBLE,
        json_val: Sequelize.JSON
    }, {
        sequelize,
        modelName: 'telemetry',
        timestamps: false,
    });
  
    return Telemetry;
  };