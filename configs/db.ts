import mysql2 from 'mysql2'
import 'dotenv/config'

export const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    enableKeepAlive: true,
    waitForConnections: true,
})