"use client";
import React, { useState, useEffect } from 'react';

type Note = {
  id: string;
  text: string;
  createdAt: Date;
  isPinned?: boolean;
};

type User = {
  id: string;
  email: string;
  name: string;
};

// NoteForm Component
const NoteForm = ({ onAdd }: { onAdd: (text: string) => void }) => {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
      setIsExpanded(false);
    }
  };

  return (
    <div style={{
      marginBottom: 24,
      border: '2px solid #e9ecef',
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder={isExpanded ? "Write your note here..." : "Take a note..."}
          style={{
            width: '100%',
            padding: isExpanded ? '16px' : '12px',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: 14,
            lineHeight: 1.5,
            minHeight: isExpanded ? 100 : 50,
            transition: 'all 0.3s ease',
            backgroundColor: 'transparent'
          }}
        />
        
        {isExpanded && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #e9ecef',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: 12,
              color: '#6c757d'
            }}>
              {text.length} characters
            </div>
            
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => {
                  setText('');
                  setIsExpanded(false);
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all 0.2s ease'
                }}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={!text.trim()}
                style={{
                  padding: '6px 12px',
                  backgroundColor: text.trim() ? '#007bff' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: text.trim() ? 'pointer' : 'not-allowed',
                  fontSize: 12,
                  transition: 'all 0.2s ease'
                }}
              >
                ✓ Add Note
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// NoteList Component
const NoteList = ({ 
  notes, 
  onDelete, 
  onEdit, 
  onPin,
  theme 
}: { 
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onPin: (id: string) => void;
  theme: 'light' | 'dark';
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (notes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 16px',
        color: theme === 'dark' ? '#888' : '#6c757d'
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
        <h3 style={{ margin: 0, marginBottom: 8, color: theme === 'dark' ? '#ccc' : '#495057' }}>
          No notes yet
        </h3>
        <p style={{ margin: 0, fontSize: 14 }}>
          Create your first note using the form above
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sortedNotes.map((note) => (
        <div
          key={note.id}
          style={{
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#404040' : '#e9ecef'}`,
            borderRadius: 12,
            padding: 16,
            position: 'relative',
            transition: 'all 0.3s ease',
            boxShadow: note.isPinned 
              ? '0 4px 12px rgba(0,123,255,0.1)' 
              : '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {note.isPinned && (
            <div style={{
              position: 'absolute',
              top: -1,
              left: -1,
              right: -1,
              height: 3,
              background: 'linear-gradient(90deg, #007bff, #0056b3)',
              borderRadius: '12px 12px 0 0'
            }} />
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12
          }}>
            <div style={{
              fontSize: 12,
              color: theme === 'dark' ? '#888' : '#6c757d',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              {note.isPinned && <span style={{ color: '#007bff' }}>📌</span>}
              <span>
                {note.createdAt.toLocaleDateString()} at {note.createdAt.toLocaleTimeString()}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 4 }}>
              <button
                onClick={() => onPin(note.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: note.isPinned ? '#007bff' : 'transparent',
                  color: note.isPinned ? 'white' : (theme === 'dark' ? '#ccc' : '#6c757d'),
                  border: `1px solid ${note.isPinned ? '#007bff' : (theme === 'dark' ? '#555' : '#ddd')}`,
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all 0.2s ease'
                }}
                title={note.isPinned ? 'Unpin note' : 'Pin note'}
              >
                📌
              </button>

              <button
                onClick={() => handleEdit(note)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: 'transparent',
                  color: theme === 'dark' ? '#ccc' : '#6c757d',
                  border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all 0.2s ease'
                }}
                title="Edit note"
              >
                ✏️
              </button>

              <button
                onClick={() => onDelete(note.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: 'transparent',
                  color: '#dc3545',
                  border: '1px solid #dc3545',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all 0.2s ease'
                }}
                title="Delete note"
              >
                🗑️
              </button>
            </div>
          </div>

          {editingId === note.id ? (
            <div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{
                  width: '100%',
                  padding: 8,
                  border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                  borderRadius: 4,
                  resize: 'vertical',
                  minHeight: 60,
                  fontFamily: 'inherit',
                  fontSize: 14,
                  backgroundColor: theme === 'dark' ? '#333' : 'white',
                  color: theme === 'dark' ? '#fff' : '#333'
                }}
                autoFocus
              />
              <div style={{
                marginTop: 8,
                display: 'flex',
                gap: 8,
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveEdit(note.id)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              fontSize: 14,
              lineHeight: 1.5,
              color: theme === 'dark' ? '#fff' : '#333',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {note.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// LoginPage Component
const LoginPage = ({ 
  onLogin, 
  onNavigateToRegister, 
  onForgotPassword 
}: { 
  onLogin: (email: string, password: string) => Promise<boolean>;
  onNavigateToRegister: () => void;
  onForgotPassword: (email: string) => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = await onLogin(registerData.email, registerData.password);
      if (success) {
        setShowRegister(false);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
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
        backgroundColor: 'white',
        borderRadius: 16,
        padding: '40px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 32
        }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#333',
            margin: 0,
            marginBottom: 8
          }}>
            📝 Notes App
          </h1>
          <p style={{
            color: '#666',
            fontSize: 16,
            margin: 0
          }}>
            {showRegister ? 'Create your account' : 'Welcome back! Please sign in'}
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 14,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={showRegister ? handleRegister : handleLogin}>
          {showRegister && (
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 500,
                color: '#333',
                marginBottom: 8
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                required
              />
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 500,
              color: '#333',
              marginBottom: 8
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
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: showRegister ? 20 : 24 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 500,
              color: '#333',
              marginBottom: 8
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
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              required
            />
          </div>

          {showRegister && (
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 500,
                color: '#333',
                marginBottom: 8
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 500,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: 16
            }}
          >
            {isLoading ? 'Please wait...' : (showRegister ? 'Create Account' : 'Sign In')}
          </button>

          {!showRegister && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
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

          <div style={{ textAlign: 'center' }}>
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
              {showRegister ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, you would check with your backend
        // For now, we'll just check if there's any stored user data
        const storedUser = localStorage.getItem('user');
        const storedNotes = localStorage.getItem('notes');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
          // Convert date strings back to Date objects
          const notesWithDates = parsedNotes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt)
          }));
          setNotes(notesWithDates);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (user && notes.length >= 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, user]);

  // Authentication functions
  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid email/password combination
      if (email && password && email.includes('@') && password.length >= 6) {
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: email,
          name: email.split('@')[0] // Use part before @ as name
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setNotes([]);
    localStorage.removeItem('user');
    localStorage.removeItem('notes');
  };

  const handleForgotPassword = (email: string) => {
    // Simulate forgot password
    alert(`Password reset instructions sent to ${email}`);
  };

  // Notes functions
  const handleAddNote = (noteText: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      text: noteText,
      createdAt: new Date(),
      isPinned: false
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleEditNote = (id: string, newText: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, text: newText } : note
    ));
  };

  const handlePinNote = (id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const handleClearAll = () => {
    if (window.confirm(`Are you sure you want to delete all ${notes.length} notes? This action cannot be undone.`)) {
      setNotes([]);
    }
  };

  const handleExportNotes = () => {
    const notesText = notes.map(note => 
      `${note.isPinned ? '📌 ' : ''}${note.text}\n${note.createdAt.toLocaleString()}\n${'─'.repeat(50)}`
    ).join('\n\n');
    
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getThemeStyles = () => {
    if (theme === 'dark') {
      return {
        background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
        color: '#ffffff',
        containerBg: '#333333',
        headerGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      };
    }
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#333333',
      containerBg: '#ffffff',
      headerGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    };
  };

  const themeStyles = getThemeStyles();
  const totalNotes = notes.length;
  const pinnedNotes = notes.filter(note => note.isPinned).length;

  // Loading screen
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: themeStyles.background,
        color: themeStyles.color
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 50,
            height: 50,
            border: '4px solid #ffffff30',
            borderTop: '4px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p>Loading Notes App...</p>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onNavigateToRegister={() => {}}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  // Main app for authenticated users
  return (
    <div style={{
      minHeight: '100vh',
      background: themeStyles.background,
      padding: '20px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        backgroundColor: themeStyles.containerBg,
        borderRadius: 16,
        boxShadow: themeStyles.shadow,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          background: themeStyles.headerGradient,
          padding: '24px 32px',
          color: 'white',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                📝 {user.name}'s Notes
              </h1>
              <p style={{
                margin: 0,
                fontSize: 14,
                opacity: 0.9,
                marginTop: 4
              }}>
                Welcome back! Capture your thoughts and ideas
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 8,
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
              
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 8,
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 16,
            fontSize: 14,
            opacity: 0.9
          }}>
            <span>📊 {totalNotes} total notes</span>
            {pinnedNotes > 0 && <span>📌 {pinnedNotes} pinned</span>}
            {totalNotes > 0 && (
              <span>⏰ Last updated: {new Date(Math.max(...notes.map(n => n.createdAt.getTime()))).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '32px' }}>
          <NoteForm onAdd={handleAddNote} />
          
          {/* Action Bar */}
          {totalNotes > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
              padding: '12px 16px',
              backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f8f9fa',
              borderRadius: 8,
              border: `1px solid ${theme === 'dark' ? '#404040' : '#e9ecef'}`
            }}>
              <div style={{
                fontSize: 14,
                color: theme === 'dark' ? '#cccccc' : '#6c757d',
                fontWeight: 500
              }}>
                📋 Manage Notes
              </div>
              
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleExportNotes}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 12,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#218838';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#28a745';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  💾 Export
                </button>
                
                <button
                  onClick={handleClearAll}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 12,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#c82333';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc3545';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          )}

          <NoteList
            notes={notes}
            onDelete={handleDeleteNote}
            onEdit={handleEditNote}
            onPin={handlePinNote}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}