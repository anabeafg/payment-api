import { Request, Response, NextFunction } from "express"

export function invalidJsonHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: "JSON inválido na requisição" })
  }
  next(err)
}
