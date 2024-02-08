import { Request, Response } from "express";
import { hashing, passwordChech } from "../security/bcrypt.js";
import { createUserInDb, findUserInDb, getUserInDb, updateUserDataInDb } from "../db/operations/auth.js";
import { sendEmail } from "../lib/mailer.js";
import { randomNums } from "../lib/generateRandomNums.js";
import { createJwtCodeToken, decodeJwtToken } from "../security/jwt.js";

interface IRegUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

interface ILoginUserInDb {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface IRecoverAccount {
  email: string;
}

export interface IUpdateUserData {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const body: IRegUser = req.body;
    const { password } = body;
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
  }
}

export async function findUser(req: Request, res: Response) {
  try {
    const body: ILoginUser = req.body;
    const { email, password } = body;
    const result: ILoginUserInDb = await getUserInDb(email);
    const { id, password: hashPassword } = result;
    await passwordChech(password, hashPassword);
    const token = createJwtCodeToken(id);
    console.log(id, token);

    res.status(200).send({ data: { token }, messages: ["User found"] });
  } catch (error) {
    res.status(401).send({
      data: null,
      error: {
        messages: [{ message: error }]
      }
    });
  }
}

export async function checkingUserExistence(req: Request, res: Response) {
  try {
    const body: IRecoverAccount = req.body;
    const { email } = body;
    const { id } = await findUserInDb(email);
    const code: string = randomNums(6);
    const token = createJwtCodeToken(id, code);

    await sendEmail(email, "Recover account", `Secret code: ${code}`);
    res.status(200).send({ data: { token }, messages: ["User found"] });
  } catch (error) {
    res.status(404).send({ data: null, error: { messages: [{ message: error }] } });
  }
}

export async function checkingUserSendCode(req: Request, res: Response) {
  try {
    const { code } = req.body;
    const token: string = req.headers.authentication as string;
    const decode = decodeJwtToken(token);

    if (!(decode.code === code)) {
      throw "Recovery code is incorrect";
    }
    res.status(200).send({ data: null, messages: ["Code confirmed"] });
  } catch (error) {
    res.status(406).send({ data: null, error: { messages: [{ message: error }] } });
  }
}

export async function updateUserPassword(req: Request, res: Response) {
  try {
    const { new_password, repeat_new_password } = req.body;
    if (!(new_password === repeat_new_password)) {
      throw "Password mismatch";
    }
    const token: string = req.headers.authentication as string;
    const decode = decodeJwtToken(token);
    const { id } = decode;
    const hashPassword = await hashing(new_password);
    const updateElements: IUpdateUserData = {
      password: hashPassword
    };
    await updateUserDataInDb(id, updateElements);
    res.status(200).send({ data: null, messages: ["Password updated successfully"] });
  } catch (error) {
    res.status(409).send({ data: null, error: { messages: [{ message: error }] } });
  }
}
