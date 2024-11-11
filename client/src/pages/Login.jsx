import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Redirect user if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await api.post('/auth/login', { email, password });
          localStorage.setItem('token', response.data.token);
          navigate('/');
      } catch (error) {
          if (error.response) {
              // If the error has a response (e.g., 400 or 401)
              alert(error.response.data.message || 'Login failed');
          } else {
              alert('Network error');
          }
      }
  };
  

    return (
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500">Login</button>
            </form>
        </div>
    );
};

export default Login;
