"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onMessageListener = exports.requestFirebaseNotificationPermission = void 0;

var _app = require("firebase/app");

var _messaging = require("firebase/messaging");

var firebaseConfig = {
  apiKey: "AIzaSyBJG6znDq6HOW23uT-CitlLaXfUOaeIDec",
  authDomain: "int-final-project.firebaseapp.com",
  projectId: "int-final-project",
  storageBucket: "int-final-project.appspot.com",
  messagingSenderId: "470861170239",
  appId: "1:470861170239:web:6f7e477b8874ae1572da8a",
  measurementId: "G-DJETP83FRX"
};
(0, _app.initializeApp)(firebaseConfig);
var messaging = (0, _messaging.getMessaging)();

var requestFirebaseNotificationPermission = function requestFirebaseNotificationPermission() {
  return Notification.requestPermission().then(function (permission) {
    console.log(permission);

    if (permission === "granted") {
      // messaging
      //   .getToken({
      //     vapidKey:
      //       "BIVJthc3XeorhxqQsOjbHitj5sxvC5JBXmAXY8l8_Nyy6EVGINrm4Ycrnrk0VUdsJzsav2dhsTqg-VvEyTMMZLk",
      //   })
      //   .then((currentToken) => {
      console.log("first"); // console.log(currentToken);
    }
  });
}; //   }
// });


exports.requestFirebaseNotificationPermission = requestFirebaseNotificationPermission;

var onMessageListener = function onMessageListener() {
  return new Promise(function (resolve) {
    (0, _messaging.onMessage)(messaging, function (payload) {
      resolve(payload);
    });
  });
};

exports.onMessageListener = onMessageListener;