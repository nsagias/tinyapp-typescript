
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



// /**************************************
//  * Home route
//  * GET /
//  * Redirects to GET /login or GET /urls
//  **************************************/
// app.get("/", (req, res) => {
//   const userId = req.session["userID"];
//   // return ot login if user not logged in
//   if (!userId) {
//     return res.redirect('login');
//   }
//   return res.redirect("/urls");
// });


// /***************************************
//  * Create new short url
//  * POST /urls
//  * Redirect to GET /urls
//  ***************************************/
// app.post("/urls", (req, res) => {
//   // get user id from cookie
//   const userId = req.session["userID"];
//   if (!userId) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Please Login'
//     };
//     return res.status(401).redirect('401');
//   }
//   // creat new short URL
//   const shortURLId = shortURLGenerator();
//   // get user id from user database
//   const user = users[userId];
//   // create new url
//   let newURL = {
//     longURL: req.body.longURL,
//     userID: user.id,
//     createdAt: moment().format('MMMM Do YYYY'),
//   };
//   // put new shortURL in database
//   urlDatabase[shortURLId] = newURL;

//   res.redirect(`/urls/${shortURLId}`);
// });



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


// /***************************************
//  * Login
//  * POST /login
//  * Redirects to GET /urls
//  ***************************************/
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   // check if email or password are empty strings

//   // trim password and email
//   // avoid duplicated and getting around check
//   const emailT = email.trim();
//   const passwordT = password.trim();

//   if (emailT === '' || passwordT === '') {
//     statusCodeError = {
//       '400': 'Missing_Email_Or_Password',
//       message: 'Please Enter Email Or Password'
//     };
//     return res.status(400).redirect('400');
//   }
//   // get users from database
//   const usersDB = users;


//   // check if is a current user
//   const isCurrentUser = findUserByEmail(emailT, usersDB);
//   // if no user found send 403 and message too register
//   if (!isCurrentUser) {
//     statusCodeError = {
//       '403': 'Not_User_Found',
//       message: 'Please Create Account'
//     };
//     return res.status(403).redirect('403');
//   }

//   // Authenticale user returns user id
//   const isAuthenticated = authenticateByPassword(emailT, passwordT, usersDB);
//   // if password returns false 403 response
//   if (!isAuthenticated) {
//     statusCodeError = {
//       '403': 'Password_Does_Not_Match',
//       message: 'Password or login id does not match'
//     };
//     return res.status(403).redirect('403');
//   }
//   // add id to to session for valid user
//   const userID = isAuthenticated;
//   req.session.userID = userID;

//   // redirect to urls
//   res.redirect("urls");
// });


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});