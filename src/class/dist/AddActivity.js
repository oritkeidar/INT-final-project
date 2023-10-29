"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var AddActivity = /** @class */ (function (_super) {
    __extends(AddActivity, _super);
    function AddActivity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleAddActivity = function (activityName) {
            // Make an HTTP POST request to the server
            fetch('/http://localhost:4000/add-activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ activityName: activityName })
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
            })["catch"](function (error) {
                console.error(error);
            });
        };
        return _this;
    }
    return AddActivity;
}(react_1.Component));
;
exports["default"] = AddActivity;
