import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import { routes } from './routes';
import db from "./databases/sequelize/db";
import { initModels } from './models'
import { Token, UrlModel, User } from "./models";
import { createUser, getAllUsers, getUserByEmail } from "./DAL/userData";
import { createShortUrl, getUrlByShortUrl, getUrlsByUserId } from "./DAL/urlData";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || '3001');
const origin: string | undefined = process.env.corsOptions;
const corsOptions = { origin };

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);



async function run() {
  initModels(db)
  await db.sync()
  
  // await User.sync({ alter: true });
  // await UrlModel.sync({ alter: true });
  // await Token.sync({ alter: true });

  // const user  = await createUser("myFirstName", "myLastName", "myEmail@anyemail.com", "abc123", true);
  // const user  = await createUser("myDeleedUser", "myDeletedUser", "myDeletedUser@anyemail.com", "abc123", false);
  // console.log("MY NEW USER",  user);
  // const findUser = await getUserByEmail("myEmail@anyemail.com");
  // console.log("FIND USER BY EMAIL", findUser);
  // const allUsers  = await getAllUsers();
  // console.log("GET ALL USERS", allUsers);
  // const newShortUrl = await createShortUrl("www.bob.com", "3")
  // console.log("NEW Short url", newShortUrl);
  // createShortUrl = async (longUrl: string, userId: string)
  // const getShortURL = await getUrlByShortUrl("843624");
  // console.log("GET SHORT URL", getShortURL);
  const getURLsByUserId = await getUrlsByUserId("3");
  console.log("GET URLS BY USER ID", getURLsByUserId);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
 
}

run();


