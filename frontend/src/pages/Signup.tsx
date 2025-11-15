import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { InputField } from '../components/ui/InputField';
import { GlowButton } from '../components/ui/GlowButton';
import { GlassPanel } from '../components/ui/GlassPanel';
import { AnimatedBackground } from '../components/AnimatedBackground';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create account';
      
      // Handle Firebase Auth errors
      if (error?.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'An account with this email already exists';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please use a stronger password';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your connection';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Email/password accounts are not enabled';
            break;
          default:
            errorMessage = error.message || 'Failed to create account';
        }
      } else if (error?.message) {
        // Handle non-Firebase errors (e.g., Firebase not initialized)
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden flex items-center justify-center px-4 py-12">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-md w-full">
        <GlassPanel glow className="p-8 md:p-10 animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-400">
              Sign up to start managing your portfolios
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />

            <InputField
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              disabled={loading}
              minLength={6}
            />

            <InputField
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              disabled={loading}
              minLength={6}
            />

            <GlowButton
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </GlowButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
