import React from 'react';
import { motion } from 'framer-motion';
import { bootcampsData } from '../data/bootcampsData';
import { FaDownload, FaGraduationCap, FaUserPlus, FaClock, FaChalkboardTeacher, FaRocket, FaYoutube } from 'react-icons/fa';

export default function Bootcamps() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-mocha-50 pt-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              {bootcampsData[0].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              {bootcampsData[0].shortDescription}
            </p>

            {/* Banner Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/bootcamp-banner.jpg"
                alt="LLM Bootcamp Banner"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <FaClock className="w-8 h-8 text-mocha mb-4" />
            <h3 className="text-xl font-semibold mb-2">{bootcampsData[0].duration}</h3>
            <p className="text-gray-600">Intensive learning experience</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <FaChalkboardTeacher className="w-8 h-8 text-mocha mb-4" />
            <h3 className="text-xl font-semibold mb-2">{bootcampsData[0].level}</h3>
            <p className="text-gray-600">Comprehensive curriculum</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <FaRocket className="w-8 h-8 text-mocha mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hands-on Projects</h3>
            <p className="text-gray-600">Build real-world applications</p>
          </motion.div>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <motion.a
            whileHover={{ scale: 1.02 }}
            href={bootcampsData[0].videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-4 text-mocha">
              <FaYoutube className="w-12 h-12" />
              <span className="text-xl font-semibold">Watch Program Overview on YouTube</span>
            </div>
          </motion.a>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {bootcampsData[0].fullDescription}
          </p>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={bootcampsData[0].syllabusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-mocha border-2 border-mocha rounded-xl hover:bg-mocha-50 transition-all duration-300"
          >
            <FaDownload className="w-5 h-5" />
            <span className="font-semibold">Download Syllabus</span>
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={bootcampsData[0].paidSeatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-mocha text-white rounded-xl hover:bg-mocha-600 transition-all duration-300 shadow-lg"
          >
            <FaUserPlus className="w-5 h-5" />
            <span className="font-semibold">Apply for Paid Seat</span>
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={bootcampsData[0].scholarshipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-mocha border-2 border-mocha rounded-xl hover:bg-mocha-50 transition-all duration-300"
          >
            <FaGraduationCap className="w-5 h-5" />
            <span className="font-semibold">Apply for Scholarship</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}