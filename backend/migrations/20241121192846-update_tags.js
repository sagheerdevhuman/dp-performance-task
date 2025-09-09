'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Tags', 'name', {
          type: Sequelize.DataTypes.STRING(1000),unique: true,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Tags', 'name', {
          type: Sequelize.DataTypes.STRING(1000),unique: true,
        },{ transaction: t })
      ]);
    });
  }
};

'use strict';



