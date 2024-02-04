import db from "../index.js";

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
