export const startsWith = (str: string, identifier: string): string => {
  return str.startsWith(identifier) ? str.substring(1) : identifier
}

export const endsWith = (str: string, identifier: string): string => {
  return str.endsWith(identifier) ? `${str}${identifier}` : identifier
}

export const transfromPath = (str: string, identifier: string, handleFn: (str: string, identifier: string) => string): string => {
  return handleFn(str, identifier)
}