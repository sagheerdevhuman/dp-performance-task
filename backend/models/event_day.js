'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event_Day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event }) {
      this.belongsTo(Event, {
        foreignKey: {
          type:DataTypes.UUID,
          allowNull: false,
          name: "event_id"
        },
        as: "event",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Event_Day.init({
    event_id: {
      type: DataTypes.UUID,
      defaultValue: null,
    },
    
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Event must have a date!" },
        notEmpty: { msg: "Date must not be empty!" },
      },
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: { msg: "Event must have a start time!" },
        notEmpty: { msg: "Start time must not be empty!" },
        isNumeric: true,
      },
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: { msg: "Event must have a start timer!" },
        notEmpty: { msg: "End time must not be empty!" },
        isNumeric: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Event_Day',
  });
  return Event_Day;
};