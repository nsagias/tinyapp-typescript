import { Token } from "../models";
import { IToken } from "../models/types/token";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import { IUser } from "../models/types/user";
dotenv.config();


/**
 * Get token by id
 * @param id 
 * @returns 
 */
export const getTokenById = async (id: number ): Promise<IToken | null> => {
  return await Token.findOne({ where: { 
    id, 
    deletedAt: { [Op.eq]: null }
  } });
};


/**
 * Get token by user id and tokenIP
 * @param userId 
 * @returns 
 */
// TODO: add unique to db
export const getTokenByUserIdAndIp = async (userId: string, tokenIp: string ): Promise<IToken | null> => {
  return await Token.findOne({ where: { 
    userId,  
    deletedAt: { [Op.eq]: null },
    tokenIp
  } });
};


/**
 * Create new access token and dave to db
 * @param user 
 * @param ip 
 * @returns token or null
 */
export const createAccessToken = async (user: IUser | null , tokenIp: string ): Promise<IToken| null> => {
  // get auth secret and issuer from .env
  const authSecret = process.env.AUTH_SECRET || null;
  const issuer = process.env.TOKEN_ISSUER || null;

  // Return null if no auth token
  if (!authSecret || !issuer) return null;

  // Create signed auth token
  const authToken = jwt.sign(user?.toString()!, authSecret.toString());

  // new token to be saved
  const newTokenRecord: Token = { authToken, tokenIp, userId: user?.id?.toString()} as Token;

  // Create new record
  return await Token.create(newTokenRecord) || null;
};


/**
 * Updated token by id
 * @param id 
 * @param values 
 * @returns updated tokenn
 */
export const updateTokenById = async (id: number, values: Partial<IToken>): Promise<IToken | null> => {
  // find token by id
  const token = await Token.findByPk(id);

  // if not token return null
  if (!token) return null;

  // update and save new values
  await token.set(values);

  return await token.save() || null;
};


/**
 * Delete token by id
 * @param id 
 * @returns boolean
 */
export const deleteTokenById = async (id: number): Promise<boolean> => {

  // confirm existing url
  const existingToken: IToken | null = await getTokenById(id);
 
  // if doesn't exist return true
  if (!existingToken) return false;

  // Update token
  const hasUpdatedToken = await updateTokenById(id, { deletedAt: new Date() });
  if (hasUpdatedToken) return true;
 
  return false;
};


/**
 * Check for existing tokens for user ip and delete
 * @param id 
 * @param ip 
 * @returns boolean | null
 */
export const checkTokenForIpAndDelete = async (userId: string, ip: string): Promise<boolean | null> => {
  // check for existing
  const isExistingToken = await getTokenByUserIdAndIp(userId.toString(), ip);
  // delete token before creating new token for ip
  if (!isExistingToken)  return null;

  return await deleteTokenById(isExistingToken.id!);
};