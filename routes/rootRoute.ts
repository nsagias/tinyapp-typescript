import { Router, Request, Response } from "express";

export const rootRoute = Router();

rootRoute.get("/", (req: Request, res: Response) => {
  const userId = req.cookies && req.cookies.userID || null;

  // check if active user
  if (userId) {
    res.json({ isLoggedIn: true});
  } else {
    res.json(false);
  }
});
