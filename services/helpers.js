/**
 * Function to lookup and return users
 * @param {string} id
 * @param {object} db
 * @returns {object} empty object if nothing found or all the urls based on the userID
 */
const urlsForUser = (id, db) => {
  let result = {};
  for (let shortURL in db) {
    if (db[shortURL].userID === id) {
      result[shortURL] = {
        longURL: db[shortURL].longURL,
        createdAt: db[shortURL].createdAt
      };
    }
  }
  return result;
};



module.exports = {
  shortURLGenerator,
  userId,
  findUserByEmail,
  newUser,
  authenticateByPassword,
  urlsForUser,
};