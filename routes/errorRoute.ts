import { Router, Request, Response } from "express";

export const errorRoute = Router();

errorRoute.get("/404", (req: Request, res: Response) => {
  res.json({ message: "error"});
});