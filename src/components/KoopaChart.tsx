"use client";

import React, { useEffect, useState } from 'react';
// Removed xlsx import - no longer needed!

// Track name cleaning function (needed for display)
const cleanTrackName = (trackName: string) => {
  const cleanMap: { [key: string]: string } = {
    'Tenebre Rosso Sangue (ULTRAKILL Original Game Soundtrack)': 'Tenebre Rosso Sangue',
    'UltraChurch (ULTRAKILL) (Original Game Soundtrack)': 'UltraChurch',
    'Ori, Lost In the Storm (feat. Aeralie Brighton)': 'Ori, Lost In the Storm',
    'Prelude (Final Fantasy Series)': 'Prelude',
    'Mad Mew Mew (from UNDERTALE)': 'Mad Mew Mew',
    'Can You Feel The Sunshine? (Sonic R)': 'Can You Feel The Sunshine?',
    'Uncharted, Drake\'s Fortune: Nate\'s Theme': 'Nate\'s Theme',
    'Coconut Mall (From "Mario Kart Wii")': 'Coconut Mall',
    'The Moon (Duck Tales OST)': 'The Moon',
    'Elder Scrolls – Skyrim: Far Horizons': 'Far Horizons',
    'The Elder Scrolls V: Skyrim: Far Horizons': 'Far Horizons',
    'Elder Scrolls ‚Äì Skyrim: Far Horizons': 'Far Horizons',
    'Super Mario Bros. Ground Theme': 'Ground Theme',
    'Super Bell Hill (From "Super Mario 3D World")': 'Super Bell Hill',
    'Lost Woods (From The Legend of Zelda: Ocarina of Time)': 'Lost Woods',
    'Stickerbush Symphony (From "Donkey Kong Country 2")': 'Stickerbush Symphony',
    'Halo 3: One Final Effort': 'One Final Effort',
    'Dire, Dire Docks (From "Super Mario 64") [lofi]': 'Dire, Dire Docks',
    'Double Cherry Pass (From "Super Mario 3D World")': 'Double Cherry Pass',
    'Delfino Plaza (Super Mario Sunshine)': 'Delfino Plaza',
    'File Select (From "Super Mario 64")': 'File Select',
    'Tomodachi Life Menu Theme (From "Tomodachi Life")': 'Tomodachi Life Menu Theme',
    'Hot-Head Bop (From "Donkey Kong Country 2")': 'Hot-Head Bop',
    'Background Music (From "Mario Paint")': 'Background Music',
    'Waluigi Pinball / Wario Stadium (From "Mario Kart DS")': 'Waluigi Pinball / Wario Stadium',
    'Wandering the Plains (From "Super Mario World")': 'Wandering the Plains'
  };
  
  return cleanMap[trackName] || trackName;
};

// Helper function to format YouTube numbers to millions
const formatYouTubeViews = (views: string | number): string => {
  const num = typeof views === 'string' ? parseInt(views) : views;
  if (num >= 1000000) {
    return `${Math.round(num / 1000000)}M`;
  } else if (num >= 1000) {
    return `${Math.round(num / 1000)}K`;
  }
  return num.toString();
};

interface ChartTrack {
  rank: number;
  track: string;
  game: string;
  artist: string;
  spotify: number;
  youtube: string;
  ranking: number;
  spotifyRelease: number;
  genres: string;
  type: string;
  rating: number;
  metacritic: number;
  platforms: string;
  developer: string;
  publisher: string;
  source: string;
  spotifyLink?: string;
  youtubeLink?: string;
  spotifyArtwork?: string;
  gameRelease?: number;
}

