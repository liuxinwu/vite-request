(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
    typeof define === 'function' && define.amd ? define(['axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QuickRequest = factory(global.axios));
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
                console.log('interceptors succes', response);
                return response;
            }, function (error) {
                // 超出 2xx 范围的状态码都会触发该函数。
                // 对响应错误做点什么
                console.log('interceptors error', error);
                return Promise.reject(error);
            });
        };
        return Instance;
    }());

    var customConfigDefault = {
        isNeedToken: false,
        handleToken: undefined,
        isNeedLoading: false,
        isNeedError: true,
        isNeedReRequest: true,
        connectCount: 3,
        isNeedRecordErrorInfo: true,
        isNeedCache: false
    };

    var startsWith = function (str, identifier) {
        return str.startsWith(identifier) ? str.substring(1) : str;
    };
    var endsWith = function (str, identifier) {
        return str.endsWith(identifier) ? "" + str + identifier : str;
    };
    var transfromPath = function (str, identifier, handleFn) {
        return handleFn(str, identifier);
    };

    var handleError = function (error) {
        var _a = error.response, status = _a.status, data = _a.data;
        var msg = data.msg || statusCode[status];
        console.log(msg, 'msg');
    };
    var statusCode;
    (function (statusCode) {
        statusCode[statusCode["\u6743\u9650\u4E0D\u8DB3\uFF0C\u9700\u8981\u7528\u6237\u9A8C\u8BC1"] = 401] = "\u6743\u9650\u4E0D\u8DB3\uFF0C\u9700\u8981\u7528\u6237\u9A8C\u8BC1";
        statusCode[statusCode["\u62D2\u7EDD\u6267\u884C\u5B83"] = 403] = "\u62D2\u7EDD\u6267\u884C\u5B83";
        statusCode[statusCode["\u670D\u52A1\u5668\u4E0A\u672A\u627E\u5230\u8BE5\u8D44\u6E90"] = 404] = "\u670D\u52A1\u5668\u4E0A\u672A\u627E\u5230\u8BE5\u8D44\u6E90";
        statusCode[statusCode["\u670D\u52A1\u5668\u9519\u8BEF"] = 500] = "\u670D\u52A1\u5668\u9519\u8BEF";
        statusCode[statusCode["\u6B64\u8BF7\u6C42\u65B9\u6CD5\u4E0D\u88AB\u670D\u52A1\u5668\u652F\u6301\u4E14\u65E0\u6CD5\u88AB\u5904\u7406"] = 501] = "\u6B64\u8BF7\u6C42\u65B9\u6CD5\u4E0D\u88AB\u670D\u52A1\u5668\u652F\u6301\u4E14\u65E0\u6CD5\u88AB\u5904\u7406";
        statusCode[statusCode["\u670D\u52A1\u5668\u6CA1\u6709\u51C6\u5907\u597D\u5904\u7406\u8BF7\u6C42"] = 503] = "\u670D\u52A1\u5668\u6CA1\u6709\u51C6\u5907\u597D\u5904\u7406\u8BF7\u6C42";
        statusCode[statusCode["\u670D\u52A1\u5668\u4E0D\u652F\u6301\u8BF7\u6C42\u4E2D\u6240\u4F7F\u7528\u7684HTTP\u534F\u8BAE\u7248\u672C"] = 505] = "\u670D\u52A1\u5668\u4E0D\u652F\u6301\u8BF7\u6C42\u4E2D\u6240\u4F7F\u7528\u7684HTTP\u534F\u8BAE\u7248\u672C";
    })(statusCode || (statusCode = {}));

    // 需要 loading 请求的数量
    var loadingMap = new Set();
    var handleLoading = function (isStart, requestKey) {
        var timeId = null;
        if (isStart) {
            timeId = setTimeout(function () {
                if (!loadingMap.size) {
                    loadingMap.add(requestKey);
                    console.log('start loading');
                }
                clearTimeout(timeId);
            }, 0);
            return;
        }
        if (loadingMap.has(requestKey)) {
            loadingMap["delete"](requestKey);
            if (!loadingMap.size) {
                console.log('end loading');
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
            console.log("重复请求已被取消");
            return true;
        }
        requestMap.add(requestKey);
    };

    var handleToken = function (config, handleToken) {
        if (handleToken)
            return handleToken(config);
        var token = 'this is a token';
        config.headers ? config.headers.auth = token : config.headers = {
            auth: token
        };
    };

    var emptyObj = function () { return Object.create(null); };

    var IDENTIFIER = "/";
    // 记录重连的次数
    var connectMap = new Map();
    var QuickRequest = /** @class */ (function () {
        function QuickRequest(config, customConfig) {
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
        QuickRequest.prototype.request = function (config, customConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var _customConfig, requestKey, res, error_1, connectCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _customConfig = __assign(__assign({}, this.customConfigDefault), customConfig);
                            requestKey = window.location.href + "_" + config.url + "_" + config.method;
                            // 处理重复请求
                            if (handleRepeat(requestKey))
                                return [2 /*return*/, Promise.reject({
                                        message: "重复请求已被取消",
                                        config: config
                                    })];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            this.handleBeforeRequest(config, _customConfig, requestKey);
                            return [4 /*yield*/, this.instance.axiosInstance.request(config)];
                        case 2:
                            res = _a.sent();
                            return [2 /*return*/, res];
                        case 3:
                            error_1 = _a.sent();
                            console.log("catch");
                            // 处理重复请求 (这里调用的原因： 因为 catch 比 finally 调用快)
                            handleRepeat(requestKey, false);
                            // 处理重连
                            if (!connectMap.has(requestKey)) {
                                connectMap.set(requestKey, 1);
                            }
                            connectCount = connectMap.get(requestKey) + 1;
                            if (connectCount < _customConfig.connectCount) {
                                connectMap.set(requestKey, connectCount);
                                return [2 /*return*/, this.request(config, _customConfig)];
                            }
                            this.handleError(_customConfig, error_1);
                            connectMap["delete"](requestKey);
                            // 抛出错误
                            return [2 /*return*/, Promise.reject(error_1)];
                        case 4:
                            console.log("finally");
                            this.handleAfterRequest(_customConfig, requestKey);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        QuickRequest.prototype.handleBeforeRequest = function (config, customConfig, requestKey) {
            // 格式化 url
            config.url &&
                (config.url = transfromPath(config.url, IDENTIFIER, startsWith));
            var _a = customConfig.isNeedToken, isNeedToken = _a === void 0 ? false : _a, _b = customConfig.isNeedLoading, isNeedLoading = _b === void 0 ? false : _b, _handleToken = customConfig.handleToken; customConfig.isNeedError;
            // 处理 token
            isNeedToken && handleToken(config, _handleToken);
            // 处理 Loading
            isNeedLoading && handleLoading(true, requestKey);
        };
        QuickRequest.prototype.handleAfterRequest = function (customConfig, requestKey) {
            var _a = customConfig.isNeedLoading, isNeedLoading = _a === void 0 ? false : _a;
            // 处理重复请求
            handleRepeat(requestKey, false);
            // 处理 Loading
            isNeedLoading && handleLoading(false, requestKey);
        };
        QuickRequest.prototype.handleError = function (customConfig, error) {
            var _a = __assign(__assign({}, this.customConfigDefault), customConfig).isNeedError, isNeedError = _a === void 0 ? false : _a;
            // 处理错误
            if (isNeedError)
                handleError(error);
        };
        QuickRequest.prototype.get = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: "get" }), customConfig)];
                });
            });
        };
        QuickRequest.prototype.post = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: "post" }), customConfig)];
                });
            });
        };
        QuickRequest.prototype["delete"] = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: "delete" }), customConfig)];
                });
            });
        };
        QuickRequest.prototype.put = function (config, customConfig) {
            if (config === void 0) { config = emptyObj(); }
            if (customConfig === void 0) { customConfig = emptyObj(); }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request(__assign(__assign({}, config), { method: "put" }), customConfig)];
                });
            });
        };
        return QuickRequest;
    }());

    return QuickRequest;

}));
