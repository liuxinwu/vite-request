import { AxiosError } from "axios"
import QuickRequest from ".."

const errorMap = new WeakMap<QuickRequest, AxiosError[]>()

export const collectError = (instance: QuickRequest, error: AxiosError) => {
  const map = errorMap.get(instance) || []
  map.push(error)
  errorMap.set(instance, map)
}

export const getErrorInfo = (instance: QuickRequest) => {
  return errorMap.get(instance) || []
}