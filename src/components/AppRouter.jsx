import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
  const user = localStorage.getItem("user");
  return (
    <Routes>
      {user &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}

      <Route path={"*"} element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
