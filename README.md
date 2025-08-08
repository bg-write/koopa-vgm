# 🐢 Koopa: A New Video Game Music Canon

**A data-driven exploration of video game music's most iconic tracks, built with Next.js 14, TypeScript, and Tailwind CSS.**

![Koopa App Screenshot](./public/koopa-screenshot.png)
*Interactive chart showcasing 45 ranked video game music tracks with artwork and streaming data*

---

## 🎮 **Live Demo**

- **[Koopa Chart](https://koopa-vgm.vercel.app)** - Interactive chart with all 45 tracks
- **[How I Made Koopa](https://koopa-vgm.vercel.app/how-i-made-koopa)** - Full case study breakdown

---

## 🚀 **Latest Features**

### **🎨 Interactive Chart Design**
- **Responsive card-based layout** with hover animations and smooth transitions
- **Massive artwork display** (128px on desktop, 64px on mobile) with game cover art
- **Rank-based color coding** with gradient backgrounds for visual hierarchy
- **Floating rank badges** with dynamic color progression
- **Mobile-optimized spacing** with touch-friendly interactions

### **📱 Mobile-First Experience**
- **Responsive design** that looks good on all devices
- **Optimized mobile layout** with reduced rank badges and tight spacing
- **Touch-friendly buttons** and smooth animations
- **Text overflow handling** with proper word wrapping

### **🎵 Artwork Integration**
- **45 custom game artworks** manually curated from the Internet
- **Automatic image loading** with fallback handling
- **Visual storytelling** through game cover art
- **Professional presentation** ready for portfolio showcase

### **📊 Data Visualization**
- **Cross-platform correlation analysis** (r = 0.663)
- **Streaming score calculations** (60% Spotify + 40% YouTube)
- **Rank-based visual hierarchy** with color-coded tiers
- **Interactive data exploration** with direct links to streaming platforms

---

## 🛠️ **Tech Stack**

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Data Processing**: XLSX library for Excel file parsing
- **Deployment**: Vercel for seamless hosting
- **Design**: Custom animations and interactive elements

---

## 📈 **Data Analysis Highlights**

### **Statistical Validation**
- **Cross-platform correlation**: Strong positive correlation (r = 0.663) between Spotify popularity and YouTube views
- **Data quality**: 100% completion for core fields, 95% for YouTube data, zero duplicates
- **Sample size**: 45 tracks from 25+ unique game IPs across 30 years (1984-2024)

### **Key Performance Metrics**
- **Seven superstar tracks** identified with 50M+ combined reach
- **69% data-driven discovery** vs 31% expert curated approach
- **Balanced representation**: 15 originals, 17 covers, 9 rereleases, 4 remixes

### **Technical Achievements**
- **API integration**: Successfully combined Spotify, YouTube, and RAWG APIs
- **Data cleaning**: Sophisticated filtering removed 130+ derivative tracks
- **Quality assurance**: Automated validation with statistical outlier detection

---

## 🏗️ **Project Structure**

```
koopa-vgm/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage with interactive chart
│   │   ├── how-i-made-koopa/        # Case study page
│   │   ├── layout.tsx               # Root layout with navigation
│   │   └── globals.css              # Global styles and animations
│   ├── components/
│   │   ├── KoopaChart.tsx           # Main interactive chart component
│   │   ├── Navigation.tsx           # Site navigation
│   │   ├── ClickableTitle.tsx       # Animated title component
│   │   ├── ScrollSection.tsx        # Scrollable content sections
│   │   └── MarkdownContent.tsx      # Markdown rendering
│   └── content/
│       └── case-study.md            # Full case study content
├── public/
│   ├── data/
│   │   └── video_game_music_canon_CLEAN.xlsx  # Main dataset
│   └── images/                      # 45 game artwork images
├── README.md                        # Project documentation
└── package.json                     # Dependencies and scripts
```

---

## 🎯 **Key Features**

### **Interactive Data Chart**
- **45 ranked tracks** with streaming scores and metadata
- **Direct links** to Spotify and YouTube for each track
- **Responsive design** optimized for mobile, tablet, and desktop
- **Hover effects** and smooth animations for enhanced UX

### **Data Quality Metrics**
- **Real-time statistics** displayed at the top of the chart
- **Cross-platform correlation** analysis
- **Dataset versioning** and collection dates
- **Transparent methodology** for data collection

### **Professional Presentation**
- **Portfolio-ready design** suitable for hiring managers
- **Clean, modern UI** with attention to detail
- **Accessibility considerations** with proper contrast and navigation
- **Performance optimized** with efficient data loading

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 22+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/bg-write/koopa-vgm.git
cd koopa-vgm

# Install dependencies
npm install

# Run development server
npm run dev
```

### **Build for Production**
```bash
npm run build
npm start
```

---

## 📊 **Interactive Dashboard**

![Video Game Music Canon Dashboard](./public/tableau_dashboard_v1.png)
*Interactive Tableau dashboard showing cross-platform correlation, top performers, and discovery methods*

**Dashboard Features:**
- **Cross-platform correlation analysis** (r = 0.663)
- **Top 10 performers visualization** with discovery method breakdown
- **Discovery distribution** showing data-driven vs curated approach
- **[View Full Dashboard](https://public.tableau.com/views/VideoGameMusicCanonAnalysis/OverallAnalysisDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link)**

---

## 🛠️ **Technical Challenges Overcome**

### **Data Quality & Filtering**
- **Derivative content problem**: 175 initial tracks reduced to 45 after filtering out covers, remixes, and "lofi beats"
- **Cross-platform validation**: Ensured data consistency between Spotify and YouTube APIs
- **Manual verification**: Listened to samples and cross-referenced with official releases
- **Rate limiting**: Implemented exponential backoff for API requests (Spotify: 100 req/sec, YouTube: daily quotas)

### **API Integration Complexity**
- **Multiple data sources**: Successfully combined Spotify, YouTube, and RAWG APIs with different data formats
- **Error handling**: Robust error handling with backup strategies and audit trails
- **Data transformation**: Standardized formats across platforms with comprehensive mapping
- **Quality assurance**: Automated validation with statistical outlier detection

### **Business Logic Implementation**
- **Ranking formula**: Developed weighted scoring system (60% Spotify + 40% YouTube)
- **Bias mitigation**: Acknowledged and addressed platform limitations, recency bias, cultural bias
- **Scope management**: Successfully pivoted from overwhelming 175 tracks to focused 45-track analysis
- **Validation methodology**: Used cross-platform correlation to prove data quality

---

## 🎨 **Design Philosophy**

### **User Experience**
- **Mobile-first approach** with responsive design principles
- **Intuitive navigation** with clear information hierarchy
- **Smooth animations** that enhance rather than distract
- **Accessibility focus** with proper contrast and keyboard navigation

### **Visual Design**
- **Clean, modern aesthetic** suitable for professional portfolios
- **Consistent color scheme** with Koopa green branding
- **Typography hierarchy** for optimal readability
- **Interactive elements** that provide immediate feedback

---

## 📈 **Performance & Optimization**

### **Loading Performance**
- **Efficient data loading** with Excel file parsing
- **Optimized images** with proper sizing and formats
- **Minimal bundle size** with tree-shaking and code splitting
- **Fast initial load** with static generation where possible

### **User Experience**
- **Smooth animations** with CSS transitions
- **Responsive interactions** across all device sizes
- **Error handling** with graceful fallbacks
- **Loading states** for better perceived performance

---

## 🔮 **Future Enhancements**

### **Planned Features**
- **Spotify playlist integration** with all 45 tracks
- **Advanced filtering** by game, year, or genre
- **Interactive data exploration** with drill-down capabilities
- **Social sharing** with track-specific links

### **Technical Improvements**
- **Real-time data updates** from streaming APIs
- **Advanced analytics** with trend analysis
- **User preferences** and customization options
- **Performance monitoring** and optimization

---

## 🤝 **Contributing**

This project is designed as a portfolio piece showcasing data analysis and web development skills. While contributions are welcome, the focus is on demonstrating:

- **Data analysis methodology**
- **Web development best practices**
- **User experience design**
- **Professional presentation skills**

---

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 **About the Developer**

**Brady Gerber** - Music Journalist & Data Analyst

- **Portfolio**: [Website](https://bradygerber.com/) & [LinkedIn](https://www.linkedin.com/in/brady-gerber/)

---

**Last updated**: August 2025

---

*Built with ❤️*

![Koopa Logo Screenshot](./public/koopa-logo.png)
