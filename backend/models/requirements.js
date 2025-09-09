'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requirements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Program_Requirements,Event_Requirements,Event,Program}) {
  
      this.belongsToMany(Program,{
        through: "Program_Requirements",
        as: "program_requirements",
        foreignKey: "requirements_id",
      });
      this.belongsToMany(Event, {
        through: "Event_Requirements",
        as: "event_requirements",
        foreignKey: "requirements_id",
      });
    
  }
  }
  Requirements.init({
    requirements_id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    past_experience: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    education_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    max_income_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: false,
        isNumeric: false,
        min: 5,
      },
    },
    min_income: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_age:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience_Level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipcode:  {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: false,
        isNumeric: false,
        min: 5,
      },
    },
    radius: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Requirements',
  });
  return Requirements;
};