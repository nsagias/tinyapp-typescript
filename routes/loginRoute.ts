import { Router, Request, Response } from "express";
import { login } from "../services/authService";

export const loginRoute = Router();


// app.post
loginRoute.get("/login", async(req: Request, res: Response) => {
  try {
    // Check for body 
    const email = "red@example.com";
    const password = "abc123";
    // const email = req.body && req.body.email || null;
    // const password = req.body && req.body.password || null;
 
    const parsedEmail = email && email.trim();
    const parsedPassword = email && password.trim();

    if (!parsedEmail || !parsedPassword) throw new Error("Login error");
    
    // login section
    return await login(parsedEmail, parsedPassword);
        
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