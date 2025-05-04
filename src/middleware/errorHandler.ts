import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { NotFoundError } from "../errors/notFoundError";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ZodError) {
        return res.status(400).json({ errors: err.errors });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }

    return res.status(500).json({ error: err.message });
}
