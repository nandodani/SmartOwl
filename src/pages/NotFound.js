import React from "react";
import "../assets/styles/contacts.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

function Contacts() {
  return (
    <div className="Contacts" style={{overflow: "hidden"}}>
      <header>
        <nav>
          <Nav />
        </nav>
      </header>
      <div className="Title">
        <h1 style={{ fontSize: "64px", fontWeight: "400" }}>Page not found</h1>
        <p style={{ fontSize: "14px", fontWeight: "400" }}>
          This isn't the page you're looking for. Try again!{" "}
        </p>
      </div>
      <Container
        fluid
        className="ContactsContainer d-flex justify-content-center"
      >
        <Player
          autoplay
          loop
          src="https://assets9.lottiefiles.com/packages/lf20_q2pevjuc.json"
          style={{ height: "65%", width: "100%" }}
        >

        </Player>
      </Container>
    </div>
  );
}

export default Contacts;
