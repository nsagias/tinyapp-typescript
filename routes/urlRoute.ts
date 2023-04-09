import { Router, Request, Response } from "express";
import { createShortUrl, deleteByShortUrl, getUrlByShortUrl, getUrlByLongUrl, getUrlsByUserId}   from "../DAL/urlData";
import { authenticateShortUrlBelongsToUser, authenticateTokenUser } from "../services/authService";
import { IToken } from "../DAL/types/token";


export const urlRoute = Router();

/**
 * Get urls for user
 */
urlRoute.get("/urls/user", async(req: Request, res: Response) => {

  const errorMessage = "Missing information for user";

  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = req.body && req.body.token || null;
    const userId = req.body && req.body.userId || null;
  
    if (!ip) throw new Error(errorMessage);
    if (!authToken) return new Error(errorMessage);
    if (!userId) return new Error(errorMessage);
 
    // athenticate token user
    const userData: IToken = await authenticateTokenUser(userId, ip, authToken) as IToken;

    // if not athenticated throw error
    if (!userData) throw new Error(errorMessage);

    const urls = await getUrlsByUserId( userData.userId?.toString()!);
   
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
    // const ip = "127.0.0.1";
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = req.body && req.body.token || null;
    const userId = req.body && req.body.userId || null;
    const shortUrl = req.body && req.body.shortUrl || null;
    
    if (!ip) throw new Error(errorMessage);
    if (!authToken) return new Error(errorMessage);
    if (!userId) return new Error(errorMessage);
    if (!shortUrl) return new Error(errorMessage);


    // athenticate token user
    const belongsToUser: boolean = await authenticateShortUrlBelongsToUser(userId, ip, shortUrl, authToken) as boolean;

    // if not athenticated throw error
    if (!belongsToUser) throw new Error(errorMessage);

    // receives a shoten url from an anonymous user
    const longURLData = await getUrlByShortUrl(shortUrl, null);
    if (!longURLData) throw new Error(errorMessage);
        
    // TODO: add DTO
    res.json({ message: "success", data: longURLData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: errorMessage});
  }
});



// urlRoute.post
urlRoute.get("/urls/delete", async (req: Request, res: Response) => {

  const errorMessage = "Missing information for deleting url";

  try {
    const ip = "127.0.0.1";
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    // const authToken = req.body && req.body.token || null;
    // const userId = req.body && req.body.userId || null;
    // const shortUrl = req.body && req.body.shortUrl || null;

    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoibmljayIsImxhc3ROYW1lIjoic2FnaWFzIiwiZW1haWwiOiJteUVhbWlsQGdtYWlsIiwiZW1haWxWZXJpZmllZCI6bnVsbCwiYWN0aXZlIjp0cnVlLCJpYXQiOjE2ODA2NjQ2ODZ9.hjIgD9lyXP4VWY6vVfyyXLekqEK3DBsqgyHarvU2YZI";
    const userId = "1";
    const shortUrl = "cc8032"; 
    
    
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
urlRoute.get("/urls/new", async (req: Request, res: Response) => {

  const errorMessage = "Missing information for creating short url";

  try {
    const ip = "127.0.0.1";
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    // const authToken = req.body && req.body.token || null;
    // const userId = req.body && req.body.userId || null;
    // const longUrl = req.body && req.body.longURL || null;

    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoibmljayIsImxhc3ROYW1lIjoic2FnaWFzIiwiZW1haWwiOiJteUVhbWlsQGdtYWlsIiwiZW1haWxWZXJpZmllZCI6bnVsbCwiYWN0aXZlIjp0cnVlLCJpYXQiOjE2ODA2NjQ2ODZ9.hjIgD9lyXP4VWY6vVfyyXLekqEK3DBsqgyHarvU2YZI";
    const userId = "1";
    const longUrl = "https://www.bingo.com"
    
    if (!ip) throw new Error(errorMessage);
    if (!authToken) return new Error(`${errorMessage} 1`);
    if (!userId) return new Error(`${errorMessage} 2`);
    if (!longUrl) return new Error(`${errorMessage} 3`);


    // athenticate token user
    const userData: IToken = await authenticateTokenUser(userId, ip, authToken) as IToken;

    // if not athenticated throw error
    if(!userData) throw new Error(`${errorMessage} 4`);

    // check if long name already exists
    const existingLongUrl = await getUrlByLongUrl(userData.id?.toString()!, longUrl);

    // if not existing through error
    if (!existingLongUrl)  {
      // receives a shoten url from an anonymous user
      const longUrlData = await createShortUrl(longUrl, userData.id?.toString()!);
      if (!longUrlData ) return res.json({ message: errorMessage});
          
      // TODO: add DTO
      res.json({ message: "success", data: longUrlData});
    } 
    
    res.json({ message: "existing long url"})
    

  } catch (error: any) {
    console.error(error);
    res.json({ message: `${errorMessage} 6`});
  }
});


/**
 * Get url by shortUrl
 * no validation
 */
urlRoute.get("/urls/user/:shortUrl", async (req: Request, res: Response) => {

  const errorMessage = "Missing information for url";

  try {
    // const ip = "127.0.0.1";
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = req.body && req.body.token || null;
    const userId = req.body && req.body.userId || null;
    const shortUrl = req.body && req.body.shortUrl || null;
    
    if (!ip) throw new Error(errorMessage);
    if (!authToken) return new Error(errorMessage);
    if (!userId) return new Error(errorMessage);
    if (!shortUrl) return new Error(errorMessage);


    // athenticate token user
    const belongsToUser: IToken = authenticateShortUrlBelongsToUser(userId, ip, shortUrl, authToken) as IToken;

    // if not athenticated throw error
    if (!belongsToUser) throw new Error(errorMessage);

    // receives a shoten url from an anonymous user
    const longUrlData = await getUrlByShortUrl(shortUrl, null)
        
    // TODO: add DTO
    // to return empty array value if there are not values
    res.json({ message: "success", data: longUrlData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: errorMessage });
  }
});