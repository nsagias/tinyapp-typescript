/**
 * Function to lookup and return users
 * @param {string} id
 * @returns {object} empty object if nothing found or all the urls based on the userID
 */

import { IURLModel } from "../types/urlData";
import { urlData } from "../models/URLModels";


export const getUrlsByUserId = async (id: string): Promise<IURLModel[]> => {
  return await urlData.filter((u: any) => u.userID === id);
};

