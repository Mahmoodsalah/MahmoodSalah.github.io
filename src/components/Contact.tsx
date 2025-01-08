import React from 'react';
import { ContactForm } from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4 text-center">Contact Me</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-center">
            Have a question or want to work together? Feel free to send me an email!
          </p>
        </div>

        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}