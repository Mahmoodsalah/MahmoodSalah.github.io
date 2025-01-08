import React from 'react';
import { awardsData } from '../../data/awardsData';
import { SectionTitle } from './SectionTitle';

export function AwardsSection() {
  return (
    <div className="mb-12">
      <SectionTitle>Awards & Achievements</SectionTitle>
      <div className="mt-4">
        {awardsData.map((award, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-semibold">{award.title}</h4>
            <p className="mt-2">{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}