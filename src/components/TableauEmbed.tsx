"use client";

import { useEffect, useState } from 'react';

interface TableauEmbedProps {
  src: string;
  width?: string;
  height?: string;
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
          height: height + 'px', 
          background: '#f3f4f6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          border: '2px dashed #d1d5db', 
          borderRadius: '8px',
          width: width
        }}
      >
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading Tableau visualization...</p>
      </div>
    );
  }

  return (
    <tableau-viz 
      src={src}
      width={width}
      height={height}
      device={device}
    />
  );
}
