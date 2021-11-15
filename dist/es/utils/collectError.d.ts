import { AxiosError } from "axios";
import QuickRequest from "..";
export declare const collectError: (instance: QuickRequest, error: AxiosError) => void;
export declare const getErrorInfo: (instance: QuickRequest) => AxiosError<any, any>[];
