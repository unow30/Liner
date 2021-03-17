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
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      password: 'ghdrlfehd',
      name: '홍길동',
      isPremium: true,
      themeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      password: 'dltnstls',
      name: '이순신',
      isPremium: true,
      themeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      password: 'kimyunho',
      name: '김윤호',
      isPremium: true,
      themeId: 3,
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
