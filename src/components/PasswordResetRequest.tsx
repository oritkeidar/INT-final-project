import React, { useState } from "react";
import axios from "axios";
import axiosClient from "../apiClients";
import { Input, Button, Form } from "reactstrap";
import validator from "validator";
import "./PasswordResetRequest.css";

export default function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleOnChange = (e: any) => {
    const typedEmail = e.target.value;
    setEmail(typedEmail);
    setIsValidEmail(validateEmail(typedEmail));
  };

  const validateEmail = (email: any) => {
    return validator.isEmail(email);
  };

  
  const handleSendEmail = async () => {
    if (email) {
      if (!isValidEmail) {
        const root = document.getElementById(
          "reset-password"
        ) as HTMLParagraphElement;
        root.innerText = "Please type a valid email address";
      } else {
        const response = await axios.post(
          "http://localhost:3000/find-user-email",
          { username: email }
        );
        const { user } = response.data;
        if (!user) {
          const root = document.getElementById(
            "reset-password"
          ) as HTMLParagraphElement;
          root.innerText =
            "This email not exist on our records. Please type again or register";
        } else {
          const response = await axios.post(
            "http://localhost:3000/forgot-password",
            { email }
          );
          const massage = response.data;
          window.localStorage.setItem("resetPassword", massage);
          const root = document.getElementById(
            "reset-password-massage"
          ) as HTMLParagraphElement;
          root.innerText =
            "Password reset email sent successfully\n Check your email box, click on the link and follow instuctions";
        }
      }
    }
  };
  return (
    <div className="reset-password-request">
      <h2>*** Password reset email ***</h2>
      <Form id="reset-passsword-form">
        <Input
          id="user-email"
          className="rounded-0"
          type="email"
          placeholder="Enter your user email"
          onChange={handleOnChange}
          name="email"
          required
        />
        <Button id="reset-request" onClick={handleSendEmail}>
          Send email
        </Button>
        <div>
          <p id="reset-password"></p>
        </div>
        <div>
          <p id="reset-password-massage"></p>
        </div>
      </Form>
    </div>
  );
}
