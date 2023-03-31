import { Router, Request, Response } from "express";

export const authRoute = Router();


// TODO: app.post
// TODO: to update with token authentication
authRoute.get("/authenticate", async(req: Request, res: Response) => {
  const myUserId = "815bd08a";
  const cookieCheck = req.cookies && req.cookies.userID || null;
  if (cookieCheck === myUserId) {
    res.json({ name: "nick"});
  } else {
    res.json(null);
  }
});


