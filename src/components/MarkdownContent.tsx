"use client";

import React from 'react';
import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Simply render the markdown content
  const htmlContent = marked(content) as string;
  
  return (
    <div className="prose prose-lg max-w-none">
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
