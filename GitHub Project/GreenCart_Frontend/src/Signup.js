import React, { useState } from "react";
import "./css/Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email_id: "",
    password: "",
    termsAccepted: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms before signing up.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/register/signup", formData);
      alert("Signup Successful: " + response.data);
    } catch (error) {
      console.error("Signup Error:", error.response); // Log the full error response
      alert("Signup Failed! " + (error.response?.data?.message || "Something went wrong. Please try again."));
    }
  };
  

  return (
    <div className="body">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row g-0">
          {/* Left Side */}
          <div className="col-md-6" style={{ backgroundColor: "#D9E9E2", borderRadius: "10px 0 0 10px" }}>
            <div className="p-4">
              <h1 className="text-center mb-4 text-success">WELCOME!</h1>
              <div className="d-flex justify-content-center">
                <img
                  src="https://img.freepik.com/free-vector/couple-riding-supermarket-shopping-cart_33099-179.jpg?ga=GA1.1.96105188.1739432354&semt=ais_hybrid"
                  alt="Welcome"
                  className="signup-img"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-6" style={{ backgroundColor: "#0d8c35", borderRadius: "0 10px 10px 0", color: "white" }}>
            <div className="p-4">
              <h2 className="text-center mb-4">Hello!</h2>
              <p className="text-center mb-4">We are glad to see you :)</p>

              <form onSubmit={handleSubmit}>
                {/* Input Fields */}
                <div className="mb-3">
                  <label htmlFor="usernameInput" className="form-label">Username</label>
                  <input type="text" className="form-control" id="usernameInput" name="username" placeholder="Username" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">Name</label>
                  <input type="text" className="form-control" id="nameInput" name="name" placeholder="Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input type="email" className="form-control" id="emailInput" name="email" placeholder="Email Address" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">Password</label>
                  <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Password" onChange={handleChange} required />
                </div>

                {/* Checkbox */}
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="terms" name="termsAccepted" onChange={handleChange} />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                {/* Signup Button */}
                <div className="submit">
                  <button type="submit" className="btn btn-light btn-sm">
                    Sign Up
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <p className="text-center mt-3">
                Already have an account? <Link to="/login" className="text-light">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
