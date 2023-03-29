import { Router, Request, Response } from "express";
import { getUrlsByUserId }   from "../data/urlData";

export const urlRoute = Router();

urlRoute.get("/urls", (req: Request, res: Response) => {
  res.json({ message: "urls"});
});


urlRoute.get("/urls/:userId", async(req: Request, res: Response) => {
  try {
    const userId = req.params && req.params.userId || null;
    const cookieUserId = req.cookies && req.cookies.userID || null;
  
    if (!userId) throw new Error("missing user params");
    if (!cookieUserId) throw new Error("please authenticate")

    const urls = await getUrlsByUserId(userId);
    res.json({ data: urls });
    
  } catch (error) {
    console.error(error);
    res.json({ error: "error"});
  }
});