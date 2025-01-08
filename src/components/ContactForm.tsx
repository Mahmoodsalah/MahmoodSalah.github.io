import React, { useState } from 'react';
import { FaEnvelope, FaCopy, FaCheck } from 'react-icons/fa';

export function ContactForm() {
  const [copied, setCopied] = useState(false);
  const email = 'mahmoodsalah89@gmail.com';

  const handleEmailClick = () => {
    const subject = 'Inquiry from Portfolio Website';
    const body = `Hi Mahmood,\n\nI'd like to get in touch regarding...`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleEmailClick}
        className="px-8 py-4 rounded-md bg-mocha text-white font-medium 
          hover:bg-mocha-600 transition-all duration-200 flex items-center justify-center gap-3"
      >
        <FaEnvelope className="w-5 h-5" />
        Send me an email
      </button>

      <button
        onClick={handleCopyEmail}
        className="px-8 py-4 rounded-md border-2 border-mocha text-mocha font-medium 
          hover:bg-mocha-50 transition-all duration-200 flex items-center justify-center gap-3"
      >
        {copied ? <FaCheck className="w-5 h-5" /> : <FaCopy className="w-5 h-5" />}
        {copied ? 'Copied!' : 'Copy email'}
      </button>
    </div>
  );
}