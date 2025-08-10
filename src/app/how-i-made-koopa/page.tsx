import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import MarkdownContent from '../../components/MarkdownContent';
import ExecutiveSummary from '../../components/ExecutiveSummary';
import FloatingToC from '../../components/FloatingToC';

export default function HowIMadeKoopa() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), 'content', 'case-study.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');
  
  // Remove the title section from the markdown content
  const markdownContentWithoutTitle = markdownContent
    .replace(/^# How I Made Koopa\n\n\*Using Spotify and YouTube streaming data to find a new "classic rock" of video game music\.\*\n\n\*\*By Brady Gerber\*\*\n\n---\n\n/, '')
    .replace(/^> \*\*📊 Dataset V1 \(August 2025\)\*\*\n\n## 📋 \*\*Table of Contents\*\*\n\n/, '## 📋 **Table of Contents**\n\n');

  // Define sections for floating ToC - IDs must match markdown headers exactly
  const sections = [
    { id: 'scenario-what-the-heck-is-koopa', title: 'What is "Koopa"?', emoji: '🎯' },
    { id: 'ask-lets-make-a-playlist', title: 'The Business Problem', emoji: '🎵' },
    { id: 'prepare-o-data-where-art-thou', title: 'Data Collection & Methodology', emoji: '📊' },
    { id: 'process-the-actual-work', title: 'Process & Analysis', emoji: '🔄' },
    { id: 'analyze-what-did-i-find', title: 'Key Findings & Insights', emoji: '📈' },
    { id: 'share-the-final-chart', title: 'Final Results', emoji: '📊' },
    { id: 'act-whats-next', title: 'Next Steps & Recommendations', emoji: '🎯' },
    { id: 'lessons-learned', title: 'Lessons Learned', emoji: '📚' }
  ];


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
              <p className="text-gray-700 mb-4 italic">Using Spotify and YouTube streaming data to determine the most popular video game music.</p>
              <p className="text-gray-700"><strong>By Brady Gerber</strong></p>
            </div>
            
            {/* Executive Summary styled component */}
            <ExecutiveSummary />
            
            {/* Render the rest of the markdown content (starting after the title section) */}
            <MarkdownContent content={markdownContentWithoutTitle} />
            
            {/* Tech Stack Footer */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Built with Next.js, Tailwind CSS, and Cursor. Data pulled from Spotify, YouTube, and RAWG APIs using Python. All images respectfully taken from Wikipedia. This app was made by Brady Gerber (me). Thank you, Sam and Emily, for the initial feedback. Video game music rules. Check out Koopa&apos;s <a href="https://github.com/bg-write/koopa-vgm" target="_blank" rel="noopener noreferrer" className="text-koopa-green hover:text-koopa-green-dark underline">GitHub</a>.
              </p>
              <div className="flex justify-center space-x-2 text-sm">
                <Link href="/" className="text-koopa-green hover:text-koopa-green-dark underline">Home</Link>
                <span className="text-gray-400">|</span>
                <Link href="/how-i-made-koopa" className="text-koopa-green hover:text-koopa-green-dark underline">How I Made Koopa</Link>
              </div>
                      </div>
        </section>
      </main>
      
      {/* Floating Table of Contents - Completely outside main element */}
      <FloatingToC sections={sections} />
    </>
  );
}
