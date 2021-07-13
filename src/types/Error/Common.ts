import { ICommonError } from './Index'
export const APINotFoundError: ICommonError = {
  status: 404,
  code: 'Common-001',
  message: { ko: '존재하지 않는 페이지입니다' }
}

export const NoDataError: ICommonError = {
  status: 404,
  code: 'Common-002',
  message: { ko: '데이터가 없습니다' }
}

export const EmptyRowError: ICommonError = {
  status: 404,
  code: 'Common-003',
  message: { ko: '데이터가 없습니다' }
}

export const UnauthorizedResource: ICommonError = {
  status: 401,
  code: 'Common-004',
  message: { ko: '해당 리소스에 대한 권한이 없습니다.' }
}

export const FileValidationError: ICommonError = {
  status: 400,
  code: 'Common-005',
  message: { ko: '잘못된 파일을 요청하였습니다.' }
}
