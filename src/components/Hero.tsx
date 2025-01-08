import React from 'react';
import { motion } from 'framer-motion';
import { SocialLinks } from './SocialLinks';
import { useParticleAnimation } from './animations/useParticleAnimation';

export default function Hero() {
  const canvasRef = useParticleAnimation({
    particleCount: 60,
    connectionDistance: 250,
    particleSpeed: 0.3,
    particleSize: 4,
    color: '177, 143, 106', // Mocha color
    pulseSpeed: 0.02,
    lineWidth: 2
  });

  return (
    <div id="hero" className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-mocha-50" />
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: 'transparent' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-[calc(100vh-4rem)] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Mobile: Left-aligned, Desktop: Center-aligned */}
            <div className="backdrop-blur-sm p-6 sm:p-8 rounded-lg bg-white/5">
              <h1 className="text-left md:text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-charcoal font-display mb-4">
                Senior Data Scientist, AI Engineer, and Consultant
              </h1>
              
              <p className="text-left md:text-center text-base sm:text-lg md:text-xl text-muted mx-auto max-w-3xl mb-8">
                I specialize in leveraging advanced data science techniques and AI engineering 
                to drive innovative solutions for complex business challenges. As a consultant 
                and mentor, I help organizations transform through the strategic adoption of 
                AI technologies.
              </p>

              {/* Social links - centered on all devices */}
              <div className="flex justify-center">
                <SocialLinks className="flex space-x-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}