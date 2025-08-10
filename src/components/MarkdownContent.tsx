"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { marked } from 'marked';

// Configure marked to handle GitHub-style IDs
marked.use({
  gfm: true,
  breaks: true
});

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

    // First, manually set IDs for our specific sections
    const sectionMappings = [
      { text: 'Table of Contents', id: 'table-of-contents' },
      { text: 'Scenario: What is "Koopa"?', id: 'scenario-what-the-heck-is-koopa' },
      { text: 'Ask: Let\'s Make a Playlist', id: 'ask-lets-make-a-playlist' },
      { text: 'Prepare: O Data, Where Art Thou?', id: 'prepare-o-data-where-art-thou' },
      { text: 'Process: Gone Fishin\'', id: 'process-the-actual-work' },
      { text: 'Analyze: A Whole Lotta Mario', id: 'analyze-what-did-i-find' },
      { text: 'Share: Paint a Picture (or a Graph)', id: 'share-the-final-chart' },
      { text: 'Act: Koopa Keeps Growing', id: 'act-whats-next' },
      { text: 'Lessons Learned', id: 'lessons-learned' }
    ];

    // Set IDs for our specific sections
    sectionMappings.forEach(({ text, id }) => {
      const headings = node.querySelectorAll('h2');
      headings.forEach((heading) => {
        if (heading.textContent?.includes(text)) {
          heading.id = id;
        }
      });
    });

    // Then process remaining headings with auto-generated IDs
    const headings = node.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (!heading.id) {
        const text = heading.textContent || '';
        const id = text.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .replace(/^-+|-+$/g, '');
        heading.id = id;
      }
    });

    // Remove {#id} syntax from displayed content
    headings.forEach((heading) => {
      if (heading.innerHTML.includes('{#')) {
        // Remove the {#id} syntax from the displayed text
        heading.innerHTML = heading.innerHTML.replace(/\s*\{#[^}]+\}/g, '');
      }
    });

    // Process Table of Contents links to ensure they work
    const tocLinks = node.querySelectorAll('a[href^="#"]');
    tocLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Add click handler for smooth scrolling
          link.addEventListener('click', (e) => {
            e.preventDefault();
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          });
        }
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
          // Show loading state
          const loadingDiv = placeholder.querySelector('div');
          if (loadingDiv) {
            loadingDiv.innerHTML = `
              <div style="text-align: center;">
                <div style="width: 40px; height: 40px; border: 4px solid #e5e7eb; border-top: 4px solid #10b981; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Loading interactive chart...</p>
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">This may take a few seconds</p>
              </div>
            `;
          }
          
          const tableauViz = document.createElement('tableau-viz');
          tableauViz.setAttribute('src', src);
          tableauViz.setAttribute('width', width);
          tableauViz.setAttribute('height', height);
          tableauViz.setAttribute('device', device);
          
          // Add accessibility attributes
          tableauViz.setAttribute('role', 'img');
          tableauViz.setAttribute('aria-label', 'Interactive data visualization');
          
          // Add mobile responsiveness
          if (window.innerWidth < 768) {
            tableauViz.setAttribute('device', 'phone');
            tableauViz.style.width = '100%';
                            // Ensure mobile has enough height to see full chart content
                const mobileHeight = Math.min(parseInt(height), 550);
                tableauViz.style.height = `${mobileHeight}px`;
          }
          
          // Add error handling
          tableauViz.addEventListener('error', () => {
            placeholder.innerHTML = `
              <div style="height: ${height}px; background: #fef2f2; display: flex; align-items: center; justify-content: center; border: 2px dashed #fca5a5; border-radius: 8px; min-height: 400px;" role="alert" aria-label="Chart loading error">
                <div style="text-align: center;">
                  <p style="color: #dc2626; font-size: 14px; margin: 0 0 8px 0;">Chart failed to load</p>
                  <p style="color: #f87171; font-size: 12px; margin: 0;">Please refresh the page or try again later</p>
                </div>
              </div>
            `;
          });
          
          // Replace loading state with chart
          setTimeout(() => {
            placeholder.innerHTML = '';
            placeholder.appendChild(tableauViz);
          }, 500); // Small delay to show loading state
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

  // Process tableau blocks and {#id} syntax before markdown processing
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
      
      return `<div class="tableau-embed" style="margin-bottom: 4rem !important;" data-src="${props.src}" data-width="${props.width || '100%'}" data-height="${props.height || '600'}" data-device="${props.device || 'desktop'}">
        <div style="height: ${props.height || '600'}px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; border: 2px dashed #d1d5db; border-radius: 8px; min-height: 400px; padding-bottom: 8px;" role="status" aria-label="Loading Tableau visualization">
          <div style="text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Loading Tableau visualization...</p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Please wait while the interactive chart loads</p>
          </div>
        </div>
      </div>`;
    }
  );



  // Render the markdown content
  const htmlContent = marked(processedContent) as string;
  
  return (
    <div className="prose prose-lg max-w-none">
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .tableau-embed {
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }
        .tableau-embed:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
          .tableau-embed {
            margin: 0 -1rem 1.5rem -1rem;
            border-radius: 0;
          }
          /* Ensure proper spacing between chart sections on mobile */
          .markdown-content h2 {
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          .markdown-content img {
            margin: 1rem 0;
          }
        }
      `}</style>
      <div 
        ref={contentRef}
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
