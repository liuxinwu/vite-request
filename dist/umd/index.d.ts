import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CustomConfigType } from "./types";
import { Instance } from "./instance";
export default class ViteRequest {
    instance: Instance;
    customConfigDefault: CustomConfigType;
    constructor(config?: AxiosRequestConfig, customConfig?: CustomConfigType);
    private request;
    private handleBeforeRequest;
    private handleAfterRequest;
    private handleError;
    get<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;
    post<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;
    delete<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;
    put<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;
    getAllErrorInfo(): AxiosError<any, any>[];
}
