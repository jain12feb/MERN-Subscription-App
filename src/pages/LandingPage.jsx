import React, { useContext } from "react";
import Hero from "../components/Hero";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const [state] = useContext(UserContext);
  if (state.data) return <Navigate to={"/articles"} />;
  return <Hero />;
};

export default LandingPage;
