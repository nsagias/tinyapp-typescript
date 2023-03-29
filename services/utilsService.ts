
import { v4 }from "uuid";
/**
 * Function to create shortURL identifier for database insertion
 * @returns {string} 6 character long string aplhanumeric identifier
 */
export const idGenerator = async(len: number = 6): Promise<string> => {
  return await v4().substring(0, len).toString();
};
