import bcrypt from "bcryptjs";
import { IUserModel } from "../types/user";

const user: IUserModel[] = [
   {
    id: "815bd08a",
    name: "red",
    email: "red@example.com",
    password: bcrypt.hashSync('red', 10)
  },
   {
    id: "ec3bdf7a",
    name: "green",
    email: "green@example.com",
    password: bcrypt.hashSync('green', 10)
  },
 {
    id: "1f1ffea1",
    name: "blue",
    email: "blue@example.com",
    password: bcrypt.hashSync('blue', 10)
  }
];

module.exports = {
  user
};