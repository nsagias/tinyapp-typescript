import bcrypt from "bcryptjs";
import { users } from "../databases/userModelSeed";
import User from "../models/userModels";
import { IUserModel } from "../types/user";
/**
 * Function to used to create a new user
 * @param {number} id
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {array} enters the new user into the database
 */
export const createUserMock = async (name: string, email:string, password: string): Promise<IUserModel | boolean> => {
  let newUser: IUserModel | null = { 
  
    name: name, 
    email: email, 
    password: await bcrypt.hashSync(password, 10)
  };
  if (newUser) {
    await users.push(...users, newUser);
    await console.log("CREATED NEW DB", users);
    await console.log("CREATED NEW USER", newUser);
    return newUser;
    // return true;
  }
  return false;
};

export const createUser = async (name: string, email: string, password: string): Promise<IUserModel | boolean> => {
  
  let newUser: any = { 
    name: name, 
    email: email, 
    password: await bcrypt.hashSync(password, 10)
  };
  if (newUser) {
    // await users.push(...users, newUser);
    await console.log("CREATED NEW DB", users);
    await console.log("CREATED NEW USER", newUser);

    const createdUser: any = await User.create(newUser);
    console.log("created user", createdUser);
    return true;
  }
  return false;
};


/**
 * Function to confirm user in database
 * used to avoid duplicate user creation
 * @param {string} userEmail
 * @returns {boolean or undefined} true if user in database or undefined
 */
export const getUserByEmail = async (userEmail: string): Promise<IUserModel | boolean> => {
  const user: any =  await users.filter((user: IUserModel) => user.email === userEmail);
  if (user) {
    return user[0];
  }
  return false;
};