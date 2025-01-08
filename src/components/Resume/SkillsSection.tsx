import React from 'react';
import { skills } from '../../data/cvData';
import { SectionTitle } from './SectionTitle';

export function SkillsSection() {
  return (
    <div>
      <SectionTitle>Skills</SectionTitle>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            bg-mocha-50 text-mocha-800 hover:bg-mocha-100 transition-colors duration-200 
            border border-mocha-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}