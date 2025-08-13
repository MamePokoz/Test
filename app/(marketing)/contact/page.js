'use client';
import { useState } from 'react';
import './contact.css';
import './global.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', Number: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '', Number: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <div className="header-line"></div>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-form-box">
          {submitted ? (
            <div className="form-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2>Message Sent!</h2>
              <p>Thank you for contacting us! We will get back to you soon.</p>
              <button onClick={resetForm}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />

              <label>Email Address</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />

              <label>Phone Number</label>
              <input 
                type="tel"
                name="Number"
                value={formData.Number}
                onChange={handleChange}
                required
                placeholder="+1 (555) 123-4567"
              />

              <label>Message</label>
              <textarea 
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us how we can help you..."
              />

              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
