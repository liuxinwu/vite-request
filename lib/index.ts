import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CustomConfigType } from "./types/request";
import { Instance } from "./instance";
import { InstanceType } from "./types/instance";
import { customConfigDefault } from "./config";
import {
  emptyObj,
  transfromPath,
  endsWith,
  startsWith,
  handleError,
  handleLoading,
  handleRepeat,
  handleToken,
} from "./utils/index";

const IDENTIFIER = "/";
// 记录重连的次数
const connectMap = new Map<string, number>();

export default class QuickRequest {
  instance: InstanceType;
  customConfigDefault = customConfigDefault;

  constructor(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    // 格式化 baseURL
    config.baseURL &&
      (config.baseURL = transfromPath(config.baseURL, IDENTIFIER, endsWith));
    // 初始化 axios 实例
    this.instance = new Instance(config);
    // 合并自定义配置
    this.customConfigDefault = { ...this.customConfigDefault, ...customConfig };
  }

  private async request<T>(
    config: AxiosRequestConfig,
    customConfig: CustomConfigType
  ): Promise<AxiosResponse<T>> {
    const _customConfig = {
      ...this.customConfigDefault,
      ...customConfig,
    };
    const requestKey = `${window.location.href}_${config.url}_${config.method}`;

    // 处理重复请求
    if (handleRepeat(requestKey)) return Promise.reject({
      message: "重复请求已被取消",
      config
    });

    try {
      this.handleBeforeRequest(config, _customConfig, requestKey)

      const res = await this.instance.axiosInstance.request<T>(config);
      return res;
    } catch (error) {
      console.log("catch");
      // 处理重复请求 (这里调用的原因： 因为 catch 比 finally 调用快)
      handleRepeat(requestKey, false);

      // 处理重连
      if (!connectMap.has(requestKey)) {
        connectMap.set(requestKey, 1);
      }
      let connectCount = connectMap.get(requestKey) + 1;
      if (connectCount < _customConfig.connectCount) {
        connectMap.set(requestKey, connectCount);
        return this.request(config, _customConfig);
      }
      this.handleError(_customConfig, error);
      connectMap.delete(requestKey);

      // 抛出错误
      return Promise.reject(error);
    } finally {
      console.log("finally");
      this.handleAfterRequest(_customConfig, requestKey);
    }
  }

  private handleBeforeRequest(
    config: AxiosRequestConfig,
    customConfig: CustomConfigType,
    requestKey: string
  ) {
    // 格式化 url
    config.url &&
      (config.url = transfromPath(config.url, IDENTIFIER, startsWith));
    const {
      isNeedToken = false,
      isNeedLoading = false,
      handleToken: _handleToken,
      isNeedError = false,
    } = customConfig;

    // 处理 token
    isNeedToken && handleToken(config, _handleToken);
    // 处理 Loading
    isNeedLoading && handleLoading(true, requestKey);
  }

  private handleAfterRequest(
    customConfig: CustomConfigType,
    requestKey: string
  ) {
    const { isNeedLoading = false } = customConfig;

    // 处理重复请求
    handleRepeat(requestKey, false);

    // 处理 Loading
    isNeedLoading && handleLoading(false, requestKey);
  }

  private handleError(customConfig: CustomConfigType, error) {
    const { isNeedError = false } = {
      ...this.customConfigDefault,
      ...customConfig,
    };

    // 处理错误
    if (isNeedError) handleError(error as AxiosError);
  }

  async get<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "get" }, customConfig);
  }

  async post<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "post" }, customConfig);
  }

  async delete<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "delete" }, customConfig);
  }

  async put<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "put" }, customConfig);
  }
}
