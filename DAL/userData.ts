import bcrypt from "bcryptjs";
import { users } from "../databases/userModelSeed";
import { User } from "../models";
import { IUser } from "../types/user";


export const createUser = async (firstName: string, lastName: string, email: string, password: string, active: boolean): Promise<IUser | boolean> => {
  
  const newUser = {
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10),
    active,
    deletedAt: new Date()
  } as User;

  return await User.create(newUser);  
};


/**
 * 
 * @param id 
 * @param deletedDate 
 * @param isActive 
 * @returns 
 */
export const getUserById = async (id: number, deletedDate: Date | undefined = undefined, isActive: boolean = true ): Promise<IUser | null> => {
  return await User.findOne({ where: { id, deletedAt: deletedDate, active: isActive } });
};

/**
 * 
 * @param email 
 * @param deletedDate 
 * @param isActive 
 * @returns 
 */
export const getUserByEmail = async (email: string, deletedDate: Date | undefined = undefined, isActive: boolean = true): Promise<IUser | null> => {
  return await User.findOne({ where: { email, deletedAt: deletedDate, active: isActive  } });
};


/**
 * 
 * @param id 
 * @param values 
 * @returns 
 */
export const updateById = async (id: number, values: Partial<IUser>): Promise<boolean>  => {
  const user = await User.findByPk(id);
  if (!user) return false;

  await user.set(values);
  await user.save();

  return true;
};


/**
 * 
 * @param deletedDate 
 * @param isActive 
 * @returns 
 */
export const getAllUsers = async (deletedDate: Date | undefined = undefined, isActive: boolean = true) => {
  return await User.findAll({where: { deletedAt: deletedDate, active: isActive }});
};
