import { Router, Request, Response } from "express";

export const rootRoute = Router();

// home route
rootRoute.get("/", async (req: Request, res: Response) => {
  res.json({message: "home"}) ; 
});