'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Tags', ['text'], {
      type: 'unique',
      name: 'text'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tags');
  }
};
