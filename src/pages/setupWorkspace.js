import React, { useState } from "react";
import { createWorkspace, db, getNewsData } from "../services/firebase";
import { Container, Row, Col } from "react-bootstrap";
import * as Select from "@radix-ui/react-select";
import * as Form from "@radix-ui/react-form";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

function SetupWspace() {
  const userId = localStorage.getItem("uid");

  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [newsLanguage, setNewsLanguage] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("");

  {
    /* Select Item Radix.ui */
  }
  const SelectItem = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => {
      return (
        <Select.Item
          className={classnames("SelectItem", className)}
          {...props}
          ref={forwardedRef}
        >
          <Select.ItemText>{children}</Select.ItemText>
          <Select.ItemIndicator className="SelectItemIndicator">
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      );
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const workspaceData = {
      workspaceName: workspaceName,
      color1: color1,
      color2: color2,
      color3: color3,
      color4: color4,
      createdAt: Date.now(),
    };

    const newsData = {
      newsLanguage: newsLanguage,
      newsCategory: newsCategory,
    };

    createWorkspace(localStorage.getItem("uid"), workspaceData, newsData)
      .then(() => {
        console.log("Workspace created successfully!",userId, workspaceData, newsData);
        navigate(`/${userId}/welcome`);
      })
      .catch((error) => {
        console.error("Error creating workspace:", error);
      });
  };

  return (
    <div className="Login">
      <Container>
        <Form.Root className="FormRoot" onSubmit={handleSubmit}>
          <h2 className="mt-5 mb-2">Setup Your New Workspace</h2>
          {error && (
            <div className="alert my-5 col-6 mx-auto alert-danger alert-dismissible fade show">
              <h5 className="alert-heading">{titleError}</h5>
              <p className="mb-0">{error} </p>
            </div>
          )}
          <Row className="my-5">
            <Form.Field className="FormField" name="workspace_">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "left",
                }}
              >
                <Form.Label className="FormLabel">Workspace Name</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter your workspace name
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid name
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  required
                />
              </Form.Control>
            </Form.Field>
          </Row>
          <div className="my-5">
            <h3 className="mt-5 mb-2">News Widget</h3>
          </div>
          <Row>
            <Col>
              <h6 className="mb-3">Languages:</h6>
              <Select.Root value={newsLanguage} onValueChange={setNewsLanguage}>
                <Select.Trigger className="SelectTrigger" aria-label="Language">
                  <Select.Value placeholder="Select a language..." />
                  <Select.Icon className="SelectIcon">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="SelectContent">
                    <Select.ScrollUpButton className="SelectScrollButton">
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="SelectViewport">
                      <Select.Group>
                        <Select.Label className="SelectLabel">
                          Languages
                        </Select.Label>
                        <Select.Separator className="SelectSeparator" />
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="he">Hebrew</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="nl">Dutch</SelectItem>
                        <SelectItem value="no">Norwegian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="ru">Russian</SelectItem>
                        <SelectItem value="sv">Swedish</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </Col>
            <Col>
              <h6 className="mb-3">Category:</h6>
              <Select.Root value={newsCategory} onValueChange={setNewsCategory}>
                <Select.Trigger className="SelectTrigger" aria-label="Language">
                  <Select.Value placeholder="Select a category..." />
                  <Select.Icon className="SelectIcon">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="SelectContent">
                    <Select.ScrollUpButton className="SelectScrollButton">
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="SelectViewport">
                      <Select.Group>
                        <Select.Label className="SelectLabel">
                          Category
                        </Select.Label>
                        <Select.Separator className="SelectSeparator" />
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </Col>
          </Row>
          <Row className="mb-3 d-flex">
            <div className="my-5">
              <h3 className="mt-5 mb-2">Choose the color for the background</h3>
            </div>
            <Col>
              <h6>Color 1:</h6>
              <div className="color-container mx-auto">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                />
              </div>
            </Col>
            <Col>
              <h6>Color 2:</h6>
              <div className="color-container mx-auto">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  required
                />
              </div>
            </Col>
            <Col>
              <h6>Color 3:</h6>
              <div className="color-container mx-auto">
                <input
                  type="color"
                  value={color3}
                  onChange={(e) => setColor3(e.target.value)}
                />
              </div>
            </Col>
            <Col>
              <h6>Color 4:</h6>
              <div className="color-container mx-auto">
                <input
                  type="color"
                  value={color4}
                  onChange={(e) => setColor4(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Form.Submit asChild>
            <button
              className="ButtonLogin"
              type="submit"
              style={{ marginTop: 100 }}
            >
              Create Workspace{" "}
            </button>
          </Form.Submit>
        </Form.Root>
      </Container>
    </div>
  );
}

export default SetupWspace;
