'use client';

import React, { useState } from 'react';

// LoginPage Component
const LoginPage = ({ 
  onLogin, 
  onNavigateToRegister, 
  onForgotPassword,
  onRegister
}: { 
  onLogin: (email: string, password: string) => Promise<boolean>;
  onNavigateToRegister: () => void;
  onForgotPassword: (email: string) => void;
  onRegister?: (email: string, password: string, name: string) => Promise<boolean>;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Client-side validation with specific error messages
    if (!email || !email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!password || !password.trim()) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!registerData.email || !registerData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!registerData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!registerData.password || !registerData.password.trim()) {
      setError('Password is required');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!onRegister) {
      setError('Registration is not available at this time.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('About to call onRegister with:', {
        email: registerData.email,
        password: registerData.password,
        name: registerData.email.split('@')[0]
      });
      
      // Call the registration function passed from parent
      const success = await onRegister(registerData.email, registerData.password, registerData.email.split('@')[0]);
      
      console.log('Registration function returned:', success);
      
      if (!success) {
        setError('Email already exists. Please use a different email or try logging in.');
      } else {
        console.log('Registration successful, should redirect to main app');
      }
    } catch (err: any) {
      console.error('Registration error details:', err);
      console.error('Error message:', err?.message);
      console.error('Error stack:', err?.stack);
      setError(`Registration failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    const emailToUse = email || prompt('Enter your email address:');
    if (emailToUse) {
      onForgotPassword(emailToUse);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
        width: '100%'
      }}>
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: 24,
          fontSize: 24,
          fontWeight: 600,
          color: '#333'
        }}>
          {showRegister ? 'Register' : 'Login'}
        </h2>

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: 4,
            marginBottom: 16,
            fontSize: 14,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        
        <form onSubmit={showRegister ? handleRegister : handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block',
              marginBottom: 4,
              fontSize: 14,
              fontWeight: 500,
              color: '#333'
            }}>
              Email
            </label>
            <input
              type="email"
              value={showRegister ? registerData.email : email}
              onChange={(e) => showRegister 
                ? setRegisterData(prev => ({ ...prev, email: e.target.value }))
                : setEmail(e.target.value)
              }
              required
              style={{ 
                width: "100%", 
                padding: 8, 
                marginTop: 4,
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: 14,
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block',
              marginBottom: 4,
              fontSize: 14,
              fontWeight: 500,
              color: '#333'
            }}>
              Password
            </label>
            <input
              type="password"
              value={showRegister ? registerData.password : password}
              onChange={(e) => showRegister 
                ? setRegisterData(prev => ({ ...prev, password: e.target.value }))
                : setPassword(e.target.value)
              }
              required
              style={{ 
                width: "100%", 
                padding: 8, 
                marginTop: 4,
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: 14,
                outline: 'none'
              }}
            />
          </div>

          {showRegister && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ 
                display: 'block',
                marginBottom: 4,
                fontSize: 14,
                fontWeight: 500,
                color: '#333'
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                style={{ 
                  width: "100%", 
                  padding: 8, 
                  marginTop: 4,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  outline: 'none'
                }}
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: 10,
              backgroundColor: isLoading ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              fontSize: 16,
              fontWeight: 500,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? 'Please wait...' : (showRegister ? 'Register' : 'Login')}
          </button>
        </form>

        {!showRegister && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              style={{
                backgroundColor: 'transparent',
                color: '#667eea',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                textDecoration: 'underline'
              }}
            >
              Forgot password?
            </button>
          </div>
        )}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button
            type="button"
            onClick={() => setShowRegister(!showRegister)}
            style={{
              backgroundColor: 'transparent',
              color: '#667eea',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              textDecoration: 'underline'
            }}
          >
            {showRegister ? 'Already have an account? Login' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
