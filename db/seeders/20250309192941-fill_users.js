'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_data', [
      {
        login: 'First_user',
        tabel: 571,
        password: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'Second_user',
        tabel: 572,
        password: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'Third_user',
        tabel: 573,
        password: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'Fourth_user',
        tabel: 574,
        password: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_data', null, {});
  }
};
