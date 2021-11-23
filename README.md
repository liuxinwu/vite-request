# vite-request

> 基于 axios 二次封装的请求库，方便在业务中的快速应用、集中处理。

## 基于 axios 二次封装的功能如下

- 是否需要携带登录态、登录态失效重新刷新登录态
- 请求失败时尝试重复发起、默认 3 次
- 是否需要 loading
- 是否需要统一的错误处理
- 重复请求的拦截处理
- 缓存的处理
- 请求的取消处理
- 支持多域名情况
- 断网情况的处理
- 错误信息的埋点统计

```js
export interface CustomConfigType {
  // 是否需要 token 默认值 false
  isNeedToken?: boolean;
  // token 处理函数 默认值 undefined
  setToken?: (config: AxiosRequestConfig) => void;
  // 重新刷新 token 函数 默认值 undefined
  refreshToken?: () => Promise<any>;
  // 没有权限的状态码 默认值 401
  notPermissionCode: number;

  // 是否需要 loading 默认值 false
  isNeedLoading?: boolean;
  // loading 出现的延迟时间 默认值 300ms
  delayLoading: number;
  // 自定义 loading
  showLoadingFn?: (isShow: boolean) => void;

  // 是否需要统一处理 error 默认值 true
  isNeedError?: boolean;
  // error 的显示方式 默认值 undefined
  showErrorFn?: (error: AxiosError) => void;
  // 是否需要重新请求(请求失败时) 默认值 true
  isNeedReRequest?: boolean;
  // 重新请求次数 默认值 3
  connectCount?: number;
  // 是否需要记录错误信息 默认值 true
  isNeedRecordErrorInfo?: boolean;

  // 是否需要缓存 默认值 false
  isNeedCache?: boolean;
}
```

## 实现思路

### ViteRequest 实例

> 实例中包含了，自定义配置项（`customConfigDefault`），请求方法，axios 实例

- 创建 `axios` 实例
- 初始化自定义的配置、实例上的自定义默认配置可以被实例上方法中的自定义配置覆盖
- 初始化多个实例，传入不同的 `baseURL` 就实现了多域名支持

```js
constructor(
  config: AxiosRequestConfig = emptyObj(),
  customConfig: CustomConfigType = emptyObj()
) {
  // 格式化 baseURL
  config.baseURL &&
    (config.baseURL = transfromPath(config.baseURL, IDENTIFIER, endsWith))
  // 初始化 axios 实例
  this.instance = new Instance(config)
  // 合并自定义配置
  this.customConfigDefault = { ...this.customConfigDefault, ...customConfig }
}
```

### 是否需要携带登录态、登录态失效重新刷新登录态

- 通过自定义配置项中的 `isNeedToken` 字段确定是否需要 `token`，请求发出之前做处理
- 可自定义 `token` 处理函数 `handleToken`
- 当检查到请求的状态码等于我们定义的无权限状态码 `customConfigDefault.notPermissionCode` 时，主动调用我们传进的刷新 `token` 函数 `customConfigDefault.refreshToken`，成功之后，重新发起之前 `token` 失效的请求

```js
// 处理 token
isNeedToken && handleToken(config, setToken)

export const handleToken = (
  config: AxiosRequestConfig,
  setToken: (config: AxiosRequestConfig) => void
) => {
  config.headers = { ...(config.headers || {}) }
  if (setToken) return setToken(config)

  config.headers.token = (window as any).token
}

const { response: { status = 0 } = {} } = error

if (status !== _customConfig.notPermissionCode) {
  // ...
} else {
  // 重新刷新 token
  try {
    if (_customConfig.refreshToken) {
      await _customConfig.refreshToken()
      // 重新发起之前 token 失效的请求
      return this.request(config, customConfig)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
```

### 请求失败时尝试重复发起、默认 3 次

- 发起重连次数可自定义 `connectCount`
- 检测到请求失败之后、进入重发请求里面
- 用一个 `Map` 来记录重连的次数 `key`（`${window.location.href}_${baseUrl + config.url}_${config.method}`） 为一个标识符，`val` 为重连的次数
- 当请求成功或者请求次数达到 3 次之后，删除 `Map` 中的记录

