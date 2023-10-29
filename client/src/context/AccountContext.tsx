import React, { useState, createContext, useEffect } from "react";
import axiosClient from "../apiClients";
import { useAuthContext } from "./AuthProvider";

type accountType = {};
export const accountContext = createContext<accountType>({});

export const AccountProvider = ({ children }: { children: any }) => {
  const [accountData, setAccountData] = useState({});
  const Auth = useAuthContext();

  async function getDataFromServer() {
    //get the user details from the server
    const userId = window.localStorage.getItem("userId");
    const response = await axiosClient.post(
      `http://localhost:3000/getUserAccount`,
      { userId },
      {
        withCredentials: true,
      }
    );

    const user = response.data;
    if (user) setAccountData(user);
  }

  useEffect(() => {
    if (Auth.isLoggedIn) {
      getDataFromServer();
    }
  }, []);

  return (
    <accountContext.Provider
      value={[accountData, setAccountData, getDataFromServer]}
    >
      {children}
    </accountContext.Provider>
  );
};
