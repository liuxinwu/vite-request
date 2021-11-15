import { AxiosRequestConfig } from "axios";
export interface CustomConfigType {
    isNeedToken?: boolean;
    refreshToken?: () => Promise<any>;
    handleToken?: (config: AxiosRequestConfig) => {};
    isNeedLoading?: boolean;
    isNeedError?: boolean;
    isNeedReRequest?: boolean;
    connectCount?: number;
    isNeedRecordErrorInfo?: boolean;
    isNeedCache?: boolean;
}
