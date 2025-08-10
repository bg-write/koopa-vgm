import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import MarkdownContent from '../../components/MarkdownContent';
import ExecutiveSummary from '../../components/ExecutiveSummary';
import FloatingToC from '../../components/FloatingToC';
import Footer from '../../components/Footer';

// Function to extract sections from markdown content
function extractSectionsFromMarkdown(markdownContent: string) {
  const lines = markdownContent.split('\n');
  const sections: Array<{ id: string; title: string; emoji: string }> = [];
  
  // Define the main sections with their exact IDs and emojis
  const mainSections = [
    { id: 'scenario-what-the-heck-is-koopa', title: 'Scenario: What is "Koopa"?', emoji: '🐢' },
    { id: 'ask-lets-make-a-playlist', title: 'Ask: Let\'s Make a Playlist', emoji: '🎵' },
    { id: 'prepare-o-data-where-art-thou', title: 'Prepare: O Data, Where Art Thou?', emoji: '📊' },
    { id: 'process-the-actual-work', title: 'Process: Gone Fishin\'', emoji: '🔄' },
    { id: 'analyze-what-did-i-find', title: 'Analyze: A Whole Lotta Mario', emoji: '📈' },
    { id: 'share-the-final-chart', title: 'Share: Paint a Picture (or a Graph)', emoji: '📊' },
    { id: 'act-whats-next', title: 'Act: Koopa Keeps Growing', emoji: '🎯' },
    { id: 'lessons-learned', title: 'Lessons Learned', emoji: '📚' }
  ];

  // Find these main sections in the markdown content
  mainSections.forEach(section => {
    // Look for the section in the markdown
    const sectionFound = lines.some(line => {
      return line.includes(`{#${section.id}}`);
    });
    
    if (sectionFound) {
      sections.push(section);
    }
  });
  return sections;
}

export default function HowIMadeKoopa() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), 'content', 'case-study.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');
  
  // Remove the title section from the markdown content
  const markdownContentWithoutTitle = markdownContent
    .replace(/^# How I Made Koopa\n\n\*Using Spotify and YouTube streaming data to find a new "classic rock" of video game music\.\*\n\n\*\*By Brady Gerber\*\*\n\n---\n\n/, '')
    .replace(/^> \*\*📊 Dataset V1 \(August 2025\)\*\*\n\n## 📋 \*\*Table of Contents\*\*\n\n/, '## 📋 **Table of Contents**\n\n');

  // Extract sections dynamically from markdown content
  const sections = extractSectionsFromMarkdown(markdownContentWithoutTitle);


  return (
    <>
      <main className="min-h-screen bg-koopa-cream">
        <section className="max-w-4xl mx-auto px-6 py-12">
            {/* Animated Koopa at the top */}
            <div className="flex justify-center mb-4 md:mb-8">
              <img 
                src="/Koopa_Troopa_by_Shigehisa_Nakaue.png" 
                alt="Koopa Troopa" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain animate-bounce transform scale-x-[-1]"
                style={{
                  animation: 'walking 2s ease-in-out infinite'
                }}
              />
            </div>
            
            {/* Render title and subheadline first */}
            <div className="prose prose-lg max-w-none mb-8">
              <h1 
                className="text-4xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(to right, #228B22, #32CD32)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-header)'
                }}
              >
                How I Made Koopa
              </h1>
              <p className="text-gray-700 mb-4 italic">Using Spotify and YouTube streaming data to determine the most popular and beloved video game music.</p>
              <p className="text-gray-700"><strong>By Brady Gerber</strong></p>
            </div>
            
            {/* Executive Summary styled component */}
            <ExecutiveSummary />
            
            {/* Render the rest of the markdown content (starting after the title section) */}
            <MarkdownContent content={markdownContentWithoutTitle} />
            
            {/* Footer */}
            <Footer />
        </section>
      </main>
      
      {/* Floating Table of Contents - Completely outside main element */}
      <FloatingToC sections={sections} />
    </>
  );
}
