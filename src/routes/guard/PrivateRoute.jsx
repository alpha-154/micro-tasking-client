// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";

// const PrivateRoute = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
//   console.log("private route-> user: ", user);

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

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
  if (loggedInUser.role.toLowerCase() !== role) {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page if the role doesn't match
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
