import { DataTypes, Model, Optional, ForeignKey } from "sequelize";
import { sequelize } from "../databases/sequelize/sequelize_config";
import { IURLModel } from "../types/urlData";
import User from "./userModels";

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


export default class ShortURL extends Model implements IURLModel {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare user_id: ForeignKey<User['id']>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ShortURL.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "id",
  },
  shortenedURL: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "shortenedURL"
  },
  longURL: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "longURL"
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: User,
      key: "user_id"
  }
  },
}, { 
  timestamps: true,
  sequelize,
  paranoid: true,
  modelName: "shorturls",
});

// ShortURL.belongsTo(User, {as: 'User', foreignKey: 'user_id'});
