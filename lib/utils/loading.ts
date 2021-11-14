// 需要 loading 请求的数量
let loadingMap = new Set()
export const handleLoading = (isStart: boolean, requestKey: string) => {
  let timeId = null

  if (isStart) {
    timeId = setTimeout(() => {
      if (!loadingMap.size) {
        loadingMap.add(requestKey)
        console.log('start loading')
      }
      clearTimeout(timeId)
    }, 0)
    return
  }

  if (loadingMap.has(requestKey)) {
    loadingMap.delete(requestKey)

    if (!loadingMap.size) {
      console.log('end loading')
    }
  }
}