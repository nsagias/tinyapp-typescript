import { Router, Request, Response } from "express";
import { getUrlByShortUrl, updateUrlById }   from "../DAL/urlData";
import { UrlModel } from "../models";
export const rootRoute = Router();

// home route
rootRoute.get("/", async (req: Request, res: Response) => {
  // TODO: check if is logged in
  res.json({message: "home"}) ; 
});


/**
 * Redirect redirect by shortUrl
 */
rootRoute.get("/u/:shortUrl", async (req: Request, res: Response) => {
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
