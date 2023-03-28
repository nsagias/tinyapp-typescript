import bcrypt2 from "bcryptjs";
import { IUserModel } from "../types/user";

export let users: IUserModel[] = [
   {
    id: "815bd08a",
    name: "red",
    email: "red@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
   {
    id: "ec3bdf7a",
    name: "green",
    email: "green@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  },
 {
    id: "1f1ffea1",
    name: "blue",
    email: "blue@example.com",
    password: bcrypt2.hashSync("abc123", 10)
  }
];


