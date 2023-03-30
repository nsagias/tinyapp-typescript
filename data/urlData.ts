import { IURLModel } from "../types/urlData";
import { urlData } from "../models/URLModels";
import { idGenerator } from "../services/utilsService";
import moment from "moment";

/**
 * Get urls by user id
 * @param userId urls id
 * @returns all urls for a user
 */
export const getUrlsByUserId = async (userId: string): Promise<IURLModel[]> => {
  return await urlData.filter((u: any) => u.userID === userId);
};

/**
 * Get url by shortend name
 * @param shotenedURLId
 * @returns 
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
  
  // check if already exists before generatoring
  const isExistingURL = await getURLByShortenedURL(newShortURLId);

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
    // TODO: replace with real db
    urlData.push(...urlData, newURL);
    console.log("CREATED SHORT URL", newURL);
    console.log("CREATED NEW URL DATA", urlData);
    return newURL;
    // // return true;
  }
  // return false;
  return "failed to create new url";
};


/**
 * Get url by long name
 * @param longURL 
 * @param userId 
 * @returns {boolean}
 */
export const getURLByLongName = async (longURL: string, userId: string): Promise<boolean> => {
  // get exiting urls for user
  const usersURLs =  await getUrlsByUserId(userId);

  // filter if exiting urls exist for user
  const existingURL = usersURLs && usersURLs.length > 0 && usersURLs.filter(u => u.longURL  === longURL).length > 0;
  
  // return true if existing
  if(existingURL) return true;

  return false;
};


export const deleteByShortURLId = async (URLId:string, userId: string): Promise<boolean> => {
  // confirm existing url
  const isExistingURL = await getURLByShortenedURL(URLId);

  // if doesn't exist return true
  if (!isExistingURL || isExistingURL.length === 0) return true;

  const isOwnedByLoggedInUser = isExistingURL[0].userID === userId;
  if (!isOwnedByLoggedInUser) throw new Error("not own by user");

  console.log("IS OWNED BY LOGGED IN USER", isOwnedByLoggedInUser)

  // if existing check belongs to user
  if (isExistingURL && isOwnedByLoggedInUser) {
    
    // TODO: replace with real db
    const findData = await urlData.findIndex((u: any) => u.shortenedURL === URLId);
    
    urlData.splice(findData, 1)
  
    return true;
  }
  return false;
}