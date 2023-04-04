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

