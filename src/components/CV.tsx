import React from 'react';
import { experienceData, educationData, skills } from '../data/cvData';

export default function CV() {
  return (
    <section id="cv" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Curriculum Vitae
          </h2>
        </div>

        <div className="mt-10">
          <div className="prose prose-indigo prose-lg mx-auto">
            {/* Experience */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold">Experience</h3>
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

            {/* Education */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold">Education</h3>
              <div className="mt-4">
                {educationData.map((edu, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.school} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold">Skills</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}