```js
try {
  // 请求发起
  const res = await this.instance.axiosInstance.request<T>(config)

  // 重置重连数
  handleConnect<T>(this, config, _customConfig, requestKey, true)
  return res
} catch (error) {
  const { response: { status = 0 } = {} } = error

  if (status !== _customConfig.notPermissionCode) {
    // 重连
    const connectResult = handleConnect<T>(
      this,
      config,
      _customConfig,
      requestKey
    )
    if (connectResult) return connectResult
  }

  // 抛出错误
  return Promise.reject(error)
}

const connectMap = new Map<string, number>()

export const handleConnect = <T>(
  instance: ViteRequest,
  config: AxiosRequestConfig,
  _customConfig: CustomConfigType,
  requestKey: string,
  isDelete: boolean = false
) => {
  if (isDelete) {
    connectMap.delete(requestKey)
    return
  }

  // 处理重连
  if (!connectMap.has(requestKey)) {
    connectMap.set(requestKey, 1)
  }

  let connectCount = connectMap.get(requestKey)

  if (connectCount <= _customConfig.connectCount) {
    connectCount += 1
    connectMap.set(requestKey, connectCount)
    // @ts-ignore
    return instance.request<T>(config, _customConfig)
  }
  connectMap.delete(requestKey)
}
```

### 是否需要 loading

- 实例、与方法都可以配置，方法优先级高于实例
- `Map` 记录每一个请求，`isShowLoading` loading是否在显示中
- 延时控制 `loading` 的显示时间，防止出现闪屏情况。延时器控制，当接口相应时间大于 `customConfig.delayLoading` 将 `isShowLoading` 置于 `true` 显示 `loading`
- 当多个请求出现时，只会出现一个 `loading`，中途不会闪屏情况。当`isShowLoading` 为 `true` 时 不重复显示，当 `Map` 的 `size` 为 `0` 并且 `isShowLoading` 为 `true` 时，将 `isShowLoading` 置于 `false` 关闭 `loading`

```js
try {
  isNeedLoading &&
      handleLoading(true, requestKey, delayLoading, showLoadingFn)

  // 请求发起
  const res = await this.instance.axiosInstance.request<T>(config)
  return res
} catch (error) {
  // 处理 Loading
  isNeedLoading &&
      handleLoading(false, requestKey, delayLoading, showLoadingFn)

  // 抛出错误
  return Promise.reject(error)
}

// 需要 loading 请求的数量与延时器 id
let loadingMap = new Map<string, NodeJS.Timeout>()
let isShowLoading = false

export const handleLoading = (
  isStart: boolean,
  requestKey: string,
  delayLoading: number,
  showLoadingFn?: (isShow: boolean) => void
) => {
  let timeId: NodeJS.Timeout

  if (isStart) {
    timeId = setTimeout(() => {
      // 没有请求时显示 loading
      if (!isShowLoading) {
        isShowLoading = true
        showLoadingFn
          ? showLoadingFn(isShowLoading)
          : console.log('start loading')
      }
      clearTimeout(timeId)
    }, delayLoading)

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
    if (isShowLoading && !loadingMap.size) {
      isShowLoading = false
      showLoadingFn ? showLoadingFn(isShowLoading) : console.log('end loading')
    }
  }
}

```

### 是否需要统一的错误处理

- 提供 `customConfig.showErrorFn` 错误处理函数，统一调用

```js
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
```

### 重复请求的拦截处理

- `Set` 记录请求，请求在里面则重复
- 发起请求之前记录，响应之后删除

```js
// 检查是否重复并记录
if (handleRepeat(requestKey))
      return Promise.reject(createError('重复请求已被取消', config))

// 清楚记录
handleRepeat(requestKey, false)

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
```

### 缓存的处理

- 缓存在内存中
- 请求前检测缓存，有则返回缓存，无则向服务器请求，存缓存

