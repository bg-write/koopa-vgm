const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Track name cleaning function (copied from frontend)
const cleanTrackName = (trackName) => {
  const cleanMap = {
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

// Artwork mapping function (copied from frontend)
const getTrackArtwork = (trackName) => {
  const artworkMap = {
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
    'Undertale Shop Trap Beat': '/images/undertale.png'
  };
  
  return artworkMap[trackName] || null;
};

// Read the Excel file
const excelPath = path.join(__dirname, '../public/data/video_game_music_canon_CLEAN.xlsx');
const workbook = XLSX.readFile(excelPath);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON with headers
const data = XLSX.utils.sheet_to_json(worksheet);

// Process and transform the data to match frontend expectations
const transformedData = data.map((row, index) => {
  const originalTrackName = row.track_name || '';
  const cleanedTrackName = cleanTrackName(originalTrackName);
  const artwork = getTrackArtwork(originalTrackName); // Use original name for artwork lookup
  
  // Transform data to match clean frontend ChartTrack interface
  return {
    rank: index + 1,
    track: cleanedTrackName,
    game: row.game_name || '',
    artist: row.spotify_artist_name || '',
    spotify: parseInt(String(row.spotify_popularity || 0)) || 0,
    youtube: row.youtube_views || '',
    ranking: parseInt(String(row.streaming_ranking || 0)) || 0,
    spotifyRelease: row.spotify_release_year || '',
    genres: row.game_genres || '',
    type: row.song_type || '',
    rating: parseFloat(String(row.game_rating || 0)) || 0,
    metacritic: parseInt(String(row.game_metacritic || 0)) || 0,
    platforms: row.game_platforms || '',
    developer: row.game_developers || '',
    publisher: row.game_publishers || '',
    source: row.discovery_source || '',
    spotifyLink: row.popular_spotify_link || '',
    youtubeLink: row.original_youtube_link || '',
    spotifyArtwork: artwork || undefined,
    gameRelease: row.game_release_date || null
  };
});

// Write to JSON file
const jsonPath = path.join(__dirname, '../public/data/video_game_music_canon.json');
fs.writeFileSync(jsonPath, JSON.stringify(transformedData, null, 2));

console.log(`✅ Converted Excel to JSON: ${jsonPath}`);
console.log(`📊 Total tracks: ${transformedData.length}`);

// Show column names
if (transformedData.length > 0) {
  console.log(`📋 Frontend fields: ${Object.keys(transformedData[0]).join(', ')}`);
}

// Show first few records as preview with cleaning info
console.log('\n📋 First 5 records (with all transformations):');
transformedData.slice(0, 5).forEach((record, index) => {
  const originalName = data[index].track_name || 'Unknown';
  const cleanedName = record.track;
  const gameName = record.game;
  const artwork = record.spotifyArtwork;
  
  if (originalName !== cleanedName) {
    console.log(`${index + 1}. "${originalName}" → "${cleanedName}" - ${gameName} ${artwork ? `[🎨 ${artwork.split('/').pop()}]` : ''}`);
  } else {
    console.log(`${index + 1}. ${cleanedName} - ${gameName} ${artwork ? `[🎨 ${artwork.split('/').pop()}]` : ''}`);
  }
});

// Show transformation statistics
const cleanedCount = transformedData.filter((record, index) => {
  const originalName = data[index].track_name || '';
  const cleanedName = record.track;
  return originalName !== cleanedName;
}).length;

const artworkCount = transformedData.filter(record => record.spotifyArtwork).length;

console.log(`\n🧹 Transformations applied:`);
console.log(`   • Track name cleaning: ${cleanedCount} tracks cleaned out of ${transformedData.length} total`);
console.log(`   • Artwork mapping: ${artworkCount} tracks have artwork out of ${transformedData.length} total`);
console.log(`   • Data type conversions: All numeric fields properly converted`);
console.log(`   • Field mapping: Excel columns mapped to frontend ChartTrack interface`);
