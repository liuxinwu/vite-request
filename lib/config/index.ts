import { CustomConfigType } from '../types'

export const customConfigDefault: CustomConfigType = {
  isNeedToken: false,
  notPermissionCode: 401,

  isNeedLoading: false,
  delayLoading: 300,

  isNeedError: true,
  isNeedReRequest: true,
  connectCount: 3,
  isNeedRecordErrorInfo: true,

  isNeedCache: false,
}
