import React, { useState } from "react";
import { ReactComponent as LogoColor } from "../assets/images/logo_color.svg";
import "../assets/styles/login-signup.css";
import { Link, useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { UserAuth } from "../services/AuthContext";
import { Col, Container, Row } from "react-bootstrap";

function SignUp() {
  let navigate = useNavigate();

  const { createUser } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate("/setup");
    } catch (error) {
      setError(error.message);
      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          setTitleError("Email already in use");
          setError("Please introduce another email.");
          break;
        case "Firebase: Error (auth/invalid-email).":
          setTitleError("Invalid email");
          setError("Please introduce a valid email.");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setTitleError("Weak password");
          setError("Password must be at least 6 characters");
          break;
      }
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <Form.Root className="FormRoot" onSubmit={handleSubmit}>
          <LogoColor className="Logo" />
          <h1>Sign Up</h1>
          {error && (
            <div className="alert my-5 col-6 mx-auto alert-danger alert-dismissible fade show">
              <h5 className="alert-heading">{titleError}</h5>
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
                type="email"
                value={email}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>
          <p className="SignupLink my-5">
            Already have an account?
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login{" "}
            </Link>
          </p>
          <Form.Submit asChild>
            <button
              className="ButtonLogin"
              type="submit"
              style={{ marginTop: 10 }}
            >
              Sign Up
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
export default SignUp;
