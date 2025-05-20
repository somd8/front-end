'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navigation({ userName }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/register');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <img src="/cstlogo.png" alt="CST Logo" height="40" />
          <button className="close-btn" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="sidebar-content">
          <div className="welcome-text">
            Welcome, {userName}
          </div>
          <ul className="menu-list">
            <li className="menu-item">
              <button className="menu-button" onClick={() => router.push('/profile')}>
                <i className="fas fa-user me-2"></i>
                My Profile
              </button>
            </li>
            <li className="menu-item">
              <a 
                className="menu-link" 
                href="https://cst.edu.bt/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt me-2"></i>
                Visit CST Website
              </a>
            </li>
            <li className="menu-item">
              <button className="menu-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`navbar-custom navbar navbar-dark ${visible ? '' : 'navbar-hidden'}`}>
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
            <span>Menu</span>
          </button>
          <div className="navbar-brand p-0">
            <img src="/cstlogo.png" alt="CST Logo" height="60" />
          </div>
        </div>
      </nav>
    </>
  );
} 