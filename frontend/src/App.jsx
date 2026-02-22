import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Login from "./components/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Assessment from "./components/Assessment";

function App() {
  const location = useLocation();
  return (
     <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
