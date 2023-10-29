"use strict";
exports.__esModule = true;
var react_1 = require("react");
var LogoutConfirmation = function (_a) {
    var onCancel = _a.onCancel, onConfirm = _a.onConfirm;
    return (react_1["default"].createElement("div", { className: "confirmation-dialog" },
        react_1["default"].createElement("p", null, "Are you sure you want to log out?"),
        react_1["default"].createElement("button", { onClick: onCancel }, "Cancel"),
        react_1["default"].createElement("button", { onClick: onConfirm }, "Confirm")));
};
exports["default"] = LogoutConfirmation;
