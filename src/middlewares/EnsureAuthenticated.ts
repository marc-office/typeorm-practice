import { NextFunction, Request, Response } from 'express'

export default function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('권한이 부족합니다.')
  }

  const [, token] = authHeader.split(' ')

  try {
    // TODO : Check cognito user token authentication here

    return next()
  } catch {
    throw new Error('유효하지 않은 토큰 값입니다.')
  }
}
