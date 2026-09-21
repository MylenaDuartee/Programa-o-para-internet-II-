/**
 * ============================================================
 * TODO 11 (Encontro 2) -- Middleware de validacao genérico
 * ============================================================
 * So depois do TODO 10 (schema) e do TODO 8 (BadRequestError).
 *
 * function validate(schema) {
 *   return (req, res, next) => {
 *     const result = schema.safeParse(req.body);
 *     if (!result.success) throw new BadRequestError(..., result.error.flatten().fieldErrors);
 *     req.body = result.data;
 *     next();
 *   };
 * }
 * ============================================================
 */

import { BadRequestError } from "../errors/HttpError";
import { Request, Response, NextFunction } from "express";
import { z } from 'zod';


export function validate(schema: z.ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) throw new BadRequestError("Dados inválidos", result.error.flatten().fieldErrors);
    req.body = result.data;
    next();
    };
}
