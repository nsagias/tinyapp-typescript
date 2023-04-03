import bcrypt from "bcryptjs";
import { Op } from "sequelize";
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
export const getUserById = async (id: number, deletedDate: Date | null = null, isActive: boolean = true ): Promise<IUser | null> => {
  return await User.findOne({ where: { id, deletedAt: deletedDate, active: isActive } });
};

/**
 * 
 * @param email 
 * @param deletedDate 
 * @param isActive 
 * @returns 
 */
export const getUserByEmail = async (email: string, deletedDate: Date | null = null, isActive: boolean = true): Promise<IUser | null> => {
  return await User.findOne({ where: { email, deletedAt: deletedDate, active: isActive  } });
};


/**
 * 
 * @param id 
 * @param values 
 * @returns 
 */
export const updateUserById = async (id: number, values: Partial<IUser>): Promise<boolean>  => {
  const user = await User.findByPk(id);
  if (!user) return false;

  await user.set(values);
  await user.save();

  return true;
};


/**
 * 
 * @param showActive 
 * @param showDeleted 
 * @returns 
 * showActive true and showDeleted false, shows only active (default setting)
 * showActice false and showDeleted false, shows everything
 * showActive true and showDeleted true, shows nothing
 * showActive false and showDeleted true, shows only deleted
 */
export const getAllUsers = async (showActive: boolean = true, showDeleted: boolean = false) => {
  let query: any = { where : {}};
  if (showActive) query.where.active = showActive;
  if (showDeleted) query.where.deletedAt = { [Op.ne]: null };


  return await User.findAll(query);
};