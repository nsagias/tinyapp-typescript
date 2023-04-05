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
import { createShortUrl, deleteByShortUrl, getUrlByLongUrl, getUrlByShortUrl, getUrlsByUserId } from "./DAL/urlData";
import { checkTokenForIpAndDelete, createAccessToken, getTokenAndVerify, getTokenByUserIdAndIp, verifyToken } from "./DAL/tokenDAL";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || '3001');
const origin: string | undefined = process.env.corsOptions;
const corsOptions = { origin };

// app.use(cors(corsOptions));
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


}

run();

// catch 404 error
app.use((req, res, next) => {
  // const err = new Error('Not Found');
  // console.log(err);
  // res.json({message: "Route not found"});
  // TODO: get original address from socket
  res.redirect("http://localhost:3001/");
  // next(err);
  next();
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

