import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import RegisterForm from "@/components/customComponents/Register";
import LoginForm from "@/components/customComponents/Login";

const AppRoute = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage/>} />
      </Route>
      {/* dashboard layout */}
      <Route path="/register" element={< RegisterForm />} />
      <Route path="/login" element={<LoginForm  />} />
      <Route path="*" element= {<ErrorPage />} />
    </Routes>
  </Router>
);

export default AppRoute;
