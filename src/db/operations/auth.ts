import { RowDataPacket } from "mysql2";
import db from "../index.js";
import { IUpdateUserData } from "../../controllers/auth.js";

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export async function createUserInDb(user: IUser) {
  try {
    const { name, surname, email, password } = user;
    await db.query(
      `INSERT INTO users (name, surname, email, password)
      VALUES (?,?,?,?)`,
      [name, surname, email, password]
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null) {
      const errorObject = error as { sqlMessage?: string };
      throw errorObject.sqlMessage;
    }
  }
}

async function getUserByEmail(email: string) {
  const [result] = (await db.query(`SELECT * FROM users WHERE email = ?`, [email])) as RowDataPacket[];
  return result;
}

export async function getUserInDb(email: string) {
  const result = await getUserByEmail(email);
  if (!result[0]) {
    throw "Incorrect email or password";
  }

  return result[0];
}

export async function findUserInDb(email: string) {
  const result = await getUserByEmail(email);
  if (!result[0]) {
    throw "User not found";
  }

  return result[0];
}

export async function updateUserDataInDb(id: number, updateElements: IUpdateUserData) {
  const textForUpdate: string[] = [];
  const valuesForUpdates = [];
  for (const key in updateElements) {
    if (typeof key === "string") {
      textForUpdate.push(`${key} = ?`);
      valuesForUpdates.push((updateElements as Record<string, unknown>)[key]);
    }
  }
  if (!Object.keys(updateElements).length) {
    throw "Something went wrong";
  }
  await db.query(`UPDATE users SET ${textForUpdate} WHERE id = ?;`, [...valuesForUpdates, id]);
}
