import { Token } from "../models";
import { IToken } from "./types/token";
import dotenv from "dotenv";
import jwt, { verify } from 'jsonwebtoken';
dotenv.config();


/**
 * Get token by id
 * @param id 
 * @returns 
 */
export const getTokenById = async (id: number ): Promise<IToken | null> => {
  return await Token.findOne({ where: { id} });
};


/**
 * Get token by user id
 * @param userId 
 * @returns 
 */
// TODO: add unique to db
export const getTokenByUserIdAndIp = async (userId: string, tokenIp: string ): Promise<IToken | null> => {
  return await Token.findOne({ where: { userId, tokenIp} });
};



/**
 * Create new access token and dave to db
 * @param user 
 * @param ip 
 * @returns token or null
 */
export const createAccessToken = async (user: any, tokenIp: string ): Promise<IToken| null> => {
  // get auth secret and issuer from .env
  const authSecret = process.env.AUTH_SECRET || null;
  const issuer = process.env.TOKEN_ISSUER || null;

  // Return null if no auth token
  if (!authSecret || !issuer) return null;

  // Create signed auth token
  const authToken = await jwt.sign(user, authSecret.toString());

  // new token to be saved
  const newTokenRecord: Token = { authToken, tokenIp, userId: user.id} as Token;

  // Create new record
  const createdTokenRecord = Token.create(newTokenRecord);

  // Check if record created
  if (!createdTokenRecord) return null;

  // return created token
  return createdTokenRecord;
};

export const verifyToken = async (token: any): Promise<string | jwt.JwtPayload> => {
  const authSecret = process.env.AUTH_SECRET || null;
  const verifycode: string | jwt.JwtPayload = await verify(token.toString(), authSecret!.toString());
  return verifycode;
};

export const getAndVerifyToken = async (userId: string, ip: string): Promise<string | jwt.JwtPayload> => {
  const token = await getTokenByUserIdAndIp(userId, ip);
  const tokenVerifyResult: string | jwt.JwtPayload = await verifyToken(token?.authToken)
  return tokenVerifyResult;
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
  const updatedToken = await token.save();

  return updatedToken;
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