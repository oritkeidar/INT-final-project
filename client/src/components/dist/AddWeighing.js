"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
var react_1 = require("react");
var react_datepicker_1 = require("react-datepicker");
// import { useAuthContext } from "../context/AuthProvider";
var AccountContext_1 = require("../context/AccountContext");
require("./AddWeighing.css");
require("react-datepicker/dist/react-datepicker.css");
var apiClients_1 = require("../apiClients");
function AddWeighing() {
    var _this = this;
    var _a = react_1.useContext(AccountContext_1.accountContext), userDetails = _a[0], setUserDetails = _a[1];
    var _b = react_1.useState(), selectedDate = _b[0], setSelectedDate = _b[1];
    var _c = react_1.useState(70), weight = _c[0], setWeight = _c[1];
    var _d = react_1.useState(15), fat = _d[0], setFat = _d[1];
    var handleDateChange = function (date) {
        setSelectedDate(date);
    };
    var handleKgChange = function (event) {
        // Ensure that the entered value is a number and update the weight state
        var newWeight = parseFloat(event.target.value);
        if (!isNaN(newWeight)) {
            setWeight(newWeight);
        }
    };
    var handleFatChange = function (event) {
        // Ensure that the entered value is a number and update the fatPercentage state
        var newFatPercentage = parseFloat(event.target.value);
        if (!isNaN(newFatPercentage)) {
            setFat(newFatPercentage);
        }
    };
    var handleAddWeight = function () { return __awaiter(_this, void 0, void 0, function () {
        var month, day, year, formattedDate, weighing, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    month = selectedDate.getMonth() + 1;
                    day = selectedDate.getDate();
                    year = selectedDate.getFullYear();
                    formattedDate = month + "/" + day + "/" + year;
                    weighing = {
                        weighingDate: formattedDate,
                        weight: weight,
                        fatPercentage: fat
                    };
                    id = userDetails._id;
                    return [4 /*yield*/, apiClients_1["default"]
                            .post("http://localhost:3000/add-weight/" + id, weighing)
                            .then(function (response) {
                            var userWeighings = response.data.weighings;
                            if (userWeighings) {
                                setSelectedDate("");
                            }
                            else {
                                console.error("Failed to add data to the server.");
                            }
                        })["catch"](function (error) {
                            console.error(error);
                            console.log("Error sending data to the server:" + error);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "add-weighing" },
        react_1["default"].createElement(react_datepicker_1["default"], { id: "date-picker", selected: selectedDate, onChange: handleDateChange, dateFormat: "MM/dd/yyyy", placeholderText: "Weighing date", required: true }),
        react_1["default"].createElement("label", null,
            "Enter your weight (Kg):",
            react_1["default"].createElement("input", { id: "weight-input", type: "number", value: weight, onChange: handleKgChange, step: "0.1" // Allow decimal values if needed
             })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Enter your fat percentage:",
            react_1["default"].createElement("input", { id: "weight-input", type: "number", value: fat, onChange: handleFatChange, step: "0.1" // Allow decimal values if needed
             }),
            "%"),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("button", { onClick: handleAddWeight }, "Add")));
}
exports["default"] = AddWeighing;
