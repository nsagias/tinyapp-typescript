import { IURLModel } from "../types/urlData";


export let urlData: IURLModel[] = [
  { 
    id: 1,
    shortenedURL : "b2xVn2",
    longURL: "http://www.lighthouselabs.ca",
    user_id: 1,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },{
    id: 2,
    shortenedURL : "9sm5xk",
    longURL: "http://www.google.com",
    user_id: 1,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  {
    id: 3,
    shortenedURL :"9sm511",
    longURL: "http://www.bingo.com",
    user_id: 2,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  { 
    id: 4,
    shortenedURL :"c2k511",
    longURL: "http://www.yahoo.com",
    user_id: 2,
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
  declare deletedAt: Date | null;
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
        type: DataTypes.STRING,
        allowNull: false
      },
      shortUrl: {
        type: DataTypes.STRING,
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
