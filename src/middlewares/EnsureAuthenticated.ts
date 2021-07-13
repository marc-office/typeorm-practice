import { NextFunction, Request, Response } from 'express'
import { validateToken } from '@/utils/VerifyToken'

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
  console.log(token)
  if (token) token.toString()
  const data = await validateToken(token)
  console.log(data)
  res.locals.user = data
  return next()
}
