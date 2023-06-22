import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useAuth();

    return currentUser ? (
      <Routes>
        <Route {...rest}>{children}</Route>
      </Routes>
    ) : (
      <Navigate to="/login" replace />
    );
}
