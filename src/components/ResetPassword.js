import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = (props) => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const paragraphStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 400,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://memomate-g2ic.onrender.com/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password })
    });

    

    const json = await response.json();
    if (response.status === 200) {
      props.showAlert('Password reset successful!', 'success');
      navigate('/login');
    } else {
      props.showAlert(json.error, 'danger');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="w-full max-w-sm mx-auto px-4 py-8 bg-gray-800 rounded-md shadow-md">
      <h2
        className="text-center text-white text-2xl mb-6"
        style={paragraphStyle}
      >
        RESET PASSWORD
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-white">
          <label htmlFor="password" className="block mb-1">New Password</label>
          <input type="password" minLength={5} className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default ResetPassword;
