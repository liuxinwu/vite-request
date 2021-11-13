import { AxiosRequestConfig, AxiosInstance } from 'axios'

export interface InstanceType {
  axiosInstance: AxiosInstance
  
  createdInstance(config?: AxiosRequestConfig): AxiosInstance
}