```js
const request = async (): Promise<AxiosResponse<T>> => {
  try {

    // 请求发起
    const res = await this.instance.axiosInstance.request<T>(config)

    // 设置缓存
    if (_customConfig.isNeedCache) {
      cache.set<T>(requestKey, res)
    }
    return res
  }
}

if (_customConfig.isNeedCache) {
  try {
    const res = await cache.get<T>(requestKey)
    return res
  } catch (error) {
    return request()
  }
} else {
  return request()
}
```

## 编写

> 基于 TypeScript 编写

## 打包

> 基于 rollupjs 打包

- `npm run dev` 开发实时预览
- `npm run build` 打包

## prettier 代码美化

- yarn add prettier -D
- 新增 .prettierignore 文件（忽略需要美化文件）
- 新增 .prettierrc.js 文件（规则文件）
- vscode 安装 Prettier - Code formatter 插件
- 配置 vscode 的配置文件（可根据项目单独配置）

## 使用实例

> 具体见 [example](https://github.com/liuxinwu/vite-request/blob/feat/v1.0.0/example/index.html) 预览的同时需要启动 `node` 服务 `cd example & node serve.js`

### Install

```js
  yarn add vite-request -S

  # or

  npm install vite-request -S
```

### Usage

#### 引入

```js
import ViteRequest from 'vite-request'
```

#### 初始化实例

> 不同的服务、可以通过多个实例化多个实例来实现

- `constructor(config?: AxiosRequestConfig, customConfig?: CustomConfigType);`

```js
import ViteRequest from 'vite-request'

// 服务1
const viteRequest1 = new ViteRequest({
  baseURL: 'http://127.0.0.1:5000'
})

// 服务2
const viteRequest2 = new ViteRequest({
  baseURL: 'http://127.0.0.1:3000'
}, {
  isNeedLoading: true
})
```

#### 请求方法

- `get<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;`
- `post<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;`
- `delete<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;`
- `put<T>(config?: AxiosRequestConfig, customConfig?: CustomConfigType): Promise<AxiosResponse<T, any>>;`

> 实例上的方法中的自定义配置参数（customConfig），会覆盖实例上的自定义配置参数（customConfig）

##### GET

```js
viteRequest.get<{
  data: { value: string },
  msg: string
}>({
  url: '/news-list',
  params: {
    a: 1
  }
}, {
  isNeedToken: true
}).then(res => console.log(res.data.data.value), error => console.log(error, 'error'))
```

##### POST

```js
;(async () => {
  const { data: { data: { value }}} = await viteRequest.get<{
    data: { value: string },
    msg: string
  }>({
    url: '/news-list',
    data: {
      a: 1
    }
  }, {
    isNeedToken: true
  })
  console.log(value)
})()
```

##### PUT

```js
viteRequest.put<{
  data: { value: string },
  msg: string
}>({
  url: '/news-list',
  data: {
    a: 1
  }
}, {
  isNeedToken: true
}).then(res => console.log(res.data.data.value), error => console.log(error, 'error'))
```

##### DELETE

```js
viteRequest.delete<{
  data: { value: string },
  msg: string
}>({
  url: '/news-list',
  params: {
    a: 1
  }
}, {
  isNeedToken: true
}).then(res => console.log(res.data.data.value), error => console.log(error, 'error'))
```

#### 刷新 token

```js
viteRequest.customConfigDefault.refreshToken = async () => {
  const res = await viteRequest.get({
    url: '/refresh-token'
  }, {
    isNeedLoading: true
  })
  const { token } = res.data.data
  console.log(token)
  window.token = token
}
```

#### 自定义 token 处理

```js
const viteRequest = new ViteRequest({
  baseURL: 'http://127.0.0.1:5000'
}, {
  setToken(config) {
    config.headers.token = 'custom token'
  }
})
```

#### 自定义统一错误处理函数

```js
const viteRequest = new ViteRequest({
  baseURL: 'http://127.0.0.1:5000'
}, {
  showErrorFn(error) {
    console.log(error, '自定义统一错误处理函数')
  }
})
```

#### 自定义统一 loading 处理函数

```js
const viteRequest = new ViteRequest(
  {
    baseURL: "http://127.0.0.1:5000",
  },
  {
    isNeedLoading: true,
    showLoadingFn(isShow) {
      isShow ? console.log("start") : console.log("close");
    },
  }
);
```

