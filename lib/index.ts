import { AxiosRequestConfig, AxiosResponse } from "axios";
import { CustomConfigType } from "./types/request";
import { Instance } from "./instance";
import { InstanceType } from "./types/instance";
import { customConfigDefault } from "./config";
import { transfromPath, endsWith, startsWith } from "./utils/path";
import { handleToken, handleLoading, emptyObj } from "./utils/index";
import { resolve } from "path/posix";
import { rejects } from "assert";

const IDENTIFIER = "/";
const requestMap = new Set() 

class QuickRequest {
  instance: InstanceType;
  customConfigDefault = customConfigDefault;

  constructor(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    config.url &&
      (config.url = transfromPath(config.url, IDENTIFIER, endsWith));
    this.instance = new Instance(config);
    this.customConfigDefault = { ...this.customConfigDefault, ...customConfig };
  }

  async request<T>(
    config: AxiosRequestConfig,
    customConfig: CustomConfigType = emptyObj()
  ): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      config.url &&
      (config.url = transfromPath(config.url, IDENTIFIER, startsWith));
    const { isNeedToken = false, isNeedLoading = false, handleToken: _handleToken } = {
      ...this.customConfigDefault,
      ...customConfig,
    };

      const requestKey = `${location.href}_${config.url}`
      if (requestMap.has(requestKey)) {
        reject('重复请求已被取消')
        console.log('重复请求已被取消')
        return
      }
      requestMap.add(requestKey)
      isNeedToken && handleToken(config, _handleToken);
      isNeedLoading && handleLoading(true, requestKey);
    })
    
    try {
      const res = await this.instance.axiosInstance.request<T>(config)
      resolve(res)
    } catch (error) {
      reject()
    }
  }

  get(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    this.request(config);
  }

  post(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    this.request(config);
  }
}
