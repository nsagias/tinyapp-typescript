
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";

import { routes } from './routes';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);




// /***************************************
//  * Delete short url from database
//  * POST/urls/:id/delete
//  * Redirects to /GET/urls
//  ****************************************/
// app.post("/urls/:shortURL/delete", (req, res) => {
//   // check if user id and logged in
//   const userId = req.session["userID"];
//   if (!userId) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Please Login'
//     };
//     return res.status(401).redirect('/401');
//   }
//   const { shortURL } = req.params;
//   if (userId !== urlDatabase[shortURL].userID) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Unauthorised_Access'
//     };
//     return res.status(401).redirect('/401');
//   }
//   // if logged in get use provided
//   delete urlDatabase[shortURL];
//   res.redirect("/urls");
// });


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});