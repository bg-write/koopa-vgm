"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const processedRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

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

  // Set hydration state
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Replace tableau placeholders with actual embeds after hydration
  useEffect(() => {
    if (!isHydrated) return;
    
    const processTableauEmbeds = () => {
      const placeholders = contentRef.current?.querySelectorAll('.tableau-embed');
      if (placeholders) {
        placeholders.forEach((placeholder) => {
          // Skip if already processed
          if (placeholder.querySelector('tableau-viz')) return;
          
          const src = placeholder.getAttribute('data-src');
          const width = placeholder.getAttribute('data-width') || '100%';
          const height = placeholder.getAttribute('data-height') || '600';
          const device = placeholder.getAttribute('data-device') || 'desktop';
          
          if (src) {
            const tableauViz = document.createElement('tableau-viz');
            tableauViz.setAttribute('src', src);
            tableauViz.setAttribute('width', width);
            tableauViz.setAttribute('height', height);
            tableauViz.setAttribute('device', device);
            
            placeholder.innerHTML = '';
            placeholder.appendChild(tableauViz);
          }
        });
      }
    };

    // Initial processing
    const timer = setTimeout(processTableauEmbeds, 100);

    // Set up a more persistent observer for development
    const observer = new MutationObserver((mutations) => {
      let shouldReprocess = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.classList?.contains('tableau-embed') || element.querySelector('.tableau-embed')) {
                shouldReprocess = true;
              }
            }
          });
        }
      });

      if (shouldReprocess) {
        setTimeout(processTableauEmbeds, 50);
      }
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true
      });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isHydrated]);



  // Initial processing
  useEffect(() => {
    if (!isHydrated) return;
    
    // Reset the processed flag when content changes
    processedRef.current = false;
    
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      processContent();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [content, processContent, isHydrated]);

  // Process tableau blocks before markdown processing
  const processedContent = content.replace(
    /:::tableau\n([\s\S]*?)\n:::/g,
    (match, blockContent) => {
      const lines = blockContent.trim().split('\n');
      const props: Record<string, string> = {};
      
      lines.forEach((line: string) => {
        const [key, value] = line.split(': ').map((s: string) => s.trim());
        if (key && value) {
          props[key] = value;
        }
      });
      
      return `<div class="tableau-embed" data-src="${props.src}" data-width="${props.width || '100%'}" data-height="${props.height || '600'}" data-device="${props.device || 'desktop'}">
        <div style="height: ${props.height || '600'}px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; border: 2px dashed #d1d5db; border-radius: 8px;">
          <p style="color: #6b7280; font-size: 14px;">Loading Tableau visualization...</p>
        </div>
      </div>`;
    }
  );

  // Render the markdown content
  const htmlContent = marked(processedContent) as string;
  
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
