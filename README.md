# 123Movies - Free Movie Streaming Website

A modern, SEO-optimized movie streaming website built with Next.js 14, React, TypeScript, and TailwindCSS.

## 🎬 Features

- **SEO Optimized**: Comprehensive meta tags, structured data, and semantic HTML
- **Google AdSense Ready**: Pre-configured ad slots for monetization
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Beautiful gradient effects, smooth animations, and intuitive navigation
- **Fast Performance**: Built with Next.js for optimal loading speeds
- **Trending Keywords**: Optimized for popular search terms like "watch movies online free", "HD movies", etc.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd movie-streaming-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Configuration

### Google AdSense

1. Sign up for Google AdSense at [https://www.google.com/adsense](https://www.google.com/adsense)
2. Get your AdSense publisher ID
3. Update the following files:
   - `src/app/layout.tsx` - Replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID
   - `src/components/AdBanner.tsx` - Replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID

### Google Analytics

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Update `src/app/layout.tsx` - Replace `G-XXXXXXXXXX` with your Measurement ID

### SEO Configuration

Update the following in `src/app/layout.tsx`:
- Site URL in metadata
- Google Search Console verification code
- Social media links in footer

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: {
    // Your custom colors
  },
}
```

### Logo

Replace the logo in `src/components/Header.tsx` and `src/components/Footer.tsx`

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🔍 SEO Features

- **Meta Tags**: Comprehensive title, description, and keywords
- **Open Graph**: Facebook and social media optimization
- **Twitter Cards**: Twitter-specific metadata
- **Structured Data**: Schema.org JSON-LD for search engines
- **Sitemap**: Auto-generated sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Prevent duplicate content issues

## 📊 Trending Keywords Included

- watch movies online free
- free movie streaming
- HD movies online
- latest movies 2024
- Hollywood movies
- Bollywood movies
- TV shows online
- web series free
- 123movies
- gomovies
- putlocker
- fmovies

## ⚖️ Legal Notice

This is a template for a movie information/database website. Ensure you:
- Have proper licensing for any content you display
- Comply with copyright laws in your jurisdiction
- Follow Google AdSense policies
- Include proper DMCA takedown procedures
- Add privacy policy and terms of service

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Deployment**: Vercel, Netlify, or any Node.js hosting

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Support

For issues or questions, please create an issue in the repository.
