import React from "react";
import Sidebar from "./Sidebar";
import RecorderIcon from "../assets/recorderIcon.png";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

    const assessments = [
    {
      id: 1,
      date: "2024-03-15",
      condition: "Malaria",
      confidence: "85%",
      symptoms: ["Fever", "Headache", "Fatigue"],
      status: "Completed"
    },
    {
      id: 2,
      date: "2024-03-14",
      condition: "Common Cold",
      confidence: "92%",
      symptoms: ["Cough", "Runny nose", "Sneezing"],
      status: "Completed"
    },
    {
      id: 3,
      date: "2024-03-13",
      condition: "Cholera",
      confidence: "78%",
      symptoms: ["Diarrhea", "Vomiting", "Dehydration"],
      status: "Pending Review"
    },
    {
      id: 4,
      date: "2024-03-12",
      condition: "Lassa Fever",
      confidence: "88%",
      symptoms: ["Fever", "Sore throat", "Muscle pain"],
      status: "Completed"
    }
  ];

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
            <p>Welcome</p>
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
             {assessments.length > 0 ? (
              assessments.map((assessment) => (
                <div key={assessment.id} className="assessment_card">
                  <div className="assessment_header">
                    <span className="date">{assessment.date}</span>
                    <span className={`status ${assessment.status.toLowerCase().replace(' ', '-')}`}>
                      {assessment.status}
                    </span>
                  </div>
                  <div className="assessment_body">
                    <h4>{assessment.condition}</h4>
                    <p>Confidence: {assessment.confidence}</p>
                    <div className="symptoms">
                      {assessment.symptoms.map((symptom, index) => (
                        <span key={index} className="symptom_tag">{symptom}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No assessment data yet</p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
