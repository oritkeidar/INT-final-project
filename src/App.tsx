import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Instructors from "./components/Instructors";
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import UserAccount from "./components/UserAccount";
import AuthProvider from "./context/AuthProvider";
import { AccountProvider } from "./context/AccountContext";
import UpdateUserDetails from "./components/UpdateUserDetails";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import WeightsChart from "./components/WeightsChart";
import News from "./components/News";


export default function App() {
  // const [showNotification, setShowNotification] = useState(false);
  // const [tokenFound, setTokenFound] = useState(false);
  // onMessageListener()
  //   .then((payload) => {
  //     console.log(payload);
  //     setShowNotification(true);
  //   })
  //   .catch((err) => console.log(err));

  return (
    <div className="App">
      <AuthProvider>
        <AccountProvider>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/activities" element={<Activities />}></Route>
            <Route path="/instructors" element={<Instructors />}></Route>
            <Route path="/contacts" element={<Contacts />}></Route>
            <Route path="/getUserProfile" element={<UserProfile />}></Route>
            <Route path="/getUserAccount" element={<UserAccount />}></Route>
            <Route path="/update-user" element={<UpdateUserDetails />}></Route>
            <Route
              path="/forgot-password"
              element={<PasswordResetRequest />}
            ></Route>
            <Route path="/weights-chart" element={<WeightsChart />}></Route>
            <Route
              path="/reset-password/:token"
              element={<PasswordReset />}
            ></Route>
          </Routes>
        </AccountProvider>
      </AuthProvider>
    </div>
  );
}
