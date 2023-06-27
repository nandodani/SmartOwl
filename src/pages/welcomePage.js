import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Player, Controls } from "@lottiefiles/react-lottie-player";


const WelcomePage = () => {
  const workspaceId = localStorage.getItem("WorkspaceId");
  const userId = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate(`/${userId}/workspace/${workspaceId}`);
    }, 3000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="Login">
      <Container style={{ height: "100vh", width: "100%", paddingTop: "100px" }}>
        <h1 style={{ fontSize: "64px", fontWeight: "400", marginBottom: "250px" }}>We are prepering your workspace!</h1>

        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/private_files/lf30_iy78wjps.json"
          style={{ height: "25%", width: "50%" }}
        >

        </Player>
      </Container>
    </div>
  );
};

export default WelcomePage;