export default function KoopaChart() {
  const [chartData, setChartData] = useState<ChartTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJsonData = async () => {
      try {
        const response = await fetch('/data/video_game_music_canon.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json() as ChartTrack[];
        
        // Data is already transformed and cleaned from the JSON conversion script
        // No additional processing needed!
        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading JSON data:', error);
        setLoading(false);
      }
    };

    loadJsonData();
  }, []);

  if (loading) {
    return (
      <div className="bg-koopa-cream shadow-lg rounded-lg p-8 text-center">
        <div className="text-koopa-green font-header text-lg">Loading chart data...</div>
        <div className="text-sm text-gray-600 mt-2">Please wait while we load the data</div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="bg-koopa-cream shadow-lg rounded-lg p-8 text-center">
        <div className="text-red-600 font-header text-lg">No chart data available</div>
        <div className="text-sm text-gray-600 mt-2">Please check the console for errors</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-koopa-cream via-white to-koopa-cream shadow-2xl rounded-2xl overflow-hidden border border-koopa-green/20">
      {/* Data Quality Metrics Header */}
      <div className="bg-gradient-to-r from-koopa-green/10 to-koopa-cream/20 px-6 py-2 border-b border-koopa-green/20">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="flex space-x-6">
            <span>📊 <strong>45 tracks</strong> from 25+ video game IPs</span>
            <span>📈 <strong>r = 0.663</strong> cross-platform correlation</span>
            <span><strong>Streaming Score:</strong> 60% Spotify + 40% YouTube</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto max-h-[70vh] md:max-h-[60vh]">
        <table className="w-full min-w-max">
        <thead className="bg-gradient-to-r from-koopa-green-dark to-koopa-green text-white sticky top-0 z-10">
          <tr>
            <th className="px-2 md:px-6 py-4 text-left font-header font-bold whitespace-nowrap text-koopa-yellow">Rank</th>
            <th className="px-2 md:px-6 py-4 text-left font-header font-bold whitespace-nowrap">Video Game Music (VGM)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-koopa-green/10">
          {chartData.map((track) => (
            <tr key={track.rank} className={`hover:bg-gradient-to-r hover:from-koopa-green/10 hover:to-koopa-cream/20 transition-all duration-300 ${
              track.rank <= 10 ? 'bg-gradient-to-r from-amber-50/40 to-yellow-50/40' :
              track.rank <= 20 ? 'bg-gradient-to-r from-blue-50/30 to-indigo-50/30' :
              track.rank <= 30 ? 'bg-gradient-to-r from-green-50/30 to-emerald-50/30' :
              track.rank <= 40 ? 'bg-gradient-to-r from-purple-50/30 to-pink-50/30' :
              'bg-gradient-to-r from-gray-50/30 to-slate-50/30'
            }`}>
              <td className={`px-2 md:px-6 py-4 font-bold whitespace-nowrap text-center ${
                track.rank === 1 ? 'text-koopa-green' : 'text-gray-500'
              }`}>
                <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white`}
                     style={{
                       backgroundColor: `hsl(${120 - (track.rank - 1) * 2}, 70%, ${40 + (track.rank - 1) * 0.5}%)`
                     }}>
                  {track.rank}
                </div>
              </td>
              <td className="px-2 md:px-6 py-4">
                <div className="flex items-center space-x-3">
                  {/* Track Artwork */}
                  <div className="flex-shrink-0">
                    {track.spotifyArtwork ? (
                      <img 
                        src={track.spotifyArtwork} 
                        alt={`${track.track} artwork`}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-koopa-green/20 to-koopa-cream/40 rounded-lg flex items-center justify-center">
                        <span className="text-koopa-green text-xs md:text-sm">🎵</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                        {cleanTrackName(track.track)}
                      </h3>
                      {track.spotifyLink && (
                        <a 
                          href={track.spotifyLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 transition-colors"
                          title="Listen on Spotify"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </a>
                      )}
                      {track.youtubeLink && (
                        <a 
                          href={track.youtubeLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Watch on YouTube"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    
                    <div className="text-xs md:text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-700">{track.game}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="flex items-center space-x-1">
                          <span className="text-green-600">●</span>
                          <span>Spotify: {track.spotify}/100</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="text-red-600">●</span>
                          <span>YouTube: {formatYouTubeViews(track.youtube)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="text-blue-600">●</span>
                          <span>Score: {track.ranking}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
