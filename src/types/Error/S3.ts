import { ICommonError } from './Index'

export const S3Error: ICommonError = {
  status: 400,
  code: 'Auth-015',
  message: { ko: 'S3 에 작업 수행 중 오류가 발생하였습니다' }
}
