import firebase from 'firebase'
import {importScripts} from 'firebase'
importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js");

 //the Firebase config object 
const firebaseConfig = {
    apiKey: "AIzaSyBJG6znDq6HOW23uT-CitlLaXfUOaeIDec",
    authDomain: "int-final-project.firebaseapp.com",
    projectId: "int-final-project",
    storageBucket: "int-final-project.appspot.com",
    messagingSenderId: "470861170239",
    appId: "1:470861170239:web:6f7e477b8874ae1572da8a",
    measurementId: "G-DJETP83FRX"
  };

firebase.initializeApp(firebaseConfig);


