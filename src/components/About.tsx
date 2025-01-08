import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCloud, FaRobot } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';

export default function About() {
  const competencies = [
    { icon: FaBrain, label: 'Deep Learning', color: 'bg-gray-50' },
    { icon: FaRobot, label: 'AI Agents', color: 'bg-gray-50' },
    { icon: FaCloud, label: 'Cloud Computing', color: 'bg-gray-50' },
    { icon: IoEye, label: 'Computer Vision', color: 'bg-gray-50' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <motion.div 
                className="relative w-56 h-56 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/mahmood.jpg"
                  alt="Mahmood Salah"
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
              </motion.div>
              <div>
                <h2 className="text-3xl font-display font-bold mb-4 text-charcoal">About Me</h2>
                <p className="mb-4 text-muted">
                  Senior Data Scientist and AI Engineer specializing in AI agents, computer vision, 
                  and deep learning technologies. I develop innovative AI solutions that drive 
                  measurable business value.
                </p>
                <p className="mb-4 text-muted">
                  As an AI Mentor at Udacity, I guide students through advanced programs while 
                  sharing expertise in cutting-edge technologies.
                </p>
              </div>
            </div>
            
            {/* Core Competencies */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-charcoal">Core Competencies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {competencies.map((comp, index) => (
                  <motion.div
                    key={index}
                    className={`${comp.color} p-4 rounded-lg shadow-sm border border-gray-200
                    hover:shadow-md transition-all duration-300 cursor-default`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-3">
                      <comp.icon className="w-6 h-6 text-gray-600" />
                      <span className="font-medium text-gray-800">{comp.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}