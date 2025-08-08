"use client";

import React from 'react';

export default function ClickableTitle() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mb-8">
      <a 
        href="#"
        onClick={handleClick}
        className="inline-block hover:opacity-80 transition-opacity"
      >
        <h1 
          className="text-4xl md:text-4xl font-bold mb-3 md:mb-6"
          style={{
            background: 'linear-gradient(to right, #228B22, #32CD32)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-header)'
          }}
        >
                               🎮 Koopa: The Most Beloved Video Game Music Ever Made?
        </h1>
      </a>
    </div>
  );
}
