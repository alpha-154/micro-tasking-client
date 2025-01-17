import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WorkerPrivate = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  console.log("worker route-> user: ", user);

  return user?.role !== "WORKER" ? <Navigate to="/unauthorized" /> : children;
};

export default WorkerPrivate;
