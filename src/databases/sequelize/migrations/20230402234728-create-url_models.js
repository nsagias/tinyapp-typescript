const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('url_models', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      longUrl: {
        type: DataTypes.STRING(128),
        field: 'long_url',
        allowNull: false
      },
      shortUrl: {
        type: DataTypes.STRING(128),
        field: 'short_url',
        allowNull: false
      },
      count: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: 'count',
        allowNull: false
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
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
    await queryInterface.dropTable('url_models');
  },
};