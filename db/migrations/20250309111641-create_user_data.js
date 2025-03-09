'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_data', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: 'VARCHAR(100)',
        allowNull: false,
      },
      tabel: {
        type: 'VARCHAR(100)',
      },
      password: {
        type: 'VARCHAR(120)',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_data');
  }
};
