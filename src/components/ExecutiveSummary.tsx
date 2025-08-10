"use client";

import React from 'react';

export default function ExecutiveSummary() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-koopa-green">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Summary</h2>
      
      {/* Top row: What is Koopa and Project Scope/Tableau side by side */}
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-koopa-green mb-2">What is Koopa?</h3>
          <p className="text-gray-700 mb-3">
            Koopa is a data-driven analysis of video game music (VGM) popularity using <strong>Spotify and YouTube streaming data</strong>. Think of it like a Billboard chart for video game music—identifying which tracks are actually being listened to today, not just historically important.
          </p>

        </div>
        <div>
          <h3 className="text-lg font-semibold text-koopa-green mb-2">Project Scope</h3>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• <strong>45 tracks</strong> analyzed across 30+ years of gaming history</li>
            <li>• <strong>Three data sources:</strong> Spotify API, YouTube API, RAWG API</li>
            <li>• <strong>Key deliverables:</strong> Interactive chart, Tableau dashboard, comprehensive case study</li>
          </ul>

        </div>
      </div>

      {/* Bottom row: Key Insights in two columns */}
      <div>
        <h3 className="text-lg font-semibold text-koopa-green mb-2">Key Insights</h3>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-6">
          <div>
            <ul className="text-gray-700 space-y-2">
              <li>• <strong>42%</strong> of tracks are from Nintendo franchises (Mario, Zelda, Donkey Kong)</li>
              <li>• <strong>24%</strong> of tracks have Spotify popularity scores above 50 (out of 100 - indicating strong current listenership)</li>
              <li>• <strong>Only 9%</strong> of tracks have Spotify releases credited before 2010, but <strong>56%</strong> of games were originally released before 2010, showing classic VGM&apos;s lasting appeal through streaming platforms</li>
              <li>• <strong>38% covers</strong> performed well but <strong>33% originals</strong> showed slightly better engagement</li>
            </ul>
          </div>
          <div>
            <ul className="text-gray-700 space-y-2">
              <li>• <strong>YouTube reach:</strong> Top 5 tracks average 32M+ views, showing massive cross-platform appeal</li>
              <li>• <strong>Discovery opportunities:</strong> Modern indie games (ULTRAKILL, Undertale) show strong organic growth</li>
              <li>• <strong>Cyberpunk 2077</strong> and <strong>ULTRAKILL</strong> emerged as unexpected modern hits</li>
              <li>• <strong>Strong positive correlation</strong> (r = 0.663) between Spotify popularity and YouTube views</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Business Implications Section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-koopa-green/5 to-blue-50 rounded-lg border border-koopa-green/20">
        <h3 className="text-lg font-semibold text-koopa-green mb-3">💼 Business Impact & Revenue Potential</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">🎯 Strategic Advantages</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• <strong>42% Nintendo dominance</strong> shows proven audience demand</li>
              <li>• <strong>56% pre-2010 games vs 9% official Spotify releases</strong> shows market gaps</li>
              <li>• <strong>First-mover advantage</strong> in retro VGM licensing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">💰 Revenue Opportunities</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• <strong>42% Nintendo dominance</strong> = premium licensing leverage</li>
              <li>• <strong>14 superstar tracks</strong> with Streaming Ranking ≥64</li>
              <li>• <strong>20-30 year gaps</strong> show long-term licensing value</li>
              <li>• <strong>r=0.663 correlation</strong> validates cross-platform strategy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tableau Dashboard - Full Width */}
      <div className="bg-koopa-green/10 p-4 rounded-lg border border-koopa-green/20 mb-6">
        <p className="text-gray-700 mb-3 text-center">
          <strong>📊 Interactive Dashboard:</strong> Explore the full analysis with interactive visualizations
        </p>
        <div className="text-center">
          <a 
            href="https://public.tableau.com/views/KoopaVideoGameMusicStreamingData/KoopaDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-koopa-green hover:text-koopa-green-dark font-semibold text-lg px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            View Tableau Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}
