import React, { useEffect, useState } from "react";
import "../assets/styles/workspace.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownMenu from "../components/dropdown";
import Dock from "../components/dock";
import Weather from "../components/weather";
import Clock from "../components/clock";
import CommandPalette from "../components/command-palette";
import Task from "../components/task";
import Notes from "../components/notes";
import Reminders from "../components/reminders";
import Events from "../components/events";
import Calendar from "../components/calendar";
import News from "../components/news";
import WorkspaceList from "../components/workspaceSelector";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { getWorkspace } from "../services/firebase";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("uid");

  const [workspaces, setWorkspaces] = useState([]);
  const [actualWorkspace, setActualWorkspace] = useState(null);
  const [workspaceId, setWorkspaceId] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const color1 = workspaces.length > 0 ? workspaces[index].color1 : null;
  const color2 = workspaces.length > 0 ? workspaces[index].color2 : null;
  const color3 = workspaces.length > 0 ? workspaces[index].color3 : null;
  const color4 = workspaces.length > 0 ? workspaces[index].color4 : null;

  const handleSelectWorkspace = (workspaceSelectedId, index) => {
    setIndex(index);
    setWorkspaceId(workspaceSelectedId);
    navigate(`/${userId}/workspace/${workspaceSelectedId}`);
    console.log(
      "(Mensagem vinda da workspace componente) Workspace selecionado:",
      workspaceSelectedId
    );
  };

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        setIsLoading(true);

        const workspace = await getWorkspace(userId);
        console.log("workspace na app:", workspace);
        setWorkspaces(workspace);
        setActualWorkspace(workspace[index]);
        setIsLoading(false);
      } catch (error) {
        console.log("ERRO no getWorkspace: " + error);
        setIsLoading(false);
      }
    };
    fetchWorkspace();
  }, [userId, index]);

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const handleTogglePalette = () => {
    setIsPaletteOpen(!isPaletteOpen);
  };

  const WorkspaceComponents = [
    { id: "tasks", component: <Task /> },
    { id: "notes", component: <Notes /> },
    { id: "reminders", component: <Reminders /> },
    { id: "events", component: <Events /> },
    { id: "calendar", component: <Calendar /> },
    { id: "news", component: <News /> },
  ];

  return (
    <div className="Workspace">
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="Workspace"
          style={{
            backgroundColor: "rgba(128, 128, 128, 0.5)",
            backgroundImage: `radial-gradient(at 40% 20%, ${color1} 0px, transparent 50%),
        radial-gradient(at 40% 20%, ${color1} 0px, transparent 50%),
        radial-gradient(at 80% 0%, ${color2} 0px, transparent 50%),
        radial-gradient(at 0% 50%, ${color1} 0px, transparent 50%),
        radial-gradient(at 80% 50%, ${color2} 0px, transparent 50%),
        radial-gradient(at 0% 100%, ${color3} 0px, transparent 50%),
        radial-gradient(at 80% 100%, ${color4} 0px, transparent 50%),
        radial-gradient(at 0% 0%, ${color3} 0px, transparent 50%)`,
          }}
        >
          {isPaletteOpen && <div className="overlay" />}
          <CommandPalette
            isOpen={isPaletteOpen}
            onClose={handleTogglePalette}
            onSelectWorkspace={handleSelectWorkspace}
            workspaces={workspaces}
          />
          <Dock />
          <nav>
            <DropdownMenu />
            <button className="Command-Button" onClick={handleTogglePalette}>
              ⌘K
            </button>
          </nav>
          <div>
            <Container fluid>
              <Row className="Row-XL">
                <Col className="d-flex justify-content-center">
                  <Clock />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <h1 className="workspace-title text-center">
                    {workspaces.length > 0 &&
                      workspaces[index] &&
                      workspaces[index].workspaceName}
                  </h1>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Weather />
                </Col>
              </Row>
              <Row className="Row-SM">
                <Col
                  xs={12}
                  md={6}
                  lg={6}
                  className="d-flex justify-content-center align-items-center"
                >
                  <h1 className="workspace-title text-center">
                    {workspaces.length > 0 &&
                      workspaces[index] &&
                      workspaces[index].workspaceName}
                  </h1>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={6}
                  className="d-flex justify-content-center mt-4"
                >
                  <Weather />
                </Col>
              </Row>
            </Container>
          </div>
          <main>
            <Container fluid>
              <DragDropContext>
                <Droppable droppableId="component">
                  {(provided) => (
                    <Row
                      className="my-5 mx-5 component"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {WorkspaceComponents.map(({ id, component }, index) => {
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                              <Col
                                xs={12}
                                md={6}
                                lg={6}
                                xl={4}
                                className="d-flex justify-content-center my-4 align-items-center "
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {component}
                              </Col>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </Row>
                  )}
                </Droppable>
              </DragDropContext>
            </Container>
          </main>
          <WorkspaceList
            workspaces={workspaces}
            onSelectWorkspace={handleSelectWorkspace}
          />
        </div>
      )}
    </div>
  );
}

export default App;
