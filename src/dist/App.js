"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var Nav_1 = require("./components/Nav");
var react_router_dom_1 = require("react-router-dom");
var Home_1 = require("./components/Home");
var Activities_1 = require("./components/Activities");
var Instructors_1 = require("./components/Instructors");
var Contacts_1 = require("./components/Contacts");
var Login_1 = require("./components/Login");
var SignUp_1 = require("./components/SignUp");
var UserProfile_1 = require("./components/UserProfile");
var UserAccount_1 = require("./components/UserAccount");
var AuthProvider_1 = require("./context/AuthProvider");
var AccountContext_1 = require("./context/AccountContext");
var UpdateUserDetails_1 = require("./components/UpdateUserDetails");
var PasswordResetRequest_1 = require("./components/PasswordResetRequest");
var PasswordReset_1 = require("./components/PasswordReset");
var WeightsChart_1 = require("./components/WeightsChart");
var News_1 = require("./components/News");
function App() {
    // const [showNotification, setShowNotification] = useState(false);
    // const [tokenFound, setTokenFound] = useState(false);
    // onMessageListener()
    //   .then((payload) => {
    //     console.log(payload);
    //     setShowNotification(true);
    //   })
    //   .catch((err) => console.log(err));
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(AuthProvider_1["default"], null,
            react_1["default"].createElement(AccountContext_1.AccountProvider, null,
                react_1["default"].createElement(Nav_1["default"], null),
                react_1["default"].createElement(react_router_dom_1.Routes, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(Home_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/news", element: react_1["default"].createElement(News_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(Login_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/register", element: react_1["default"].createElement(SignUp_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/home", element: react_1["default"].createElement(Home_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/activities", element: react_1["default"].createElement(Activities_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/instructors", element: react_1["default"].createElement(Instructors_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/contacts", element: react_1["default"].createElement(Contacts_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/getUserProfile", element: react_1["default"].createElement(UserProfile_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/getUserAccount", element: react_1["default"].createElement(UserAccount_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/update-user", element: react_1["default"].createElement(UpdateUserDetails_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/forgot-password", element: react_1["default"].createElement(PasswordResetRequest_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/weights-chart", element: react_1["default"].createElement(WeightsChart_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/reset-password/:token", element: react_1["default"].createElement(PasswordReset_1["default"], null) }))))));
}
exports["default"] = App;
