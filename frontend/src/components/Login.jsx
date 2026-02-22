import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [currentTab, setCurrentTab] = useState("signup");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    let isValid = true;
    e.preventDefault();

    if (!formData.fullName) {
      setErrors((prev) => ({ ...prev, fullName: "Full name is required" }));
      isValid = false;
    }
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!formData.email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      isValid = false;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    }

    if (isValid) {
      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: formData }),
      });
      const data = await res.json();
      console.log(data);
      setCurrentTab("login");
    }
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!formData.email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      isValid = false;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    }

    if (isValid) {
      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: formData }),
      });
      const data = await res.json();
      navigate("/dashboard");
      console.log(data);
    }
  };

  return (
    <div className="wrapper">
      <div className="logIn_page">
        <div className="signUp_section">
          <AnimatePresence mode="wait">
            {currentTab === "signup" ? (
              <motion.div
                key="signup"
                className="signUp_wrapper"
                initial={{ x: "300px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "300px", opacity: 0 }}
                transition={{duration: 0.8, ease: "easeInOut"}}
              >
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                  <fieldset>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name e.g John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <span className="error">{errors.fullName}</span>
                    )}
                  </fieldset>
                  <fieldset>
                    <input
                      type="email"
                      name="email"
                      get
                      url
                      placeholder="Email e.g john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </fieldset>
                  <fieldset>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </fieldset>
                  <button type="submit">Sign Up</button>

                  <div className="existing_acc">
                    <p>Already have an account?</p>
                    <button
                      type="button"
                      onClick={() => setCurrentTab("login")}
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                className="logIn_wrapper"
                initial={{ x: "200px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-200px", opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
              >
                <h1>Log In</h1>
                <form onSubmit={handleLogIn}>
                  <fieldset>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email e.g john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </fieldset>
                  <fieldset>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </fieldset>
                  <button type="submit">Log In</button>

                  <div className="no_acc">
                    <p>Don't have an account?</p>
                    <button
                      type="button"
                      onClick={() => setCurrentTab("signup")}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="content">
          <h2>AI-Powered Early Health Detection</h2>
          <p>
            Quickly assess symptoms of Lassa Fever using structured text or
            voice input and get fast, accurate risk evaluations to protect your
            health.
          </p>
          <p>Stay informed, stay healthy!</p>
          <p>Your AI Health Partner.</p>
        </div>
      </div>
    </div>
  );
}
