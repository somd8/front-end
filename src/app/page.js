'use client';

import React, { useEffect, useState } from 'react';
import './globals.css';
import './sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

// Import bootstrap JS at the top level
if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.bundle.min.js');
}

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        router.push('/register');
      } else {
        setUserName(currentUser.fullName || currentUser.studentId);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      router.push('/register');
    }
  }, [router]);

  const handleRegistrationClick = (type) => {
    router.push(`/${type}`);
  };

  return (
    <>
      <Navigation userName={userName} />

      <main>
        <section className="hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <h1>Welcome to Semester Registration </h1>
            <p>Choose your registration category below</p>
            
            <div className="registration-buttons">
              <button 
                className="govt"
                onClick={() => handleRegistrationClick('government-scholarship')}
              >
                Government Scholarship
              </button>
              
              <button 
                className="self"
                onClick={() => handleRegistrationClick('self-finance')}
              >
                Self Finance
              </button>
              
              <button 
                className="king"
                onClick={() => handleRegistrationClick('kings-scholarship')}
              >
                King's Scholarship
              </button>
              
              <button 
                className="back"
                onClick={() => handleRegistrationClick('back-semester')}
              >
                Back Semester
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
