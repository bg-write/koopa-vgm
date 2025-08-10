# 🎮 Tableau Dashboard Creation Guide for Koopa VGM Analysis

## 📊 Project Overview
You're creating a business-focused Tableau dashboard for "Koopa: The Most Beloved Video Game Music Ever?" - a data-driven analysis of video game music popularity using Spotify and YouTube streaming data. The goal is to help stakeholders make informed decisions about VGM playlist curation and content strategy.

## 📁 Data Source
**File**: `video_game_music_canon_CLEAN.xlsx` (located in koopa-case-study/public/data/)
**Records**: 45 VGM tracks from 30+ years of gaming history (1985-2025)
**Data Quality**: 100% completion for all core fields, comprehensive fact-checked metadata from Spotify, YouTube, and RAWG APIs

## 🎯 6 Charts to Create

### Chart 1: Nintendo Dominance (38%)
**Purpose**: Show Nintendo's market share vs. other publishers/developers
**Chart Type**: Horizontal bar chart
**X-axis**: Count of tracks
**Y-axis**: Publisher/Developer categories
**Data Fields**: `game_developers`, `game_publishers`, `game_name`
**Business Value**: "Where should we focus licensing efforts?"
**Color Scheme**: Brand colors for Nintendo, Microsoft, Sony, etc.
**Key Insight**: Nintendo represents 38% of all tracks (17/45), making them the dominant VGM powerhouse

### Chart 2: Superstar Tracks (17 tracks)
**Purpose**: Identify tracks with 50M+ combined reach that should anchor playlists
**Chart Type**: Bubble chart
**X-axis**: Spotify popularity (0-100)
**Y-axis**: YouTube views (millions)
**Size**: Combined reach (YouTube views + Spotify popularity × 1M)
**Color**: By game franchise
**Data Fields**: `track_name`, `game_name`, `spotify_popularity`, `youtube_views`, `streaming_ranking`
**Business Value**: "Which tracks should anchor our playlists?"
**Key Insight**: 17 tracks meet the 50M+ combined reach threshold for "superstar" status

### Chart 3: Correlation Analysis (r=0.663)
**Purpose**: Show relationship between Spotify and YouTube performance
**Chart Type**: Scatter plot with trend line
**X-axis**: Spotify popularity (0-100)
**Y-axis**: YouTube views (millions)
**Color**: By discovery method (`discovery_source`)
**Data Fields**: `spotify_popularity`, `youtube_views`, `discovery_source`
**Business Value**: "Do we need both platforms or can we focus on one?"
**Note**: Add R² value and correlation coefficient (r=0.663) in title/annotation

### Chart 4: Release Gap Analysis - **NEW KEY INSIGHT**
**Purpose**: Show the distinction between game release years vs Spotify release years
**Chart Type**: Dual-axis bar chart or side-by-side comparison
**Primary Axis**: Count of games by original release decade
**Secondary Axis**: Count of Spotify releases by decade
**Data Fields**: `game_release_date`, `spotify_release_year`
**Business Value**: "Why classic VGM has lasting appeal through streaming platforms"
**Key Insight**: Only 9% of tracks have Spotify releases before 2010, but 56% of games were originally released before 2010
**Average Gap**: 11.7 years between game release and Spotify availability

### Chart 5: Song Type Performance
**Purpose**: Analyze engagement by song type (original, cover, rerelease, remix)
**Chart Type**: Donut chart or stacked bar
**Categories**: Cover (17 tracks, 38%), Original (15 tracks, 33%), Rerelease (9 tracks, 20%), Remix (4 tracks, 9%)
**Metric**: Count and average performance
**Data Fields**: `song_type`, `spotify_popularity`, `youtube_views`
**Business Value**: "Should we prioritize authentic or inspired content?"

### Chart 6: Platform Performance Heat Map
**Purpose**: Show which gaming platforms produce the most popular VGM
**Chart Type**: Heat map or treemap
**Rows**: Gaming platforms (PC, Nintendo Switch, PlayStation 4, etc.)
**Columns**: Performance metrics
**Color intensity**: Average ranking score
**Data Fields**: `game_platforms`, `streaming_ranking`
**Business Value**: "Which gaming ecosystems should we partner with?"

## 📈 Key Statistics to Highlight

### Executive Summary Data (All Fact-Checked):
- **Nintendo representation**: 38% of all tracks (17/45) across Mario, Zelda, and Donkey Kong franchises
- **Spotify high engagement**: 24% of tracks have popularity scores above 50 (11/45)
- **Release year gap**: Only 9% of tracks have Spotify releases before 2010, but 56% of games were originally released before 2010
- **Superstar tracks**: 17 tracks with 50M+ combined reach
- **Song types**: 38% covers, 33% originals, 20% rereleases, 9% remixes
- **Cross-platform correlation**: r = 0.663 between Spotify and YouTube

