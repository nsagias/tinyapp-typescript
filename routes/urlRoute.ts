import { Router, Request, Response } from "express";

export const urlRoute = Router();

urlRoute.get("/urls", (req: Request, res: Response) => {
  res.json({ message: "urls"});
});