import { RowDataPacket } from "mysql2";
import db from "../index.js";

async function getUserById(id: number) {
  const [result] = (await db.query(`SELECT * FROM users WHERE id = ?`, [id])) as RowDataPacket[];
  return result;
}

export async function getUser(id: number) {
  const user = await getUserById(id);
  if (!user[0]) {
    throw "Something went wrong, please log in to your account again to troubleshoot";
  }
  return user[0];
}
