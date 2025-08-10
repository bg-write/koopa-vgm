/*
 * 🎮 KoopaChart3D Component - Future Development Ready!
 * 
 * CURRENT PROGRESS (as of August 2025):
 * ✅ 3D card rendering with Three.js
 * ✅ Independent card rotation system (ref-based state isolation)
 * ✅ Unique card identification and positioning
 * ✅ Click interactions for rotation and info panels
 * ✅ Proper artwork display and card styling
 * ✅ Rank number system (needs visual refinement)
 * 
 * WHAT'S WORKING:
 * - Cards render in 3D space with proper positioning
 * - Each card rotates independently when clicked
 * - Info panels open/close correctly
 * - Blue coloring appears during rotation
 * - Console logging shows proper state management
 * 
 * WHAT NEEDS REFINEMENT:
 * - Rank numbers in green balls need better visual styling
 * - Artwork color saturation could be improved
 * - Animation timing could be fine-tuned
 * 
 * TECHNICAL IMPLEMENTATION:
 * - Uses @react-three/fiber and @react-three/drei
 * - Ref-based state management for complete component isolation
 * - Unique card IDs prevent state sharing issues
 * - Proper cleanup and timeout management
 * 
 * FUTURE ENHANCEMENTS:
 * - Add more tracks (currently shows top 2)
 * - Improve rank number visibility
 * - Add hover effects and animations
 * - Implement card stacking/arrangement
 * - Add sound effects and particle systems
 * 
 * This component is fully functional and ready for continued development!
 */

"use client";

import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// Track name cleaning function (same as original)
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

