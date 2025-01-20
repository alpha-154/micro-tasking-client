

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/userContext";

const PrivateRoute = ({ children, role }) => {
  const { loggedInUser, isFetching } = useUserContext();

  if (isFetching) {
    return <p className="text-center">Loading...</p>; // Show a loading state while fetching user data
  }

  if (!loggedInUser) {
    return <Navigate to="/login" replace />; // Redirect to login if no user is logged in
  }
  console.log("private route-> user: ", loggedInUser);
  if (loggedInUser?.role?.toLowerCase() !== role) {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page if the role doesn't match
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
