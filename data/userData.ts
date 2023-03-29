import bcrypt from "bcryptjs";
import { users } from "../models/userModels";
import { IUserModel } from "../types/user";
/**
 * Function to used to create a new user
 * @param {string} id
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {array} enters the new user into the database
 */
export const createUser = (id: string, name: string, email:string, password: string) => {
  let result: IUserModel | null = { 
    id: id, 
    name: name, 
    email: email, 
    password: bcrypt.hashSync(password, 10)
  };
  return users.push(...users, result);
};


/**
 * Function to confirm user in database
 * used to avoid duplicate user creation
 * @param {string} userEmail
 * @returns {boolean or undefined} true if user in database or undefined
 */
export const getUserByEmail = async (userEmail: string): Promise<IUserModel | undefined> => {
  const user: any =  await users.filter((user: IUserModel) => user.email === userEmail);
  if (user) {
    return user;
  }
  return undefined;
};