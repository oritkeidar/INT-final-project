import { initializeApp } from "firebase/app";
import { onMessage, getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyBJG6znDq6HOW23uT-CitlLaXfUOaeIDec",
  authDomain: "int-final-project.firebaseapp.com",
  projectId: "int-final-project",
  storageBucket: "int-final-project.appspot.com",
  messagingSenderId: "470861170239",
  appId: "1:470861170239:web:6f7e477b8874ae1572da8a",
  measurementId: "G-DJETP83FRX",
};

initializeApp(firebaseConfig);
const messaging = getMessaging()

export const requestFirebaseNotificationPermission = () =>
  Notification.requestPermission().then((permission) => {
    console.log(permission);
    if (permission === "granted") {
      // messaging
      //   .getToken({
      //     vapidKey:
      //       "BIVJthc3XeorhxqQsOjbHitj5sxvC5JBXmAXY8l8_Nyy6EVGINrm4Ycrnrk0VUdsJzsav2dhsTqg-VvEyTMMZLk",
      //   })
      //   .then((currentToken) => {
        console.log("first")
          // console.log(currentToken);
        }});
  //   }
  // });

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
