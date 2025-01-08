import React from 'react';
import { experienceData } from '../../data/cvData';
import { SectionTitle } from './SectionTitle';

export function ExperienceSection() {
  return (
    <div className="mb-12">
      <SectionTitle>Experience</SectionTitle>
      <div className="mt-4">
        {experienceData.map((exp, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-semibold">{exp.title}</h4>
            <p className="text-gray-600">{exp.company} • {exp.period}</p>
            <ul className="mt-2">
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}