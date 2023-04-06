import { Router, Request, Response } from "express";
import { createShortUrl, deleteByShortUrl, getUrlByShortUrl, getUrlByLongUrl, getUrlsByUserId}   from "../DAL/urlData";


export const urlRoute = Router();

/**
 * Get urls for user
 */
urlRoute.get("/urls/:userId", async(req: Request, res: Response) => {

  const errorMessage = "Missing information for user";

  try {
    const ip = "127.0.0.1";
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    if (!ip) throw new Error(errorMessage);

    const userId = req.params && req.params.userId && parseInt(req.params.userId, 10) || null;
    const cookieUserId = req.cookies && req.cookies.userID && parseInt(req.cookies.userID, 10) || null;
  
    if (!userId) throw new Error(errorMessage);
    if (!cookieUserId) throw new Error(errorMessage);

    const urls = await getUrlsByUserId(cookieUserId);
   
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
 */
urlRoute.get("/urls/:shortUrl", async (req: Request, res: Response) => {

  const errorMessage = "Missing information for url";

  try {
    const ip = "127.0.0.1";
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    if (!ip) throw new Error(errorMessage);

    const shortUrl = req.params && req.params.shortUrl || null;
    const cookieUserId = req.cookies && req.cookies.userID && parseInt(req.cookies.userID, 10) || null;


    if (!shortUrl)  throw new Error(errorMessage);
    if (!cookieUserId) throw new Error(errorMessage);
    
    // receives a shoten url from an anonymous user
    const longURLData = await getUrlByShortUrl(shortUrl, null)
        
    // TODO: add DTO
    res.json({ message: "success", data: longURLData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: errorMessage });
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
    const ip = "127.0.0.1";
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    if (!ip) throw new Error(errorMessage);
    
    const shortUrl= req.body && req.body.shortUrl || null; // use body from form
    const cookieUserId = req.cookies && req.cookies.userID && parseInt(req.cookies.userID, 10) || null;


    if (!shortUrl)  throw new Error(errorMessage);
    if (!cookieUserId) throw new Error(errorMessage);
    
    // receives a shoten url from an anonymous user
    const longURLData = await getUrlByShortUrl(shortUrl, null)
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
    // TODO: update before
    const ip = "127.0.0.1";
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    if (!ip) throw new Error(errorMessage);

    const shortUrl= req.body && req.body.shortUrl || null; // use body from form
    const userData = req.cookies && req.cookies.userID && parseInt(req.cookies.userID) || null;

    if (!shortUrl)  throw new Error(errorMessage);
    if (!userData) throw new Error(errorMessage);

    const isDeleted = await deleteByShortUrl(shortUrl, userData.id);

    if (isDeleted) return res.json({ message: true});
    
    res.json({ message: false});
 
  } catch (error: any) {
    console.error(error);
    res.json({ message: errorMessage});
  }
});



// urlRoute.post
// new routes urls routes
urlRoute.get("/urls/new", async (req: Request, res: Response) => {

  const errorMessage = "Missing information for creating short url";

  try {
    const ip = "127.0.0.1";
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    if (!ip) throw new Error(errorMessage);

    const longURL = req.params && req.params.longUrl || null; // do not use params
    // const longURL = req.body && req.body.longURL || null;
    const userData = req.cookies && req.cookies.userID  && parseInt(req.cookies.userID, 10) || null; // update with token info

    // t oken info
    if (!longURL)  throw new Error(errorMessage);
    if (!userData) throw new Error(errorMessage);

    // check if long name already exists
    const existingLongURL = await getUrlByLongUrl(longURL, userData.id);

    if (existingLongURL)  throw new Error(errorMessage);
    
    // receives a shoten url from an anonymous user
    const longURLData = await createShortUrl(longURL, userData.id);
    if (!longURLData ) return res.json({ message: errorMessage});
        
    // TODO: add DTO
    res.json({ message: "success", data: longURLData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: errorMessage});
  }
});


