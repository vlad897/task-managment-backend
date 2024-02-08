import jwt from "jsonwebtoken";

const secretKey = "secret_keyyy_957";

interface JwtPayload {
  id: number;
  code: string;
}

export function createJwtCodeToken(id: number, code?: string) {
  const token = `Bearer ${jwt.sign({ id, code }, secretKey)}`;
  return token;
}

export function decodeJwtToken<T extends JwtPayload>(token: string): T {
  token = token.split(" ")[1];
  const res = jwt.verify(token, secretKey) as T;
  return res;
}
