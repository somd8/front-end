'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Notification from '../../components/Notification';
import QRCode from '../../components/QRCode';
import '../sidebar.css';

export default function BackSemester() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [modules, setModules] = useState([{ moduleName: '', moduleCode: '' }]);
  const [isHostelResident, setIsHostelResident] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentProof, setPaymentProof] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const MODULE_FEE = 9000;
  const HOSTEL_FEE = 12500;

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      router.push('/register');
    } else {
      setUserName(currentUser.fullName || currentUser.studentId);
    }
  }, [router]);

  const calculateTotalFee = () => {
    const moduleFees = modules.length * MODULE_FEE;
    const totalFee = isHostelResident ? moduleFees + HOSTEL_FEE : moduleFees;
    return totalFee;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Validate form inputs here if needed

    const formData = new FormData();

    // Append simple fields
    formData.append('studentName', e.target.studentName.value);
    formData.append('studentId', e.target.studentId.value);
    formData.append('cid', e.target.cid.value);
    formData.append('program', e.target.program.value);
    formData.append('year', e.target.year.value);
    formData.append('semester', e.target.semester.value);
    formData.append('studentEmail', e.target.studentEmail.value);
    formData.append('phoneNumber', e.target.phoneNumber.value);
    formData.append('guardianName', e.target.parentName.value);
    formData.append('guardianPhone', e.target.parentPhone.value);
    formData.append('registrationType', 'repeat');
    formData.append('isHosteller', isHostelResident);
    formData.append('feePerModule', MODULE_FEE);
    formData.append('paymentMethod', paymentMethod);

    // Append modules — send as JSON string for convenience
    formData.append('modules', JSON.stringify(modules));

    // Append payment proof file if any
    if (paymentProof) {
      formData.append('paymentProof', paymentProof);
    }
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
    // Send to backend
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
    setModules([...modules, { moduleName: '', moduleCode: '' }]);
  };

  const handleRemoveModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = modules.map((module, i) => {
      if (i === index) {
        return { ...module, [field]: value };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setPaymentMethod(method);
    
    if (method === 'cash') {
      setNotification({
        message: 'Please visit the accountant office on the third floor of the administrative block',
        type: 'info'
      });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
  };

  return (
    <>
      <Navigation userName={userName} />
      <Notification message={notification.message} type={notification.type} />
      
      <main className="main-content">
        <div className="container mt-5">
          <div className="form-container">
            <h1>Back Semester Registration</h1>
            
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

              {/* Failed Modules Section */}
              <div className="back-modules-container mt-4">
                <h3>Failed Modules</h3>
                <p className="text-info">Fee per module: Nu. {MODULE_FEE}</p>
                {modules.map((module, index) => (
                  <div key={index} className="back-module-item">
                    <div className="back-module-fields">
                      <div className="form-group">
                        <label htmlFor={`moduleName${index}`}>Module Name</label>
                        <input
                          type="text"
                          id={`moduleName${index}`}
                          value={module.moduleName}
                          onChange={(e) => handleModuleChange(index, 'moduleName', e.target.value)}
                          required
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
                          required
                          className="form-control"
                        />
                      </div>
                      {modules.length > 1 && (
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

              {/* Hostel Section */}
              <div className="form-group mt-4">
                <label className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={isHostelResident}
                    onChange={(e) => setIsHostelResident(e.target.checked)}
                    className="me-2"
                  />
                  Are you residing in hostel? (Additional fee: Nu. {HOSTEL_FEE})
                </label>
              </div>

              {/* Fee Summary */}
              <div className="fee-summary mt-4">
                <h3>Fee Summary</h3>
                <div className="fee-details">
                  <p>Module Fees ({modules.length} modules × Nu. {MODULE_FEE}): Nu. {modules.length * MODULE_FEE}</p>
                  {isHostelResident && <p>Hostel Fee: Nu. {HOSTEL_FEE}</p>}
                  <p className="total-fee">Total Fee: Nu. {calculateTotalFee()}</p>
                </div>
              </div>

              {/* Payment Method Section */}
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
      </main>
    </>
  );
} 