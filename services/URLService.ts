/**
 * Function to lookup and return users
 * @param {string} id
 * @param {object} db
 * @returns {object} empty object if nothing found or all the urls based on the userID
 */

type URLSByUser = {
  longURL: string, 
  reatedAt: Date,
}

type UrlItem {
  longURL: string;
  userID: string;
  createdAt: string;
}

const getUrlsByUser = (id: number, db: any[]) => {
  let result: URLSByUser = {};

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
  getUrlsByUser
};