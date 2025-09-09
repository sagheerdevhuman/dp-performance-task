'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Interest,Profile_Interest,Profile}) {
      // this.hasMany(Profile_Interest, {
      //   as: "interests",
      // });
      // Profile_Interest.belongsTo(Interest);
      Interest.belongsToMany(Profile, {
        through: "Profile_Interest",
        as: "profiles",
        foreignKey: "interest_id",
      });
    }
  }
  Interest.init({
    interest_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Interest must have a type!" },
        notEmpty: { msg: "Name must not be empty!" },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Interest must have a name!" },
        notEmpty: { msg: "Name must not be empty!" },
      },
    },
  }, {
    sequelize,
    modelName: 'Interest',
  });
  return Interest;
};