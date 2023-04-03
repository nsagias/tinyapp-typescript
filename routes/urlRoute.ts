import { Router, Request, Response } from "express";
import { createShortUrl, deleteByShortUrl, getUrlByShortUrl, getUrlByLongUrl, getUrlsByUserId, updateUrlById }   from "../DAL/urlData";
import { UrlModel } from "../models";

export const urlRoute = Router();

/**
 * Redirect redirect by shortUrl
 */
urlRoute.get("/:shortUrl", async (req: Request, res: Response) => {
  try {

    const shortUrl = req.params && req.params.shortUrl || null;

    if (!shortUrl) {
      throw new Error("please provide shortened Url")
    }

    // receives a shoten url from an anonymous user
    const longUrlData: UrlModel  = await getUrlByShortUrl(shortUrl) as UrlModel;

    // check if url exist
    if (!longUrlData) throw new Error("URL does not exist")
    
    // update count + 1
    await updateUrlById(longUrlData.id, { count: longUrlData.count + 1 });
    
    res.redirect(longUrlData.longUrl);

  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});


/**
 * Get urls for user
 */
urlRoute.get("/urls/:userId", async(req: Request, res: Response) => {
  try {
    // 
    const userId = req.params && req.params.userId && parseInt(req.params.userId, 10) || null;
    const cookieUserId = req.cookies && req.cookies.userID && parseInt(req.cookies.userID, 10) || null;
  
    if (!userId) throw new Error("missing user params");
    if (!cookieUserId) throw new Error("please authenticate")

    const urls = await getUrlsByUserId(cookieUserId);
    if (!urls || !(urls.length > 0)) throw new Error("No urls found")

    // TODO: DTO
    res.json({ message: "success",  data: urls });
    
  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});


/**
 * Get url by shortendid
 */
urlRoute.get("/url/:shortUrl", async (req: Request, res: Response) => {
  try {
    const shortenedURL = req.params && req.params.shortenedURL || null;
    const cookieUserId = req.cookies && req.cookies.userID && parseInt(req.cookies.userID, 10) || null;

    if (!shortenedURL)  throw new Error("please provide shortened Url");
    if (!cookieUserId) throw new Error("please authenticate");
    
    // receives a shoten url from an anonymous user
    const longURLData = await getUrlByShortUrl(shortenedURL)
    if (!longURLData) throw new Error("URL does not exist");
        
    // TODO: add DTO
    res.json({ message: "success", data: longURLData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});



// urlRoute.post
urlRoute.get("/url/new/:longUrl", async (req: Request, res: Response) => {
  try {
    // TODO: update before
    // const longURL = req.body && req.body.longURL || null;
    const longURL = req.params && req.params.longUrl || null;
    const cookieUserId = req.cookies && req.cookies.userID  && parseInt(req.cookies.userID, 10) || null;

    if (!longURL)  throw new Error("please provide shortened Url");
    if (!cookieUserId) throw new Error("please authenticate");

    // check if long name already exists
    const existingLongURL = await getUrlByLongUrl(longURL, cookieUserId);

    if (existingLongURL)  throw new Error("existing url");
    
    // receives a shoten url from an anonymous user
    const longURLData = await createShortUrl(longURL, cookieUserId);
    if (!longURLData ) throw new Error("URL was not created");
        
    // TODO: add DTO
    res.json({ message: "success", data: longURLData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});


// urlRoute.post
urlRoute.get("/url/delete/:shortUrlId", async (req: Request, res: Response) => {
  try {
    // TODO: update before
    // const longURL = req.body && req.body.shortURId|| null;
    const shortURLId = req.params && req.params.shortUrlId || null;
    const userId = req.cookies && req.cookies.userID && parseInt(req.cookies.userID) || null;

    if (!shortURLId)  throw new Error("please provide shortened Url");
    if (!userId) throw new Error("please authenticate");

    const isDeleted = await deleteByShortUrl(shortURLId, userId);

    if (isDeleted) return res.json({ message: true});
    
    res.json({ message: false});
 
  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});


