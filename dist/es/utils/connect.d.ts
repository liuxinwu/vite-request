import { AxiosRequestConfig } from "axios";
import QuickRequest from "..";
import { CustomConfigType } from "../types/request";
export declare const handleConnect: <T>(instance: QuickRequest, config: AxiosRequestConfig, _customConfig: CustomConfigType, requestKey: string) => Promise<import("axios").AxiosResponse<T, any>>;
