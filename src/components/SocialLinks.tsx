import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className={className}>
      <motion.a 
        href="https://www.linkedin.com/in/mahmoodsalah/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-mocha hover:text-mocha-600 transition-colors duration-200"
        whileHover="hover"
        variants={iconVariants}
      >
        <FaLinkedin className="h-6 w-6" />
      </motion.a>
      <motion.a 
        href="https://www.youtube.com/@MahmoodSalah" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-mocha hover:text-mocha-600 transition-colors duration-200"
        whileHover="hover"
        variants={iconVariants}
      >
        <FaYoutube className="h-6 w-6" />
      </motion.a>
      <motion.a 
        href="https://x.com/mahmoodsalah" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-mocha hover:text-mocha-600 transition-colors duration-200"
        whileHover="hover"
        variants={iconVariants}
      >
        <RiTwitterXFill className="h-6 w-6" />
      </motion.a>
      <motion.a 
        href="https://www.facebook.com/MahmoodSalah.official" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-mocha hover:text-mocha-600 transition-colors duration-200"
        whileHover="hover"
        variants={iconVariants}
      >
        <FaFacebook className="h-6 w-6" />
      </motion.a>
    </div>
  );
}