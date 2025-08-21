'use client'

import { useState } from 'react';
import './contact.css';
import Swal from "sweetalert2";

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '', 
    number: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '', number: '' });
  };

  const handleChangeNumber = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setFormData({ ...formData, number: numericValue });
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
      });
      return;
    }

    if (formData.number.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number with at least 10 digits',
      });
      return;
    }

    setIsLoading(true);

    // Simulate form submission
  setTimeout(() => { 
    setSubmitted(true); 
    setIsLoading(false); 
  }, 1500); 
};
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact FC Barcelona</h1>
          <div className="header-line"></div>
          <p>
            Connect with the Blaugrana family. We're here to assist you with all your Barcelona-related inquiries.
          </p>
        </div>

        <div className="contact-form-box">
          {submitted ? (
            <div className="form-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2>Visca Barça!</h2>
              <p>
                Thank you for contacting FC Barcelona! A member of our team will respond to your message soon. 
                Together we are stronger!
              </p>
              <button className="success-button" onClick={resetForm}>
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeEmail}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChangeNumber}
                  required
                  placeholder="1234567890"
                  minLength="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Share your thoughts about FC Barcelona, ask questions, or tell us how we can help you..."
                />
              </div>

              <button 
                onClick={handleSubmit} 
                className="submit-button" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}