import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import { routes } from './src/routes';
import db from "./src/databases/sequelize/db";
import { initModels } from './src/models'

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || '3001');
const origin: string | undefined = process.env.corsOptions;
const corsOptions = { origin };

async function run() {
  initModels(db)
  await db.sync()
  // await User.sync({ alter: true });
  // await UrlModel.sync({ alter: true });
  // await Token.sync({ alter: true })
}

run();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);

// catch 404 error
// app.use((req, res, next) => {
//   // const err = new Error('Not Found');
//   // console.log(err);
//   // res.json({message: "Route not found"});
//   // TODO: get original address from socket
//   res.redirect("http://localhost:3001/404");
//   // next(err);
//   next();
// })

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

