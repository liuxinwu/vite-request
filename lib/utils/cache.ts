import { AxiosResponse } from 'axios'
import { createError } from './createError'

interface CacheType {
  [index: string]: AxiosResponse
}

export class Cache {
  static instance: Cache
  cache: CacheType = Object.create(null)

  constructor() {
    if (Cache.instance) return Cache.instance

    Cache.instance = this
    this.cache = {}
  }

  public get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.listenError<T>(() => {
      const value = this.cache[url]

      if (value === undefined) {
        throw Error('缓存')
      }

      return value
    })
  }

  public set<T>(url: string, value: AxiosResponse) {
    return this.listenError<T>(() => {
      return (this.cache[url] = value)
    })
  }

  public delete(url: string) {
    return this.listenError(() => {
      return delete this.cache[url]
    })
  }

  public clear(url: string) {
    return this.listenError(() => {
      return (this.cache = Object.create(null))
    })
  }

  private listenError<T>(cb: Function): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      try {
        resolve(cb.call(this))
      } catch (error) {
        reject(createError('读取缓存数据出错了！', {}))
      }
    })
  }
}
