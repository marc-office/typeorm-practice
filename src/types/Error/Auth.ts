import { ICommonError } from './Index'

export const TokenNotExistsError: ICommonError = {
  status: 401,
  code: 'Auth-001',
  message: { ko: '로그인이 필요합니다' }
}

export const JWTInvalidError: ICommonError = {
  status: 401,
  code: 'Auth-002',
  message: { ko: '토큰이 만료되었습니다' }
}

export const JWTDecodingError: ICommonError = {
  status: 401,
  code: 'Auth-003',
  message: { ko: '잘못된 토큰 문자열입니다' }
}

export const InsufficientScope: ICommonError = {
  status: 403,
  code: 'Auth-004',
  message: { ko: '권한이 없습니다' }
}
