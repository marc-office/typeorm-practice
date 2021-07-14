import { NextFunction, Request, Response } from 'express'
import { validateToken } from '@/utils/VerifyToken'
import { JWTInvalidError, TokenNotExistsError } from '@/types/Error/Auth'
import { getErrorResponse } from '@/types/Error/Index'

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization
    if (token) {
      token.toString()
    } else {
      throw TokenNotExistsError
    }
    const verify = await validateToken(token)
    if (verify === false) {
      throw JWTInvalidError
    }

    console.log(verify)
    res.locals.user = verify
  } catch (e) {
    return res.status(e.status).json(getErrorResponse(e))
  }
  return next()
}
