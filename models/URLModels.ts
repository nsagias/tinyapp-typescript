import { IURLModel } from "../types/urlData";
import { DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../databases/sequelize/sequelize_config"
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

// export default class ShortURL extends Model {
//   declare id: number;
//   declare shortenedURL: string;
//   declare longURL: string;

// }

export interface URLInput extends Optional<IURLModel, "id" > {}
export interface URLOutput extends Required<IURLModel> {}


export default class ShortURL extends Model<IURLModel, URLInput> implements IURLModel {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

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
    // references: {
    //   model: "users", // name of Target model
    //   key: 'id', // key in Target model that we're referencing
    // },
  },
}, { 
  timestamps: true,
  sequelize,
  paranoid: true,
  modelName: 'shorturls',
});


ShortURL.belongsTo(User, {foreignKey: 'users_id', targetKey: 'id'});
