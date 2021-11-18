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

## 编写

> 基于 TypeScript 编写

## 打包

> 基于 rollupjs 打包

- `npm run dev` 开发实时预览
- `npm run build` 打包

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

