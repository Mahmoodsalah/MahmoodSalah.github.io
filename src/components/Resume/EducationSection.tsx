import React from 'react';
import { educationData } from '../../data/cvData';
import { SectionTitle } from './SectionTitle';

export function EducationSection() {
  return (
    <div className="mb-12">
      <SectionTitle>Education</SectionTitle>
      <div className="mt-4">
        {educationData.map((edu, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-semibold">{edu.degree}</h4>
            <p className="text-gray-600">{edu.school} • {edu.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}