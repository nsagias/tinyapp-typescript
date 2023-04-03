const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('url_models', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'url_models_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('tokens', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'tokens_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('url_models', 'url_models_user_id_fkey')
    await queryInterface.removeConstraint('tokens', 'tokens_user_id_fkey')
  }
};