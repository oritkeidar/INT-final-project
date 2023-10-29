"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onMessageListener = exports.requestFirebaseNotificationPermission = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

var _messaging = require("firebase/messaging");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyBJG6znDq6HOW23uT-CitlLaXfUOaeIDec",
  authDomain: "int-final-project.firebaseapp.com",
  projectId: "int-final-project",
  storageBucket: "int-final-project.appspot.com",
  messagingSenderId: "470861170239",
  appId: "1:470861170239:web:6f7e477b8874ae1572da8a",
  measurementId: "G-DJETP83FRX"
};

_firebase["default"].initializeApp(firebaseConfig);

var messaging = _firebase["default"].messaging();

var requestFirebaseNotificationPermission = function requestFirebaseNotificationPermission() {
  return Notification.requestPermission().then(function (permission) {
    console.log(permission);

    if (permission === "granted") {
      messaging.getToken({
        vapidKey: "BIVJthc3XeorhxqQsOjbHitj5sxvC5JBXmAXY8l8_Nyy6EVGINrm4Ycrnrk0VUdsJzsav2dhsTqg-VvEyTMMZLk"
      }).then(function (currentToken) {
        console.log(currentToken);
      });
    }
  });
};

exports.requestFirebaseNotificationPermission = requestFirebaseNotificationPermission;

var onMessageListener = function onMessageListener() {
  return new Promise(function (resolve) {
    (0, _messaging.onMessage)(messaging, function (payload) {
      resolve(payload);
    });
  });
};

exports.onMessageListener = onMessageListener;