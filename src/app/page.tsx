import Image from "next/image";

import ScrollSection from '../components/ScrollSection';
import ClickableTitle from '../components/ClickableTitle';
import KoopaChart from '../components/KoopaChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-koopa-cream">
      {/* Hero Section */}
      <ScrollSection>
        <section className="max-w-4xl mx-auto px-6 py-12">
          <ClickableTitle />
          
          {/* Top Koopa and Description */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-2 md:gap-6">
            <div className="text-center md:text-left">
              <p className="text-lg text-gray-700 mb-4 italic font-bold">
                Using Spotify and YouTube data to find the "classic rock" of video game music.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center md:justify-start">
                <a 
                  href="/how-i-made-koopa"
                  className="text-koopa-green hover:text-koopa-green-dark underline decoration-koopa-green/60 hover:decoration-koopa-green transition-all duration-200"
                >
                  Read the full case study.
                </a>
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <img 
                src="/Koopa_Troopa_by_Shigehisa_Nakaue.png" 
                alt="Koopa Troopa" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain animate-bounce transform scale-x-[-1]"
                style={{
                  animation: 'walking 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
          


          {/* Chart Table */}
          <KoopaChart />
          

          
          {/* Tech Stack Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Built with Next.js 14, TypeScript, Tailwind CSS, and Cursor AI. Data pulled from Spotify, YouTube, and RAWG APIs using Python. All images respectfully taken from Wikipedia. <a href="https://github.com/bg-write" target="_blank" rel="noopener noreferrer" className="text-koopa-green hover:text-koopa-green-dark underline">Check out Koopa's GitHub.</a>
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="/" className="text-koopa-green hover:text-koopa-green-dark underline">Home</a>
              <span className="text-gray-400">|</span>
              <a href="/how-i-made-koopa" className="text-koopa-green hover:text-koopa-green-dark underline">How I Made Koopa</a>
            </div>
          </div>
        </section>
      </ScrollSection>
    </main>
  )
}
