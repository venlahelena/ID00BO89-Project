import { Sequelize } from "sequelize";
import "dotenv/config";
const DB_NAME = process.env.DB_NAME || "database";
const DB_ADDR = process.env.DB_ADDR || "localhost";
const DB_USER = process.env.DB_USER || "username";
const DB_PASS = process.env.DB_PASS || "password";
export const database = new Sequelize({
    host: DB_ADDR,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    port: 5432,
    dialect: "postgres",
    storage: ":memory:",
});
