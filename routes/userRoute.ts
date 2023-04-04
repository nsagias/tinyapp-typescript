import { Router, Request, Response } from "express";
import { createAndLoginUser, login } from "../services/authService";

export const userRoute = Router();

// userRoute.post
userRoute.get("/register", async (req: Request, res: Response) => {
  try {
    const email = "bobEmail@example.com"; // new user user
    const password = "abc123";
    const firstName = "bobFirstName";
    const lastName = "bobLastName";
    // Check for body 

    // const firstName = req.body && req.body.firstName || null;
    // const lastName = req.body && req.body.lastName || null;
    // const email = req.body && req.body.email || null;
    // const password = req.body && req.body.password || null;

    // check for empty strings
    const parsedEmail = email && email.trim();
    const parsedPassword = password && password.trim();
    const parsedFirstName = firstName && firstName.trim();
    const parsedLastName = lastName && lastName.trim();

    if (!parsedFirstName || !parsedLastName  || !parsedEmail || !parsedPassword ) throw new Error("new_account_missing_information");
    const token = await createAndLoginUser(parsedFirstName, parsedLastName, parsedEmail, parsedPassword);
   
    if (!token) throw new Error("account creation error");
    return token;
        
  } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: "account creation error"})
  };
 
});



// app.post
userRoute.get("/login", async(req: Request, res: Response) => {
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
userRoute.post("/logout", async (req: Request, res: Response) => {
  // const token = req.body && req.body.token || null;
  // find token and logout token

  res.json({ message: "logout route"})
});