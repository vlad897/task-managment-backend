import { Request, Response } from "express";
import { hashing } from "../security/jwt.js";
import { createUserInDb } from "../db/operations/auth.js";

interface IUser {
  name?: string;
  surname?: string;
  email?: string;
  password: string;
}
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { password }: IUser = req.body;
    const hashPassword: string = await hashing(password);
    req.body.password = hashPassword;
    await createUserInDb(req.body);

    res.status(200).send({ data: null, messages: ["User added"] });
  } catch (error: unknown) {
    res.status(409).send({
      data: null,
      error: {
        messages: [{ message: error }]
      }
    });
    console.log(error);
  }
}
