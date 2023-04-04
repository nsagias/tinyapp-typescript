import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { IUser } from "../DAL/types/user";
import { getUserByEmail } from "../DAL/userData";
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
 * 
 * @param email 
 * @param password 
 * @returns 
 */
export const login = async (email: string, password: string) => {

    // login section
    const user: IUser | null = await getUserByEmail(email);
    console.log("*USER",user);

    if (!user) return null;

    const userAuth: boolean = await checkPassword(email, password);
    console.log("***Auth:", userAuth);

    if (userAuth) return createAccessToken(user);
    
    return null;
};