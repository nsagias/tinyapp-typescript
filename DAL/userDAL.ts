import { Op } from "sequelize";
import { User } from "../src/models";
import { IUser } from "../src/models/types/user";
import { hashPassword } from "../src/services/authService";


/**
 * Create new user
 * @param firstName 
 * @param lastName 
 * @param email 
 * @param password 
 * @returns created user object or null
 */
export const createUser = async (firstName: string, lastName: string, email: string, password: string): Promise<IUser | null> => {
  
  const hashedPassword = await hashPassword(password);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    active: true
  } as User;

  return await User.create(newUser);  
};


/**
 * Get User by primary key
 * @param id 
 * @param deletedDate 
 * @param isActive 
 * @returns single user object or null
 */
export const getUserById = async (id: number, deletedDate: Date | null = null, isActive: boolean = true ): Promise<IUser | null> => {
  return await User.findOne({ where: { id, deletedAt: deletedDate, active: isActive } });
};

/**
 * Get user by email
 * @param email 
 * @param deletedDate 
 * @param isActive 
 * @returns user object or null
 */
export const getUserByEmail = async (email: string, deletedDate: Date | null = null, isActive: boolean = true): Promise<IUser | null> => {
  return await User.findOne({ where: { email, deletedAt: deletedDate, active: isActive  } });
};


/**
 * Updates existing user
 * @param id 
 * @param values 
 * @returns boolean
 */
export const updateUserById = async (id: number, values: Partial<IUser>): Promise<boolean>  => {
  const user = await User.findByPk(id);
  if (!user) return false;

  await user.set(values);
  await user.save();

  return true;
};


/**
 * Get all users
 * @param showActive 
 * @param showDeleted 
 * @returns a list of users
 * 
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