'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Themes', [{
      id: 1,
      themeName: '테마1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      themeName: '테마2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      themeName: '테마3',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Themes', null, {})
  }
};
