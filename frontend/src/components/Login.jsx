import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const res = await fetch("http://127.0.0.1:5000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="wrapper">
      <div className="logIn_page">
        <div className="signUp_section">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full name e.g John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email e.g john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
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