import React from "react";
import "../assets/styles/faq.css";
import Container from "react-bootstrap/Container";
import Accordion from "../components/accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav";
import Footer from "../components/footer";

function FAQ() {
  return (
    <div className="FAQ">
      <header>
        <nav>
          <Nav />
        </nav>
      </header>
      <div className="Title">
        <h1 style={{ fontSize: "64px", fontWeight: "400" }}>FAQ</h1>
        <p style={{ fontSize: "14px", fontWeight: "400" }}>
          Got questions? We've got answers!
        </p>
      </div>
      <Container fluid className="FaqContainer d-flex justify-content-center">
        <Accordion />
      </Container>
      <Footer />
    </div>
  );
}

export default FAQ;
