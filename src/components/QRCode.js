import React from 'react';

const QRCode = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginTop: '1rem'
  };

  return (
    <div style={style}>
      <h4>Scan QR Code to Pay</h4>
      <img 
        src="qr.jpeg" 
        alt="Payment QR Code" 
        style={{ 
          width: '200px', 
          height: '200px',
          border: '1px solid #dee2e6',
          padding: '0.5rem',
          backgroundColor: 'white'
        }} 
      />
      <p className="text-muted">After payment, please take a screenshot of the confirmation as proof</p>
    </div>
  );
};

export default QRCode; 