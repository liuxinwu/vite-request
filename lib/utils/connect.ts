import { AxiosRequestConfig } from "axios";
import ViteRequest from "..";
import { CustomConfigType } from "../types/request";


// 记录重连的次数
const connectMap = new Map<string, number>();

export const handleConnect = <T>(instance: ViteRequest, config: AxiosRequestConfig, _customConfig: CustomConfigType, requestKey: string) => {
  // 处理重连
  if (!connectMap.has(requestKey)) {
    connectMap.set(requestKey, 1);
  }
  let connectCount = connectMap.get(requestKey) + 1;
  if (connectCount < _customConfig.connectCount) {
    connectMap.set(requestKey, connectCount);
    // @ts-ignore
    return instance.request<T>(config, _customConfig);
  }
  connectMap.delete(requestKey);
}