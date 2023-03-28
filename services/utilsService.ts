
import uuid from "uuid";
/**
 * Function to create shortURL identifier for database insertion
 * @returns {string} 6 character long string aplhanumeric identifier
 */
export const idGenerator = (len: number = 6): string => {
  return uuid.v4().substring(0, len).toString();
};
