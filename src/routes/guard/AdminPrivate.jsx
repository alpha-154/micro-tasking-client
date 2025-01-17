import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivate = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  console.log("admin route-> user: ", user);

  return user?.role !== "ADMIN" ? <Navigate to="/unauthorized" /> : children;
};

export default AdminPrivate;
