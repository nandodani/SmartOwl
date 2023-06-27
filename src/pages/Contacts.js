import React from "react";
import "../assets/styles/contacts.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav";
import * as Form from "@radix-ui/react-form";
import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  DiscordLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Footer from "../components/footer";

function Contacts() {
  return (
    <div className="Contacts">
      <header>
        <nav>
          <Nav />
        </nav>
      </header>
      <div className="TitleContacts">
        <h1 style={{ fontSize: "64px", fontWeight: "400" }}>Contacts</h1>
        <p style={{ fontSize: "14px", fontWeight: "400" }}>
          Stay connected with ease!
        </p>
      </div>
      <Container
        fluid
        className="ContactsContainer d-flex justify-content-center"
      >
        <Form.Root className="FormRootContacts">
          <Row>
            <Col>
              <Form.Field className="FormFieldContacts" name="name">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "left",
                  }}
                >
                  <Form.Label className="FormLabelContacts">Name</Form.Label>
                  <Form.Message className="FormMessageContacts" match="valueMissing">
                    Please enter your name
                  </Form.Message>
                  <Form.Message className="FormMessageContacts" match="typeMismatch">
                    Please provide a valid name
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="name" required />
                </Form.Control>
              </Form.Field>
            </Col>
            <Col>
              <Form.Field className="FormFieldContacts" name="email">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "left",
                  }}
                >
                  <Form.Label className="FormLabelContacts">Email</Form.Label>
                  <Form.Message className="FormMessageContacts" match="valueMissing">
                    Please enter your email
                  </Form.Message>
                  <Form.Message className="FormMessageContacts" match="typeMismatch">
                    Please provide a valid email
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="email" required />
                </Form.Control>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Field className="FormFieldContacts" name="title">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "left",
                  }}
                >
                  <Form.Label className="FormLabelContacts">Title</Form.Label>
                  <Form.Message className="FormMessageContacts" match="valueMissing">
                    Please enter the title of the message
                  </Form.Message>
                  <Form.Message className="FormMessageContacts" match="typeMismatch">
                    Please provide a valid title
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="title" required />
                </Form.Control>
              </Form.Field>
            </Col>
          </Row>
          <Form.Field className="FormFieldContacts" name="question">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "left",
              }}
            >
              <Form.Label className="FormLabel">Question</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a question
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className="TextareaContacts"
                placeholder="Type your message"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button className="ButtonContact" style={{ marginTop: 10 }}>
              Post question
            </button>
          </Form.Submit>
        </Form.Root>
      </Container>
      <div className="SocialMedia Title">
        <h2>Our Social Medias</h2>
        <Row style={{ width: "15vw" }}>
          <Col>
            <TwitterLogoIcon className="IconSocialMedia" />
          </Col>
          <Col>
            <InstagramLogoIcon className="IconSocialMedia" />
          </Col>
          <Col>
            <DiscordLogoIcon className="IconSocialMedia" />
          </Col>
          <Col>
            <LinkedInLogoIcon className="IconSocialMedia" />
          </Col>
        </Row>
      </div>
      <Footer/>
    </div>
  );
}

export default Contacts;
