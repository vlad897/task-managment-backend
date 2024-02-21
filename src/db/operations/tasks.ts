import { IAddTask } from "../../utility/tasks_types.js";
import { IUserFromDb } from "../../utility/users_types.js";
import db from "../index.js";

export async function addTaskInDb(user: IUserFromDb, task: IAddTask) {
  const { id } = user;
  const { title, description, deadline } = task;
  await db.query(
    `INSERT INTO tasks (title, description, deadline, user_id)
              VALUES(?,?,?,?)`,
    [title, description, new Date(deadline), id]
  );
}
