import { Response } from "express";
import { addTaskInDb } from "../db/operations/tasks.js";
import { ICustomReq } from "../utility/users_types.js";
export function addTask(req: ICustomReq, res: Response) {
  try {
    if (req.user !== undefined) addTaskInDb(req.user, req.body);
    else throw "Please re-login to your account";
    res.status(200).send({ data: null, messages: ["Task added"] });
  } catch (error) {
    const data = [
      {
        message: error ? error : "Something went wrong, the task was not added"
      }
    ];
    res.status(400).send({
      data: null,
      error: {
        messages: data
      }
    });
  }
}
