"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _firebase = _interopRequireWildcard(require("firebase"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _firebase.importScripts)("https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js");
(0, _firebase.importScripts)("https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"); //the Firebase config object 

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