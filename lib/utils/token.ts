import { AxiosRequestConfig } from "axios";

export const handleToken = (config: AxiosRequestConfig, handleToken) => {
  if (handleToken) return handleToken(config)

  const token = 'this is a token'
  config.headers ? config.headers.auth = token : config.headers = {
    auth: token
  }
}