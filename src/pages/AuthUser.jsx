import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin, userSignup } from '../api';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true); // Toggle control flag

  // Form Fields State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Dialog State Engine
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    isError: false,
    onConfirm: null
  });

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
    if (dialog.onConfirm) dialog.onConfirm();
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);

    if (isLoginView) {
      // --- LOGIN WORKFLOW ---
      if (!email || !password) return;
      try {
        setLoading(true);
        const data = await userLogin({ email, password });
        if (data.success) {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('username', data.username);
          
          setDialog({
            isOpen: true,
            title: 'Welcome Back!',
            message: `Successfully authenticated as ${data.username}. Redirecting to dashboard...`,
            isError: false,
            onConfirm: () => navigate('/user-dashboard')
          });
        }
      } catch (err) {
        setDialog({
          isOpen: true,
          title: 'Authentication Failed',
          message: err.response?.data?.message || 'Invalid email credentials or network timeout.',
          isError: true
        });
      } finally {
        setLoading(false);
      }
    } else {
      // --- SIGNUP WORKFLOW ---
      if (!username || !email || !password) return;
      try {
        setLoading(true);
        const data = await userSignup({ username, email, password });
        if (data.success) {
          setDialog({
            isOpen: true,
            title: 'Account Created!',
            message: data.message || 'Registration complete. You can now log in.',
            isError: false,
            onConfirm: () => {
              setIsLoginView(true); // Flip over to login layout safely
              setPassword('');
            }
          });
        }
      } catch (err) {
        setDialog({
          isOpen: true,
          title: 'Registration Blocked',
          message: err.response?.data?.message || 'This email or user identity is already taken.',
          isError: true
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="w-full min-h-[85vh] bg-[#fbf6ef] flex items-center justify-center px-4 py-12 relative">
      
      {/* LOCAL CUSTOM DIALOG COMPONENT */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d1e13]/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-[#c1a084]/40 rounded-2xl p-6 shadow-xl animate-fade-in">
            <h3 className={`text-xl font-extrabold ${dialog.isError ? 'text-red-700' : 'text-[#2d1e13]'}`}>
              {dialog.title}
            </h3>
            <p className="mt-3 text-sm text-[#5c4a3d] leading-relaxed">
              {dialog.message}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDialog}
                className="px-5 py-2 rounded-md bg-[#2d1e13] hover:bg-[#5c4a3d] text-white text-sm font-bold transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Center Panel Container Card */}
      <div className="w-full max-w-md bg-white border border-[#c1a084]/40 rounded-2xl p-6 md:p-8 shadow-sm">
        
        {/* Toggle Nav Headers */}
        <div className="flex border-b border-[#eaddcf] mb-6 text-sm font-bold">
          <button
            onClick={() => { setIsLoginView(true); setUsername(''); }}
            className={`flex-1 pb-3 text-center transition-all ${
              isLoginView ? 'border-b-2 border-[#2d1e13] text-[#2d1e13]' : 'text-[#5c4a3d] hover:text-[#2d1e13]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLoginView(false)}
            className={`flex-1 pb-3 text-center transition-all ${
              !isLoginView ? 'border-b-2 border-[#2d1e13] text-[#2d1e13]' : 'text-[#5c4a3d] hover:text-[#2d1e13]'
            }`}
          >
            Register Account
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-[#2d1e13] tracking-tight">
          {isLoginView ? 'Welcome Back' : 'Join Community'}
        </h2>
        <p className="text-xs text-[#5c4a3d] mt-1 mb-6">
          {isLoginView ? 'Access your reported missing listings panel.' : 'Create an account to log items and track claims.'}
        </p>

        {/* Action Form Handler Layout */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {/* USERNAME FIELD (Conditional for Signup View Only) */}
          {!isLoginView && (
            <div>
              <label className="block text-sm font-semibold text-[#2d1e13] mb-1">Username</label>
              <input
                type="text"
                value={username}
                required={!isLoginView}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d1e13]/10 focus:border-[#2d1e13]"
              />
            </div>
          )}

          {/* EMAIL FIELD */}
          <div>
            <label className="block text-sm font-semibold text-[#2d1e13] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d1e13]/10 focus:border-[#2d1e13]"
            />
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-sm font-semibold text-[#2d1e13] mb-1">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d1e13]/10 focus:border-[#2d1e13]"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-md bg-[#2d1e13] px-4 py-2.5 text-[#fbf6ef] font-bold hover:bg-[#5c4a3d] transition disabled:opacity-50 text-sm shadow-sm"
          >
            {loading ? 'Processing...' : isLoginView ? 'Sign In' : 'Create Account'}
          </button>
        </form>

      </div>
    </main>
  );
};

export default AuthPage;