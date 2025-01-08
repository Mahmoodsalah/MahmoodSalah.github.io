import React from 'react';
import { projectsData } from '../data/projectsData';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4 text-center">Projects</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-center">
            A selection of my recent work in AI and business transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300"
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium text-charcoal">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-mocha-50 text-mocha-800 hover:bg-mocha-100 transition-colors duration-200 border border-mocha-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}