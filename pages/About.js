import { motion } from "framer-motion";
import { useState } from "react";

const socialLinks = [
  {
    name: 'GitHub',
    icon: '⌨️',
    url: 'https://github.com/namragajera77',
    color: 'hover:text-gray-800'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/namra-gajera-b17940214/',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    icon: '🐦',
    url: 'https://x.com/namra424911392',
    color: 'hover:text-blue-400'
  },
  {
    name: 'Email',
    icon: '📧',
    url: 'mailto:gajeranamra41@gmail.com',
    color: 'hover:text-red-500'
  }
];

const About = () => {
  // Add state for form fields and submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Please fill in all fields'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Please enter a valid email address'
      });
      return;
    }

    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear form and show success message
      setFormData({ name: '', email: '', message: '' });
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);

    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Failed to send message. Please try again.'
      });
    }
  };

    return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1 
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        About Us
      </motion.h1>

      <motion.p 
        className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Algorithm Visualizer is a web application that allows users to visualize and compare various sorting and searching algorithms. It is designed to be a learning tool for computer science students and enthusiasts, providing a hands-on experience of how these algorithms work.
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">✨</span>
            <h3 className="text-xl font-bold text-gray-800">Features</h3>
          </div>
          <p className="text-gray-600 mb-4">The application provides a range of features, including:</p>
          <ul className="space-y-2">
            {[
              "Visualization of sorting and searching algorithms",
              "Comparison of algorithm performance",
              "Real-time execution statistics",
              "Interactive user interface"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🚀</span>
            <h3 className="text-xl font-bold text-gray-800">Technology</h3>
          </div>
          <p className="text-gray-600 mb-4">The application is built using modern web technologies, including:</p>
          <ul className="space-y-2">
            {[
              "React for the user interface",
              "React Router for navigation",
              "Framer Motion for animations",
              "Tailwind CSS for styling"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="text-blue-500">⚡</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">👨‍💻</span>
            <h3 className="text-2xl font-bold text-gray-800 font-poppins">Creator</h3>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-800 font-poppins mb-2">
                Namra Gajera
              </h4>
              <p className="text-blue-600 font-medium mb-3">
                Frontend Developer
              </p>
              <p className="text-gray-600 italic">
                "Passionate about creating beautiful and intuitive user interfaces that make complex algorithms easy to understand."
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "React.js", "JavaScript", "Tailwind CSS", "Algorithm Visualization"
                ].map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced contact section */}
      <motion.div 
        className="mt-16 pt-8 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-8">
            Have questions, suggestions, or want to contribute to the project? 
            We'd love to hear from you!
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white 
                  shadow-sm border border-gray-200 transition-all duration-300
                  hover:shadow-md ${link.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Contact Form Preview */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Contact</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="4"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Error Message */}
              {formStatus.error && (
                <motion.div
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formStatus.error}
                </motion.div>
              )}

              {/* Success Message */}
              {formStatus.isSubmitted && (
                <motion.div
                  className="text-green-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Message sent successfully!
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={formStatus.isSubmitting}
                className={`bg-blue-500 text-white px-6 py-2 rounded-lg font-medium
                  transition-colors duration-300 ${
                    formStatus.isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-blue-600'
                  }`}
                whileHover={!formStatus.isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!formStatus.isSubmitting ? { scale: 0.98 } : {}}
              >
                {formStatus.isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
      </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
  
  