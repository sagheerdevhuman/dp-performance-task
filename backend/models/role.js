'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({profile_role,Role,Profile}) {
      Role.belongsToMany(Profile, {
        through: "profile_role",
        as: "profiles",
        foreignKey: "role_id",
      });
    }
  }
  Role.init({
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Skill must have a name!" },
        notEmpty: { msg: "Name must not be empty!" },
      },
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};