import { Router, Request, Response } from "express";

export const userRoute = Router();

userRoute.get("/user", (req: Request, res: Response) => {
  res.json({ auth : "auth"});
});

// http://localhost:3001/users/1/?page=1&limit=10&search=:search
userRoute.get("/users/:userId", (req: Request, res: Response) => {
  console.log("REQ.PARAM",req.params);
  console.log("REQ.QUERY",req.query);
  res.send("user");
});