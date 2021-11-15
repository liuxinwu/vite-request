import { AxiosError } from "axios"
import ViteRequest from ".."

const errorMap = new WeakMap<ViteRequest, AxiosError[]>()

export const collectError = (instance: ViteRequest, error: AxiosError) => {
  const map = errorMap.get(instance) || []
  map.push(error)
  errorMap.set(instance, map)
}

export const getErrorInfo = (instance: ViteRequest) => {
  return errorMap.get(instance) || []
}