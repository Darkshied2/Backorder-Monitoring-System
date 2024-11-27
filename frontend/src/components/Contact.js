import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true); // Show thank-you message on successful submission
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(to bottom right, #fff3e0, #ffe0b2)',
      }}
    >
      <nav className="navbar bg-opacity-30 bg-black backdrop-blur-lg p-4 rounded-md shadow-lg flex justify-between">
        {/* Logo or Title on the Left */}
        <div className="navbar-logo text-white font-bold text-lg">
          <a href="/">Backorder Vision</a>
        </div>
        {/* Links on the Right */}
        <ul className="navbar-list flex space-x-6">
          <li className="navbar-item">
            <a
              href="/about"
              className="navbar-link text-white font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg no-underline"
            >
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex-grow flex items-center justify-center p-5">
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-gray-50">
          <h2 className="text-3xl font-semibold text-center py-10">Contact Us</h2>
          {submitted ? (
            <div className="text-center text-green-600 text-lg">
              <h3>Thank you for your message!</h3>
              <p>We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="mb-2 text-lg text-gray-700">
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 mb-4 rounded border border-gray-300 w-full"
                />
              </label>
              <label className="mb-2 text-lg text-gray-700">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 mb-4 rounded border border-gray-300 w-full"
                />
              </label>
              <label className="mb-2 text-lg text-gray-700">
                Subject:
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 mb-4 rounded border border-gray-300 w-full"
                />
              </label>
              <label className="mb-2 text-lg text-gray-700">
                Message:
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 mb-4 rounded border border-gray-300 w-full resize-y min-h-[100px]"
                />
              </label>
              <button type="submit" className="bg-yellow-400 text-purple-900 p-3 rounded-lg hover:bg-yellow-500 w-full transition-all duration-300 shadow-md font-bold">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
