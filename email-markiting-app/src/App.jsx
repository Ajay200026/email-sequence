import { createTheme } from "@mui/material/styles";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "./component/AuthPage";
import CreateSequence from "./component/CreateSequence";
import DashBoard from "./component/DashBoard";
import HelpCenter from "./component/HelpCenter";
import Home from "./component/Home";
import ManageSequence from "./component/ManageSequence";
import ModifySequence from "./component/ModifySequence";
import Profile from "./component/Profile";
import DecisionComponent from "./component/React-flow/components/DecisionComponent";
import SendComponent from "./component/React-flow/components/SendComponent";
import Setting from "./component/Setting";
import EmailLetterForm from "./component/crud/EmailLetterForm";
import KanbanBoard from "./component/crud/KanbanBoard";

const App = () => {
  const theme = createTheme({
    // Customize your theme here
    palette: {
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#ff4081",
      },
    },
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/createsequence" element={<CreateSequence />} />
        <Route path="/modifysequence" element={<ModifySequence />} />
        <Route path="/managesequence" element={<ManageSequence />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/emailletterform" element={<EmailLetterForm />} />
        <Route path="/kanbanboard" element={<KanbanBoard />} />
        <Route path="/decision" element={<DecisionComponent />} />
        <Route path="/send" element={<SendComponent />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
