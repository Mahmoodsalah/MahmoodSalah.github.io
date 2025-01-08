import React from 'react';
import { awardsData } from '../data/awardsData';

export default function Awards() {
  return (
    <section id="awards" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Awards & Achievements
          </h2>
        </div>
        <div className="mt-10">
          <div className="space-y-8">
            {awardsData.map((award, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{award.title}</h3>
                <p className="mt-2 text-gray-600">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}