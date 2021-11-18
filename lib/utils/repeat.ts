const requestMap = new Set()

export const handleRepeat = (requestKey: string, isAdd: boolean = true) => {
  if (!isAdd) {
    return requestMap.delete(requestKey)
  }

  if (requestMap.has(requestKey)) {
    console.log('重复请求已被取消')
    return true
  }
  requestMap.add(requestKey)
}
