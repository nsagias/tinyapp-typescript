import { Model, DataTypes, Optional } from "sequelize";
import bcrypt2 from "bcryptjs";
import { sequelize } from "../databases/sequelize/sequelize_config"
import ShortURL from "./URLModels";
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



export interface UserInput extends Optional<IUserModel, "id" > {}
export interface UserOutput extends Required<IUserModel> {}


// export default class Users extends Model {
//   declare id: number;
//   declare name: string;
//   declare email: string;
//   declare password: string;
  
// }


export default class User extends Model<IUserModel, UserInput> implements IUserModel {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public deleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
  
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "id"
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "name"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "email"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "password"
  },

}, { 

  timestamps: true,
  sequelize,
  paranoid: true,
  modelName: 'users',
});

// Users.hasMany(Tokens, { foreignKey: "user_id" });
User.hasMany(ShortURL, { foreignKey: "user_id" });


