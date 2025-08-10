"use client";

import React, { useState, useEffect } from 'react';

interface FloatingToCProps {
  sections: Array<{
    id: string;
    title: string;
    emoji: string;
  }>;
}

export default function FloatingToC({ sections }: FloatingToCProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);



  // Show floating ToC after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeVisible = scrollY > 300;
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsExpanded(false); // Collapse after navigation
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]"
    >
      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-300 hover:scale-110 pointer-events-auto"
        aria-label={isExpanded ? "Collapse table of contents" : "Expand table of contents"}
      >
        {isExpanded ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Expanded ToC */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 md:p-4 w-72 md:w-80 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">📋</span>
            Quick Navigation
          </h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <span className="text-lg">{section.emoji}</span>
                <span className="text-sm text-gray-700">{section.title}</span>
              </button>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={() => scrollToSection('table-of-contents')}
              className="w-full text-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200 text-sm"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
