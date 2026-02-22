import React, { useEffect, useState } from "react";
import Icon from "../assets/icon.jpg";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  // const [isMobile, setIsMobile] = useState(false);
  // const { width } = useWindowSize();
  // const isMobileView = width <= 768;

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setActiveTab("dashboard");
        break;
      case "/assessment":
        setActiveTab("assessment");
        break;

      default:
        setActiveTab("dashboard");
        break;
    }
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <div className="sideBar_section">
      <p>
        <img src={Icon} alt="App Icon" />
        <span>
          <b>Early Health</b> Detection
        </span>
      </p>
      <button
        className={activeTab === "dashboard" ? "active" : ""}
        onClick={() => {
            navigate("/dashboard");
            setActiveTab("dashboard");
          }}
      >
        Dashboard
      </button>
      <button
        className={activeTab === "assessment" ? "active" : ""}
        onClick={() => {
            navigate("/assessment");
            setActiveTab("assessment");
          }}
      >
        Medical Assessment
      </button>
    </div>
  );
}
