import { Router, Request, Response } from "express";
import { IToken } from "../models/types/token";
import { authenticateTokenUser } from "../services/authService";

export const authRoute = Router();

authRoute.post("/authenticate", async(req: Request, res: Response) => {
  const errorMessage = "Athentication Error";
  try {
    const ip = req.socket && req.socket?.remoteAddress && req.socket?.remoteAddress.split("::ffff:")[1] || null;
    const authToken = await req.body && req.body.token || null;
    const userId = await req.body && req.body.userId || null;
    if (!ip) throw new Error(`${errorMessage} 1`);
    if (!userId) throw new Error(`${errorMessage} 2`);
    if (!authToken) return new Error(`${errorMessage} 3`);
  
    const userData: IToken = await authenticateTokenUser(userId.toString(), ip, authToken) as IToken;
    if (userData) return res.json({ message: "success"});
    return res.json({ message: "Please login again"})
    
  } catch (error: any) {
    console.error(error);
    res.json({ message: `${errorMessage} 4`});
  }

});


