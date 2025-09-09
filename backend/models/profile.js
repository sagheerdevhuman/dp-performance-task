'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Career,Skill,Role,Interest,User,Profile_Career,Profile_Skill,profile_role,Profile_Interest,Profile_Tag,Tag}) {
      this.belongsTo(User, {
        foreignKey: {
          type: DataTypes.UUID,
          defaultValue: null,
          name: "user_id",
        },
        as: "user",
      });
      this.belongsToMany(Career,{
        through: "Profile_Career",
        as: "desired_careers",
        foreignKey: "profile_id",
      });
      this.belongsToMany(Skill, {
        through: "Profile_Skill",
        as: "skills",
        foreignKey: "profile_id",
      });
      this.belongsToMany(Tag, {
        through: "Profile_Tag",
        as: "tags",
        foreignKey: "profile_id",
      });
      this.belongsToMany(Role, {
        through: "profile_role",
        as: "desired_roles",
        foreignKey: "profile_id",
      });
      this.belongsToMany(Interest, {
        through: "Profile_Interest",
        as: "interests",
        foreignKey: "profile_id",
      });

    }
  }
  Profile.init({
    profile_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id:{
      type: DataTypes.UUID,
      defaultValue: null,
    },
    past_experience: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    portfolio: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "N/A",
    },
    education_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    college_in_stem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    income_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth:{
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    gender:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: false,
          isNumeric: false,
          min: 5,
        },
      },
    experience_Level:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    learning_style: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferred_language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LinkedIn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};