import React, { useState, useCallback, useContext } from "react";
import "./Nav.css";
import { FaUserAlt, FaTwitter, FaTiktok, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import axiosClient from "../apiClients";
import { accountContext } from "../context/AccountContext";
import LogoutConfirmation from "./LogoutConfirmation";
import { PiNotificationBold } from "react-icons/pi";
import { requestFirebaseNotificationPermission } from "../components/firebaseCloud"

export default function Nav() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { dispatch: dispatchAuthContext, isLoggedIn } = useAuthContext();
  const userDetails = useContext(accountContext);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsListOpen(true);
  };

  const handleSignUp = () => {
    setIsListOpen(false);
    navigate("/register");
  };

  const handleLogin = () => {
    setIsListOpen(false);
    navigate("/login");
  };
  const handleLogout = () => {
    setIsListOpen(false);
    setShowConfirmation(true);
  };
  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const confirmLogout = async () => {
    setIsLoading(true);
    const deactivateSession = async () => {
      axiosClient
        .post(
          "http://localhost:3000/logout",
          { userDetails },
          { withCredentials: true }
        )
        .finally(() => {
          window.localStorage.removeItem("accessToken");
          window.localStorage.removeItem("refreshToken");
          window.localStorage.removeItem("userFirstName");
          window.localStorage.removeItem("userId");
          window.localStorage.removeItem("resetPassword");
        });
      dispatchAuthContext({ isLoggedIn: false });
      setIsLoading(false);
      setShowConfirmation(false);
    };
    await deactivateSession();
    navigate("/Login");
  };

  const handleUserProfile = () => {
    setIsListOpen(false);
    if (isLoggedIn) {
      navigate("/getUserProfile");
    } else navigate("/login");
  };

  const handleUserAccount = () => {
    setIsListOpen(false);
    if (isLoggedIn) {
      navigate("/getUserAccount");
    } else navigate("/login");
  };
  return (
    <div className="container">
      <div className="left-container">
        <ul>
          <li>
            {isLoggedIn ? (
              <button
                id="notification-button"
                onClick={requestFirebaseNotificationPermission}
              >
                <PiNotificationBold id="notification-icon" />
              </button>
            ) : (
              ""
            )}
          </li>
          <div className="user-icon" onClick={handleMouseEnter}>
            <li>
              {isLoggedIn
                ? `hello, ${window.localStorage.getItem("userFirstName")}`
                : "Account"}{" "}
              <FaUserAlt />
            </li>
          </div>
          {isListOpen && (
            <ul style={{ display: "block" }} className="user-list">
              <li
                onClick={handleUserProfile}
                style={{ color: "black", cursor: "pointer" }}
              >
                your profile
              </li>
              <li
                onClick={handleUserAccount}
                style={{ color: "black", margin: "20px", cursor: "pointer" }}
              >
                your account
              </li>
              {!isLoggedIn ? (
                <li
                  onClick={handleLogin}
                  style={{
                    color: "black",
                    marginTop: "40px",
                    cursor: "pointer",
                  }}
                >
                  Log in
                </li>
              ) : (
                ""
              )}
              {!isLoggedIn ? (
                <li
                  onClick={handleSignUp}
                  style={{ color: "black", margin: "20px", cursor: "pointer" }}
                >
                  Sign up
                </li>
              ) : (
                ""
              )}
              {isLoggedIn ? (
                <li
                  onClick={handleLogout}
                  style={{ color: "black", margin: "20px", cursor: "pointer" }}
                >
                  Log out
                </li>
              ) : (
                ""
              )}
            </ul>
          )}
          <li>
            <Link style={{ textDecoration: "none", color: "white" }} to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/activities"
            >
              Activities
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/instructors"
            >
              Instructors
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/contacts"
            >
              Contacts
            </Link>
          </li>
        </ul>
      </div>
      <div className="right-container">
        <ul>
          <li>
            <FaFacebook />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaTiktok />
          </li>
        </ul>
        <div>
          {showConfirmation && (
            <LogoutConfirmation
              onCancel={cancelLogout}
              onConfirm={confirmLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}
