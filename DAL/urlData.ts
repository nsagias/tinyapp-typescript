import { IUrlModel } from "../types/urlModel";
import { urlData, UrlModel } from "../models/UrlModel";
import { idGenerator } from "../services/utilsService";

/**
 * Get urls by user id
 * @returns all urls for a user
 */
export const getUrlsByUserIdMock = async (userId: number): Promise<IUrlModel[]> => {
  return await urlData.filter((u: any) => u.userID === userId);
};
export const getUrlsByUserId = async (userId: number): Promise<UrlModel[]> => {
  return await UrlModel.findAll({ where : { userId } });
};

/**
 * Get url by shortend name
 * @param shotenedURLId
 * @returns 
 */
export const getUrlByShortUrlMock = async (shotenedURLId: string) => {
  return await urlData.filter((u: any) => u.shortenedURL === shotenedURLId);
};

export const getUrlByShortUrl = async (shortUrl: string) => {
  return await UrlModel.findOne({ where : { shortUrl } });
};


/**
 * Create new short url for user
 * @param longURL 
 * @param userId 
 * @returns 
 */
export const createShortUrlMock = async (longURL: string, userId: number): Promise<IUrlModel | string> => {
  let newShortURLId = await idGenerator();
  
  // check if already exists before generatoring
  const isExistingURL = await getUrlByShortUrl(newShortURLId);

  if (isExistingURL) {
    // existing call new url with 8 letter
    newShortURLId = await idGenerator(8);
  }

  const newURL: IUrlModel | null = await { 
    shortUrl : newShortURLId,
    longUrl: longURL,
    userId: userId
  };

  if (newURL) {
    // TODO: replace with real db
    urlData.push(newURL);
    console.log("CREATED SHORT URL", newURL);
    console.log("CREATED NEW URL DATA", urlData);
    return newURL;
    // // return true;
  }
  // return false;
  return "failed to create new url";
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

  
  console.log("NEW URL TO BE CREATED", newUrl);

  const createdNewUrl = await UrlModel.create(newUrl);

  if (createdNewUrl) {
    console.log("CREATED NEW URL", createdNewUrl )
    return createdNewUrl;
  }
    
  return null;
};


/**
 * Get url by long name
 * @param longURL 
 * @param userId 
 * @returns {boolean}
 */
export const getUrlByLongUrl = async (longURL: string, userId: number): Promise<boolean> => {
  // get exiting urls for user
  const usersURLs =  await getUrlsByUserId(userId);

  // filter if exiting urls exist for user
  const existingURL = usersURLs && usersURLs.length > 0 && usersURLs.filter(u => u.longUrl  === longURL).length > 0;
  
  // return true if existing
  if(existingURL) return true;

  return false;
};


export const deleteByShortUrlId = async (shortenedUrlId:string, userId: number): Promise<boolean> => {
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