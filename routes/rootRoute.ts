import { Router, Request, Response } from "express";

export const rootRoute = Router();

rootRoute.get("/root", (req: Request, res: Response) => {
  res.json({ root : "root"});
});


rootRoute.get("/", (req: Request, res: Response) => {
  console.log("REQ",req.query);
  res.send("HOME");
});