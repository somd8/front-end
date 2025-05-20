// components/Footer.js
'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Security & Brand</h4>
          <ul>
            <li><a href="#">Report Copyright</a></li>
            <li><a href="#">Report Security Issue</a></li>
            <li><a href="#">Trademark Notice</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Website</h4>
          <ul>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Digital Accessibility</a></li>
            <li><a href="#">Privacy Statement</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Get In Touch</h4>
          <ul>
            <li><a href="#">Contact CST</a></li>
            <li><a href="#">Maps & Directions</a></li>
            <li><a href="#">Jobs</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
        <h2>COLLEGE OF SCIENCE AND TECHNOLOGY</h2>
        <p>Royal University of Bhutan</p>
          <img src="/cstlogo.png" alt="College Logo" className="footer-logo-img" />
        </div>

        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>

        <div className="footer-copy">
          <p>&copy; 2025 College of Science and Technology. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
