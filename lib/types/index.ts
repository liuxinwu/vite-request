import { AxiosError, AxiosRequestConfig } from "axios";

export interface CustomConfigType {
  // 是否需要 token 默认值 false
  isNeedToken?: boolean;
  // token 处理函数 默认值 undefined
  setToken?: (config: AxiosRequestConfig) => void;
  // 重新刷新 token 函数 默认值 undefined
  refreshToken?: () => Promise<any>;
  // 没有权限的状态码 默认值 401
  notPermissionCode: number;

  // 是否需要 loading 默认值 false
  isNeedLoading?: boolean;
  // 自定义 loading
  showLoadingFn?: (isShow: boolean) => void;

  // 是否需要统一处理 error 默认值 true
  isNeedError?: boolean;
  // error 的显示方式 默认值 undefined
  showErrorFn?: (error: AxiosError) => void;
  // 是否需要重新请求(请求失败时) 默认值 true
  isNeedReRequest?: boolean;
  // 重新请求次数 默认值 3
  connectCount?: number;
  // 是否需要记录错误信息 默认值 true
  isNeedRecordErrorInfo?: boolean;

  // 是否需要缓存 默认值 false
  isNeedCache?: boolean;
}
