import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ClassProvider } from "./context/ClassContext";
import { StudentProvider } from "./context/StudentContext";
import { TeacherProvider } from "./context/TeacherContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import { FeeProvider } from "./context/FeeContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClassProvider>
      <StudentProvider>
        <TeacherProvider>
          <AttendanceProvider>
            <FeeProvider>
              <App />
            </FeeProvider>
          </AttendanceProvider>
        </TeacherProvider>

        </StudentProvider>
    </ClassProvider>
  </BrowserRouter>
);