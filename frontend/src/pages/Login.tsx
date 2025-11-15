import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { InputField } from '../components/ui/InputField';
import { GlowButton } from '../components/ui/GlowButton';
import { GlassPanel } from '../components/ui/GlassPanel';
import { AnimatedBackground } from '../components/AnimatedBackground';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to log in';
      
      // Handle Firebase Auth errors
      if (error?.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your connection';
            break;
          default:
            errorMessage = error.message || 'Failed to log in';
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to your account to continue
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
              placeholder="Enter your password"
              required
              disabled={loading}
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
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </GlowButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
