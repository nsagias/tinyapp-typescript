import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import { routes } from './routes';

import User from "./models/userModels";
import { createUser } from "./data/userData";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
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

// async  function dotit () {
//   await createUser("bob", "bob@bob.com", "abc123");
// } 
// dotit()
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});