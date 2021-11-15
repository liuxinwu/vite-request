import { AxiosError } from "axios";
import ViteRequest from "..";
export declare const collectError: (instance: ViteRequest, error: AxiosError) => void;
export declare const getErrorInfo: (instance: ViteRequest) => AxiosError<any, any>[];
