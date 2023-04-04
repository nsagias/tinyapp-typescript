import { Token } from "../models";
import { IToken } from "./types/token";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
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
 * Create new access token and dave to db
 * @param user 
 * @param ip 
 * @returns token or null
 */
export const createAccessToken = async (user: any, ip: string ): Promise<IToken| null> => {
  // get auth secret and issuer from .env
  const authSecret = process.env.AUTH_SECRET || null;
  const issuer = process.env.TOKEN_ISSUER || null;

  // Return null if no auth token
  if (!authSecret || !issuer) return null;

  // Create signed auth token
  const authToken = await jwt.sign(user, authSecret, {
    algorithm: "HS256",
    issuer,
    subject: user.id
  });

  // new token to be saved
  const newTokenRecord = { authToken, ip, userId: user.id };

  // Create new record
  const createdTokenRecord = Token.create(newTokenRecord);

  // Check if record created
  if (!createdTokenRecord) return null;

  // return created token
  return createdTokenRecord;
};