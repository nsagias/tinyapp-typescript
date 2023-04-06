import { Router, Request, Response } from "express";
import { createAndLoginUser, login, logout } from "../services/authService";

export const userRoute = Router();

// userRoute.post
userRoute.get("/register", async (req: Request, res: Response) => {

  const errorMessage = "Account creation error";

  try {
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const ip = "127.0.0.1";
    if (!ip) throw new Error(errorMessage);



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
    const token = await createAndLoginUser(parsedFirstName, parsedLastName, parsedEmail, parsedPassword, ip);
   
    if (!token) throw new Error(errorMessage);
    return token;
        
  } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: errorMessage});
  };
 
});



// app.post
userRoute.get("/login", async(req: Request, res: Response) => {

  const errorMessage = "Login error";

  try {

    // Check for body 
    const email = "red@example.com";
    const password = "abc123";
    const ip = "127.0.0.1";
    // const email = req.body && req.body.email || null;
    // const password = req.body && req.body.password || null;
    // const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;

 
    if (!ip) throw new Error(errorMessage);

    const parsedEmail = email && email.trim();
    const parsedPassword = email && password.trim();

    if (!parsedEmail || !parsedPassword || !ip) throw new Error(errorMessage);
    
    // login section
    const authData = await login(parsedEmail, parsedPassword, ip);

    // if auth data is null throw error
    if (!authData) throw new Error(errorMessage);

    res.json(authData);
        
  } catch (error: any) {
    console.error("ERROR",error);
    return res.json({ message: errorMessage});
  }
});


/**
 * Logout
 */
userRoute.post("/logout", async (req: Request, res: Response) => {
  const errorMessage = "error occured while loging out";
  // find token and logout token

  try {
    const token = req.body && req.body.token || null;
    if (!token) return res.json({ message: errorMessage});

    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;

    // TODO: ip validation
    if (!ip) return res.json({ message: errorMessage});

    // token verify and get email from token
    // await logout("email", ip);
    res.json({ message: "logged out"})
      
    } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: errorMessage});
    }
  
});