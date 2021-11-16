import { AxiosRequestConfig } from "axios";

export const handleToken = (
  config: AxiosRequestConfig,
  setToken: (config: AxiosRequestConfig) => void
) => {
  config.headers = { ...(config.headers || {}) };
  if (handleToken) return setToken(config);

  config.headers.token = (window as any).token;
};
