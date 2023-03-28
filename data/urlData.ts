/**
 * Function to lookup and return users
 * @param {string} id
 * @param {object} db
 * @returns {object} empty object if nothing found or all the urls based on the userID
 */

import { IURLModel } from "../types/urlData";

const getUrlsByUser = async (id: string, db: IURLModel[]): Promise<IURLModel[]> => {
  return await db.filter(x => x.userID === id);
};

module.exports = {
  getUrlsByUser
};