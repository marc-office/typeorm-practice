import { Response } from 'express'
import { QueryFailedError } from 'typeorm'
import * as AWSError from './AWS'

export interface ICommonError {
  status: number
  code: string
  message: {
    ko: string
  }
  origin?: string
}

/**
 * Error Response Object 변환
 * @param error Common Error Object
 * @returns Response용 Error 객체
 */
export const getErrorResponse = (error: ICommonError) => {
  return {
    error: {
      code: error.code,
      message: error.message
    }
  }
}

/**
 * TypeORM Error 변환
 * @param error TypeORM 에러
 * @returnsCommon Common Error Object
 */
export const convertTypeormErrorToCommonError = (
  error: QueryFailedError
): ICommonError => {
  return {
    status: 400,
    code: error.name,
    message: { ko: error.message },
    origin: error.name
  }
}

/**
 * AWS Error 변환
 * @param error AWS Error
 * @returns Common Error Object
 */
const convertAWSErrorToCommonError = (error: Error): ICommonError => {
  const errorHandlerName = `${error.name}Error`
  if (errorHandlerName in AWSError) {
    return AWSError[errorHandlerName] as ICommonError
  }
  return {
    status: 400,
    code: error.name,
    message: { ko: error.message },
    origin: error.name
  }
}

/**
 * AWS 요청 실패 시 처리
 * @param res Express Response 객체
 * @returns Error 처리 함수
 */
export const AWSonFailure =
  (res: Response) =>
  /**
   * AWS Error 처리용 함수
   * @param error AWS Error
   */
    (error: any) => {
      const convertedError = convertAWSErrorToCommonError(error)
      console.log('convertedError')
      console.log(convertedError)

      res.status(convertedError.status).json(getErrorResponse(convertedError))
    }

/**
 * ICommonError Type Guard
 * @param object Error Object
 * @returns 타입 비교 결과
 */
export const isICommonError = (object: any): object is ICommonError => {
  return 'status' in object && 'code' in object && 'message' in object
}

/**
 * TypeORM Error Type Guard
 * @param object Error Object
 * @returns 타입 비교 결과
 */
export const isTypeormError = (
  object: any
): object is QueryFailedError & { code: string } =>
  object instanceof QueryFailedError
