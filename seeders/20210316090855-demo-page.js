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
    return queryInterface.bulkInsert('Pages', [{
      id: 1,
      userId: 1,
      pageUrl: 'web1.com',
      text: 'web1text1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      userId: 1,
      pageUrl: 'web1.com',
      text: 'web1text2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      userId: 1,
      pageUrl: 'web2.com',
      text: 'web2text1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      userId: 1,
      pageUrl: 'web2.com',
      text: 'web2text2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      userId: 2,
      pageUrl: 'web3.com',
      text: 'web3text1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      userId: 2,
      pageUrl: 'web3.com',
      text: 'web3text2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      userId: 2,
      pageUrl: 'web3.com',
      text: 'web3text3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      userId: 3,
      pageUrl: 'web4.com',
      text: 'web4text1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 9,
      userId: 3,
      pageUrl: 'web4.com',
      text: 'web4text2',
      createdAt: new Date(),
      updatedAt: new Date()
    },])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Pages', null, {})
  }
};
