"use client"
import React, { useState } from 'react';

// Register Page Component
const RegisterPage = ({ 
  onRegister, 
  onNavigateToLogin 
}: { 
  onRegister: (email: string, password: string, name: string) => Promise<boolean>;
  onNavigateToLogin: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const success = await onRegister(formData.email, formData.password, formData.name);
      if (!success) {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          Create Account
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block',
              marginBottom: 4,
              fontSize: 14,
              fontWeight: 500,
              color: '#333'
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
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
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
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
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button
            type="button"
            onClick={onNavigateToLogin}
            style={{
              backgroundColor: 'transparent',
              color: '#667eea',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              textDecoration: 'underline'
            }}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;