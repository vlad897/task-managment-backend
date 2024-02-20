import jwt from "jsonwebtoken";
import { ITokenElements } from "../utility/jwt_types.js";

const secretKey = "secret_keyyy_957";

export function createJwtCodeToken(id: number, code?: string) {
  const token = `Bearer ${jwt.sign({ id, code }, secretKey)}`;
  return token;
}

export function decodeJwtToken<T extends ITokenElements>(token: string) {
  token = token.split(" ")[1];
  if (!token) {
    throw "Not authorized, please login to your account again";
  }
  const res = jwt.verify(token, secretKey) as T;
  return res;
}
