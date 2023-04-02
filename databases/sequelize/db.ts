import { Dialect, Sequelize, Options } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// const DB_USER: string | undefined = process.env.DB_USER;
// const DB_NAME: string | undefined = process.env.DB_NAME || undefined; 
// const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD || undefined; 
// const DB_PORT: number| undefined  = parseInt(process.env.DB_PORT!, 10) || undefined;
// const DB_HOST: string | undefined = process.env.DB_HOST;
// const DB_DIALECT: Dialect | undefined = process.env.DB_DIALECT as Dialect || undefined; 


// export const sequelize = new Sequelize(
//   DB_NAME!, 
//   DB_USER!, 
//   DB_PASSWORD,
//     {
//       host: DB_HOST,
//       port: DB_PORT,
//       dialect: DB_DIALECT
//     }
// );



import configs from "../../config/config.js"

const env = process.env.NODE_ENV || 'development'
const config = (configs as {[key: string]: Options})[env]

const db: Sequelize = new Sequelize({
  ...config,
  define: {
    underscored: true
  }
})

try {
  db.authenticate();
  console.log("worked x")
} catch (error) {
  console.log("DID NOT WORK")
}

export default db;

