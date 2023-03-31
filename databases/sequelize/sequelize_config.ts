
import { Dialect, Sequelize } from "sequelize";

const DB_USER: string | undefined = process.env.DB_USER || undefined;
const DB_PORT: number| undefined  = parseInt(process.env.DB_PORT!, 10) || undefined;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD || undefined; 
const DB_HOST: string | undefined = process.env.DB_HOST || undefined; 
const DB_NAME: string | undefined = process.env.DB_NAME || undefined; 
const DB_DIALECT: Dialect | undefined = process.env.DB_DIALECT as Dialect || undefined; 


export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD,{
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT
});

try {
  sequelize.authenticate();
  console.log("worked")
} catch (error) {
  console.log("DID NOT WORK")
}


