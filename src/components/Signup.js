import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Signup = ({ showAlert }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch(`https://memomate-g2ic.onrender.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("token", json.authtoken);
      showAlert("Registered Successfully", "success");
      navigate("/");
    } else {
      if (json.error === "sorry a user with this email already exist") {
        showAlert("A user with this email already exists", "danger");
      } else {
        showAlert("Invalid details", "danger");
      }
    }
  };
  const paragraphStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 400
  };
  const isSubmitDisabled = Object.values(credentials).some((value) => value.trim() === '');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="w-full max-w-sm mx-auto px-4 py-8 bg-gray-800 rounded-md shadow-md">
      <h2 className="text-center text-white text-2xl mb-6" style={paragraphStyle}>REGISTER</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-white">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            id="name"
            name="name"
            minLength={5}
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="text-white">
          <label htmlFor="email" className="block mb-1">
            Email address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            id="email"
            name="email"
            minLength={5}
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="text-white">
          <label htmlFor="password" className="block mb-1">
            Password   
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            name="password"
            onChange={onchange}
            id="password"
            minLength={5}
            required
          />
        </div>

        <div className="text-white">
          <label htmlFor="cpassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            name="cpassword"
            onChange={onchange}
            id="cpassword"
            minLength={5}
            required
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
    </div>
    </div>
  );
};

export default Signup;
