import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:4000/api/email/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 5000);
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-50 rounded-2xl mt-2">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 sm:py-16 md:py-20 px-4 rounded-2xl">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Get In Touch</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto px-4">
            Have questions about our fresh products? We're here to help you with anything you need.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Contact Information</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">Phone</h3>
                    <p className="text-sm sm:text-base text-gray-600 break-all">+91-7006 713 495</p>
                    <p className="text-sm sm:text-base text-gray-600 break-all">+91-9469 881 134</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">Email</h3>
                    <p className="text-sm sm:text-base text-gray-600 break-all">danishmohiudin14@gmail.com</p>
                    <p className="text-sm sm:text-base text-gray-600 break-all">danishmohiudin551@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">Address</h3>
                    <p className="text-sm sm:text-base text-gray-600">Srinagar J&K</p>
                    <p className="text-sm sm:text-base text-gray-600">Kralpora, Kupwara - 193224</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">Business Hours</h3>
                    <p className="text-sm sm:text-base text-gray-600">Mon - Fri: 8:00 AM - 8:00 PM</p>
                    <p className="text-sm sm:text-base text-gray-600">Sat - Sun: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Quick Response Guarantee</h3>
              <p className="text-sm sm:text-base text-emerald-50 mb-3 sm:mb-4">
                Our dedicated support team responds to all inquiries within 24 hours. For urgent matters, please call us directly.
              </p>
              <div className="flex items-center space-x-2 text-emerald-100 text-sm sm:text-base">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Average response time: 2-3 hours</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-2">Message Sent!</h3>
                <p className="text-sm sm:text-base text-gray-600">Thank you for contacting us. We'll get back to you shortly.</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">Check your email for a confirmation message.</p>
              </div>
            ) : (
              <div>
                {error && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-center">
                    <p className="text-sm sm:text-base text-red-600 font-semibold">{error}</p>
                  </div>
                )}
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="John Doe"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="abcd@example.com"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="+91 7006 000 000"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="How can we help?"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      rows="6"
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 sm:py-6 px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Visit Our Store</h2>
            <p className="text-sm sm:text-base text-emerald-50 mt-1 sm:mt-2">Find us at our location and experience fresh quality in person</p>
          </div>
          <div className="h-64 sm:h-80 md:h-96 bg-gray-200 flex items-center justify-center p-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">Srinagar J&K, Kralpora, Kupwara - 193224</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Interactive map would be embedded here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;