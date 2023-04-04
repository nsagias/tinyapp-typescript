import bcrypt2 from "bcryptjs";
import { IUser } from "../../DAL/types/user";

export let users: IUser[] = [
   {
    id: 1,
    firstName: "red",
    lastName: "example",
    email: "red@example.com",
    emailVerified: new Date() as Date,
    password: bcrypt2.hashSync("abc123", 10),
    active: true,
    deletedAt: undefined,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
     {
    id: 2,
    firstName: "green",
    lastName: "example",
    email: "green@example.com",
    password: bcrypt2.hashSync("abc123", 10),
    active: true,
    deletedAt: undefined,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
 {
    id: 3, 
    firstName: "blue",
    lastName: "example",
    email: "blue@example.com",
    password: bcrypt2.hashSync("abc123", 10),
    active: true,
    deletedAt: undefined,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  }
];


