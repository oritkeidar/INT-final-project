"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var axiosClient = axios_1["default"].create(); // we have created specific instance of axios so we can define on it middlewears (interceptors)
exports["default"] = axiosClient;
