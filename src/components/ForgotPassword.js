import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const paragraphStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 400,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://memomate-g2ic.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="w-full max-w-sm mx-auto px-4 py-8 bg-gray-800 rounded-md shadow-md">
      <h2 className="text-center text-white text-2xl mb-6" style={paragraphStyle}>FORGOT PASSWORD</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-white">
          <label htmlFor="email" className="block mb-1">Email address</label>
          <input
            type="email"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
      {message && <div className="text-green-500 mt-4">{message}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
    </div>
  );
};

export default ForgotPassword;
