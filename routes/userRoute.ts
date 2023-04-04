import { Router, Request, Response } from "express";
import { createUser, getUserByEmail } from "../DAL/userData";
import { IUser } from "../DAL/types/user";

export const userRoute = Router();

// http://localhost:3001/users/1/?page=1&limit=10&search=:search
userRoute.get("/users/:userId", (req: Request, res: Response) => {
  console.log("REQ.PARAM",req.params);
  console.log("REQ.QUERY",req.query);
  res.send("user");
});


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

    // TODO: add min legnth
    if (!parsedEmail || !parsedPassword || !parsedFirstName || !parsedLastName) throw new Error("new_account_missing_information");
  
    // check if existing user
    const userExist: IUser | null = await getUserByEmail(parsedEmail);

    if (userExist) {
      await res.json({ message: "existing email on file"});

    } else  {

      // create new user
      const newUser = await createUser(parsedFirstName, parsedLastName ,parsedEmail, parsedPassword);
      // check if user was created
      if (!newUser) throw new Error("User was not created")
      
      // set token/cookie to new user id
      // token string to get created here
      // await res.cookie("userID", newId);

      // return new user data 
      // TODO: add DTO
      await res.json({ firstName: newUser.firstName,  lastName: newUser.lastName, isActive: newUser.active, token: "token string to go here"});
    }
        
  } catch (error: any) {
      console.error("ERROR",error);
      return res.json({ message: "account creation error"})
  }
 
});
