import React from 'react';
import { leadershipData } from '../../data/leadershipData';
import { SectionTitle } from './SectionTitle';

export function LeadershipSection() {
  return (
    <div className="mb-12">
      <SectionTitle>Leadership & Activities</SectionTitle>
      <div className="mt-4">
        {leadershipData.map((item, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <p className="text-gray-600">{item.organization} • {item.period}</p>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}