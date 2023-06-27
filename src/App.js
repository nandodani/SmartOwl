import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/protected-route";
import { AuthContextProvider } from "./services/AuthContext";
import SetupWorkspace from "./pages/setupWorkspace";
import WelcomePage from "./pages/welcomePage";

import { db } from "./services/firebase";

function App() {
  const userId = localStorage.getItem("uid");
  const [workspaces, setWorkspaces] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route
              path={`/${userId}/welcome`}
              element={
                <ProtectedRoute>
                  <WelcomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${userId}/workspace/:id`}
              element={
                <ProtectedRoute>
                  <Workspace />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${userId}/settings`}
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setup"
              element={
                <ProtectedRoute>
                  <SetupWorkspace />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
