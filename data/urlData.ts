/**
 * Function to lookup and return users
 * @param {string} id
 * @returns {object} empty object if nothing found or all the urls based on the userID
 */

import { IURLModel } from "../types/urlData";
import { urlData } from "../models/URLModels";
import { idGenerator } from "../services/utilsService";
import moment from "moment";

/**
 * Get urls by user id
 * @param id 
 * @returns 
 */

export const getUrlsByUserId = async (id: string): Promise<IURLModel[]> => {
  return await urlData.filter((u: any) => u.userID === id);
};

/**
 * Get
 * @param shotenedURLId 
 */
export const getURLByShortenedURL = async (shotenedURLId: string) => {
  return await urlData.filter((u: any) => u.shortenedURL === shotenedURLId);
};


/**
 * Create new short url for user
 * @param longURL 
 * @param userId 
 * @returns 
 */
export const createNewURL = async (longURL: string, userId: string): Promise<IURLModel | string> => {
  let newShortURLId = await idGenerator();
  console.log("NEW GENERATED LINK", newShortURLId);

  // check if already exists before generatoring
  let isExistingURL = await getURLByShortenedURL(newShortURLId);

  if (isExistingURL) {
    // existing call new url with 8 letter
    newShortURLId = await idGenerator(8);
  }

  const newURL: IURLModel | null = await { 
    shortenedURL : newShortURLId,
    longURL: longURL,
    userID: userId,
    createdAt: await moment().format('MMMM Do YYYY'),
  };

  if (newURL) {
    await urlData.push(...urlData, newURL);
    await console.log("CREATED SHORT URL", newURL);
    await console.log("CREATED NEW USER", urlData);
    return newURL;
    // // return true;
  }
  // return false;
  return "failed to create new url";
};
