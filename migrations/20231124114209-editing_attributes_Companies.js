"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.removeColumn("Companies", "name");
    // await queryInterface.removeColumn("Companies", "address");
    // await queryInterface.removeColumn("Companies", "capital");
    // await queryInterface.removeColumn("Companies", "editedCapital");
    // await queryInterface.addColumn("Companies", "name", {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn("Companies", "address", {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn("Companies", "capital", {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn("Companies", "editedCapital", {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
