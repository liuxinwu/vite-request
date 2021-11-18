/**
 * 从字符串头部删除标识符
 * @param str 字符串
 * @param identifier 标识符
 * @returns 处理后字符串
 */
export declare const startsWith: (str: string, identifier: string) => string;
/**
 * 往字符串尾部添加标识符
 * @param str 字符串
 * @param identifier 标识符
 * @returns 处理后字符串
 */
export declare const endsWith: (str: string, identifier: string) => string;
export declare const transfromPath: (str: string, identifier: string, handleFn: (str: string, identifier: string) => string) => string;
