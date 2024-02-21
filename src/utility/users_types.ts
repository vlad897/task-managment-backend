import { Request } from "express";

export interface IToken {
  authentication: string;
}

export interface IUserFromDb {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ICustomReq extends Request {
  user?: IUserFromDb;
}
