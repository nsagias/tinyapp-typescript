import { Op } from "sequelize";
import { UrlModel } from "../models/UrlModel";
import { idGenerator } from "../services/utilsService";
import { IToken } from "./types/token";
import { IUrlModel } from "./types/urlModel";



/**
 * Get all urls by user id
 * @param userId 
 * @returns 
 */
export const getUrlsByUserId = async (userId: string): Promise<UrlModel[]> => {
  return await UrlModel.findAll({ where : { userId } });
};



/**
 * Get long url by searching with the short url
 * @param shortUrl
 * @param userId
 * @returns https:// route or null
 */
export const getUrlByShortUrl = async (shortUrl: string, userId?: string | null): Promise<UrlModel | null> => {
  
  let query: any = { 
    where : {
      shortUrl,
      deletedAt: { [Op.eq]: null }
  }};
  if (userId) query.where.userId = userId;

  return await UrlModel.findOne(query);
};


/**
 * Get url by long name
 * @param longURL 
 * @param userId 
 * @returns {boolean}
 */
export const getUrlByLongUrl = async (userId: string, longUrl: string): Promise<boolean> => { 
  const existingUrl: UrlModel | null = await UrlModel.findOne({ 
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
  const isExistingUrl = await getUrlByShortUrl(shortUrl, userId);

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


/**
 * Update url by finding by id and passing updated values
 * @param id 
 * @param values
 * @returns boolean
 */
export const updateUrlById = async (id: number, values: Partial<UrlModel>): Promise<boolean>  => {
  const user = await UrlModel.findByPk(id);
  if (!user) return false;
 
  await user.set(values);
  await user.save();
 
  return true;
 };


/**
 * Find by shortUrl and add date to deleted
 * @param shortUrl 
 * @param userId 
 * @returns 
 */
export const deleteByShortUrl = async (shortUrl:string, userId: string): Promise<boolean> => {

  // confirm existing url
  const existingUrl: UrlModel | null = await getUrlByShortUrl(shortUrl, userId);
 
  // if deleted return true
  if (existingUrl!.userId) {
    await existingUrl!.set( { deletedAt: new Date() } );
    await existingUrl!.save();
    return true;
  }
  return false;
};