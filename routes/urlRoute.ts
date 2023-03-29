import { Router, Request, Response } from "express";
import { getURLByShortenedURL, getUrlsByUserId }   from "../data/urlData";

export const urlRoute = Router();

/**
 * Sanity check route
 */
urlRoute.get("/urls", (req: Request, res: Response) => {
  res.json({ message: "urls"});
});


/**
 * Redirect to proper url
 */
urlRoute.get("/u/:shortenedURL", async (req: Request, res: Response) => {

  try {
    const shortenedURL = req.params && req.params.shortenedURL || null;
    if (!shortenedURL) {
      throw new Error("please provide shortened Url")
    }
    // receives a shoten url from an anonymous user
    const longURLData = await getURLByShortenedURL(shortenedURL)
    if (!longURLData) {
      throw new Error("URL does not exist")
    }
    
    // extend and update with a count
    
    // TODO: add DTO
    const userRequestURL = longURLData[0].longURL;
    res.redirect(userRequestURL);

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
    const userId = req.params && req.params.userId || null;
    const cookieUserId = req.cookies && req.cookies.userID || null;
  
    if (!userId) throw new Error("missing user params");
    if (!cookieUserId) throw new Error("please authenticate")

    const urls = await getUrlsByUserId(cookieUserId);

    // TODO: DTO
    res.json({ message: "success",  data: urls });
    
  } catch (error: any) {
    console.error(error);
    res.json({ message: "error"});
  }
});