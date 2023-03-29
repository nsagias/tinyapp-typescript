
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
//  * Display create new user form
//  * GET /urls/new
//  ***************************************/
// app.get("/urls/new", (req, res) => {
//   // check if logged in and exit if not logged in
//   const userId = req.session["userID"];
//   if (!userId) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Please Login'
//     };
//     return res.status(401).redirect('/401');
//   }
//   const user = users[userId];
//   const templateVars = { user: user };
//   // show the create new URL screen
//   res.render("urls_new", templateVars);
// });

// /***************************************
//  * Display  a specif short urls created,
//  * by authenticated user
//  * GET/urls/:id
//  ***************************************/
// app.get("/urls/:shortURL", (req, res) => {
//   // get user id from session
//   const userId = req.session["userID"];
//   // if no userID redirect to login
//   if (!userId) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Please Login'
//     };
//     return res.status(401).redirect('/401');
//   }
//   const shortURLId = req.params.shortURL;
//   if (userId !== urlDatabase[shortURLId].userID) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Unauthorised_Access'
//     };
//     return res.status(401).redirect('/401');
//   }
//   // get user from user database
//   const user = users[userId];
//   const templateVars = {
//     user: user,
//     shortURL: req.params.shortURL,
//     longURL: urlDatabase[req.params.shortURL].longURL,
//     createdAt: urlDatabase[req.params.shortURL].createdAt,
//   };
//   // show single url
//   res.render("urls_show", templateVars);
// });


// /***************************************
//  * Create new short URL
//  * POST/url/:id
//  * Redirects tor GET/urls
//  ***************************************/
// app.post("/urls/:id", (req, res) => {
//   // get userID from session
//   const userId = req.session["userID"];
//   // if customer not logged in redirect to user screen
//   if (!userId) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Please Login'
//     };
//     return res.status(401).redirect('/401');
//   }
//   const shortURLId = req.params.id;
//   if (userId !== urlDatabase[shortURLId].userID) {
//     statusCodeError = {
//       '401': 'Unauthorised_Access',
//       message: 'Unauthorised_Access'
//     };
//     return res.status(401).redirect('/401');
//   }

//   const longURL = req.body.longURL;
//   urlDatabase[shortURLId].longURL = longURL;
//   urlDatabase[shortURLId].createdAt = moment().format('MMMM Do YYYY'),
//   res.redirect("/urls");
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
//  * Logout
//  * POST /logout
//  * Clears session values
//  * Redirects to root /GET/
//  ***************************************/
// app.post("/logout", (req, res) => {
//   // set session value to null
//   req.session = null;
//   res.redirect("/");
// });


// /***************************************
//  * Register
//  * GET /register
//  * Shows registration screen
//  ***************************************/
// app.get("/register", (req, res) => {
//   const templateVars = { user: null };
//   res.render("register", templateVars);
// });


// /***************************************
//  * Register
//  * POST /register
//  * Redirects GET/urls
//  ***************************************/
// app.post("/register", (req, res) => {
//   // generate a new ID for user
//   const id = userId();
//   const userID = id;
//   // get data from form
//   const { name, email, password } = req.body;
//   // trim password and email
//   // avoid duplicated and getting around check
//   const nameT = name.trim();
//   const emailT = email.trim();
//   const passwordT = password.trim();
//   // check for emptry strings in  email or password
//   if (emailT === '' || passwordT === '' || nameT === '') {
//     statusCodeError = {
//       '400': 'Missing_Email_or_Password',
//       message: 'Please Enter Email Or Password'
//     };
//     return res.status(400).redirect('400');
//   }

//   // check if is a current user
//   const usersDB = users;
//   const isCurrentUser = findUserByEmail(emailT, usersDB);
//   // if user exists return with a 400
//   if (isCurrentUser) {
//     // return res.status(400).send('400: Already Exists');
//     statusCodeError = { '400': 'User_Already_Exists' };
//     return res.status(400).redirect('400');
//   }
//   // create a hashedPassword
//   const hashedPassword = bcrypt.hashSync(passwordT, 10);

//   // add new userID to session
//   newUser(id, nameT, emailT, hashedPassword, usersDB);
//   req.session.userID = userID;
//   return res.redirect("urls");
// });


// /***************************************
//  * Login
//  * GET /login
//  * Renders the login form
//  ***************************************/
// app.get('/login', (req, res) => {
//   // get login page/form
//   const templateVars = { user: null };
//   res.render('login', templateVars);
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