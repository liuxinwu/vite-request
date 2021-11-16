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
import { handleConnect } from "./utils/connect";
import { createError } from "./utils/createError";
import { collectError, getErrorInfo } from "./utils/collectError";

const IDENTIFIER = "/";

export default class ViteRequest {
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
    const baseUrl = this.instance.axiosInstance.defaults.baseURL ?? "";
    const requestKey = `${window.location.href}_${baseUrl + config.url}_${
      config.method
    }`;

    // 网络检查
    if (!window.navigator.onLine) {
      return Promise.reject(createError("网络不可用", config));
    }

    // 处理重复请求
    if (handleRepeat(requestKey))
      return Promise.reject(createError("重复请求已被取消", config));

    try {
      this.handleBeforeRequest(config, _customConfig, requestKey);

      const res = await this.instance.axiosInstance.request<T>(config);
      return res;
    } catch (error) {
      const {
        response: { status },
      } = error;
      console.log("catch");
      // 处理重复请求 (这里调用的原因： 因为 catch 比 finally 调用快)
      handleRepeat(requestKey, false);

      // 收集错误信息
      collectError(this, error);

      console.log(status, "status");
      if (status !== _customConfig.notPermissionCode) {
        // 重连
        const connectResult = handleConnect<T>(
          this,
          config,
          _customConfig,
          requestKey
        );
        if (connectResult) return connectResult;
      } else {
        // 重新刷新 token
        console.log("重新刷新 token");
        try {
          if (_customConfig.refreshToken) {
            await _customConfig.refreshToken();
            return this.request(config, customConfig);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }

      // 处理错误
      this.handleError(_customConfig, error);

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
      setToken,
      showLoadingFn,
    } = customConfig;

    // 处理 token
    isNeedToken && handleToken(config, setToken);
    // 处理 Loading
    isNeedLoading && handleLoading(true, requestKey, showLoadingFn);
  }

  private handleAfterRequest(
    customConfig: CustomConfigType,
    requestKey: string
  ) {
    const { isNeedLoading = false, showLoadingFn } = customConfig;

    // 处理重复请求
    handleRepeat(requestKey, false);

    // 处理 Loading
    isNeedLoading && handleLoading(false, requestKey, showLoadingFn);
  }

  private handleError(customConfig: CustomConfigType, error) {
    const { isNeedError = false, showErrorFn } = customConfig;

    // 处理错误
    if (isNeedError) handleError(error as AxiosError, showErrorFn);
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

  getAllErrorInfo() {
    return getErrorInfo(this);
  }
}
