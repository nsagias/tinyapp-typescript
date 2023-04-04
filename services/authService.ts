import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { IUser } from "../DAL/types/user";
import { createUser, getUserByEmail } from "../DAL/userData";
dotenv.config();

/**
 * Password hashing function to encapsulate 
 * @param password 
 * @param rounds 
 * @returns 
 */
export const hashPassword = async (password: string, rounds: number = 10): Promise<string> => {
  return await bcrypt.hash(password, rounds);
};

/**
 * Password compare to check if password send matches hashed password
 * @param password 
 * @param hashedPassword 
 * @returns 
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};


/**
 * Check password matches db
 * @param {string} email
 * @param {string} password
 * @returns {string} returns a user ID if authenticated or undefined if not authenticated
 */
export const checkPassword = async (email: string, password: string): Promise<boolean> => {
  const user: any = await getUserByEmail(email);

  // check if user exists
  if (!user) return false;

  // check if passwords match
  const passwordsMatch = await comparePassword(password, user.password);
  
  if (passwordsMatch) return true; 
  
  return false;
};


/**
 * Create as token
 * @param user user object 
 * @returns token
 */
export const createAccessToken = async (user: any ) => {
  const authSecret = process.env.AUTH_SECRET || null;
  const issuer = process.env.TOKEN_ISSUER || null;

  if (!authSecret || !issuer) return null;

  const token = await jwt.sign(user, authSecret, {
    algorithm: "HS256",
    issuer,
    subject: user.id
  });

  return token;
};


/**
 * Login user
 * @param email 
 * @param password 
 * @returns token or null
 */
export const login = async (email: string, password: string, ip: string) => {
  // login section
  const user: IUser | null = await getUserByEmail(email);

  if (!user) return null;

  const userAuth: boolean = await checkPassword(email, password);


  if (userAuth) return createAccessToken(user);
  
  return null;
};


/**
 * Create and login user
 * @param firstName 
 * @param lastName 
 * @param email 
 * @param password 
 * @returns token or null
 */
export const createAndLoginUser = async(firstName: string, lastName: string, email: string, password: string, ip: string) => {
  // check if existing user
  const userExist: IUser | null = await getUserByEmail(email);

  if (userExist) return null;
    
  // create new user
  const newUser = await createUser(firstName, lastName, email, password);

  if (!newUser) return null;

  return await login(email, password, ip);
};