import { IUrlModel } from "../../src/models/types/urlModel";

export let urlData: IUrlModel[] = [
  { 
    id: 1,
    longUrl: "http://www.lighthouselabs.ca",
    shortUrl : "b2xVn2",
    count: 1,
    userId: 1,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  {
    id: 2,
    shortUrl : "9sm5xk",
    longUrl: "http://www.google.com",
    userId: 1,
    count: 1,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  {
    id: 3,
    shortUrl :"9sm511",
    longUrl: "http://www.bingo.com",
    count: 3,
    userId: 2,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  },
  { 
    id: 4,
    shortUrl :"c2k511",
    longUrl: "http://www.yahoo.com",
    count: 5,
    userId: 2,
    deletedAt: null,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  }
];