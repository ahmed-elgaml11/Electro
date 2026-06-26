import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import { ZodError } from "zod";
import { errorResponse } from "../utils/responses";

export const validate = <P extends z.ZodSchema, R extends z.ZodSchema, B extends z.ZodSchema, Q extends z.ZodSchema>
  (schema: { params?: P, response?: R, body?: B, query?: Q }) => 
  (req: Request, res: Response, next: NextFunction): void => {

    try {
      if (schema.params) {
        Object.defineProperty(req, "params", {
          value: schema.params.parse(req.params),
        });
      }

      if (schema.query) {
        Object.defineProperty(req, "query", {
          value: schema.query.parse(req.query),
        });
      }

      if (schema.body) {
        Object.defineProperty(req, "body", {
          value: schema.body.parse(req.body),
        });
      }
      next();

    }
    catch (err: unknown) {
      if (err instanceof ZodError) {
        const first = err.issues?.[0];
        const path = Array.isArray(first?.path) ? first.path.join('.') : first?.path ?? '';
        const message = first?.message ?? err.message;
        console.log(`${path}: ${message}`);
        errorResponse(res, 400, `${path}: ${message}`);
        return;
      }
      next(err);
    }
  };