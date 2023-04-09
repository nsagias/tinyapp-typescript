import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { checkTokenForIpAndDelete, createAccessToken, getTokenByUserIdAndIp } from "../DAL/tokenDAL";
import { IUser } from "../DAL/types/user";
import { createUser, getUserByEmail } from "../DAL/userData";
import jwt, { verify } from 'jsonwebtoken';
import { getUrlByShortUrl } from "../DAL/urlData";
import deepEqual from "deep-equal";

dotenv.config();

/**
 * Password hashing function to encapsulate 
 * @param password 
 * @param rounds 
 * @returns returns hashed passwoord
 */
export const hashPassword = async (password: string, rounds: number = 10): Promise<string> => {
  return await bcrypt.hash(password, rounds);
};

/**
 * Password compare to check if password send matches hashed password
 * @param password 
 * @param hashedPassword 
 * @returns boolean
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};


/**
 * Verify token against secret
 * @param token 
 * @returns returns token payload
 */
export const authenticateToken = async (token: any): Promise<string | jwt.JwtPayload> => {
  const authSecret = process.env.AUTH_SECRET || null;
  return await verify(token.toString(), authSecret!.toString());
};


/**
 * Authenticate token by comparing incoming and token record
 * @param userId 
 * @param ip 
 * @returns token or null
 */
export const authenticateTokenUser = async (userId: string, ip: string, authToken: any): Promise<string | jwt.JwtPayload | null> => {
  // get existing token record and validate user provider token
  const existingTokenRecord = await getTokenByUserIdAndIp(userId.toString(), ip);
  const authenticatedAuthToken = await authenticateToken(authToken);

  // Check if values are null and return null if so
  if (!existingTokenRecord || !authenticatedAuthToken) return null;

  // autehenicate and get existing token data
  const existingTokenRecordData = await authenticateToken(existingTokenRecord?.authToken);

  // if token values match return the authenticated token
  const tokensMatch = deepEqual(existingTokenRecordData, authenticatedAuthToken);
  if (tokensMatch) return authenticatedAuthToken;

  return null;
};


/**
 * Authenticate url belongs to user
 * @param userId 
 * @param ip 
 * @param shortUrl 
 * @returns  boolean
 */
export const authenticateShortUrlBelongsToUser = async (userId: string, ip: string, shortUrl: string, authToken: any): Promise<boolean> =>  {
  //  authenticate token belongs to user
  const existingTokenRecordData = await authenticateTokenUser(userId, ip, authToken) as IUser;
  if (!existingTokenRecordData) return false;
  //  get user id, search for user URL for user by url id
  const isExistsShortUrlForUser =  await getUrlByShortUrl(shortUrl, existingTokenRecordData.id?.toString()!)

  // return true if existing
  if (isExistsShortUrlForUser) return true;
  return false;
};


/**
 * Check password matches db
 * @param string email
 * @param string password
 * @returns boolean
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
 * Login user
 * @param email 
 * @param password 
 * @param ip
 * @returns token or null
 */
export const login = async (email: string, password: string, ip: string) => {
  // login section
  const user: IUser | null = await getUserByEmail(email);
 
  if (!user) return null;

  // check if valid password
  const userAuth: boolean = await checkPassword(email, password);

  if (!userAuth) return null;

  // Check for existing Token and Delete
  await checkTokenForIpAndDelete (user.id?.toString()!, ip);

  // TODO: Refacter into DTO converter
  const userInfo: IUser | null = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    emailVerified: user.emailVerified || null,
    active: user.active,
  };
  
  // if user password authenticated
  const token = await createAccessToken(userInfo, ip);

  if (!token) return null;

  // TODO: DTO
  // return user and token info 
  const authData = { token, userInfo };
  return authData;

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


/**
 * Logout user
 * @param email 
 * @param ip 
 * @param token 
 * @returns boolean or null
 */
export const logout = async (ip: string, token: any): Promise<boolean | null> => {

  // get token data
  const tokenData = await authenticateToken(token) as IUser;

  // if email matches token delete token else return null
  if (tokenData) return await checkTokenForIpAndDelete (tokenData.id?.toString()!, ip);

  return null;
};