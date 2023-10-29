import { Input, Button, Form } from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuthContext } from "../context/AuthProvider";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import validator from "validator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const navigate = useNavigate();

  const { dispatch: dispatchAuthContext } = useAuthContext();
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
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
    if (password.length >= 8) return setIsValidPassword(true);
    else {
      return setIsValidPassword(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const login = async () => {
    if (!isValidEmail) alert("Invalid email address. Please type again");
    else {
      const response: any = await axios.post(
        "http://localhost:3000/find-user-email",
        { username: email, password },
        { method: "Post", withCredentials: true }
      );
      if (!response.data.user) alert("Account doesn't exists. Please register");
      else {
        const response: any = await axios.post(
          "http://localhost:3000/login",
          { username: email, password },
          { method: "Post", withCredentials: true }
        );
        if (response.data.accessToken) {
          const accessToken = await response.data.accessToken;
          window.localStorage.setItem("accessToken", accessToken);
          const refreshToken = await response.data.refreshToken;
          window.localStorage.setItem("refreshToken", refreshToken);
          const userFirstName = await response.data.user.firstName;
          window.localStorage.setItem("userFirstName", userFirstName);
          const userId = await response.data.user._id;
          window.localStorage.setItem("userId", userId);
          dispatchAuthContext({ isLoggedIn: true });
          setIsButtonPressed(true);
          const logIn = document.getElementById(
            "log-in"
          ) as HTMLParagraphElement;
          logIn.innerHTML = "Login successfully !";
          console.log(logIn);
          setTimeout(() => {
            navigate("/getUserAccount");
          }, 3000);
        } else alert("Incorrect passsword");
      }
    }
  };

  return (
    <div className="Login ">
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
          type="email"
          placeholder="Email"
          onChange={handleInputEmail}
          name="email"
          required
        />
        <Input
          style={{
            fontSize: "14px",
            height: "25px",
            color: "blue",
            margin: "5px",
          }}
          type={showPassword ? "text" : "password"}
          className="rounded-0"
          placeholder="password"
          value={password}
          onChange={handleInputPassword}
          name="password"
          autoComplete="on"
          minLength={8}
          required
        />
        <div className="toggle-password">
          {showPassword ? (
            <BsFillEyeFill onClick={togglePasswordVisibility} />
          ) : (
            <BsFillEyeSlashFill onClick={togglePasswordVisibility} />
          )}
        </div>

        <Button
          onClick={() => navigate("/register")}
          color="link"
          className="text-decoration-none"
          style={{ fontSize: "14px", height: "25px", color: "blue" }}
        >
          Create new Account
        </Button>
        <Button
          color="link"
          className="text-decoration-none"
          style={{ fontSize: "14px", height: "25px", color: "blue" }}
          onClick={handleForgotPassword}
        >
          Forgot password?
        </Button>
        {/* </div> */}
        <Button
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            height: "25px",
            color: "black",
            margin: "10px",
          }}
          block
          color="dark"
          size="sm"
          onClick={login}
        >
          Log In
        </Button>
        <div
          style={{ color: "green", fontSize: "12px", fontWeight: "bold" }}
          id="log-in"
        ></div>
        {isButtonPressed && <ClipLoader cssOverride={override} />}
      </Form>
    </div>
  );
}
