"use client";

import React from 'react';
import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Simply render the markdown content without any span injection
  const htmlContent = marked(content);
  
  return (
    <div className="prose prose-lg max-w-none">
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
