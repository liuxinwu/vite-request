import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { InstanceType } from './types/instance';
export declare class Instance implements InstanceType {
    axiosInstance: AxiosInstance;
    constructor(config?: AxiosRequestConfig);
    /**
     * 创建 axios 实例
     * @param config 请求配置
     * @returns
     */
    createdInstance(config?: AxiosRequestConfig): AxiosInstance;
    interceptorsRequest(): void;
    interceptorsRespose(): void;
}
