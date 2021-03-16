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
    return queryInterface.bulkInsert('Colors', [{
      id: 1,
      themeId: 1,
      num: 1,
      colorHex: '#ffff8d',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      themeId: 1,
      num: 2,
      colorHex: '#a5f2e9',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      themeId: 1,
      num: 3,
      colorHex: '#ffd5c8',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      themeId: 2,
      num: 1,
      colorHex: '#f6f0aa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      themeId: 2,
      num: 2,
      colorHex: '#d3edd1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      themeId: 2,
      num: 3,
      colorHex: '#f9d6c1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      themeId: 3,
      num: 1,
      colorHex: '#f4ff40',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      themeId: 3,
      num: 2,
      colorHex: '#8affd7',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 9,
      themeId: 3,
      num: 3,
      colorHex: '#ffc477',
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
    return queryInterface.bulkDelete('Colors', null, {})
  }
};
