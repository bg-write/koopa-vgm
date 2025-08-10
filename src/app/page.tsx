

"use client";

import KoopaChart from '../components/KoopaChart';
import Footer from '../components/Footer';

export default function Home() {

  return (
    <main className="min-h-screen bg-koopa-cream">
      {/* Hero Section */}
              <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-4 md:mb-8">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <h1 
                className="text-4xl md:text-4xl font-bold mb-3 md:mb-6"
                style={{
                  background: 'linear-gradient(to right, #228B22, #32CD32)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-header)'
                }}
              >
                🎮 Koopa: The Most Beloved Video Game Music Ever?
              </h1>
            </a>
          </div>
          
          {/* Top Koopa and Description */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2 md:gap-6">
            {/* Koopa image - shown first on mobile */}
            <div className="order-1 md:order-2 pt-1 pb-4 md:pt-0 md:pb-0">
              <img 
                src="/Koopa_Troopa_by_Shigehisa_Nakaue.png" 
                alt="Koopa Troopa" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain animate-bounce transform scale-x-[-1]"
                style={{
                  animation: 'walking 2s ease-in-out infinite'
                }}
              />
            </div>
            
            <div className="text-left order-2 md:order-1">
              {/* What is Koopa? - Simple explanation */}
              <div className="bg-white rounded-lg shadow-lg p-4 mb-4 border-l-4 border-koopa-green max-w-2xl">
                <h3 className="text-lg font-semibold text-koopa-green mb-2">What is Koopa?</h3>
                <p className="text-gray-700 mb-0">
                  A data-driven analysis of video game music (VGM) popularity using <strong>Spotify and YouTube streaming data</strong>. It&apos;s like a Billboard chart for VGM—identifying which tracks are actually being listened to today, not just historically important.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center md:justify-start">
              <strong><a 
                  href="/how-i-made-koopa"
                  className="text-koopa-green hover:text-koopa-green-dark underline decoration-koopa-green/60 hover:decoration-koopa-green transition-all duration-200"
                >
                  Read the full case study.
                </a></strong>
              </div>
            </div>
          </div>
          
          {/* Chart Display - Simplified to just show the table */}
          <div className="mb-6">
            <KoopaChart />
          </div>
          

          
          {/* Footer */}
          <Footer />
        </section>
    </main>
  )
}
