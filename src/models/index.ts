import type { Sequelize, Model } from 'sequelize'
import { User } from './User'
import { UrlModel } from './UrlModel'
import { Token } from './Token'

export {
  User,
  UrlModel,
  Token
}

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize)
  UrlModel.initModel(sequelize)
  Token.initModel(sequelize)

  User.hasMany(UrlModel, {
    as: 'urlModels',
    foreignKey: 'user_id'
  })
  User.hasMany(Token, {
    as: 'tokens',
    foreignKey: 'user_id'
  })
  UrlModel.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })
  Token.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })

  return {
    User,
    UrlModel,
    Token
  }
}

