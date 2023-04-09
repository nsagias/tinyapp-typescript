const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tokens', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      authToken: {
        type: DataTypes.STRING,
        field: 'auth_token',
        allowNull: false
      },
      refreshToken: {
        type: DataTypes.STRING,
        field: 'refresh_token'
      },
      refreshedTokenAt: {
        type: DataTypes.DATE,
        field: 'refreshed_token_at'
      },
      tokenIp: {
        type: DataTypes.STRING,
        field: 'token_ip'
      },
      userId: {
        type: DataTypes.STRING,
        field: 'user_id',
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
    await queryInterface.dropTable('tokens');
  },
};