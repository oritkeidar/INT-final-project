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
var reactstrap_1 = require("reactstrap");
var AccountContext_1 = require("../context/AccountContext");
var react_router_dom_1 = require("react-router-dom");
var apiClients_1 = require("../apiClients");
function UpdateUserDetails() {
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useContext(AccountContext_1.accountContext), accountData = _a[0], setAccountData = _a[1];
    var _b = react_1.useState({}), userDetails = _b[0], setUserDetails = _b[1];
    var _c = react_1.useState(), image = _c[0], setImage = _c[1];
    var userId = window.localStorage.getItem("userId");
    function uploadImage(event) {
        setImage(event.target.files[0]);
        console.log(image);
    }
    function updateDetails(event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, datadb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        data = new FormData();
                        data.append("image", image);
                        data.append("firstName", event.target.firstName.value);
                        data.append("lastName", event.target.lastName.value);
                        data.append("email", event.target.email.value);
                        data.append("address", event.target.address.value);
                        return [4 /*yield*/, apiClients_1["default"]
                                .post("http://localhost:3000/update-user/" + userDetails._id, data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/getUserAccount", { userId: userId })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 3:
                        datadb = _a.sent();
                        console.log(datadb);
                        setAccountData(datadb);
                        navigate('/getUserProfile');
                        return [2 /*return*/];
                }
            });
        });
    }
    react_1.useEffect(function () {
        setUserDetails(accountData);
    }, [accountData]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(reactstrap_1.Container, { className: "d-flex align-items-center justify-content-center" },
            react_1["default"].createElement(reactstrap_1.Form, { className: "container", style: {
                    width: "250px",
                    height: "300px",
                    alignItems: "stretch",
                    marginLeft: "630px",
                    marginTop: "200px",
                    justifyContent: "space-between"
                }, 
                // ref={formElenemt}
                onSubmit: updateDetails },
                react_1["default"].createElement(reactstrap_1.Input, { type: "file", name: "image", multiple: true, onChange: uploadImage }),
                react_1["default"].createElement("h4", null,
                    "First name: ",
                    " ",
                    react_1["default"].createElement(reactstrap_1.Input, { id: "firstName", type: "text", name: "firstName", placeholder: userDetails.firstName })),
                react_1["default"].createElement("h4", null,
                    "Last name: ",
                    " ",
                    react_1["default"].createElement(reactstrap_1.Input, { id: "lastName", type: "text", name: "lastName", placeholder: userDetails.lastName })),
                react_1["default"].createElement("h4", null,
                    "Your Email: ",
                    " ",
                    react_1["default"].createElement(reactstrap_1.Input, { id: "userName", type: "text", name: "email", placeholder: userDetails.userName })),
                react_1["default"].createElement("h4", null,
                    "Your address: ",
                    " ",
                    react_1["default"].createElement(reactstrap_1.Input, { id: "address", type: "text", name: "address", placeholder: userDetails.address })),
                react_1["default"].createElement(reactstrap_1.Button, { style: {
                        height: "30px",
                        backgroundColor: "#80e24f",
                        fontWeight: "bold"
                    }, type: "submit" }, "Update details")))));
}
exports["default"] = UpdateUserDetails;
