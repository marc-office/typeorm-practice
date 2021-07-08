import { ICommonError } from './index'

export const AccessDeniedExceptionError: ICommonError = {
  status: 400,
  code: 'AWS-001',
  message: { ko: '권한이 없습니다' },
  origin: 'AccessDeniedException'
}

export const IncompleteSignatureError: ICommonError = {
  status: 400,
  code: 'AWS-002',
  message: { ko: '요청 서명이 AWS 표준을 준수하지 않습니다' },
  origin: 'IncompleteSignature'
}

export const InternalFailureError: ICommonError = {
  status: 500,
  code: 'AWS-003',
  message: {
    ko: '알 수 없는 오류, 예외 또는 오류로 인해 요청을 처리하지 못했습니다'
  },
  origin: 'InternalFailure'
}

export const InvalidActionError: ICommonError = {
  status: 400,
  code: 'AWS-004',
  message: {
    ko: '요청된 작업 또는 명령이 잘못되었습니다. 작업이 올바르게 입력되었는지 확인합니다'
  },
  origin: 'InvalidAction'
}

export const InvalidClientTokenIdError: ICommonError = {
  status: 403,
  code: 'AWS-005',
  message: {
    ko: '제공된 X.509 인증서 또는 AWS 액세스 키 ID가 레코드에 없습니다.'
  },
  origin: 'InvalidClientTokenId'
}

export const InvalidParameterCombinationError: ICommonError = {
  status: 400,
  code: 'AWS-006',
  message: { ko: '함께 사용해서는 안 되는 파라미터가 함께 사용되었습니다' },
  origin: 'InvalidParameterCombination'
}

export const InvalidParameterValueError: ICommonError = {
  status: 400,
  code: 'AWS-007',
  message: {
    ko: '입력 매개 변수에 대해 잘못되었거나 범위를 벗어난 값이 제공되었습니다'
  },
  origin: 'InvalidParameterValue'
}

export const InvalidQueryParameterError: ICommonError = {
  status: 400,
  code: 'AWS-008',
  message: {
    ko: 'AWS 쿼리 문자열의 형식이 잘못되었거나 AWS 표준을 준수하지 않습니다'
  },
  origin: 'InvalidQueryParameter'
}

export const MalformedQueryStringError: ICommonError = {
  status: 404,
  code: 'AWS-009',
  message: { ko: '쿼리 문자열에 구문 오류가 있습니다' },
  origin: 'MalformedQueryString'
}

export const MissingActionError: ICommonError = {
  status: 400,
  code: 'AWS-010',
  message: { ko: '요청에 작업 또는 필수 매개 변수가 누락되었습니다' },
  origin: 'MissingAction'
}

export const MissingAuthenticationTokenError: ICommonError = {
  status: 403,
  code: 'AWS-011',
  message: {
    ko: '요청에 유효한(등록된) AWS 액세스 키 ID 또는 X.509 인증서가 포함되어야 합니다'
  },
  origin: 'MissingAuthenticationToken'
}

export const MissingParameterError: ICommonError = {
  status: 400,
  code: 'AWS-012',
  message: { ko: '지정된 작업에 필요한 매개 변수가 제공되지 않았습니다' },
  origin: 'MissingParameter'
}

export const NotAuthorizedError: ICommonError = {
  status: 400,
  code: 'AWS-013',
  message: { ko: '이 작업을 수행할 권한이 없습니다' },
  origin: 'NotAuthorized'
}

export const OptInRequiredError: ICommonError = {
  status: 403,
  code: 'AWS-014',
  message: { ko: 'AWS 액세스 키 ID를 서비스에 가입해야 합니다' },
  origin: 'OptInRequired'
}

export const RequestExpiredError: ICommonError = {
  status: 400,
  code: 'AWS-015',
  message: { ko: '요청이 만료되었습니다' },
  origin: 'RequestExpired'
}

export const ServiceUnavailableError: ICommonError = {
  status: 503,
  code: 'AWS-016',
  message: { ko: '서버의 일시적인 오류로 인해 요청에 실패했습니다' },
  origin: 'ServiceUnavailable'
}

export const ThrottlingExceptionError: ICommonError = {
  status: 400,
  code: 'AWS-017',
  message: { ko: '요청 쓰로틀링으로 인해 요청이 거부되었습니다' },
  origin: 'ThrottlingException'
}

export const ValidationErrorError: ICommonError = {
  status: 400,
  code: 'AWS-018',
  message: { ko: '입력이 AWS 서비스에 지정된 제약 조건을 충족하지 못함' },
  origin: 'ValidationError'
}

export const NotAuthorizedExceptionError: ICommonError = {
  status: 401,
  code: 'AWS-019',
  message: { ko: 'ID/Password가 다름' },
  origin: 'NotAuthorizedException'
}
