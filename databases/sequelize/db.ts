import { Sequelize, Options } from "sequelize";
import configs from "../../config/config.js"
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = (configs as {[key: string]: Options})[env];

const db: Sequelize = new Sequelize({
  ...config,
  define: {
    underscored: true
  }
});

try {
  db.authenticate();
  console.log("worked x")
} catch (error) {
  console.log("DID NOT WORK");
}

export default db;

