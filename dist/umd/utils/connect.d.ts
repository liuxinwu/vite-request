import { AxiosRequestConfig } from "axios";
import ViteRequest from "..";
import { CustomConfigType } from "../types";
export declare const handleConnect: <T>(instance: ViteRequest, config: AxiosRequestConfig, _customConfig: CustomConfigType, requestKey: string) => Promise<import("axios").AxiosResponse<T, any>>;
