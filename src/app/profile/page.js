'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../sidebar.css';

export default function Profile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      router.push('/register');
    } else {
      const currentUser = JSON.parse(currentUserStr);
      setUserName(currentUser.name || currentUser.studentId);
      setUserProfile(currentUser);
    }
  }, [router]);

  if (!userProfile) {
    return null; // or loading spinner
  }

  return (
    <>
      <Navigation userName={userName} />

      <main className="main-content">
        <div className="container mt-5">
          <div className="profile-container">
            <h1 className="mb-4">My Profile</h1>

            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 text-center mb-4">
                    <div className="profile-image-container mb-3">
                      <i className="fas fa-user-circle fa-6x text-secondary"></i>
                    </div>
                    <h3 className="mb-2">{userProfile.name}</h3>
                    <p className="text-muted">Student</p>
                  </div>

                  <div className="col-md-8">
                    <div className="profile-details">
                      <h4 className="mb-3">Personal Information</h4>

                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <p className="text-muted mb-0">Student ID</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="mb-0">{userProfile.studentId || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <p className="text-muted mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="mb-0">{userProfile.name}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <p className="text-muted mb-0">Email</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="mb-0">{userProfile.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
