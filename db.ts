import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbPassword = process.env.DB_PASSWORD

console.log(dbName, dbUser, dbHost, dbPort, dbPassword)

export const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    dialect: 'postgres',
    host: dbHost,
    port: Number(dbPort)
  }
)