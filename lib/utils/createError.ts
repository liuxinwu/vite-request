import { AxiosRequestConfig, AxiosError } from "axios";

export const createError = (message: string, config: AxiosRequestConfig): AxiosError => {
  return {
    name: 'custom error',
    message,
    config,
    isAxiosError: false,
    toJSON: () => ({
      message,
      config,
    })
  }
}