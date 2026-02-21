import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Assessment from "./components/Assessment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </>
  );
}

export default App;
