import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Login = (props) => {
  let { alert, showAlert } = props;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    if (response.status === 400) {
      showAlert(json.error, "danger");
    } else {
      showAlert(json.error, "success");
    }
    if (json.success === true) {
      // Redirect
      localStorage.setItem("token", json.authtoken);
      showAlert("Login successful!", "success");
      navigate("/");
    }

    console.log(json);
  };

  const paragraphStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 400,
  };
  const isSubmitDisabled =
    credentials.email.trim() === "" || credentials.password.trim() === "";

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="w-full max-w-sm mx-auto px-4 py-8 bg-gray-800 rounded-md shadow-md">
      
      <h2
        className="text-center text-white text-2xl mb-6"
        style={paragraphStyle}
      >
        LOGIN
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-white">
          <label htmlFor="email" className="block mb-1">
            Email address
          </label>
          <input
            type="email"
            minLength={5}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onchange}
          />
        </div>
        <div className="text-white">
          <label htmlFor="password" className="block mb-1">
            Password{" "}
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            minLength={5}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </form>
      <div className="text-center text-white mt-4">
        <a href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
