'use strict';
const {
  Model
} = require('sequelize');
const telemetry_key = require('./telemetry_key');
const device = require('./device');
module.exports = (sequelize, DataTypes) => {
  class telemetry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  telemetry.init({
    time: DataTypes.DATE,
    device: {
      type: DataTypes.INTEGER,
      references: {
        model: device,
        key: 'id',
        // deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    key: {
      type: DataTypes.INTEGER,
      references: {
        model: telemetry_key,
        key: 'id',
        // deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    string_val: DataTypes.STRING,
    long_val: DataTypes.BIGINT,
    double_val: DataTypes.DOUBLE,
    json_val: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'telemetry',
    timestamps: false,
  });
  return telemetry;
};