import { AxiosResponse } from 'axios';
interface CacheType {
    [index: string]: AxiosResponse;
}
export declare class Cache {
    static instance: Cache;
    cache: CacheType;
    constructor();
    get<T>(url: string): Promise<AxiosResponse<T>>;
    set<T>(url: string, value: AxiosResponse): Promise<AxiosResponse<T, any>>;
    delete(url: string): Promise<AxiosResponse<unknown, any>>;
    clear(url: string): Promise<AxiosResponse<unknown, any>>;
    private listenError;
}
export {};
