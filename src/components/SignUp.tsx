import React, { useState, CSSProperties } from "react";
import { Input, Button, Form } from "reactstrap";
import { Link } from "react-router-dom";
import validator from "validator";
import axiosClient from "../apiClients";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);

  const navigate = useNavigate();
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

  const getOnChange = (setFunc: (newValue: string) => void) => {
    const handleOnChange = (e: any) => {
      setFunc(e.target.value);
    };

    return handleOnChange;
  };

  const validateEmail = (email: any) => {
    return validator.isEmail(email);
  };

  const handleInputEmail = (event: any) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleInputPassword = (event: any) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.length <= 7){
      setIsValidPassword(false)
    }
    else {
      setIsValidPassword(true);
    }
  };

  const signUp = async () => {
    setIsButtonPressed(true);
    if (!isValidEmail || !isValidPassword) {
      alert("Email or password invalid");
    } else {
      const response = await axiosClient.post(
        "http://localhost:3000/find-user-email",
        { username: email }
      );
      if (!response.data.user) {
        await axiosClient.put(
          "http://localhost:3000/register",
          {
            firstName: firstName,
            lastName: lastName,
            username: email,
            password,
          },
          { withCredentials: true, method: "PUT" }
        );
        setIsUserExist(true);
        const sign = document.getElementById("sign-up") as HTMLParagraphElement;
        sign.innerHTML = "Sign up succesfully ...";
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        alert("This user already exist in the system");
      }
    }
  };

  return (
    <div className="sign-up ">
      <Form
        style={{
          textAlign: "center",
          marginLeft: "620px",
          width: "300px",
          height: "300px",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Input
          style={{
            fontSize: "14px",
            height: "25px",
            color: "blue",
            margin: "5px",
          }}
          className="rounded-0"
          placeholder="First name"
          onChange={getOnChange(setFirstName)}
          name="firstName"
          required
        />
        <Input
          style={{
            fontSize: "14px",
            height: "25px",
            color: "blue",
            margin: "5px",
          }}
          className="rounded-0"
          placeholder="Last name"
          onChange={getOnChange(setLastName)}
          name="lastName"
          required
        />
        <Input
          style={{
            fontSize: "14px",
            height: "25px",
            border: isValidEmail ? "1px solid grey" : "1px solid red",
            margin: "5px",
          }}
          className={isValidEmail ? "" : "invalid"}
          type="email"
          value={email}
          placeholder="Email ID"
          onChange={handleInputEmail}
          name="email"
          required
        />
        <Input
          style={{
            fontSize: "14px",
            height: "25px",
            color: "black",
            border: isValidPassword ? "1px solid grey" : "1px solid red",
            margin: "5px",
          }}
          className={isValidPassword ? "" : "invalid"}
          placeholder="password"
          onChange={handleInputPassword}
          name="password"
          minLength={8}
          required
        />
        <div>
          <Link id="have-account" to={"/login"}>
            already have account?
          </Link>
        </div>
        <div>
          <Button
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              height: "25px",
              color: "black",
              margin: "10px",
            }}
            // block
            color="dark"
            size="sm"
            onClick={signUp}
          >
            Sign up
          </Button>
          {!isValidEmail && (
            <p style={{ color: "red" }}>Please insert a valid email</p>
          )}
          {!isValidPassword && (
            <p style={{ color: "red" }}>
              Passsword must contain at least 8 characters
            </p>
          )}
          <div
            style={{ color: "green", fontSize: "12px", fontWeight: "bold" }}
            id="sign-up"
          ></div>
          {isButtonPressed &&
            isValidEmail &&
            isValidPassword &&
            isUserExist && <ClipLoader cssOverride={override} />}
        </div>
      </Form>
    </div>
  );
}
