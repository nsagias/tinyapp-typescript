import bcrypt2 from "bcryptjs";
import { IUserModel } from "../types/user";

export let users: IUserModel[] = [
   {
    id: 1,
    name: "red",
    email: "red@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
   {
    id: 2,
    name: "green",
    email: "green@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
 {
    id: 3, 
    name: "blue",
    email: "blue@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  }
];


import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from "sequelize";
import type { Token } from "./Token";
import type { UrlModel } from "./UrlModel";

type UserAssociations = "urlModels" | "tokens";

export class User extends Model<
  InferAttributes<User, {omit: UserAssociations}>,
  InferCreationAttributes<User, {omit: UserAssociations}>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare emailVerified: string;
  declare password: string;
  declare active: boolean;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // User hasMany UrlModel
  declare urlModels?: NonAttribute<UrlModel[]>;
  declare getUrlModels: HasManyGetAssociationsMixin<UrlModel>;
  declare setUrlModels: HasManySetAssociationsMixin<UrlModel, number>;
  declare addUrlModel: HasManyAddAssociationMixin<UrlModel, number>;
  declare addUrlModels: HasManyAddAssociationsMixin<UrlModel, number>;
  declare createUrlModel: HasManyCreateAssociationMixin<UrlModel>;
  declare removeUrlModel: HasManyRemoveAssociationMixin<UrlModel, number>;
  declare removeUrlModels: HasManyRemoveAssociationsMixin<UrlModel, number>;
  declare hasUrlModel: HasManyHasAssociationMixin<UrlModel, number>
  declare hasUrlModels: HasManyHasAssociationsMixin<UrlModel, number>;
  declare countUrlModels: HasManyCountAssociationsMixin;
  
  // User hasMany Token
  declare tokens?: NonAttribute<Token[]>;
  declare getTokens: HasManyGetAssociationsMixin<Token>;
  declare setTokens: HasManySetAssociationsMixin<Token, number>;
  declare addToken: HasManyAddAssociationMixin<Token, number>;
  declare addTokens: HasManyAddAssociationsMixin<Token, number>;
  declare createToken: HasManyCreateAssociationMixin<Token>;
  declare removeToken: HasManyRemoveAssociationMixin<Token, number>;
  declare removeTokens: HasManyRemoveAssociationsMixin<Token, number>;
  declare hasToken: HasManyHasAssociationMixin<Token, number>;
  declare hasTokens: HasManyHasAssociationsMixin<Token, number>;
  declare countTokens: HasManyCountAssociationsMixin;
  
  declare static associations: {
    urlModels: Association<User, UrlModel>,
    tokens: Association<User, Token>
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      emailVerified: {
        type: DataTypes.DATE
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
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

    return User;
  }
}