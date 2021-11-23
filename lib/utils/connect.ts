import { AxiosRequestConfig } from 'axios'
import ViteRequest from '..'
import { CustomConfigType } from '../types'

// 记录重连的次数
const connectMap = new Map<string, number>()

export const handleConnect = <T>(
  instance: ViteRequest,
  config: AxiosRequestConfig,
  _customConfig: CustomConfigType,
  requestKey: string,
  isDelete: boolean = false
) => {
  if (isDelete) {
    connectMap.delete(requestKey)
    return
  }

  // 处理重连
  if (!connectMap.has(requestKey)) {
    connectMap.set(requestKey, 1)
  }

  let connectCount = connectMap.get(requestKey)

  if (connectCount <= _customConfig.connectCount) {
    connectCount += 1
    connectMap.set(requestKey, connectCount)
    // @ts-ignore
    return instance.request<T>(config, _customConfig)
  }
  connectMap.delete(requestKey)
}
