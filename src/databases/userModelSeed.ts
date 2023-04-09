import bcrypt2 from "bcryptjs";
import { IUser } from "../models/types/user";

export let users: IUser[] = [
   {
    id: 1,
    firstName: "red",
    lastName: "red",
    email: "red@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
   {
    id: 2,
    firstName: "green",
    lastName: "green",
    email: "green@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
 {
    id: 3, 
    firstName: "blue",
    lastName: "blue",
    email: "blue@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  }
];