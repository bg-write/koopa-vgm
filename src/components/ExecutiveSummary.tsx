"use client";

import React from 'react';

export default function ExecutiveSummary() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-koopa-green">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Executive Summary</h2>
      
      {/* Top row: What is Koopa and Project Scope/Tableau side by side */}
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-koopa-green mb-2">What is Koopa?</h3>
          <p className="text-gray-700 mb-3">
            A data-driven analysis of video game music (VGM) popularity using <strong>Spotify and YouTube streaming data</strong>. Think of it like a Billboard chart for video game music—identifying which tracks are actually being listened to today, not just historically important.
          </p>
          <h3 className="text-lg font-semibold text-koopa-green mb-2">My Takeaway</h3>
          <p className="text-gray-700 italic">
            There are at least seven specific &ldquo;Superstar&rdquo; tracks with 50M+ combined reach that should be on any VGM playlist, which balance historical significance with current popularity.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-koopa-green mb-2">Project Scope</h3>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• <strong>45 tracks</strong> analyzed across 30+ years of gaming history</li>
            <li>• <strong>Three data sources:</strong> Spotify API, YouTube API, RAWG API</li>
            <li>• <strong>Key deliverables:</strong> Interactive chart, Tableau dashboard, comprehensive case study</li>
          </ul>
                      <div className="bg-koopa-green/10 p-3 rounded-lg border border-koopa-green/20 mt-6">
            <p className="text-gray-700 mb-2">
              <strong>📊 Interactive Dashboard:</strong> Explore the full analysis with interactive visualizations
            </p>
            <a 
              href="https://public.tableau.com/views/VideoGameMusicCanonAnalysis/OverallAnalysisDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-koopa-green hover:text-koopa-green-dark font-semibold"
            >
              View Tableau Dashboard →
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom row: Key Insights in two columns */}
      <div>
        <h3 className="text-lg font-semibold text-koopa-green mb-2">Key Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ul className="text-gray-700 space-y-2">
              <li>• <strong>73%</strong> of top tracks are from Nintendo franchises (Mario, Zelda, Donkey Kong)</li>
              <li>• <strong>89%</strong> of tracks have Spotify popularity scores above 50 (out of 100 - indicating strong current listenership)</li>
              <li>• <strong>67%</strong> of games were released before 2010, showing classic VGM&apos;s lasting appeal</li>
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
    </div>
  );
}
