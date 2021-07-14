import { NextFunction, Request, Response } from 'express'
import { validateToken } from '@/utils/VerifyToken'
import {
  JWTDecodingError,
  JWTInvalidError,
  TokenNotExistsError
} from '@/types/Error/Auth'
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
    // 헤더에 토큰 존재 여부 확인

    const verify = await validateToken(token)
    console.log(verify)
    if (verify === false) {
      throw JWTInvalidError
    }
    // 토큰이 만료된 경우

    if (typeof verify === 'object') res.locals.userId = verify.sub
    // 유저 아이디 res.locals 전역 변수 할당
    else throw JWTDecodingError
  } catch (e) {
    return res.status(e.status).json(getErrorResponse(e))
  }
  return next()
}
