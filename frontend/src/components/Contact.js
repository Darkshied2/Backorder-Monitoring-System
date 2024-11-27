import React, { useState } from 'react';
// import Navbar from './Navbar';

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
      const response = await fetch('http://localhost:5000/contact', { // Change to the appropriate route
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
    <>
      <div className="max-w-7xl mx-auto p-5 font-sans">
        {/* <Navbar /> */}
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
              <button type="submit" className="p-2 rounded bg-green-600 text-white hover:bg-green-700 transition duration-300">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
