import { Op } from "sequelize";
import { UrlModel } from "../models/UrlModel";
import { idGenerator } from "../services/utilsService";

/**
 * Get urls by user id
 * @returns all urls for a user
 */
export const getUrlsByUserId = async (userId: string): Promise<UrlModel[]> => {
  return await UrlModel.findAll({ where : { userId } });
};


/**
 * 
 * @param shortUrl 
 * @returns 
 */
export const getUrlByShortUrl = async (shortUrl: string) => {
  return await UrlModel.findOne({ where : { shortUrl } });
};


/**
 * Get url by long name
 * @param longURL 
 * @param userId 
 * @returns {boolean}
 */
export const getUrlByLongUrl = async (userId: string, longUrl: string): Promise<boolean> => { 
  const existingUrl = await UrlModel.findOne({ 
    where : { 
      userId, 
      longUrl, 
      deletedAt: {[Op.eq]: null }
      } 
  });
  // return true if existing
  if(existingUrl) return true;
  return false;
};


/**
 * Create new short url for user
 * @param longURL 
 * @param userId 
 * @returns 
 */
export const createShortUrl = async (longUrl: string, userId: string): Promise<UrlModel | null> => {
  let shortUrl = await idGenerator();
  
  // check if already exists before generatoring
  const isExistingUrl = await getUrlByShortUrl(shortUrl);

  if (isExistingUrl) {
    // existing call new url with 8 letter
    shortUrl = await idGenerator(8);
  }

  const newUrl: UrlModel = { 
    longUrl,
    shortUrl,
    count: 0,
    userId
  } as UrlModel;

  const createdNewUrl = await UrlModel.create(newUrl);

  if (createdNewUrl) return createdNewUrl;
  return null;
};





export const deleteByShortUrlId = async (shortenedUrlId:string, userId: string): Promise<boolean> => {
  // confirm existing url
  const isExistingURL: any = await getUrlByShortUrl(shortenedUrlId);

  // if doesn't exist return true
  if (!isExistingURL || !(isExistingURL.length > 0)) return true;

  // const isOwnedByLoggedInUser = isExistingURL[0].userId === userId;
  // if (!isOwnedByLoggedInUser) throw new Error("not own by user");

  // console.log("IS OWNED BY LOGGED IN USER", isOwnedByLoggedInUser)

  // if existing check belongs to user
  // if (isExistingURL && isOwnedByLoggedInUser) {
  if (isExistingURL) {
    
    // TODO: replace with real db
    // const findData = await urlData.findIndex((u: any) => u.shortenedURL === shortenedURLId);
    
    // urlData.splice(findData, 1)
    
  
    return true;
  }
  return false;
}