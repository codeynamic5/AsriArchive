"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      const loginTime = localStorage.getItem('adminLoginTime');
      
      // Session expires after 24 hours
      if (loginTime && Date.now() - parseInt(loginTime) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminLoginTime');
        router.push('/admin');
        return;
      }
      
      if (!adminStatus) {
        router.push('/admin');
        return;
      }
      
      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminStatus();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Router will redirect
  }

  const quickActions = [
    { title: "Upload to New York", href: "/admin/upload?city=newyork&country=usa" },
    { title: "Upload to London", href: "/admin/upload?city=london&country=uk" },
    { title: "Upload to Vienna", href: "/admin/upload?city=vienna&country=austria" },
    { title: "Upload to Cambridge", href: "/admin/upload?city=cambridge&country=uk" },
  ];

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h1 
              style={{ 
                color: '#333',
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '50px',
                margin: 0
              }}
            >
              Admin Dashboard
            </h1>
            
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Times New Roman', Times, serif"
              }}
            >
              Logout
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Quick Upload Actions */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                color: '#333',
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '24px',
                marginBottom: '1rem'
              }}>
                Quick Upload
              </h2>
              
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div style={{
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '5px',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
                  >
                    {action.title}
                  </div>
                </Link>
              ))}
            </div>

            {/* Gallery Management */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                color: '#333',
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '24px',
                marginBottom: '1rem'
              }}>
                Gallery Management
              </h2>
              
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Manage existing photos and galleries
              </p>
              
              <button style={{
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Times New Roman', Times, serif",
                width: '100%'
              }}>
                Manage Galleries
              </button>
            </div>

            {/* Settings */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                color: '#333',
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '24px',
                marginBottom: '1rem'
              }}>
                Settings
              </h2>
              
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Configure archive settings
              </p>
              
              <button style={{
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Times New Roman', Times, serif",
                width: '100%'
              }}>
                Archive Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
