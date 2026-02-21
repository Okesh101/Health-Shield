import React from "react";
import Sidebar from "./Sidebar";
import RecorderIcon from "../assets/recorderIcon.png";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  return (
    <div className="container">
      <Sidebar />
      <div className="dashboard_page">
        <div className="heading">
            <h3>Dashboard</h3>
            <p>helo</p>
        </div>

        <div className="recording_section">
          <div className="left">
            <h2>AI-Powered Health Assessment</h2>
            <p>Get prediction of Cholera and Lassa Fever using voice input. </p>
            <button onClick={() => navigate("/assessment")}>Start New Assessment </button>
          </div>
          <div className="right">
            <img src={RecorderIcon} alt="Recorder Icon" />
          </div>
        </div>

        <div className="assessments_section">
          <p>No assessment data yet </p>
        </div>
      </div>
    </div>
  );
}
