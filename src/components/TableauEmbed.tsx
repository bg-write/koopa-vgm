"use client";

import React, { useEffect, useState } from 'react';

interface TableauEmbedProps {
  src: string;
  width?: string | number;
  height?: string | number;
  device?: string;
}

export default function TableauEmbed({ src, width = "100%", height = "600", device = "desktop" }: TableauEmbedProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div 
        style={{ 
          height: typeof height === 'number' ? `${height}px` : height, 
          background: '#f3f4f6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          border: '2px dashed #d1d5db', 
          borderRadius: '8px',
          width: typeof width === 'number' ? `${width}px` : width
        }}
      >
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading Tableau visualization...</p>
      </div>
    );
  }

  // Use React.createElement to avoid TypeScript issues with custom elements
  return React.createElement('tableau-viz', {
    src,
    width,
    height,
    device
  });
}
