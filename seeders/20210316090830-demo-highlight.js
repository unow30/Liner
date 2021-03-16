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
    queryInterface.bulkInsert('Highlights', [{
      id: 1,
      pageId: 1,
      colorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      pageId: 2,
      colorId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      pageId: 3,
      colorId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      pageId: 4,
      colorId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      pageId: 5,
      colorId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      pageId: 6,
      colorId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      pageId: 7,
      colorId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      pageId: 8,
      colorId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 9,
      pageId: 9,
      colorId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Highlights', null, {})
  }
};
