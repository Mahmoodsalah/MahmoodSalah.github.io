import React from 'react';
import { motion } from 'framer-motion';
import { testimonialsData } from '../data/testimonialsData';

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4 text-center">Testimonials</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-center">
            What others say about working with me
          </p>
        </div>

        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-white rounded-lg shadow-md transition-all duration-300 border border-mocha-100 overflow-hidden">
                <div className="p-6 flex gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-mocha-100"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-charcoal">
                      {testimonial.author}
                    </h3>
                    <p className="text-sm text-muted mb-4">
                      {testimonial.role}
                    </p>
                    <p className="text-muted leading-relaxed">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}