import { default as express, Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must login!" })
  }

  return next()
}
