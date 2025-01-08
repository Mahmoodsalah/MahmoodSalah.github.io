import React from 'react';
import { ExperienceSection } from './Resume/ExperienceSection';
import { EducationSection } from './Resume/EducationSection';
import { LeadershipSection } from './Resume/LeadershipSection';
import { AwardsSection } from './Resume/AwardsSection';
import { SkillsSection } from './Resume/SkillsSection';

export default function Resume() {
  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
            Resume
          </h2>
        </div>

        <div className="mt-10">
          <div className="prose prose-lg mx-auto">
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