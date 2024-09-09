'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Crops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      crop_name: {
        type: Sequelize.STRING
      },
      variety: {
        type: Sequelize.STRING
      },
      sowing_area: {
        type: Sequelize.STRING
      },
      soil_type: {
        type: Sequelize.STRING
      },
      sowing_date: {
        type: Sequelize.DATE
      },
      hectare: {
        type: Sequelize.INTEGER
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',  // References the 'Users' table
          key: 'id'        // References the 'id' field in the 'Users' table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Crops');
  }
};