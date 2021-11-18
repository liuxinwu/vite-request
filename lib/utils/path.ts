/**
 * 从字符串头部删除标识符
 * @param str 字符串
 * @param identifier 标识符
 * @returns 处理后字符串
 */
export const startsWith = (str: string, identifier: string): string => {
  return str.startsWith(identifier) ? str.substring(1) : str
}

/**
 * 往字符串尾部添加标识符
 * @param str 字符串
 * @param identifier 标识符
 * @returns 处理后字符串
 */
export const endsWith = (str: string, identifier: string): string => {
  return str.endsWith(identifier) ? `${str}${identifier}` : str
}

export const transfromPath = (
  str: string,
  identifier: string,
  handleFn: (str: string, identifier: string) => string
): string => {
  return handleFn(str, identifier)
}
