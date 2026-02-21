import React, { useState } from "react";
import Sidebar from "./Sidebar";
import RecorderIcon from "../assets/recorderIcon.png";
import { FiFileText } from "react-icons/fi";

export default function Assessment() {
  const [startAssessment, setStartAssessment] = useState(true);
  return (
    <div className="container">
      <Sidebar />
      <div className="assessment_page">
        <div className="page_nav">
          <h3>Medical Assessment</h3>
          <p>helo</p>
        </div>
        {startAssessment ? (
          <>
            <div className="card">
                <img src={RecorderIcon} alt="Recorder Icon" />
                <h3>Use Voice</h3>
                <p>Speak your symptoms aloud</p>
            </div>
            <div className="card">
               <FiFileText /> Type your symptoms
                <h3>Use Text</h3>
                <p>Speak your symptoms aloud</p>
            </div>
          </>
        ) : (
          <p>No assessment data yet</p>
        )}
      </div>
    </div>
  );
}
