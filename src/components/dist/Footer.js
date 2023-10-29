"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./Footer.css");
function Footer() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("footer", null,
            react_1["default"].createElement("h5", null,
                "\u00A9 ",
                new Date().getFullYear(),
                " Wealth health Ltd. All rights reserved."))));
}
exports["default"] = Footer;
