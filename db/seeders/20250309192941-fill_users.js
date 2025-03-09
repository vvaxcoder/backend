'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_data', [
      {
        login: 'First_user',
        tabel: 'U571',
        password: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'Second_user',
        tabel: 'U572',
        password: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'Third_user',
        tabel: 'U573',
        password: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'Fourth_user',
        tabel: 'U574',
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
