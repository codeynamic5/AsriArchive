"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Simple password check - in production, use proper authentication
  const ADMIN_PASSWORD = "asri2025"; // You should change this!

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      router.push('/admin/dashboard');
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminLoginTime');
    setError("");
    setPassword("");
  };

  // Check if already logged in
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';

  if (isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Header />
        
        <main style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
          <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1 
              style={{ 
                color: '#333',
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '40px',
                marginBottom: '2rem'
              }}
            >
              Admin Panel
            </h1>
            
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#666', marginBottom: '1rem' }}>You are logged in as admin</p>
              
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="asri-button"
                style={{ marginRight: '1rem' }}
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={handleLogout}
                className="asri-button"
                style={{ backgroundColor: '#666' }}
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <main style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h1 
            style={{ 
              color: '#333',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '40px',
              textAlign: 'center',
              marginBottom: '2rem'
            }}
          >
            Admin Login
          </h1>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label 
                htmlFor="password"
                style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#333',
                  fontFamily: "'Times New Roman', Times, serif"
                }}
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #333',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontFamily: "'Times New Roman', Times, serif",
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && (
              <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </p>
            )}
            
            <button
              type="submit"
              className="asri-button"
              style={{ width: '100%' }}
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
