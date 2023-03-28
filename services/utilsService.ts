
import uuid from "uuid";
/**
 * Function to create shortURL identifier for database insertion
 * @returns {string} 6 character long string aplhanumeric identifier
 */
const shortURLGenerator = () => {
  return uuid.v4().substring(0, 6);
};

module.exports = { 
  shortURLGenerator
};