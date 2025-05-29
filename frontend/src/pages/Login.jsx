import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [mode, setMode] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

   useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = mode === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload = mode === 'Sign Up' ? { name, password, email } : { password, email };
      
      const { data } = await axios.post(backendUrl + endpoint, payload);
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/'); // Navigate after successful authentication
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    }
  };

  // Remove the useEffect that checks for token as it might cause issues
  // The navigation is now handled directly after successful login/registration

  return (
    <form onSubmit={onSubmitHandler} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div>
        <h2 className="text-2xl font-bold text-center mb-2">
          {mode === 'Sign Up' ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please {mode === 'Sign Up' ? "create an account" : "login"} to book appointments
        </p>

        {mode === 'Sign Up' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {mode === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        <p className="text-center mt-4">
          {mode === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode('Login')}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode('Sign Up')}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;