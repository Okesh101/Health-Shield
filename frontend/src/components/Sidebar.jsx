import React, { useEffect, useState } from "react";
import Icon from "../assets/icon.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "../hook/useWindowSize";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSideBar, setShowSideBar] = useState(false);
  const { width } = useWindowSize();

  const isMobile = width <= 768;

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
    <>
      <div className="sideBar_section">
        {!isMobile && (
          <>
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
          </>
        )}
      </div>
      <div className="mobile_menu">
        {isMobile && (
          <>
            <div className="heading">
              <p>
                <img src={Icon} alt="App Icon" />
                <span>
                  <b>Early Health</b> Detection
                </span>
              </p>
              <FiMenu
                className="menu_icon"
                onClick={() => setShowSideBar(true)}
              />
            </div>

            <AnimatePresence>
              {showSideBar && (
              <motion.div
                className="mobile_sideBar_section"
                initial={{ y: "-100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
              >
                <FiX
                  className="close_icon"
                  onClick={() => setShowSideBar(false)}
                />
                <section>
                  <button
                    className={activeTab === "dashboard" ? "active" : ""}
                    onClick={() => {
                      navigate("/dashboard");
                      setActiveTab("dashboard");
                      setShowSideBar(false);
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    className={activeTab === "assessment" ? "active" : ""}
                    onClick={() => {
                      navigate("/assessment");
                      setActiveTab("assessment");
                      setShowSideBar(false);
                    }}
                  >
                    Medical Assessment
                  </button>
                </section>
              </motion.div>
            )}
            </AnimatePresence>
{/* 
            <AnimatePresence>
              {showSideBar && (
                <motion.div
                  className="mobile_sideBar_section"
                  initial={{ y: "-100vh", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100vh", opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  }}
                >
                  <FiX
                    className="close_icon"
                    onClick={() => setShowSideBar(false)}
                  />
                  <section>
                    <button
                      className={activeTab === "dashboard" ? "active" : ""}
                      onClick={() => {
                        navigate("/dashboard");
                        setActiveTab("dashboard");
                        setShowSideBar(false);
                      }}
                    >
                      Dashboard
                    </button>

                    <button
                      className={activeTab === "assessment" ? "active" : ""}
                      onClick={() => {
                        navigate("/assessment");
                        setActiveTab("assessment");
                        setShowSideBar(false);
                      }}
                    >
                      Medical Assessment
                    </button>
                  </section>
                </motion.div>
              )}
            </AnimatePresence> */}
          </>
        )}
      </div>
    </>
  );
}
