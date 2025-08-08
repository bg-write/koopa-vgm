const fs = require('fs');
const path = require('path');

// Read the JSON data to understand the structure
const jsonPath = path.join(process.cwd(), 'public', 'data', 'video_game_music_canon.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('📊 TABLEAU CHART REQUIREMENTS ANALYSIS\n');

// Check what columns we need for each chart
const requiredColumns = {
  'Chart 1: Nintendo Dominance': ['game', 'developer', 'publisher'],
  'Chart 2: Superstar Tracks': ['track', 'game', 'spotify', 'youtube', 'ranking'],
  'Chart 3: Correlation Analysis': ['spotify', 'youtube', 'source'],
  'Chart 4: Time Distribution': ['release'],
  'Chart 5: Song Type Performance': ['type', 'spotify', 'youtube'],
  'Chart 6: Platform Performance': ['platforms', 'ranking']
};

console.log('Required columns for each chart:');
Object.entries(requiredColumns).forEach(([chart, columns]) => {
  console.log(`\n${chart}:`);
  columns.forEach(col => {
    const hasColumn = data[0] && data[0].hasOwnProperty(col);
    console.log(`  ${hasColumn ? '✅' : '❌'} ${col}`);
  });
});

// Check if we have all the data we need
console.log('\n📋 DATA AVAILABILITY CHECK:');
console.log(`Total tracks: ${data.length}`);

// Check Nintendo tracks
const nintendoTracks = data.filter(track => {
  const game = track.game.toLowerCase();
  return game.includes('mario') || game.includes('zelda') || game.includes('donkey kong');
});
console.log(`Nintendo tracks: ${nintendoTracks.length} (${((nintendoTracks.length/data.length)*100).toFixed(1)}%)`);

// Check superstar tracks (50M+ combined reach)
const superstarTracks = data.filter(track => {
  const spotifyReach = track.spotify * 1000000;
  const totalReach = spotifyReach + track.youtube;
  return totalReach >= 50000000;
});
console.log(`Superstar tracks (50M+ reach): ${superstarTracks.length}`);

// Check release years
const releaseYears = [...new Set(data.map(track => track.release))].sort();
console.log(`Release year range: ${Math.min(...releaseYears)} - ${Math.max(...releaseYears)}`);

// Check song types
const songTypes = {};
data.forEach(track => {
  songTypes[track.type] = (songTypes[track.type] || 0) + 1;
});
console.log('Song types:', songTypes);

// Check platforms
const allPlatforms = new Set();
data.forEach(track => {
  if (track.platforms) {
    track.platforms.split(', ').forEach(platform => allPlatforms.add(platform.trim()));
  }
});
console.log(`Unique platforms: ${allPlatforms.size}`);

console.log('\n🎯 RECOMMENDATIONS FOR TABLEAU:');
console.log('1. Use the Excel file directly - it has all the raw data needed');
console.log('2. The JSON file has cleaned/transformed data for the frontend');
console.log('3. For Tableau, you can use either source, but Excel might be easier');
console.log('4. Consider creating calculated fields in Tableau for:');
console.log('   - Combined reach (Spotify popularity * 1M + YouTube views)');
console.log('   - Nintendo franchise flag (IF contains "Mario", "Zelda", "Donkey Kong")');
console.log('   - Decade grouping (2010s, 2020s, etc.)');
console.log('   - Platform categories (PC, Console, Mobile)');
