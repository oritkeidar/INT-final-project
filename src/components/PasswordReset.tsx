import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../apiClients";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "./PasswordReset.css";

export default function PasswordReset() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate()

  const handleNewPassword = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPassword = (e: any) => {
    setConfirmNewPassword(e.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      const reset = document.getElementById(
        "reset-massage"
      ) as HTMLParagraphElement;
      reset.innerHTML = "Password must contain at least 8 characters!";
    } else {
      if (newPassword === confirmNewPassword) {
        const response = await axiosClient.post(
          "http://localhost:3000/reset-password", {token, newPassword}
        );

 const reset = document.getElementById(
            "reset-massage"
          ) as HTMLParagraphElement;
          reset.innerHTML = "Password updated successfully";
          setTimeout(()=>{
            navigate('/login')
          },2000);
}

        else{
        const reset = document.getElementById(
            "reset-massage"
          ) as HTMLParagraphElement;
          reset.innerHTML = "Passwords doesn't match!!!";
      }
      }
      
    };
  

  return (
    <div id= "reset-password-page">
      <h2>*** Reset Password ***</h2>
      <Form id="reset-password">
        <Input
          style={{
            fontSize: "14px",
            height: "25px",
            color: "black",
            //   border: isValidPassword ? "1px solid grey" : "1px solid red",
            margin: "5px",
          }}
          // className={isValidPassword ? "" : "invalid"}
          type={showNewPassword ? "text" : "password"}
          placeholder="Insert New Password"
          onChange={handleNewPassword}
          name="newPassword"
          minLength={8}
          required
        />
        <div className="toggle-newPassword">
          {showNewPassword ? (
            <BsFillEyeFill onClick={toggleNewPasswordVisibility} />
          ) : (
            <BsFillEyeSlashFill onClick={toggleNewPasswordVisibility} />
          )}
        </div>
        <Input
          style={{
            fontSize: "14px",
            height: "25px",
            color: "black",
            //   border: isValidPassword ? "1px solid grey" : "1px solid red",
            margin: "5px",
          }}
          // className={isValidPassword ? "" : "invalid"}
          type={showConfirmNewPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          onChange={handleConfirmNewPassword}
          name="confirmNewPassword"
          minLength={8}
          required
        />
        <div className="toggle-confirm-newPassword">
          {showConfirmNewPassword ? (
            <BsFillEyeFill onClick={toggleConfirmNewPasswordVisibility} />
          ) : (
            <BsFillEyeSlashFill onClick={toggleConfirmNewPasswordVisibility} />
          )}
        </div>

        <Button onClick={handleResetPassword} id="update-password">
          Update password !
        </Button>
        <p id="reset-massage"></p>
      </Form>
    </div>
  );
}
