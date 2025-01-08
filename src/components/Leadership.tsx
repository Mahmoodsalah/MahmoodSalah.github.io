import React from 'react';
import { leadershipData } from '../data/leadershipData';

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Leadership & Activities
          </h2>
        </div>
        <div className="mt-10">
          <div className="space-y-8">
            {leadershipData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.organization} • {item.period}</p>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}