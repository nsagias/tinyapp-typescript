import { IUrlModel } from "../types/urlModel";

export let urlData: IUrlModel[] = [
  { 
    id: 1,
    longUrl: "http://www.lighthouselabs.ca",
    shortUrl : "b2xVn2",
    count: 1,
    userId: 1,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  {
    id: 2,
    shortUrl : "9sm5xk",
    longUrl: "http://www.google.com",
    userId: 1,
    count: 1,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  {
    id: 3,
    shortUrl :"9sm511",
    longUrl: "http://www.bingo.com",
    count: 3,
    userId: 2,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  { 
    id: 4,
    shortUrl :"c2k511",
    longUrl: "http://www.yahoo.com",
    count: 5,
    userId: 2,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  }
];


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

type UrlModelAssociations = "user";

export class UrlModel extends Model<
  InferAttributes<UrlModel, {omit: UrlModelAssociations}>,
  InferCreationAttributes<UrlModel, {omit: UrlModelAssociations}>
> {
  declare id: CreationOptional<number>;
  declare longUrl: string;
  declare shortUrl: string;
  declare count: number;
  declare userId: string;
  declare deletedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // UrlModel belongsTo User
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;
  
  declare static associations: {
    user: Association<UrlModel, User>
  };

  static initModel(sequelize: Sequelize): typeof UrlModel {
    UrlModel.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      longUrl: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      shortUrl: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      count: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
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
    
    return UrlModel;
  }
}
