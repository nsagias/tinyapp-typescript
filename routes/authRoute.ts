import { Router, Request, Response } from "express";

export const authRoute = Router();

authRoute.get("/authenticate", (req: Request, res: Response) => {
  res.json({ auth : "auth"});
});