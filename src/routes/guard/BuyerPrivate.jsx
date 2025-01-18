import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const BuyerPrivate = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  console.log("buyer private route-> user: ", user);

  // return user?.role !== "BUYER" ? (
  //   <Navigate to="/unauthorized" />
  // ) : (
  //   children
  // );
  return children;
};

export default BuyerPrivate;
