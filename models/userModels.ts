import bcrypt2 from "bcryptjs";
import { Association, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../databases/sequelize/sequelize_config"
import { IUserModel } from "../types/user";
import ShortURL from "./URLModels";



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


class User extends Model implements IUserModel {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare deleted: boolean;

  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;


  declare static associations: {
    shorturls: Association<User, ShortURL>;
  };
  
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
  modelName: 'users'
});

// Users.hasMany(Tokens, { foreignKey: "user_id" });
// User.hasMany(ShortURL, {
//   sourceKey: "id",
//   foreignKey: 'user_id',
//   as: 'shorturls' // this determines the name in `associations`!
// });
// User.hasMany(ShortURL);

// User.sync({ alter: true })

// User.hasMany(ShortURL)

export default User;

