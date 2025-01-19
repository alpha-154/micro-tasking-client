import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { fetchUserProfile } from "@/services/api";
import { toast } from "sonner";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          setIsFetching(true);
          const response = await fetchUserProfile(user.uid);
          setLoggedInUser(response.data?.user);
          console.log("user -> ", response.data?.user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          toast.error(error?.message || "Something went wrong. Please try again.");
        } finally {
          setIsFetching(false);
        }
      } 
    };

    fetchUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ loggedInUser, isFetching }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);