'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const res = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await res.json();
console.log(data.user)
 localStorage.setItem('currentUser',data.user)
        if (!res.ok) {
          throw new Error(data.message || 'Login failed');
        }

        localStorage.setItem('currentUser', JSON.stringify(data.user));
        router.push('/');
      } else {
        // REGISTER
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        const res = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            studentId: formData.studentId,
            name: formData.fullName,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        localStorage.setItem('currentUser', JSON.stringify({
          id: data.user?._id || '',
          name: formData.fullName,
          email: formData.email
        }));

        router.push('/');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <img src="/cstlogo.png" alt="CST Logo" height="80" className="mb-3" />
                  <h2 className="mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="studentId" className="form-label">Student ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{1,8}"
                        title="Student ID must be at most 8 digits"
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength="6"
                      disabled={isLoading}
                    />
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength="6"
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => setIsLogin(!isLogin)}
                      disabled={isLoading}
                    >
                      {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
