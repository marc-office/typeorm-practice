import { NextFunction, Request, Response } from 'express'
import {
  convertTypeormErrorToCommonError,
  getErrorResponse,
  isICommonError,
  isTypeormError
} from '@/types/Error/Index'

/**
 * 공통 에러 처리 Wrapper
 * @param asyncFn Wrapping할 함수
 * @returns 함수 실행 결과
 */
export default (
  asyncFn: (req: Request, res: Response, next: NextFunction) => any
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await asyncFn(req, res, next)
    } catch (e) {
      if (isICommonError(e)) {
        return res.status(e.status).json(getErrorResponse(e))
      } else if (isTypeormError(e)) {
        const convertedError = convertTypeormErrorToCommonError(e)
        return res
          .status(convertedError.status)
          .json(getErrorResponse(convertedError))
      } else {
        console.log(e)
        const instanceName = e.constructor.name
        switch (instanceName) {
          case 'EntityNotFoundError':
            return res.status(404).json({
              code: instanceName,
              message: 'Data Not Found'
            })
        }

        return res.status(400).json({
          code: instanceName,
          message: e
        })
      }
    }
  }
}
