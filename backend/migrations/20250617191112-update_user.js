'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'profile_cofirmed', {
          type: Sequelize.DataTypes.BOOLEAN, defaultValue: false,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'settings_confirmed', {
          type: Sequelize.DataTypes.BOOLEAN, defaultValue: false,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'profile_img', {
          type: Sequelize.DataTypes.STRING(6000),defaultValue:"",
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'profile_cofirmed',{ transaction: t }),
        queryInterface.removeColumn('users', 'settings_confirmed',{ transaction: t }),
        queryInterface.removeColumn('users', 'profile_img', { transaction: t })
      ]);
    });
  }
};

