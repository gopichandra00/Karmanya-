# Karmanya - Task Management PWA

A beautiful task management app built with React and Next.js, designed as a Progressive Web App (PWA) for seamless mobile installation and offline use.

## ✨ Features

- **Task Management**: Add tasks with time ranges and deadlines
- **Time Tracking**: Monitor completion time vs. deadlines
- **User Authentication**: Sign up/sign in with full profile
- **PWA Ready**: Installable on mobile devices
- **Offline Support**: Works without internet connection
- **Responsive Design**: Optimized for mobile and desktop
- **Persistent Storage**: Data saved locally

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
npm run build
npm start
```

## 📱 Mobile Installation

### Method 1: Direct Browser Installation

1. **Open the app** in your mobile browser (Chrome/Safari/Edge)
2. **Look for install prompt** or tap the menu (⋮)
3. **Select "Add to Home Screen"** or "Install App"
4. **Follow installation prompts**

### Method 2: Manual Installation

- **Android (Chrome)**: Menu → "Add to Home screen"
- **iOS (Safari)**: Share button → "Add to Home Screen"
- **Desktop**: Address bar → Install button

### Method 3: Network Installation (Development)

For testing on the same network:

1. **Find your IP address:**
   ```bash
   ipconfig  # Windows
   ifconfig  # Linux/Mac
   ```

2. **Start server with network access:**
   ```bash
   npm run dev -- -H 0.0.0.0 -p 3000
   ```

3. **Access from mobile:**
   ```
   http://YOUR_IP:3000
   ```

## 🎨 Icon Setup

The app requires icon files for proper PWA installation. Current placeholder files exist in `/public/`.

### Generate Icons

1. **Use online tools:**
   - [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - [Favicon.io](https://favicon.io/)

2. **Create a base icon:**
   - Design a 512x512 PNG with your app logo
   - Use the Karmanya color scheme (#667eea to #764ba2)

3. **Replace placeholder files:**
   ```
   public/
   ├── icon-72.png
   ├── icon-96.png
   ├── icon-128.png
   ├── icon-144.png
   ├── icon-152.png
   ├── icon-192.png
   ├── icon-384.png
   └── icon-512.png
   ```

## 🔧 PWA Features

- **Offline Support**: Service worker caches app for offline use
- **Install Prompt**: Automatic installation suggestions
- **App Shortcuts**: Quick actions from home screen
- **Native Feel**: Standalone display mode
- **Fast Loading**: Optimized caching strategies

## 📁 Project Structure

```
karmanya/
├── components/
│   ├── TodoApp.js          # Main task management component
│   ├── LoginPage.js        # Authentication interface
│   └── PWAInstallPrompt.js # Installation prompt
├── pages/
│   ├── index.js           # Main app page
│   └── _app.js           # Global app wrapper
├── public/
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service worker
│   └── icon-*.png       # App icons
├── styles/
│   ├── Home.module.css   # Main app styles
│   ├── Auth.module.css   # Login styles
│   └── PWAInstall.module.css # Install prompt styles
├── utils/
│   └── auth.js          # Authentication utilities
└── next.config.js       # Next.js configuration
```

## 🛠️ Technologies

- **Next.js 14** - React framework with SSR
- **React 18** - UI library with hooks
- **next-pwa** - PWA plugin
- **CSS Modules** - Scoped styling
- **localStorage** - Client-side data persistence

## 📋 User Features

- **Sign Up**: Full name, email, password, profession, gender
- **Sign In**: Email and password authentication
- **Task Creation**: Description + start/end times
- **Time Tracking**: Completion vs. deadline analysis
- **Task Management**: Edit, complete, delete tasks
- **Data Persistence**: Tasks saved across sessions

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**: https://vercel.com
3. **Import project** from GitHub
4. **Deploy automatically**

### Other Platforms

- **Netlify**: Drag & drop build folder
- **Railway**: Connect GitHub repo
- **Heroku**: Build and deploy

## 📞 Support

For issues or questions:
- Check browser console for errors
- Ensure HTTPS for PWA features
- Verify icon files are proper PNGs
- Test on multiple devices/browsers

---

**Made with ❤️ for productivity enthusiasts**
- `styles/Home.module.css` — component-specific styles
- `public/manifest.json` — PWA manifest
- `next.config.js` — Next.js configuration with PWA support
- `package.json` — app dependencies and scripts

## Notes

Tasks are saved in browser storage using `localStorage`, so they persist across sessions.
