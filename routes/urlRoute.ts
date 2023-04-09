import { Router, Request, Response } from "express";
import { createShortUrl, deleteByShortUrl, getUrlByShortUrl, getUrlByLongUrl, getUrlsByUserId}   from "../DAL/urlDAL";
import { authenticateShortUrlBelongsToUser, authenticateTokenUser } from "../src/services/authService";
import { IToken } from "../models/types/token";
import { updateUrlById } from "../DAL/urlDAL";
import { UrlModel } from "../models";


export const urlRoute = Router();

/**
 * Get urls for user
 */
urlRoute.get("/urls/users/:userId", async(req: Request, res: Response) => {

  const errorMessage = "Missing information for user";

  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = await req.body && req.body.token || null;
    const userId = req.params && req.params.userId || null;

    if (!ip) throw new Error(errorMessage);
    if (!authToken) return new Error(errorMessage);
    if (!userId) return new Error(errorMessage);
 
    // athenticate token user
    const userData: IToken = await authenticateTokenUser(userId, ip, authToken) as IToken;

    // if not athenticated throw error
    if (!userData) throw new Error(errorMessage);

    const urls = await getUrlsByUserId( userData.id?.toString()!);
   
    // TODO: DTO
    res.json({ message: "success",  data: urls });
    
  } catch (error: any) {
    console.error(error);
    res.json({ message: errorMessage});
  }
});


/**
 * Get url by shortendid
 * no validation
 * udpate path
 */
urlRoute.post("/urls/update", async (req: Request, res: Response) => {
  const errorMessage = "Missing information for update";

  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = await req.body && req.body.token || null;
    const userId = await req.body && req.body.userId || null;
    const shortUrl = await req.body && req.body.shortUrl || null;
    const updatedUrlData = await req.body && req.body.updatedUrlData || null;
    
    if (!ip) throw new Error(`${errorMessage} 1`);
    if (!authToken) return new Error(`${errorMessage} 2`);
    if (!userId) return new Error(`${errorMessage} 3`);
    if (!shortUrl) return new Error(`${errorMessage} 4`);

    // athenticate token user
    const belongsToUser: boolean = await authenticateShortUrlBelongsToUser(userId, ip, shortUrl, authToken) as boolean;

    // if not athenticated throw error
    if (!belongsToUser) throw new Error(`${errorMessage} 5`);

    // receives a shoten url from an anonymous user
    const longUrlData = await getUrlByShortUrl(shortUrl, null);
    if (!longUrlData) throw new Error(`${errorMessage} 6`);

   
    const updatedLongUrlData: UrlModel | null = await updateUrlById(longUrlData.id, { longUrl: updatedUrlData})
    if (updatedLongUrlData) {
        return res.json({ message: "success"});
    }
    return res.json({ message: `${errorMessage} 7`});
   
  } catch (error: any) {
    console.error(error);
    res.json({ message: `${errorMessage} 8`});
  }
});


urlRoute.post("/urls/delete", async (req: Request, res: Response) => {
  const errorMessage = "Missing information for deleting url";

  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = await req.body && req.body.token || null;
    const userId = await req.body && req.body.userId || null;
    const shortUrl = await req.body && req.body.shortUrl || null;
    
    if (!ip) throw new Error(errorMessage);
    if (!authToken) return new Error(`${errorMessage} 1`);
    if (!userId) return new Error(`${errorMessage} 2`);
    if (!shortUrl) return new Error(`${errorMessage} 3`);
  
    // athenticate token user
    const belongsToUser: boolean = await authenticateShortUrlBelongsToUser(userId, ip, shortUrl, authToken) as boolean;

    // if not athenticated throw error
    if (!belongsToUser) throw new Error(`${errorMessage} 4`);;
 
    const isDeleted = await deleteByShortUrl(shortUrl, null);

    if (isDeleted) return res.json({ message: true});
    
    res.json({ message: false});
 
  } catch (error: any) {
    console.error(error);
    res.json({ message: `${errorMessage} 5`});
  }
});



// urlRoute.post
// new routes urls routes
urlRoute.post("/urls/new", async (req: Request, res: Response) => {

  const errorMessage = "Missing information for creating short url";

  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = await req.body && req.body.token || null;
    const userId = await req.body && req.body.userId || null;
    const longUrl = await req.body && req.body.longUrl|| null;
    
    if (!ip) throw new Error(`${errorMessage} 1`);
    if (!authToken) return new Error(`${errorMessage} 2`);
    if (!userId) return new Error(`${errorMessage} 3`);
    if (!longUrl) return new Error(`${errorMessage} 4`);


    // athenticate token user
    const userData: IToken = await authenticateTokenUser(userId, ip, authToken) as IToken;
    // if not athenticated throw error
    if(!userData) throw new Error(`${errorMessage} 5`);

    // check if long name already exists
    const existingLongUrl = await getUrlByLongUrl(userData.id?.toString()!, longUrl);

    // if not existing through error
    if (!existingLongUrl)  {
      // receives a shoten url from an anonymous user
      const longUrlData = await createShortUrl(longUrl, userData.id?.toString()!);
      if (!longUrlData ) return res.json({ message: `${errorMessage} 6`});
          
      // TODO: add DTO
      return res.json({ message: "success", data: longUrlData});
    } 
    
    res.json({ message: "existing long url"})

  } catch (error: any) {
    console.error(error);
    res.json({ message: `${errorMessage} 7`});
  }
});


/**
 * Get url by shortUrl
 */
urlRoute.get("/urls/users/:userId/shortUrl/:shortUrl", async (req: Request, res: Response) => {

  const errorMessage = "Missing information for url";

  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = await req.body && req.body.token || null;
    const userId = req.params && req.params.userId || null;
    const shortUrl = req.params && req.params.shortUrl || null;
    
    if (!ip) throw new Error(`${errorMessage} 1`);
    if (!authToken) return new Error(`${errorMessage} 2`);
    if (!userId) return new Error(`${errorMessage} 3`);
    if (!shortUrl) return new Error(`${errorMessage} 4`);

    // athenticate token user
    const belongsToUser: IToken = authenticateShortUrlBelongsToUser(userId, ip, shortUrl, authToken) as IToken;

    // if not athenticated throw error
    if (!belongsToUser) throw new Error(`${errorMessage} 5`);

    // receives a shoten url from an anonymous user
    const longUrlData = await getUrlByShortUrl(shortUrl, null) 
    // TODO: add DTO
    // to return empty array value if there are not values
    res.json({ message: "success", data: longUrlData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: `${errorMessage} 6` });
  }
});