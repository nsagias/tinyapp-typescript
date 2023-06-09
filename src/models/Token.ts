import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from "sequelize";
import type { User } from "./User";

type TokenAssociations = "user";

export class Token extends Model<
  InferAttributes<Token, {omit: TokenAssociations}>,
  InferCreationAttributes<Token, {omit: TokenAssociations}>
> {
  declare id: CreationOptional<number>;
  declare authToken: string;
  declare refreshToken: string | null;
  declare refreshedTokenAt: Date | null;
  declare tokenIp: string | null;
  declare userId: string;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Token belongsTo User
  declare user?: NonAttribute<User>;;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;
  
  declare static associations: {
    user: Association<Token, User>
  };

  static initModel(sequelize: Sequelize): typeof Token {
    Token.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      authToken: {
        type: DataTypes.STRING,
        allowNull: false
      },
      refreshToken: {
        type: DataTypes.STRING
      },
      refreshedTokenAt: {
        type: DataTypes.DATE
      },
      tokenIp: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    
    return Token;
  }
}