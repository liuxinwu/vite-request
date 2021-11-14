import { AxiosRequestConfig } from "axios";
export interface CustomConfigType {
    isNeedToken?: boolean;
    handleToken?: (config: AxiosRequestConfig) => {};
    isNeedLoading?: boolean;
    isNeedError?: boolean;
    isNeedReRequest?: boolean;
    connectCount?: number;
    isNeedRecordErrorInfo?: boolean;
    isNeedCache?: boolean;
}
