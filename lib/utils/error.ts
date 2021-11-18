import { AxiosError } from 'axios'

export const handleError = (
  error: AxiosError,
  showErrorFn?: (error: AxiosError) => void
) => {
  const { response: { status = 0, data = {} } = {} } = error

  data.msg = data.msg || statusCode[status]
  showErrorFn
    ? showErrorFn(error)
    : console.log(data.msg, '你可以传入统一自定义的错误处理函数')
}

export enum statusCode {
  '请确认是否已经连上服务器' = 0,
  '权限不足，需要用户验证' = 401,
  '拒绝执行它' = 403,
  '服务器上未找到该资源' = 404,
  '服务器错误' = 500,
  '此请求方法不被服务器支持且无法被处理' = 501,
  '服务器没有准备好处理请求' = 503,
  '服务器不支持请求中所使用的HTTP协议版本' = 505,
}
