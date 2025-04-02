import React, { useState } from "react";
import "./css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "", // Ensure this matches the backend field name
    password: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/admin/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Server Response:", response.data);
  
      if (response.data === "Login successful!") {
        alert("Login Successful!");
        navigate("/AddEvent");
      } else {
        alert("Login Failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Detailed Login Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
  
      // More specific error messages
      if (error.response) {
        // The request was made and the server responded with a status code
        switch (error.response.status) {
          case 401:
            alert("Unauthorized: Invalid email or password");
            break;
          case 403:
            alert("Forbidden: You do not have access");
            break;
          case 500:
            alert("Server Error: Please try again later");
            break;
          default:
            alert(`Login Failed: ${error.response.data || 'Unknown error occurred'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from server. Please check your network connection.");
      } else {
        // Something happened in setting up the request
        alert("Error setting up login request");
      }
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
                  className="login-img"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-6" style={{ backgroundColor: "#0d8c35", borderRadius: "0 10px 10px 0", color: "white" }}>
            <div className="p-4">
              <h2 className="text-center mb-4">Admin</h2>
              <p className="text-center mb-4">We are glad to see you :)</p>

              <form onSubmit={handleSubmit}>
                {/* Input Fields */}
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    name="email" // Fixed: Matches backend field
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Login Button */}
                <div className="submit">
                  <button type="submit" className="btn btn-light btn-sm">Login</button>
                </div>
              </form>

              {/* Signup Link */}
              <p className="text-center mt-3">
                Don't have an account? <Link to="/adminsignup" className="text-light">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