### Notable Insights:
- **Classic VGM's lasting appeal**: 11.7 year average gap between game release and Spotify availability
- **Cross-platform validation**: Strong correlation proves authentic popularity across platforms
- **YouTube dominance**: Top 5 tracks average 36M+ YouTube views
- **Discovery balance**: 69% data-driven vs 31% expert curated
- **Complete data coverage**: 100% completion rate for all core metrics
- **Genre diversity**: 25+ unique game IPs represented

## 🎨 Design Guidelines

### Color Scheme:
- **Nintendo**: Red (#FF0000)
- **Microsoft**: Green (#107C10)  
- **Sony**: Blue (#006FCD)
- **Indie/Other**: Gray (#666666)
- **Correlation**: Use diverging color palette
- **Performance**: Use sequential color palette

### Dashboard Layout:
- **Top Row**: Charts 1-2 (Market Overview + Top Performers)
- **Middle Row**: Charts 3-4 (Platform Strategy + Release Gap Analysis)
- **Bottom Row**: Charts 5-6 (Content Strategy + Partnership Opportunities)

### Interactivity:
- **Filters**: By decade, publisher, song type, platform, release gap
- **Tooltips**: Show track name, game, total reach, both release years, gap duration
- **Drill-down**: From publisher to specific games/tracks
- **Highlight actions**: Cross-filter between charts

## 📊 Data Field Mappings

### Core Fields:
- `track_name`: Track name (cleaned for display)
- `game_name`: Game title
- `spotify_artist_name`: Performer/composer
- `spotify_popularity`: Spotify popularity score (0-100)
- `youtube_views`: YouTube view count
- `streaming_ranking`: Combined streaming score (0-100)
- `spotify_release_year`: When track was added to Spotify
- `game_release_date`: When game was originally released
- `song_type`: Song type (original, cover, rerelease, remix)
- `discovery_source`: Discovery method (curated, spotify)

### Metadata Fields:
- `game_genres`: Game genres
- `game_rating`: User rating (0-5)
- `game_metacritic`: Metacritic score (0-100)
- `game_platforms`: Available platforms
- `game_developers`: Game developer
- `game_publishers`: Game publisher

## 🚀 Implementation Steps

1. **Connect to Excel**: Open Tableau → Connect to `video_game_music_canon_CLEAN.xlsx`
2. **Create calculated fields**: 
   - Combined Reach: `[youtube_views] + ([spotify_popularity] * 1000000)`
   - Release Gap: `[spotify_release_year] - [game_release_date]`
   - Decade Groups: `FLOOR([game_release_date]/10)*10`
   - Superstar Status: `IF [Combined Reach] >= 50000000 THEN "Superstar" ELSE "Standard" END`
3. **Build charts**: Create each chart using the specifications provided
4. **Design dashboard**: Arrange charts in the recommended layout
5. **Add interactivity**: Implement filters and tooltips
6. **Test and refine**: Ensure all data is displaying correctly and correlations are accurate
7. **Export and share**: Save as Tableau Public dashboard

## 🎯 Business Story Arc

The dashboard should tell this story:

1. **Market Overview**: Nintendo dominates with 38% representation across beloved franchises
2. **Top Performers**: 17 superstar tracks with 50M+ reach provide clear playlist anchors
3. **Platform Strategy**: Strong correlation (r=0.663) validates cross-platform content strategy
4. **Temporal Insights**: Classic VGM's lasting appeal - games from 1985 still getting 2019 Spotify releases
5. **Content Strategy**: Covers (38%) and originals (33%) perform similarly, providing content flexibility
6. **Partnership Opportunities**: Platform and developer performance data guides partnership decisions

## 🎯 Key Business Questions the Dashboard Answers:

- **Content Curation**: Which 17 tracks should anchor any VGM playlist?
- **Partnership Strategy**: Should we focus on Nintendo (38% dominance) or diversify?
- **Platform Approach**: Can we focus on one platform or need both Spotify + YouTube?
- **Historical Value**: Why do classic games (1985-2010) still drive streaming in 2020+?
- **Content Types**: Should we prioritize authentic tracks or covers?
- **Market Timing**: How does release gap analysis inform content strategy?

This creates a complete business narrative that helps stakeholders make informed decisions about VGM content strategy, playlist curation, partnership opportunities, and understanding the lasting cultural impact of classic video game music.
