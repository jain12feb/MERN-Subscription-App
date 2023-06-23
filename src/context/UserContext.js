import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  data: null,
  loading: true,
  error: null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const response = await axios.get("/api/v1/me");

    if (response.data && response.data.user) {
      setUser({
        data: response.data.user,
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.error) {
      setUser({
        data: null,
        loading: false,
        error: response.data.error,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
