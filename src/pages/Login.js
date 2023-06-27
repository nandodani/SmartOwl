import React, { useState } from "react";
import { ReactComponent as LogoColor } from "../assets/images/logo_color.svg";
import "../assets/styles/login-signup.css";
import { Link, useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { UserAuth } from "../services/AuthContext";

function Login() {
  let navigate = useNavigate();
  const userId = localStorage.getItem("uid");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [titleError, setTitleError] = useState("");
  const [error, setError] = useState("");

  const { login } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(`/${userId}/welcome`);
    } catch (error) {
      setError(error.message);
      switch (error.message) {
        case "Firebase: Error (auth/user-not-found).":
          setTitleError("User not found.");
          setError("Please introduce another email or create an account.");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setTitleError("Wrong password");
          setError(
            "Please introduce your password correctly or reset your password."
          );
          break;
      }
    }
    console.log(titleError + ": " + error);
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <Form.Root className="FormRoot" onSubmit={handleSubmit}>
          <LogoColor className="Logo" />
          <h1>Login</h1>
          {error && (
            <div className="alert my-5 col-6 mx-auto alert-danger alert-dismissible fade show">
              <h5 className="alert-heading">{titleError}</h5>{" "}
              <p className="mb-0">{error} </p>
            </div>
          )}
          <Form.Field className="FormField" name="email">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "left",
              }}
            >
              <Form.Label className="FormLabel">Email</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter your email
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="password">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "left",
              }}
            >
              <Form.Label className="FormLabel">Password</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter your password
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid password
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>
          <p className="SignupLink">
            Dont have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign up
            </Link>
          </p>
          <p className="ForgotPassword">
            Forgot your password?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              Reset
            </Link>
          </p>

          <Form.Submit asChild>
            <button className="ButtonLogin" style={{ marginTop: 10 }}>
              Login
            </button>
          </Form.Submit>
        </Form.Root>
        <button className="Back" onClick={() => navigate(-1)}>
          <ArrowLeftIcon style={{ width: "25px", height: "25px" }} />
          <p>Back</p>
        </button>
      </div>
    </div>
  );
}

export default Login;
