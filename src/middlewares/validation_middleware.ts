import z from "zod";
import { Request, Response, NextFunction } from "express";
export function validationMiddleware(scheme: z.ZodType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await scheme.parse(req.body);
      next();
    } catch (error: unknown) {
      const errMsgs = (error as { issues: unknown }).issues;

      res.status(406).send({
        data: null,
        error: {
          messages: errMsgs
        }
      });
    }
  };
}