// 3D Game Card Component
function GameCard3D({ track, position }: { track: ChartTrack; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [expanded, setExpanded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.02);
  
  // Create a unique ID for this card instance
  const cardId = `${track.game}-${position[0]}-${position[1]}-${position[2]}`;
  
  // Use refs to store rotation state to ensure isolation
  const rotationStateRef = useRef({
    isRotating: false,
    rotationSpeed: 0.02
  });
  
  // Debug: Log the track data for this specific card
  useEffect(() => {
    console.log(`Card ${cardId} at position ${position}:`, {
      rank: track.rank,
      game: track.game,
      track: track.track
    });
  }, [track, position, cardId]);
  
  // Handle card click for rotation
  const handleCardClick = () => {
    console.log(`Card ${cardId} clicked for rotation`);
    if (!rotationStateRef.current.isRotating) {
      rotationStateRef.current.isRotating = true;
      rotationStateRef.current.rotationSpeed = 0.05;
      setIsRotating(true);
      setRotationSpeed(0.05);
      
      // Stop rotation after 2 seconds
      setTimeout(() => {
        console.log(`Stopping rotation for ${cardId}`);
        rotationStateRef.current.isRotating = false;
        rotationStateRef.current.rotationSpeed = 0.02;
        setIsRotating(false);
        setRotationSpeed(0.02);
      }, 2000);
    }
  };
  
  // Handle info panel toggle
  const handleInfoToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card rotation
    setExpanded(!expanded);
  };

  // Animation loop for floating effect
  useFrame((state) => {
    if (meshRef.current) {
      // Floating up and down animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Independent rotation for each card - only apply to this specific mesh
      if (rotationStateRef.current.isRotating) {
        meshRef.current.rotation.y += rotationStateRef.current.rotationSpeed;
        console.log(`Rotating ${cardId} at speed ${rotationStateRef.current.rotationSpeed}`);
      }
    }
  });

  return (
    <group position={position}>
      {/* 3D Card */}
      <mesh
        ref={meshRef}
        onClick={handleCardClick}
        scale={expanded ? 1.1 : 1}
      >
        {/* Card geometry - slightly thicker than a flat plane */}
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial 
          color={isRotating ? "#3b82f6" : expanded ? "#4ade80" : "#ffffff"}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Invisible clickable area for info panel - positioned in front */}
      <mesh
        position={[0, 0, 0.06]}
        onClick={handleInfoToggle}
      >
        <planeGeometry args={[1.8, 2.8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Artwork Display */}
      {track.spotifyArtwork ? (
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.8, 2.8]} />
          <meshStandardMaterial 
            map={new THREE.TextureLoader().load(track.spotifyArtwork)}
            toneMapped={false}
            color="#ffffff"
          />
        </mesh>
      ) : (
        // Fallback colored placeholder
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.8, 2.8]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
      )}
      
      {/* Game Title Overlay - only show if no artwork */}
      {!track.spotifyArtwork && (
        <Text
          position={[0, 0, 0.07]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
          textAlign="center"
        >
          {track.game}
        </Text>
      )}
      
      {/* Rank Badge */}
      <mesh position={[-0.8, 1.2, 0.06]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* White background circle for rank number */}
      <mesh position={[-0.8, 1.2, 0.2]}>
        <circleGeometry args={[0.18, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Rank Number - Dynamic 3D number based on track.rank */}
      <group position={[-0.8, 1.2, 0.25]}>
        {/* Debug: Show rank value */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.12}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {track.rank}
        </Text>
      </group>
      
      {/* Expanded Info Panel */}
      {expanded && (
        <Html position={[0, 0, 0.2]} center>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200 min-w-[300px] relative">
            {/* Close Button */}
            <button
              onClick={handleInfoToggle}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 pr-6">
                <span className="bg-koopa-green text-white text-sm font-bold px-2.5 py-1 rounded-full min-w-[28px] text-center">
                  #{track.rank}
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  {cleanTrackName(track.track)}
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 italic">
                {track.game}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Spotify Score:</span>
                  <span className="font-semibold text-green-600">{track.spotify}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">YouTube Views:</span>
                  <span className="font-semibold text-red-600">{formatYouTubeViews(track.youtube)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Streaming Score:</span>
                  <span className="font-semibold text-blue-600">{track.ranking}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                {track.spotifyLink && (
                  <a 
                    href={track.spotifyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                  >
                    Spotify
                  </a>
                )}
                {track.youtubeLink && (
                  <a 
                    href={track.youtubeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function KoopaChart3D() {
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
        <div className="text-koopa-green font-header text-lg">Loading 3D chart data...</div>
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

  // For now, just show the first track (Cyberpunk 2077) in 3D
  const cyberpunkTrack = chartData.find(track => track.game.includes('Cyberpunk'));
  const displayTrack = cyberpunkTrack || chartData[0];

  return (
    <div className="bg-gradient-to-br from-koopa-cream via-white to-koopa-cream shadow-2xl rounded-2xl overflow-hidden border border-koopa-green/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-koopa-green/10 to-koopa-cream/20 px-6 py-4 border-b border-koopa-green/20">
        <h2 className="text-2xl font-bold text-koopa-green text-center">
          🎮 Koopa VGM Chart: 3D Edition
        </h2>
        <p className="text-center text-gray-600 mt-2 italic">
          An interactive 3D visualization of VGM popularity
        </p>
      </div>
      
      {/* 3D Canvas */}
      <div className="h-[600px] w-full">
        <Canvas
          camera={{ position: [1.5, 0, 10], fov: 50 }}
          style={{ background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)' }}
        >
          {/* Lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} />
          <directionalLight position={[-10, -10, 5]} intensity={1.5} />
          <pointLight position={[0, 0, 5]} intensity={1.2} />
          <spotLight 
            position={[0, 5, 5]} 
            intensity={1.0} 
            angle={0.6} 
            penumbra={0.2} 
            color="#ffffff"
          />
          
          {/* Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={15}
          />
          
          {/* 3D Game Cards */}
          <Suspense fallback={null}>
            <GameCard3D 
              key="card-1"
              track={displayTrack} 
              position={[0, 0, 0]} 
            />
            {/* Second track - positioned to the right */}
            {chartData.length > 1 && (
              <GameCard3D 
                key="card-2"
                track={chartData[1]} 
                position={[3, 0, 0]} 
              />
            )}
          </Suspense>
        </Canvas>
      </div>
      
      {/* Instructions */}
      <div className="bg-koopa-green/5 px-6 py-4 text-center">
        <p className="text-sm text-gray-600">
          💡 <strong>Tip:</strong> Click the 3D card to expand details • Drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
}
