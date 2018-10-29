'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Likes', ['userId', 'imageId'], {
      type: 'unique',
      name: 'userImage'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};
