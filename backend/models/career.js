'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Career extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Profile_Career, Career,Profile }) {
      // this.hasMany(Profile_Career, {
      //   as: "careers",
      // });
      // Profile_Career.belongsTo(Career);
      Career.belongsToMany(Profile, {
        through: "Profile_Career",
        as: "profiles",
        foreignKey: "career_id",
      });
    }
  }
  Career.init({
    career_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Career must have a name!" },
        notEmpty: { msg: "Name must not be empty!" },
      },
    },
  }, {
    sequelize,
    modelName: 'Career',
  });
  return Career;
};