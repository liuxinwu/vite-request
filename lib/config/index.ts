import { CustomConfigType } from "../types/request";

export const customConfigDefault: CustomConfigType = {
  isNeedToken: false,
  notPermissionCode: 401,

  isNeedLoading: false,

  isNeedError: true,
  isNeedReRequest: true,
  connectCount: 3,
  isNeedRecordErrorInfo: true,

  isNeedCache: false,
};
