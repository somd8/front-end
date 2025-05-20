'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../../components/Footer';
import Notification from '../../components/Notification';
import QRCode from '../../components/QRCode';
import Navigation from '../../components/Navigation';
import '../sidebar.css';

export default function SelfFinance() {
  const router = useRouter();
  const [hasBackModules, setHasBackModules] = useState(false);
  const [backModules, setBackModules] = useState([{ moduleName: '', moduleCode: '' }]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentProof, setPaymentProof] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);

    // Append modules as JSON string
    formData.append('modules', JSON.stringify(backModules));

    // Append registrationType
    formData.append('registrationType', 'selfFinance');

    // Example: if you want to add feePerModule or paymentMethod (optional)
    // formData.append('feePerModule', 9000);
    // formData.append('paymentMethod', 'online');

    // Send form data to backend
    const response = await fetch('http://localhost:8080/course/register', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      setNotification({ message: 'Registration submitted successfully!', type: 'success' });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
        router.push('/');
      }, 3000);
    } else {
      setNotification({ message: data.error || 'Failed to submit registration.', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    }
  } catch (error) {
    setNotification({ message: error.message || 'Failed to submit registration.', type: 'error' });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  }
};


  const handleAddModule = () => {
    setBackModules([...backModules, { moduleName: '', moduleCode: '' }]);
  };

  const handleRemoveModule = (index) => {
    const updatedModules = backModules.filter((_, i) => i !== index);
    setBackModules(updatedModules);
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = backModules.map((module, i) => {
      if (i === index) {
        return { ...module, [field]: value };
      }
      return module;
    });
    setBackModules(updatedModules);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
  };

  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setPaymentMethod(method);
    
    if (method === 'cash') {
      setNotification({
        message: 'Please visit the accountant office on the third floor of the administrative block',
        type: 'info'
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);
    }
  };

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <Navigation />

      <div className="container mt-5">
        <div className="form-container">
          <h1>Self Finance Registration</h1>
          
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  required
                  maxLength="8"
                  pattern="[0-9]{1,8}"
                  title="Student ID must be at most 8 digits"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cid">CID</label>
                <input
                  type="text"
                  id="cid"
                  name="cid"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="program">Program</label>
                <select id="program" name="program" required className="form-control">
                  <option value="">Select Program</option>
                  <option value="BE_CIVIL">BE (Civil)</option>
                  <option value="BE_ELECTRICAL">BE (Electrical)</option>
                  <option value="BE_ECE">BE (ECE)</option>
                  <option value="BE_IT">BE (IT)</option>
                  <option value="B_ARCH">B (Architecture)</option>
                  <option value="BE_GEOLOGY">BE (Engineering Geology)</option>
                  <option value="BE_ICE">BE (ICE)</option>
                  <option value="BE_WATER">BE (Water Resource Engineering)</option>
                  <option value="BE_MECHANICAL">BE (Mechanical Engineering)</option>
                  <option value="BE_SOFTWARE">BE (Software Engineering)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Year</label>
                <select id="year" name="year" required className="form-control">
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                  <option value="5">Fifth Year</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <select id="semester" name="semester" required className="form-control">
                  <option value="">Select Semester</option>
                  <option value="1">Semester I</option>
                  <option value="2">Semester II</option>
                  <option value="3">Semester III</option>
                  <option value="4">Semester IV</option>
                  <option value="5">Semester V</option>
                  <option value="6">Semester VI</option>
                  <option value="7">Semester VII</option>
                  <option value="8">Semester VIII</option>
                  <option value="9">Semester IX</option>
                  <option value="10">Semester X</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="studentEmail">Student Email</label>
                <input
                  type="email"
                  id="studentEmail"
                  name="studentEmail"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="parentName">Parent/Guardian Name</label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="parentPhone">Parent/Guardian Phone</label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group mt-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="hasBackModules"
                  className="form-check-input"
                  checked={hasBackModules}
                  onChange={(e) => setHasBackModules(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="hasBackModules">
                  Do you have any back modules?
                </label>
              </div>
            </div>

            {hasBackModules && (
              <div className="back-module-section mt-3">
                <h3>Back Modules</h3>
                {backModules.map((module, index) => (
                  <div key={index} className="back-module-item">
                    <div className="back-module-fields">
                      <div className="form-group">
                        <label htmlFor={`moduleName${index}`}>Module Name</label>
                        <input
                          type="text"
                          id={`moduleName${index}`}
                          value={module.moduleName}
                          onChange={(e) => handleModuleChange(index, 'moduleName', e.target.value)}
                          required={hasBackModules}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`moduleCode${index}`}>Module Code</label>
                        <input
                          type="text"
                          id={`moduleCode${index}`}
                          value={module.moduleCode}
                          onChange={(e) => handleModuleChange(index, 'moduleCode', e.target.value)}
                          required={hasBackModules}
                          className="form-control"
                        />
                      </div>
                      {backModules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(index)}
                          className="remove-module-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleAddModule}
                  className="add-module-btn mt-3"
                >
                  Add Another Module
                </button>
              </div>
            )}

            <div className="form-group mt-4">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                required
                className="form-control"
              >
                <option value="">Select Payment Method</option>
                <option value="online">Online Payment</option>
                <option value="cash">Cash Payment</option>
              </select>
            </div>

            {paymentMethod === 'online' && <QRCode />}

            {paymentMethod === 'online' && (
              <div className="form-group mt-3">
                <label htmlFor="paymentProof">Payment Screenshot</label>
                <input
                  type="file"
                  id="paymentProof"
                  name="paymentProof"
                  onChange={handleFileChange}
                  required
                  className="form-control"
                  accept="image/*"
                />
              </div>
            )}

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                Submit Registration
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
} 