'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('organizations', 'description', {
          type: Sequelize.DataTypes.STRING(3000),
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('organizations', 'description', {
          type: Sequelize.DataTypes.STRING(3000),
        },{ transaction: t })
      ]);
    });
  }
};

