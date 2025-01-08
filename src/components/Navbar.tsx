import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { NavItems } from '../data/navItems';
import { Logo } from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleHomeClick = () => {
    setIsOpen(false);
    if (!isHomePage) {
      navigate('/', { replace: true });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    if (href === 'bootcamps') {
      navigate('/bootcamps');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const renderNavLink = (item: typeof NavItems[0], isMobile: boolean = false) => {
    const baseClasses = `
      cursor-pointer
      font-heading
      text-sm
      font-medium
      transition-all
      duration-200
      ${isMobile 
        ? 'block w-full px-4 py-2 hover:bg-gray-50 text-gray-900 text-left' 
        : `
          text-space
          hover:text-mocha
          after:content-['']
          after:absolute
          after:w-0
          after:h-0.5
          after:bg-mocha
          after:left-0
          after:right-0
          after:bottom-[-4px]
          after:mx-auto
          after:transition-all
          after:duration-200
          hover:after:w-full
          relative
        `
      }
    `;

    if (isHomePage && item.href !== 'bootcamps') {
      return (
        <ScrollLink
          to={item.href}
          spy={true}
          smooth={true}
          offset={-64}
          duration={500}
          className={baseClasses}
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </ScrollLink>
      );
    }

    if (item.href === 'bootcamps') {
      return (
        <button
          onClick={() => handleNavClick('bootcamps')}
          className={baseClasses}
        >
          {item.name}
        </button>
      );
    }

    return (
      <button
        onClick={() => handleNavClick(item.href)}
        className={baseClasses}
      >
        {item.name}
      </button>
    );
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and name section */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-3 group cursor-pointer transition-all duration-200 hover:opacity-80"
            >
              <Logo className="h-8 w-auto transition-transform duration-200 group-hover:scale-105" />
              <span className="text-xl sm:text-2xl font-bold text-mocha font-['Gemunu_Libre'] transition-colors duration-200 group-hover:text-mocha-600">
                Mahmood Salah
              </span>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex space-x-8 lg:space-x-12">
              {NavItems.map((item) => (
                <div key={item.name} className="py-2">
                  {renderNavLink(item)}
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-space hover:text-mocha hover:bg-gray-100 transition-all duration-200"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col py-2">
            {NavItems.map((item) => (
              <div key={item.name} className="w-full">
                {renderNavLink(item, true)}
              </div>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
}