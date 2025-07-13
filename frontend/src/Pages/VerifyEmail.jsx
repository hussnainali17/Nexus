// src/pages/VerifyEmail.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle, verifying, success, error

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userRole = params.get('role');
    const userId = params.get('userId');
    localStorage.setItem('token', token);
    localStorage.setItem('user', userId);
    if (!token || !userRole) {
      setStatus('idle');
      return;
    }

    setStatus('success');
    setTimeout(() => {
      if (userRole === 'investor') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard_Ent');
      }
    }, 1500);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      {status === 'idle' && (
        <>
          <h2 className="text-2xl font-semibold text-blue-700">📩 Almost there!</h2>
          <p className="text-gray-600 mt-2 max-w-md">
            We’ve sent a verification link to your email. Please check your inbox and click the link to verify your account.
          </p>
        </>
      )}
      {status === 'verifying' && (
        <>
          <h2 className="text-xl font-semibold text-gray-700">🔐 Verifying your email...</h2>
          <p className="text-gray-500 mt-2">Please wait while we confirm your verification token.</p>
        </>
      )}
      {status === 'success' && (
        <>
          <h2 className="text-xl font-semibold text-green-600">✅ Email verified successfully!</h2>
          <p className="text-gray-500 mt-2">Redirecting you to your dashboard...</p>
        </>
      )}
      {status === 'error' && (
        <>
          <h2 className="text-xl font-semibold text-red-600">❌ Verification failed</h2>
          <p className="text-gray-500 mt-2">Link is invalid or expired. Redirecting back to signup...</p>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
