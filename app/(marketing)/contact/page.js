'use client';
import { useState } from 'react';
import './Stylecontact.css';
import './global.css';


export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', Number: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      {submitted ? (
        <div className="alert alert-success">
          Thank you for contacting us! We will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input 
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email address</label>
          <input 
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="Number">Number</label>
          <input 
            type="number"
            id="Number"
            name="Number"
            value={formData.Number}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea 
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
}
