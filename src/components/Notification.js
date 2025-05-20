import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  const style = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '4px',
    backgroundColor: getBackgroundColor(),
    color: 'white',
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'slideIn 0.3s ease-out'
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <div style={style}>
        {message}
      </div>
    </>
  );
};

export default Notification; 