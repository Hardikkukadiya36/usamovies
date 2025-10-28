# 123Movies Setup Guide

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd movie-streaming-site
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 📋 Configuration Checklist

### 1. Google AdSense Setup (Required for Monetization)

**Steps:**
1. Apply for Google AdSense at https://www.google.com/adsense
2. Wait for approval (usually 1-2 weeks)
3. Once approved, get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
4. Replace in these files:
   - `src/app/layout.tsx` (line 88)
   - `src/components/AdBanner.tsx` (line 25)

**Example:**
```typescript
// Before
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"

// After
data-ad-client="ca-pub-1234567890123456"
```

### 2. Google Analytics Setup (Recommended)

**Steps:**
1. Create account at https://analytics.google.com
2. Create a GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Replace in `src/app/layout.tsx` (lines 93 and 99)

**Example:**
```typescript
// Before
gtag('config', 'G-XXXXXXXXXX');

// After
gtag('config', 'G-ABC123XYZ');
```

### 3. Update Domain Information

Replace `https://yourdomain.com` with your actual domain in:
- `src/app/layout.tsx` (line 42)
- `public/robots.txt` (line 7)
- `public/sitemap.xml` (all URLs)

### 4. Google Search Console Verification

**Steps:**
1. Go to https://search.google.com/search-console
2. Add your property
3. Choose "HTML tag" verification method
4. Copy the verification code
5. Add to `src/app/layout.tsx` in metadata:

```typescript
verification: {
  google: "your-verification-code-here",
},
```

### 5. Social Media Links

Update social media links in `src/components/Footer.tsx` (lines 22-37)

## 🎨 Customization

### Change Brand Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#ef4444', // Change this to your brand color
    600: '#dc2626',
    // ... other shades
  },
}
```

### Update Logo

Replace the Film icon in:
- `src/components/Header.tsx` (line 24)
- `src/components/Footer.tsx` (line 13)

Or use the SVG logo in `public/logo.svg`

### Modify SEO Keywords

Update keywords in `src/app/layout.tsx` (lines 11-31) based on your target audience

## 📱 PWA Setup

The site is already configured as a Progressive Web App!

**Features:**
- Installable on mobile devices
- Offline support (basic)
- App-like experience

**Customize:**
- Edit `public/manifest.webmanifest` for app details
- Add icons: `android-chrome-192x192.png` and `android-chrome-512x512.png`

## 🔍 SEO Optimization Tips

### 1. Submit Sitemap
After deployment, submit your sitemap to:
- Google Search Console: `https://yourdomain.com/sitemap.xml`
- Bing Webmaster Tools

### 2. Create Quality Content
- Add movie reviews
- Include detailed descriptions
- Use proper heading structure (H1, H2, H3)

### 3. Optimize Images
- Use WebP format
- Add alt text to all images
- Compress images before upload

### 4. Page Speed
- Enable caching
- Use CDN for static assets
- Minimize JavaScript

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Option 3: Traditional Hosting
```bash
npm run build
npm start
```

## ⚖️ Legal Requirements

### Must-Have Pages (Create These):

1. **Privacy Policy** (`/privacy`)
   - Data collection practices
   - Cookie usage
   - Third-party services (AdSense, Analytics)

2. **Terms of Service** (`/terms`)
   - User responsibilities
   - Content usage rights
   - Disclaimer

3. **DMCA Policy** (`/dmca`)
   - Copyright infringement procedure
   - Takedown request process
   - Contact information

4. **About Page** (`/about`)
   - Site purpose
   - Team information
   - Contact details

### Google AdSense Compliance

**Required:**
- Privacy Policy page
- Clear ad labeling
- No prohibited content
- Minimum age requirement (13+)
- No copyright infringement

**Prohibited Content:**
- Pirated movies/shows
- Adult content
- Violence/hate speech
- Illegal activities

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit API keys
   - Use `.env.local` for secrets

2. **HTTPS**
   - Always use SSL certificate
   - Most hosting providers offer free SSL

3. **Content Security**
   - Validate user inputs
   - Sanitize data
   - Use CORS properly

## 📊 Analytics & Monitoring

### Track These Metrics:
- Page views
- Bounce rate
- Average session duration
- Top pages
- Traffic sources
- Ad revenue (AdSense dashboard)

### Tools to Use:
- Google Analytics
- Google Search Console
- Google AdSense Reports
- Vercel Analytics (if using Vercel)

## 🐛 Troubleshooting

### Ads Not Showing?
1. Check if AdSense account is approved
2. Verify Publisher ID is correct
3. Wait 24-48 hours after adding code
4. Check browser ad blockers
5. Review AdSense policy compliance

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### SEO Not Working?
1. Submit sitemap to Search Console
2. Check robots.txt is accessible
3. Verify meta tags in page source
4. Wait 2-4 weeks for indexing
5. Create quality backlinks

## 📞 Support

For issues:
1. Check the README.md
2. Review Next.js documentation
3. Check browser console for errors
4. Review build logs

## ✅ Pre-Launch Checklist

- [ ] Install dependencies
- [ ] Configure Google AdSense
- [ ] Set up Google Analytics
- [ ] Update domain in all files
- [ ] Create legal pages (Privacy, Terms, DMCA)
- [ ] Add real content (movies, descriptions)
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Verify all links work
- [ ] Submit sitemap to Search Console
- [ ] Test ad placements
- [ ] Set up error monitoring
- [ ] Configure CDN (optional)
- [ ] Enable HTTPS
- [ ] Test SEO with tools (Lighthouse, PageSpeed)

## 🎯 Post-Launch Tasks

**Week 1:**
- Monitor Analytics daily
- Check for errors
- Respond to user feedback
- Submit to search engines

**Month 1:**
- Analyze traffic patterns
- Optimize underperforming pages
- Create more content
- Build backlinks

**Ongoing:**
- Update content regularly
- Monitor AdSense revenue
- Improve SEO
- Add new features
- Engage with users

---

**Good luck with your 123Movies website! 🎬**
