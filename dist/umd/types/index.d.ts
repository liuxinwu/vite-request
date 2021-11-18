import { AxiosError, AxiosRequestConfig } from 'axios';
export interface CustomConfigType {
    isNeedToken?: boolean;
    setToken?: (config: AxiosRequestConfig) => void;
    refreshToken?: () => Promise<any>;
    notPermissionCode: number;
    isNeedLoading?: boolean;
    delayLoading: number;
    showLoadingFn?: (isShow: boolean) => void;
    isNeedError?: boolean;
    showErrorFn?: (error: AxiosError) => void;
    isNeedReRequest?: boolean;
    connectCount?: number;
    isNeedRecordErrorInfo?: boolean;
    isNeedCache?: boolean;
}
