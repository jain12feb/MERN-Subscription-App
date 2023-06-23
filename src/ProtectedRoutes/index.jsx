import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [state] = useContext(UserContext);

  if (state.loading) return <div>Spinner...</div>;

  return state.data ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
