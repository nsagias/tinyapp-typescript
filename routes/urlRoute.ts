import { Router, Request, Response } from "express";
import { createShortUrl, deleteByShortUrl, getUrlByShortUrl, getUrlByLongUrl, getUrlsByUserId, updateUrlById }   from "../DAL/urlData";
import { UrlModel } from "../models";

export const urlRoute = Router();

/**
 * Redirect redirect by shortUrl
 */
urlRoute.get("/u/:shortUrl", async (req: Request, res: Response) => {
  try {

    const shortUrl = req.params && req.params.shortUrl || null;

    if (!shortUrl) {
      throw new Error("please provide shortened Url")
    }

    // receives a shoten url from an anonymous user
    const longUrlData: UrlModel  = await getUrlByShortUrl(shortUrl, null) as UrlModel;

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
urlRoute.get("/u/:userId", async(req: Request, res: Response) => {
  try {
    // 
    const userId = req.params && req.params.userId && parseInt(req.params.userId, 10) || null;
    const cookieUserId = req.cookies && req.cookies.userID && parseInt(req.cookies.userID, 10) || null;
  
    if (!userId) throw new Error("missing user params");
    if (!cookieUserId) throw new Error("please authenticate")

    const urls = await getUrlsByUserId(cookieUserId);
    // if (!urls || !(urls.length > 0)) return res.json({ message: "seccuess", data: null})

    // TODO: DTO
    res.json({ message: "success",  data: urls });
    
  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});




// urlRoute.post
urlRoute.get("/u/delete", async (req: Request, res: Response) => {
  try {
    // TODO: update before
    // const longURL = req.body && req.body.shortURId|| null; // use body from form
    const shortURLId = req.params && req.params.shortUrlId || null;
    const userData = req.cookies && req.cookies.userID && parseInt(req.cookies.userID) || null;

    if (!shortURLId)  throw new Error("please provide shortened Url");
    if (!userData) throw new Error("please authenticate");

    const isDeleted = await deleteByShortUrl(shortURLId, userData.id);

    if (isDeleted) return res.json({ message: true});
    
    res.json({ message: false});
 
  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});



// urlRoute.post
// new routes urls routes
urlRoute.get("/u/new", async (req: Request, res: Response) => {
  try {
    // TODO: update before
    // const longURL = req.body && req.body.longURL || null;
    const longURL = req.params && req.params.longUrl || null; // do not use params
    const userData = req.cookies && req.cookies.userID  && parseInt(req.cookies.userID, 10) || null; // update with token info

    // t oken info
    if (!longURL)  throw new Error("please provide shortened Url");
    if (!userData) throw new Error("please authenticate");

    // check if long name already exists
    const existingLongURL = await getUrlByLongUrl(longURL, userData.id);

    if (existingLongURL)  throw new Error("existing url");
    
    // receives a shoten url from an anonymous user
    const longURLData = await createShortUrl(longURL, userData.id);
    if (!longURLData ) throw new Error("URL was not created");
        
    // TODO: add DTO
    res.json({ message: "success", data: longURLData});

  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});


