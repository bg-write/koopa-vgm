"use client";

import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

/**
 * Helper function to clean track names for display
 * 
 * Business Rule: Remove redundant information like "(Original Game Soundtrack)", 
 * "(From 'Game Name')", and other metadata that clutters the display while
 * preserving the essential track name for user recognition.
 * 
 * This mapping was created after manual verification of each track to ensure
 * the cleaned names are still recognizable and meaningful to users.
 */
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

interface ChartTrack {
  rank: number;
  track: string;
  game: string;
  artist: string;
  spotify: number;
  youtube: string;
  ranking: number;
  release: string;
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
}

export default function KoopaChart() {
  const [chartData, setChartData] = useState<ChartTrack[]>([]);
  const [loading, setLoading] = useState(true);

  // Simple manual artwork mapping
  const getTrackArtwork = (trackName: string): string | null => {
    const artworkMap: { [key: string]: string } = {
      // Add your manual artwork mappings here
      // Format: 'Track Name': '/images/filename.jpg'
      'I Really Want to Stay at Your House': '/images/i-really-want-to-stay-at-your-house.jpg',
      'Sweden': '/images/sweden.png',
      'The Last of Us': '/images/the-last-of-us.jpg',
      'Halo': '/images/halo.jpg',
      'Super Mario Bros. Ground Theme': '/images/ground-theme.png',
      'At Doom\'s Gate': '/images/at-doom-s-gate.jpg',
      'Tenebre Rosso Sangue (ULTRAKILL Original Game Soundtrack)': '/images/tenebre-rosso-sangue.png',
      'Altars of Apostasy': '/images/tenebre-rosso-sangue.png',
      'UltraChurch (ULTRAKILL) (Original Game Soundtrack)': '/images/tenebre-rosso-sangue.png',
      'Tetris Theme': '/images/tetris-theme.png',
      'One-Winged Angel': '/images/one-winged-angel.jpg',
      'God of War': '/images/god-of-war.jpg',
      'Main Theme': '/images/breath-of-the-wild.jpg',
      'Lonely Rolling Star': '/images/katamari-damacy.jpg',
      'Donkey Kong Country Theme': '/images/donkey-kong-country.png',
      'Ryu\'s Theme': '/images/street-fighter-ii.jpg',
      'Ori, Lost In the Storm (feat. Aeralie Brighton)': '/images/ori-blind-forest.jpg',
      'Prelude (Final Fantasy Series)': '/images/final-fantasy.jpg',
      'Mad Mew Mew (from UNDERTALE)': '/images/undertale.png',
      'Can You Feel The Sunshine? (Sonic R)': '/images/sonic-r.jpg',
      'Uncharted, Drake\'s Fortune: Nate\'s Theme': '/images/uncharted.jpg',
      'Coconut Mall (From "Mario Kart Wii")': '/images/mario-kart-wii.png',
      'The Moon (Duck Tales OST)': '/images/ducktales.png',
      'Elder Scrolls – Skyrim: Far Horizons': '/images/skyrim.png',
      'The Elder Scrolls V: Skyrim: Far Horizons': '/images/skyrim.png',
      'Elder Scrolls ‚Äì Skyrim: Far Horizons': '/images/skyrim.png',
      'Super Bell Hill (From "Super Mario 3D World")': '/images/mario-3d-world.jpg',
      'Lost Woods (From The Legend of Zelda: Ocarina of Time)': '/images/ocarina-of-time.jpg',
      'Stickerbush Symphony (From "Donkey Kong Country 2")': '/images/donkey-kong-country-2.jpg',
      'Halo 3: One Final Effort': '/images/halo-3.jpg',
      'Dire, Dire Docks (From "Super Mario 64") [lofi]': '/images/mario-64.png',
      'Double Cherry Pass (From "Super Mario 3D World")': '/images/mario-3d-world.jpg',
      'Delfino Plaza (Super Mario Sunshine)': '/images/mario-sunshine.png',
      'File Select (From "Super Mario 64")': '/images/mario-64.png',
      'Tomodachi Life Menu Theme (From "Tomodachi Life")': '/images/tomodachi-life.jpg',
      'Hot-Head Bop (From "Donkey Kong Country 2")': '/images/donkey-kong-country-2.jpg',
      'Background Music (From "Mario Paint")': '/images/mario-paint.jpg',
      'Waluigi Pinball / Wario Stadium (From "Mario Kart DS")': '/images/mario-kart-ds.jpg',
      'Wandering the Plains (From "Super Mario World")': '/images/mario-world.png',
      'Vs. Metal Sonic': '/images/sonic-mania.jpg',
      'Metal Gear Solid: Sons of Liberty Theme': '/images/metal-gear-solid-2.jpg',
      'Dragon Roost Island': '/images/wind-waker.jpg',
      'Pushing Onwards': '/images/vvvvvv.png',
      'This World Is Not My Home': '/images/kentucky-route-zero.png',
      'Battlefield 2: Theme': '/images/battlefield-2.jpg',
      'Legend of Zelda: Suite': '/images/legend-of-zelda.png',
      'Undertale Shop Trap Beat': '/images/undertale.png',
      // Add more as you collect images
    };
    

    
    return artworkMap[trackName] || null;
  };

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        const response = await fetch('/data/video_game_music_canon_CLEAN.xlsx');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        /**
         * Transform the data to match our chart structure
         * 
         * Data Mapping Strategy:
         * - Handles multiple possible column names for flexibility
         * - Provides fallback values for missing data
         * - Maintains data integrity with type safety
         * 
         * Ranking Formula (calculated in Python preprocessing):
         * Streaming Ranking = (Spotify Popularity × 0.6) + (YouTube Views Score × 0.4)
         * 
         * Business Logic:
         * - Spotify weighted higher (60%) due to direct music consumption
         * - YouTube weighted lower (40%) due to mixed content (music + video)
         * - YouTube views normalized to 0-100 scale for fair comparison
         */
        const transformedData = jsonData.map((row: any, index: number) => {
          const trackName = row.track_name || row['Track Name'] || '';
          const artwork = getTrackArtwork(trackName);
          
          return {
            rank: index + 1,
            track: trackName,
            game: row.game_name || row['Game'] || '',
            artist: row.spotify_artist_name || row['Artist'] || '',
            spotify: row.spotify_popularity || row['Spotify Score'] || 0,
            youtube: row.youtube_views || row['YouTube Views'] || '',
            ranking: row.streaming_ranking || row['Streaming Ranking'] || 0,
            release: row.spotify_release_year || row['Spotify Release Year'] || row.game_release_date || row['Release Date'] || '',
            genres: row.game_genres || row['Genres'] || '',
            type: row.song_type || row['Song Type'] || '',
            rating: row.game_rating || row['Game Rating'] || 0,
            metacritic: row.game_metacritic || row['Metacritic'] || 0,
            platforms: row.game_platforms || row['Platforms'] || '',
            developer: row.game_developers || row['Developer'] || '',
            publisher: row.game_publishers || row['Publisher'] || '',
            source: row.discovery_source || row['Discovery Source'] || '',
            spotifyLink: row.popular_spotify_link || row['Spotify Link'] || '',
            youtubeLink: row.original_youtube_link || row['YouTube Link'] || '',
            spotifyArtwork: artwork || undefined
          };
        });
        
        setChartData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading Excel data:', error);
        setLoading(false);
      }
    };

    loadExcelData();
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
              <td className="px-2 md:px-6 py-4 md:py-6 whitespace-normal">
                <div className="flex items-center space-x-2 md:space-x-4">
                  {/* Track Artwork - Much larger to fill row height */}
                  {track.spotifyArtwork && (
                    <img 
                      src={track.spotifyArtwork} 
                      alt={`${track.track} artwork`}
                      className="w-16 h-16 md:w-32 md:h-32 rounded-xl shadow-lg object-cover border-2 border-white/20 flex-shrink-0"
                      onError={(e) => {
                        // Hide image if it fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 text-sm md:text-lg mb-1 break-words">{cleanTrackName(track.track)}</div>
                    <div className="text-gray-600 text-xs md:text-sm mb-2">{track.game}</div>
                    
                    {/* Streaming Score */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-gray-500">Streaming Score:</span>
                      <span className="text-xs font-bold text-koopa-green">{track.ranking.toFixed(2)}</span>
                    </div>
                    
                    {/* Spotify Release Info */}
                    <div className="text-xs text-gray-500 mb-3">Spotify Release: {track.release}</div>
                    
                    {/* Listen/Watch Buttons */}
                    <div className="flex space-x-2">
                      {track.spotifyLink && (
                        <a href={track.spotifyLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                          Spotify
                        </a>
                      )}
                      {track.youtubeLink && (
                        <a href={track.youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      {/* Version Info Footer */}
      <div className="bg-gradient-to-r from-koopa-green/5 to-koopa-cream/10 px-6 py-2 border-t border-koopa-green/20">
        <div className="text-center text-xs text-gray-500">
          🔄 <strong>Dataset V1</strong> • Data from August 2025
        </div>
      </div>
    </div>
  );
}
