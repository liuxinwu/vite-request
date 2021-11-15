// 需要 loading 请求的数量与延时器 id
let loadingMap = new Map<string, number>()
let isShowLoading = false

export const handleLoading = (isStart: boolean, requestKey: string) => {
  let timeId: number

  if (isStart) {
    timeId = setTimeout(() => {
      // 没有请求时显示 loading
      if (!isShowLoading) {
        console.log('start loading')
        isShowLoading = true
      }
      clearTimeout(timeId)
    }, 100)

    // 请求之前 添加请求记录与延时器 id
    loadingMap.set(requestKey, timeId)
    return
  }

  // 请求回来之后 删除对应的请求记录
  if (loadingMap.has(requestKey)) {
    const timeId = loadingMap.get(requestKey)
    clearTimeout(timeId)
    loadingMap.delete(requestKey)

    // 没有请求记录之后关闭 loading
    if (isShowLoading) {
      console.log('end loading', loadingMap)
      isShowLoading = false
    }
  }
}