import { Router, Request, Response } from "express";
import { getUserByEmail } from "../data/userData";
import { IUserModel } from "../types/user";
import { checkPassword } from "../services/authService";

export const authRoute = Router();

authRoute.get("/auth", (req: Request, res: Response) => {
  res.json({ auth : "auth"});
});


// app.post
authRoute.get("/login", async(req: Request, res: Response) => {
  const myUserId = "815bd08a";
  const user: IUserModel | undefined = await getUserByEmail("red@example.com");
  const userAuth: boolean = await checkPassword("red@example.com", "abc123");
  console.log("*USER",user)
  console.log("***Auth:", userAuth)
  await res.cookie("userID", myUserId);
  await res.json({ name: "nick", userId: myUserId, bingo: user!.email, userAuth});
});


// app.post
authRoute.get("/authenticate", async(req: Request, res: Response) => {
  const myUserId = "815bd08a";
  const cookieCheck = req.cookies && req.cookies.userID || null;
  if (cookieCheck === myUserId) {
    res.json({ name: "nick"});
  } else {
    res.json(null);
  }
});

