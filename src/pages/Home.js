import React from "react";
import "../assets/styles/faq.css";
import Container from "react-bootstrap/Container";
import Accordion from "../components/accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav";
import workpspace from "../assets/images/Workspace.jpeg";
import { Col, Row } from "react-bootstrap";
import chrome from "../assets/images/Chrome.png";
import firefox from "../assets/images/Firefox.png";
import safari from "../assets/images/Safari.png";
import opera from "../assets/images/Opera.png";
import edge from "../assets/images/Edge.png";
import Footer from "../components/footer";
import calendar from "../assets/images/Calendar.png";
import events from "../assets/images/Events.png";
import news from "../assets/images/News.png";
import reminders from "../assets/images/Reminders.png";
import tasks from "../assets/images/Tasks.png";
import dock from "../assets/images/Dock.png";
import notes from "../assets/images/Notes.png";

function FAQ() {
  return (
    <div className="FAQ">
      <header>
        <nav>
          <Nav />
        </nav>
      </header>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div
              className="Title Title-Home"
              style={{ color: "white", textAlign: "center" }}
            >
              <img src={workpspace} alt="workspace" className="img-top" />
              <div
                style={{
                  textAlign: "center",
                  left: "50%",
                  transform: "translate(0%, -50%)",
                }}
              >
                <h1 style={{ fontSize: "64px", fontWeight: "500" }}>
                  Take your productivity
                </h1>
                <p style={{ fontSize: "64px", fontWeight: "800" }}>
                  to new heights.
                </p>
              </div>
            </div>
          </Col>
        </Row>{" "}
        <Row
          style={{ textAlign: "center", marginBottom: "120px", color: "white" }}
        >
          <Col>
            <p>Compatible with</p> <img src={chrome} /> | <img src={firefox} />{" "}
            | <img src={edge} /> | <img src={opera} /> | <img src={safari} /> |
            and more...
          </Col>
        </Row>
      </Container>
      <Container className="py-4">
        <Row>
          <h2
            className="features-title"
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              fontSize: "64px",
            }}
          >
            Features
          </h2>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div className="image-features">
              <img src={events} />
              <h4>Events</h4>
              <p>
                Our Events widget allows you to easily view your upcoming
                events. Stay on top of your schedule and never miss an important
                event.
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            {" "}
            <div className="image-features">
              <img src={tasks} />
              <h4>Task</h4>
              <p>
                Stay on top of your tasks with our app. Access your to-do list
                easily with our user-friendly interface.
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            {" "}
            <div className="image-features">
              <img src={news} />
              <h4>News</h4>
              <p>
                Stay informed with our news feature. Browse and read articles on
                a variety of topics with our user-friendly interface.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            {" "}
            <div className="image-features">
              <img src={dock} />
              <h4>Side Dock</h4>
              <p>
                Access your favorite links and apps with ease using our side
                dock feature. Add and organize your most frequently used links
                and apps for quick access.
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            {" "}
            <div className="image-features">
              <img src={reminders} />
              <h4>Reminders</h4>
              <p>
                Never miss a deadline again with our reminders feature. Set
                reminders and receive notifications when they're due.
              </p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            {" "}
            <div className="image-features">
              <img src={notes} />
              <h4>Notes</h4>
              <p>
                Stay organized and keep track of your thoughts with your notes.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="Newsletter">
              <div>
                <h3>Stay up to date</h3>
                <p>
                  Get more done in less time with
                  <br /> our poweful productivity tool.
                </p>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-newsletter"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default FAQ;
