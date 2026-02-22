import React from "react";
import Sidebar from "./Sidebar";
import RecorderIcon from "../assets/recorderIcon.png";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.div
          className="dashboard_page"
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="page_nav">
            <h3>Dashboard</h3>
            <p>helo</p>
          </div>

          <div className="recording_section">
            <div className="left">
              <h2>AI-Powered Health Assessment</h2>
              <p>
                Get prediction of Cholera and Lassa Fever using voice input.{" "}
              </p>
              <button onClick={() => navigate("/assessment")}>
                Start New Assessment{" "}
              </button>
            </div>
            <div className="right">
              <img src={RecorderIcon} alt="Recorder Icon" />
            </div>
          </div>

          <div className="assessments_section">
            <p>No assessment data yet </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
