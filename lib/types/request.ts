import { AxiosRequestConfig } from "axios";

export interface CustomConfigType {
  // 是否需要 token
  isNeedToken?: boolean
  // 重新刷新 token 函数
  refreshToken?: () => Promise<any>
  // token 处理函数
  handleToken?: (config: AxiosRequestConfig) => {},
  // 是否需要 loading
  isNeedLoading?: boolean
  // 是否需要统一处理 error
  isNeedError?: boolean
  // 是否需要重新请求(请求失败时)
  isNeedReRequest?: boolean
  // 重新请求次数
  connectCount?: number
  // 是否需要记录错误信息
  isNeedRecordErrorInfo?: boolean
  // 是否需要缓存
  isNeedCache?: boolean
}