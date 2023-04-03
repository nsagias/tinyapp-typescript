import { Router, Request, Response } from "express";
import { createUser, getUserByEmail } from "../DAL/userData";
import { IUser } from "../types/user";

export const userRoute = Router();

// http://localhost:3001/users/1/?page=1&limit=10&search=:search
userRoute.get("/users/:userId", (req: Request, res: Response) => {
  console.log("REQ.PARAM",req.params);
  console.log("REQ.QUERY",req.query);
  res.send("user");
});


// userRoute.post
userRoute.get("/register", async (req: Request, res: Response) => {
  const myUserId = "815bd08a"; // mock user 
  // const email = "red@example.com"; // existing user
  const email = "fun@example.com"; // new user user
  const password = "abc123";
  const name = "bob";
  try {
    // Check for body 
    // const name = req.body && req.body.name || null;
    // const email = req.body && req.body.email || null;
    // const password = req.body && req.body.password || null;
    
    if (!email || !password || !name) throw new Error("new_account_missing_information_1");
    

    // check for empty strings
    const parsedEmail = email.trim();
    const parsedPassword = password.trim();
    const parsedName = name.trim();

    if (parsedEmail === "" || parsedPassword === "" || parsedName === "") throw new Error("new_account_missing_information_2");
  
    // check if existing user
    const userExist: IUser | boolean | null = await getUserByEmail(parsedEmail);

    if (userExist){

      await res.json({ message: "existing email on file"});

    } else  {

      // create new user
      // const newUser = await createUser(parsedName, parsedEmail, parsedPassword);
      // console.log("NEW USER", newUser);

      // fiuser by email
      
      const newId: IUser | boolean | null = await getUserByEmail(parsedEmail);

      if (!newId) throw new Error("User was not created")
      
      // set token/cookie to new user id
      await res.cookie("userID", newId);
  
      
      // return new user data 
      // TODO: add DTO
      await res.json({ name: parsedName, userId: newId, email: parsedEmail});
    }
        
  } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: "account creation error"})
  }
 
});
