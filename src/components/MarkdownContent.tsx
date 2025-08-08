"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const processedRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);

  // Process headings and add back-to-top links
  const processContent = useCallback(() => {
    const node = contentRef.current;
    if (!node) return;

    // First, process all headings and remove {#id} syntax
    const headings = node.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading) => {
      const text = heading.textContent || '';
      const idMatch = text.match(/\{#([^}]+)\}$/);

      if (idMatch) {
        const id = idMatch[1];
        heading.id = id;
        
        // Remove the {#id} syntax from the displayed text
        const originalHTML = heading.innerHTML;
        const cleanHTML = originalHTML.replace(/\{#[^}]+\}$/, '');
        heading.innerHTML = cleanHTML;
      } else {
        // Auto-generate ID from heading text
        const id = text.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
        heading.id = id;
      }
    });

    // Then, add "Back to top" links after each h2 section
    const h2Sections = node.querySelectorAll('h2');
    
    h2Sections.forEach((h2) => {
      // Skip the Table of Contents section
      if (h2.textContent?.includes('Table of Contents')) {
        return;
      }

      // Check if back-to-top link already exists in this specific section
      // Look for a back-to-top link that comes after this h2 but before the next h2
      let nextElement = h2.nextElementSibling;
      let sectionEnd = null;
      let existingLink = null;

      while (nextElement) {
        if (nextElement.tagName === 'H2') {
          break;
        }
        if (nextElement.tagName === 'H1') {
          break;
        }
        if (nextElement.classList?.contains('back-to-top')) {
          existingLink = nextElement;
          break;
        }
        sectionEnd = nextElement;
        nextElement = nextElement.nextElementSibling;
      }

      if (existingLink) {
        return;
      }

      // Create back to top link
      const backToTopLink = document.createElement('div');
      backToTopLink.className = 'text-center mt-8 mb-4 back-to-top';
      backToTopLink.innerHTML = `
        <a href="#table-of-contents" class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <span class="mr-1">↑</span>
          <span>Back to top</span>
        </a>
      `;

      // Insert the link before the next h2 or at the end
      if (sectionEnd) {
        sectionEnd.parentNode?.insertBefore(backToTopLink, sectionEnd.nextSibling);
      } else {
        h2.parentNode?.insertBefore(backToTopLink, h2.nextSibling);
      }
    });

    processedRef.current = true;
  }, []);

  // Set up MutationObserver to watch for DOM changes
  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    // Disconnect existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      let shouldReprocess = false;
      
      mutations.forEach((mutation) => {
        // Skip mutations caused by our own back-to-top links
        if (mutation.target && (mutation.target as Element).classList?.contains('back-to-top')) {
          return;
        }
        
        // Check if headings were added or modified
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.matches('h1, h2, h3, h4, h5, h6') || element.querySelector('h1, h2, h3, h4, h5, h6')) {
                shouldReprocess = true;
              }
            }
          });
        }
        
        // Check if text content was modified (like {#id} syntax reappearing)
        if (mutation.type === 'characterData' || mutation.type === 'attributes') {
          const target = mutation.target as Node;
          if (target.textContent?.includes('{#')) {
            shouldReprocess = true;
          }
        }
      });

      if (shouldReprocess) {
        processedRef.current = false;
        setTimeout(() => processContent(), 50);
      }
    });

    // Start observing
    observer.observe(node, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['innerHTML', 'textContent']
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [processContent]);

  // Initial processing
  useEffect(() => {
    // Reset the processed flag when content changes
    processedRef.current = false;
    
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      processContent();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [content, processContent]);

  // Render the markdown content
  const htmlContent = marked(content) as string;
  
  return (
    <div className="prose prose-lg max-w-none">
      <div 
        ref={contentRef}
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
