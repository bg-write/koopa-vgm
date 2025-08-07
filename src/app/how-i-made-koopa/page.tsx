import fs from 'fs';
import path from 'path';
import MarkdownContent from '../../components/MarkdownContent';
import ScrollSection from '../../components/ScrollSection';

export default function HowIMadeKoopa() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), 'content', 'case-study.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');
  
  // Add a timestamp to help with refresh detection
  const lastModified = new Date().toLocaleTimeString();

  return (
    <main className="min-h-screen bg-koopa-cream">
      <ScrollSection>
        <section className="max-w-4xl mx-auto px-6 py-12">
          {/* Animated Koopa at the top */}
          <div className="flex justify-center mb-8">
            <img 
              src="/Koopa_Troopa_by_Shigehisa_Nakaue.png" 
              alt="Koopa Troopa" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain animate-bounce transform scale-x-[-1]"
              style={{
                animation: 'walking 2s ease-in-out infinite'
              }}
            />
          </div>
          
          <MarkdownContent content={markdownContent} />
          
          {/* Development indicator */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
            <p>Last updated: {lastModified}</p>
            <p>If you don't see your changes, try a hard refresh (Cmd+Shift+R)</p>
          </div>
          
          {/* Tech Stack Footer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Built with Next.js 14, TypeScript, Tailwind CSS, and Cursor AI. Data pulled from Spotify, YouTube, and RAWG APIs using Python. All images respectfully taken from Wikipedia. <a href="https://github.com/bg-write" target="_blank" rel="noopener noreferrer" className="text-koopa-green hover:text-koopa-green-dark underline">Check out Koopa's GitHub.</a>
            </p>
            <div className="flex justify-center space-x-2 text-sm">
              <a href="/" className="text-koopa-green hover:text-koopa-green-dark underline">Home</a>
              <span className="text-gray-400">|</span>
              <a href="/how-i-made-koopa" className="text-koopa-green hover:text-koopa-green-dark underline">How I Made Koopa</a>
            </div>
          </div>
        </section>
      </ScrollSection>
    </main>
  );
}
