import { AxiosRequestConfig } from "axios";

export const handleToken = (config: AxiosRequestConfig, handleToken) => {
  if (handleToken) return handleToken(config)

  config.headers ? config.headers.auth = 'this is a token' : null
}

// 需要 loading 请求的数量
let loadingMap = new Set()
export const handleLoading = (isStart: boolean, requestKey: string) => {
  let timeId = null

  if (isStart) {
    timeId = setTimeout(() => {
      if (loadingMap.size) {
        loadingMap.add(requestKey)
        console.log('start loading')
      }
      clearTimeout(timeId)
    }, 300)
    return
  }

  if (loadingMap.has(requestKey)) {
    loadingMap.delete(requestKey)
    console.log('end loading')
  }
}

export const emptyObj = () => Object.create(null)
