import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/userData";

/**
 * Check password matches db
 * @param {string} email
 * @param {string} password
 * @returns {string} returns a user ID if authenticated or undefined if not authenticated
 */
export const checkPassword = async (email: string, password: string): Promise<boolean> => {
  const user: any = await getUserByEmail(email);
  if (!user) {
    return false;
  }
  if (bcrypt.compareSync(password, user.password)) {
   return true; 
  }
  return false;
};