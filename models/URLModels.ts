import moment from "moment";
import { IURLModel } from "../types/urlData";


export let urlData: IURLModel[] = [
  { 
    id: 1,
    shortenedURL : "b2xVn2",
    longURL: "http://www.lighthouselabs.ca",
    userID: 1,
    createdAt: moment().format('MMMM Do YYYY'),
  },
  { 
    id: 2,
    shortenedURL : "9sm5xk",
    longURL: "http://www.google.com",
    userID: 1,
    createdAt: moment().format('MMMM Do YYYY'),
  },
  {
    id: 3,
    shortenedURL :"9sm511",
    longURL: "http://www.bingo.com",
    userID: 2,
    createdAt: moment().format('MMMM Do YYYY'),
  },
  { 
    id: 4,
    shortenedURL :"c2k511",
    longURL: "http://www.yahoo.com",
    userID: 2,
    createdAt: moment().format('MMMM Do YYYY')
  }
];

