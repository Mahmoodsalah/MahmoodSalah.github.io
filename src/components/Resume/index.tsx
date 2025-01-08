import React from 'react';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { LeadershipSection } from './LeadershipSection';
import { AwardsSection } from './AwardsSection';
import { SkillsSection } from './SkillsSection';

export default function Resume() {
  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Resume
          </h2>
        </div>

        <div className="mt-10">
          <div className="prose prose-indigo prose-lg mx-auto">
            <ExperienceSection />
            <EducationSection />
            <LeadershipSection />
            <AwardsSection />
            <SkillsSection />
          </div>
        </div>
      </div>
    </section>
  );
}