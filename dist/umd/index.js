(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
    typeof define === 'function' && define.amd ? define(['axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ViteRequest = factory(global.axios));
})(this, (function (axios) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var Instance = /** @class */ (function () {
        function Instance(config) {
            this.axiosInstance = this.createdInstance(config);
            this.interceptorsRequest();
            this.interceptorsRespose();
        }
        /**
         * 创建 axios 实例
         * @param config 请求配置
         * @returns
         */
        Instance.prototype.createdInstance = function (config) {
            return axios__default["default"].create(config);
        };
        // 添加请求拦截器
        Instance.prototype.interceptorsRequest = function () {
            this.axiosInstance.interceptors.request.use(function (config) {
                // 在发送请求之前做些什么
                return config;
            }, function (error) {
                // 对请求错误做些什么
                return Promise.reject(error);
            });
        };
        // 添加响应拦截器
        Instance.prototype.interceptorsRespose = function () {
            this.axiosInstance.interceptors.response.use(function (response) {
                // 2xx 范围内的状态码都会触发该函数。
                // 对响应数据做点什么
                return response;
            }, function (error) {
                // 超出 2xx 范围的状态码都会触发该函数。
                // 对响应错误做点什么
                return Promise.reject(error);
            });
        };
        return Instance;
    }());

    var customConfigDefault = {
        isNeedToken: false,
        notPermissionCode: 401,
        isNeedLoading: false,
        delayLoading: 300,
        isNeedError: true,
        isNeedReRequest: true,
        connectCount: 3,
        isNeedRecordErrorInfo: true,
        isNeedCache: false,
    };

    /**
     * 从字符串头部删除标识符
     * @param str 字符串
     * @param identifier 标识符
     * @returns 处理后字符串
     */
    var startsWith = function (str, identifier) {
        return str.startsWith(identifier) ? str.substring(1) : str;
    };
    /**
     * 往字符串尾部添加标识符
     * @param str 字符串
     * @param identifier 标识符
     * @returns 处理后字符串
     */
    var endsWith = function (str, identifier) {
        return str.endsWith(identifier) ? "" + str + identifier : str;
    };
    var transfromPath = function (str, identifier, handleFn) {
        return handleFn(str, identifier);
    };

    var handleError = function (error, showErrorFn) {
        var _a = error.response, _b = _a === void 0 ? {} : _a, _c = _b.status, status = _c === void 0 ? 0 : _c, _d = _b.data, data = _d === void 0 ? {} : _d;
        data.msg = data.msg || statusCode[status];
        showErrorFn
            ? showErrorFn(error)
            : console.log(data.msg, '你可以传入统一自定义的错误处理函数');
    };
    var statusCode;
    (function (statusCode) {
        statusCode[statusCode["\u8BF7\u786E\u8BA4\u662F\u5426\u5DF2\u7ECF\u8FDE\u4E0A\u670D\u52A1\u5668"] = 0] = "\u8BF7\u786E\u8BA4\u662F\u5426\u5DF2\u7ECF\u8FDE\u4E0A\u670D\u52A1\u5668";
        statusCode[statusCode["\u6743\u9650\u4E0D\u8DB3\uFF0C\u9700\u8981\u7528\u6237\u9A8C\u8BC1"] = 401] = "\u6743\u9650\u4E0D\u8DB3\uFF0C\u9700\u8981\u7528\u6237\u9A8C\u8BC1";
        statusCode[statusCode["\u62D2\u7EDD\u6267\u884C\u5B83"] = 403] = "\u62D2\u7EDD\u6267\u884C\u5B83";
        statusCode[statusCode["\u670D\u52A1\u5668\u4E0A\u672A\u627E\u5230\u8BE5\u8D44\u6E90"] = 404] = "\u670D\u52A1\u5668\u4E0A\u672A\u627E\u5230\u8BE5\u8D44\u6E90";
        statusCode[statusCode["\u670D\u52A1\u5668\u9519\u8BEF"] = 500] = "\u670D\u52A1\u5668\u9519\u8BEF";
        statusCode[statusCode["\u6B64\u8BF7\u6C42\u65B9\u6CD5\u4E0D\u88AB\u670D\u52A1\u5668\u652F\u6301\u4E14\u65E0\u6CD5\u88AB\u5904\u7406"] = 501] = "\u6B64\u8BF7\u6C42\u65B9\u6CD5\u4E0D\u88AB\u670D\u52A1\u5668\u652F\u6301\u4E14\u65E0\u6CD5\u88AB\u5904\u7406";
        statusCode[statusCode["\u670D\u52A1\u5668\u6CA1\u6709\u51C6\u5907\u597D\u5904\u7406\u8BF7\u6C42"] = 503] = "\u670D\u52A1\u5668\u6CA1\u6709\u51C6\u5907\u597D\u5904\u7406\u8BF7\u6C42";
        statusCode[statusCode["\u670D\u52A1\u5668\u4E0D\u652F\u6301\u8BF7\u6C42\u4E2D\u6240\u4F7F\u7528\u7684HTTP\u534F\u8BAE\u7248\u672C"] = 505] = "\u670D\u52A1\u5668\u4E0D\u652F\u6301\u8BF7\u6C42\u4E2D\u6240\u4F7F\u7528\u7684HTTP\u534F\u8BAE\u7248\u672C";
    })(statusCode || (statusCode = {}));

    // 需要 loading 请求的数量与延时器 id
    var loadingMap = new Map();
    var isShowLoading = false;
    var handleLoading = function (isStart, requestKey, delayLoading, showLoadingFn) {
        var timeId;
        if (isStart) {
            timeId = setTimeout(function () {
                // 没有请求时显示 loading
                if (!isShowLoading) {
                    isShowLoading = true;
                    showLoadingFn
                        ? showLoadingFn(isShowLoading)
                        : console.log('start loading');
                }
                clearTimeout(timeId);
            }, delayLoading);
            // 请求之前 添加请求记录与延时器 id
            loadingMap.set(requestKey, timeId);
            return;
        }
        // 请求回来之后 删除对应的请求记录
        if (loadingMap.has(requestKey)) {
            var timeId_1 = loadingMap.get(requestKey);
            clearTimeout(timeId_1);
            loadingMap["delete"](requestKey);
            // 没有请求记录之后关闭 loading
            if (isShowLoading) {
                isShowLoading = false;
                showLoadingFn ? showLoadingFn(isShowLoading) : console.log('end loading');
            }
        }
    };

    var requestMap = new Set();
    var handleRepeat = function (requestKey, isAdd) {
        if (isAdd === void 0) { isAdd = true; }
        if (!isAdd) {
            return requestMap["delete"](requestKey);
        }
        if (requestMap.has(requestKey)) {
            console.log('重复请求已被取消');
            return true;
        }
        requestMap.add(requestKey);
    };

    var handleToken = function (config, setToken) {
        config.headers = __assign({}, (config.headers || {}));
        if (setToken)
            return setToken(config);
        config.headers.token = window.token;
    };

    var emptyObj = function () { return Object.create(null); };

    var createError = function (message, config) {
        return {
            name: 'custom error',
            message: message,
            config: config,
            isAxiosError: false,
            toJSON: function () { return ({
                message: message,
                config: config,
            }); },
        };
    };

    var Cache = /** @class */ (function () {
        function Cache() {
            this.cache = Object.create(null);
            if (Cache.instance)
                return Cache.instance;
            Cache.instance = this;
            this.cache = {};
        }
        Cache.prototype.get = function (url) {
            var _this = this;
            return this.listenError(function () {
                var value = _this.cache[url];
                if (value === undefined) {
                    throw Error('缓存');
                }
                return value;
            });
        };
        Cache.prototype.set = function (url, value) {
            var _this = this;
            return this.listenError(function () {
                return (_this.cache[url] = value);
            });
        };
        Cache.prototype["delete"] = function (url) {
            var _this = this;
            return this.listenError(function () {
                return delete _this.cache[url];
            });
        };
        Cache.prototype.clear = function (url) {
            var _this = this;
            return this.listenError(function () {
                return (_this.cache = Object.create(null));
            });
        };
        Cache.prototype.listenError = function (cb) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    resolve(cb.call(_this));
                }
                catch (error) {
                    reject(createError('读取缓存数据出错了！', {}));
                }
            });
        };
        return Cache;
    }());

    // 记录重连的次数
    var connectMap = new Map();
    var handleConnect = function (instance, config, _customConfig, requestKey) {
        // 处理重连
        if (!connectMap.has(requestKey)) {
            connectMap.set(requestKey, 1);
        }
        var connectCount = connectMap.get(requestKey) + 1;
        if (connectCount < _customConfig.connectCount) {
            connectMap.set(requestKey, connectCount);
            // @ts-ignore
            return instance.request(config, _customConfig);
        }
        connectMap["delete"](requestKey);
    };

    var errorMap = new WeakMap();
    var collectError = function (instance, error) {
        var map = errorMap.get(instance) || [];
        map.push(error);
        errorMap.set(instance, map);
    };
    var getErrorInfo = function (instance) {
        return errorMap.get(instance) || [];
    };

    var IDENTIFIER = '/';
    var cache = new Cache();
    var ViteRequest = /** @class */ (function () {
        function ViteRequest(config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            this.customConfigDefault = customConfigDefault;
            // 格式化 baseURL
            config.baseURL &&
                (config.baseURL = transfromPath(config.baseURL, IDENTIFIER, endsWith));
            // 初始化 axios 实例
            this.instance = new Instance(config);
            // 合并自定义配置
            this.customConfigDefault = __assign(__assign({}, this.customConfigDefault), customConfig);
        }
        ViteRequest.prototype.request = function (config, customConfig) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var _customConfig, baseUrl, requestKey, request, res;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _customConfig = __assign(__assign({}, this.customConfigDefault), customConfig);
                            baseUrl = (_a = this.instance.axiosInstance.defaults.baseURL) !== null && _a !== void 0 ? _a : '';
                            requestKey = window.location.href + "_" + (baseUrl + config.url) + "_" + config.method;
                            // 网络检查
                            if (!window.navigator.onLine) {
                                return [2 /*return*/, Promise.reject(createError('网络不可用', config))];
                            }
                            // 处理重复请求
                            if (handleRepeat(requestKey))
                                return [2 /*return*/, Promise.reject(createError('重复请求已被取消', config))];
                            request = function () { return __awaiter(_this, void 0, void 0, function () {
                                var res, error_2, _a, _b, _c, status_1, connectResult, error_3;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            _d.trys.push([0, 2, 8, 9]);
                                            this.handleBeforeRequest(config, _customConfig, requestKey);
                                            return [4 /*yield*/, this.instance.axiosInstance.request(config)
                                                // 设置缓存
                                            ];
                                        case 1:
                                            res = _d.sent();
                                            // 设置缓存
                                            if (_customConfig.isNeedCache) {
                                                cache.set(requestKey, res);
                                            }
                                            return [2 /*return*/, res];
                                        case 2:
                                            error_2 = _d.sent();
                                            _a = error_2.response, _b = _a === void 0 ? {} : _a, _c = _b.status, status_1 = _c === void 0 ? 0 : _c;
                                            // 处理重复请求 (这里调用的原因： 因为 catch 比 finally 调用快)
                                            handleRepeat(requestKey, false);
                                            // 收集错误信息
                                            collectError(this, error_2);
                                            if (!(status_1 !== _customConfig.notPermissionCode)) return [3 /*break*/, 3];
                                            connectResult = handleConnect(this, config, _customConfig, requestKey);
                                            if (connectResult)
                                                return [2 /*return*/, connectResult];
                                            return [3 /*break*/, 7];
                                        case 3:
                                            _d.trys.push([3, 6, , 7]);
                                            if (!_customConfig.refreshToken) return [3 /*break*/, 5];
                                            return [4 /*yield*/, _customConfig.refreshToken()];
                                        case 4:
                                            _d.sent();
                                            return [2 /*return*/, this.request(config, customConfig)];
                                        case 5: return [3 /*break*/, 7];
                                        case 6:
                                            error_3 = _d.sent();
                                            return [2 /*return*/, Promise.reject(error_3)];
                                        case 7:
                                            // 处理错误
                                            this.handleError(_customConfig, error_2);
                                            // 抛出错误
                                            return [2 /*return*/, Promise.reject(error_2)];
                                        case 8:
                                            this.handleAfterRequest(_customConfig, requestKey);
                                            return [7 /*endfinally*/];
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!_customConfig.isNeedCache) return [3 /*break*/, 5];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, cache.get(requestKey)];
                        case 2:
                            res = _b.sent();
                            return [2 /*return*/, res];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, request()];
                        case 4: return [3 /*break*/, 6];
                        case 5: return [2 /*return*/, request()];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        ViteRequest.prototype.handleBeforeRequest = function (config, customConfig, requestKey) {
            // 格式化 url
            config.url &&
                (config.url = transfromPath(config.url, IDENTIFIER, startsWith));
            var _a = customConfig.isNeedToken, isNeedToken = _a === void 0 ? false : _a, _b = customConfig.isNeedLoading, isNeedLoading = _b === void 0 ? false : _b, delayLoading = customConfig.delayLoading, setToken = customConfig.setToken, showLoadingFn = customConfig.showLoadingFn;
            // 处理 token
            isNeedToken && handleToken(config, setToken);
            // 处理 Loading
            isNeedLoading &&
                handleLoading(true, requestKey, delayLoading, showLoadingFn);
        };
        ViteRequest.prototype.handleAfterRequest = function (customConfig, requestKey) {
            var _a = customConfig.isNeedLoading, isNeedLoading = _a === void 0 ? false : _a, showLoadingFn = customConfig.showLoadingFn, delayLoading = customConfig.delayLoading;
            // 处理重复请求
            handleRepeat(requestKey, false);
            // 处理 Loading
            isNeedLoading &&
                handleLoading(false, requestKey, delayLoading, showLoadingFn);
        };
        ViteRequest.prototype.handleError = function (customConfig, error) {
            var _a = customConfig.isNeedError, isNeedError = _a === void 0 ? false : _a, showErrorFn = customConfig.showErrorFn;
            // 处理错误
            if (isNeedError)
                handleError(error, showErrorFn);
        };
        ViteRequest.prototype.get = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: 'get' }), customConfig)];
                });
            });
        };
        ViteRequest.prototype.post = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: 'post' }), customConfig)];
                });
            });
        };
        ViteRequest.prototype["delete"] = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: 'delete' }), customConfig)];
                });
            });
        };
        ViteRequest.prototype.put = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: 'put' }), customConfig)];
                });
            });
        };
        ViteRequest.prototype.getAllErrorInfo = function () {
            return getErrorInfo(this);
        };
        return ViteRequest;
    }());

    return ViteRequest;

}));
