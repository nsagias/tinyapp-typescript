import bcrypt2 from "bcryptjs";
import { IUserModel } from "../types/user";

export let users: IUserModel[] = [
   {
    id: 1,
    name: "red",
    email: "red@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
   {
    id: 2,
    name: "green",
    email: "green@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
 {
    id: 3, 
    name: "blue",
    email: "blue@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  }
];