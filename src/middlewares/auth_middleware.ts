import { Response, NextFunction } from "express";
import { decodeJwtToken } from "../security/jwt.js";
import { getUser } from "../db/operations/users.js";
import { ICustomReq, IUserFromDb } from "../utility/users_types.js";

export async function authMiddleware(req: ICustomReq, res: Response, next: NextFunction) {
  try {
    const { authentication: token } = req.headers as { authentication: string };
    const { id } = decodeJwtToken(token);
    const user: IUserFromDb = await getUser(id);
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send({
      data: null,
      error: {
        messages: [{ message: error }]
      }
    });
  }
}
