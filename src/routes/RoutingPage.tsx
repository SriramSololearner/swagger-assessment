import { Box } from "@mui/material";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import RegisterPage from "../components/registration/RegistrationPage";
import LandinPage from "../components/landing/LandinPage";
const RoutingPage = () => {
  return (
    <Box>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandinPage/>}/>
      </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default RoutingPage;
