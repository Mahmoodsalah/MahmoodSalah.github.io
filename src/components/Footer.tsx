import React from 'react';
import { SocialLinks } from './SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <SocialLinks className="flex justify-center space-x-8 mb-8" />
          <p className="text-base sm:text-lg text-center text-gray-100 font-light">
            &copy; {new Date().getFullYear()} Mahmood Salah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}