import mysql2 from "mysql2/promise";

const db = mysql2.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "task_management_system",
  password: "password"
});

export default db;
