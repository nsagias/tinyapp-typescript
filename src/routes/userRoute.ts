import { Router, Request, Response } from "express";
import { createAndLoginUser, login, logout } from "../services/authService";

export const userRoute = Router();


userRoute.post("/register", async (req: Request, res: Response) => {

  const errorMessage = "Account creation error";

  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    if (!ip) throw new Error(`${errorMessage} 1`);

    // Check for body 
    const firstName = await req.body && req.body.firstName || null;
    const lastName = await req.body && req.body.lastName || null;
    const email = await req.body && req.body.email || null;
    const password = await req.body && req.body.password || null;
  

    // check for empty strings
    const parsedEmail = email && email.trim();
    const parsedPassword = password && password.trim();
    const parsedFirstName = firstName && firstName.trim();
    const parsedLastName = lastName && lastName.trim();

    if (!parsedFirstName || !parsedLastName  || !parsedEmail || !parsedPassword ) throw new Error(`${errorMessage} 2`);
    const authData = await createAndLoginUser(parsedFirstName, parsedLastName, parsedEmail, parsedPassword, ip);
      
    if (!authData) throw new Error(`${errorMessage} 3`);
    
    return res.json(authData);
        
  } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: `${errorMessage} 4` });
  };
 
});



userRoute.post("/login", async(req: Request, res: Response) => {

  const errorMessage = "Login error";

  try {

    // Check for body 
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const email = await req.body && req.body.email || null;
    const password = await req.body && req.body.password || null;
   
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
    return res.json({ message: errorMessage });
  }
});


/**
 * Logout
 */
userRoute.post("/logout", async (req: Request, res: Response) => {
  const errorMessage = "error occured while loging out";
  
  // find token and logout token
  try {
    const token = req.headers.authorization || null;
    if (!token) return res.json({ message: errorMessage });

    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;

    // TODO: ip validation
    if (!ip) return res.json({ message: errorMessage });

    // token verify and get email from token
    const isLoggedOut = await  logout(ip, token);
    
    if (isLoggedOut) {
      return res.json({ message: "logged out successfully" });
    }
    
    res.json({ message: errorMessage });
      
    } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: errorMessage });
    }
  
});