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
  try {
    // Check for body 
    // const email = req.body && req.body.email || null;
    // const password = req.body && req.body.password || null;
    const email = "red@example.com";
    const password = "abc123";
    if (!email || !password) {
      throw new Error("missing_email_or_password_1");
    }

    // check for empty strings
    const parsedEmail = email.trim();
    const parsedPassword = password.trim();

    if (parsedEmail === "" || parsedPassword === "") {
      throw new Error("missing_email_or_password_2");
    }

    const user: IUserModel | undefined = await getUserByEmail( parsedEmail || "red@example.com");
    console.log("*USER",user);

    const userAuth: boolean = await checkPassword(parsedEmail || "red@example.com", parsedPassword || "abc123");
    console.log("***Auth:", userAuth);

    if (!user) {
      throw new Error("missing_email_or_password_3");
    } else if (user) {
      await res.cookie("userID", myUserId);
      await res.json({ name: "nick", userId: myUserId, email: user!.email, userAuth});
    }
        
  } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: "login error"})
  }
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

