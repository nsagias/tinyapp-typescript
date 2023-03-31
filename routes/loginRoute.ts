import { Router, Request, Response } from "express";
import { getUserByEmail } from "../data/userData";
import { IUserModel } from "../types/user";
import { checkPassword } from "../services/authService";

export const loginRoute = Router();


// app.post
loginRoute.get("/login", async(req: Request, res: Response) => {
  const myUserId = "1";
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

    const user: IUserModel | boolean = await getUserByEmail( parsedEmail || "red@example.com");
    console.log("*USER",user);

    const userAuth: boolean = await checkPassword(parsedEmail || "red@example.com", parsedPassword || "abc123");
    console.log("***Auth:", userAuth);

    if (!user) {
      throw new Error("missing_email_or_password_3");
    } else if (user) {
      await res.cookie("userID", myUserId);
      await res.json({ name: "nick", userId: myUserId, email: user, userAuth});
    }
        
  } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: "login error"})
  }
});

/**
 * Logout
 */
loginRoute.post("/logout", async (req: Request, res: Response) => {
  // set session value to null
  if(req.cookies && req.cookies.userID) {
    req.cookies = null;
    res.json({ message: "success"});
  }
  res.json({ message: "does not exist"})
});