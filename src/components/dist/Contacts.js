"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./Contacts.css");
function Contacts() {
    return (react_1["default"].createElement("div", { className: 'contacts' },
        react_1["default"].createElement("h4", null, "Email: info@wealth-health.co.il"),
        react_1["default"].createElement("h4", null, "Phone: 03-7392589"),
        react_1["default"].createElement("h4", null, "Address: Bugrashov 84, Tel Aviv"),
        react_1["default"].createElement("h2", null,
            "Visit us on website :",
            react_1["default"].createElement(react_router_dom_1.Link, { to: "" }, "www.wealth-health.co.il"))));
}
exports["default"] = Contacts;
