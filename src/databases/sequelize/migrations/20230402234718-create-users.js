const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING(128),
        field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(128),
        field: 'last_name',
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(128),
        field: 'email',
        allowNull: false
      },
      emailVerified: {
        type: DataTypes.DATE,
        field: 'email_verified'
      },
      password: {
        type: DataTypes.STRING(128),
        field: 'password',
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        field: 'active',
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};