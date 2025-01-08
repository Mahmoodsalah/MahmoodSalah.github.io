import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Bootcamps from './components/Bootcamps';
import Testimonials from './components/Testimonials';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Resume />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bootcamps" element={<Bootcamps />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;