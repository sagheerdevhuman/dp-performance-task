'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Event,Case,E_Case,Program,P_Case,Organization,O_Case}) {
      Case.belongsToMany(Event, {
        through: "E_Case",
        as: "events",
        foreignKey: "case_id",
      });
      Case.belongsToMany(Program, {
        through: "P_Case",
        as: "programs",
        foreignKey: "case_id",
      });
      Case.belongsToMany(Organization, {
        through: "O_Case",
        as: "orgs",
        foreignKey: "case_id",
      });
    }
  }
  Case.init({
    case_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: null,
    },
    reason: DataTypes.STRING(5000),
  }, {
    sequelize,
    modelName: 'Case',
  });
  return Case;
};